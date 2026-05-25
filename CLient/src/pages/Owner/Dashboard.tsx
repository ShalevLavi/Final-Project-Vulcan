import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useModalStore } from '../../store/useModalStore'
import styles from './Dashboard.module.css'
import { getMaintenance, requestService } from '../../api/auth'
import { connectSocket, disconnectSocket } from '../../api/socket'

interface MaintenanceItem {
        _id: string
        serviceName: string
        date: string
        status: 'completed' | 'upcoming' | 'pending'
    }

export default function Dashboard() {
    const { token, owner, car, logout } = useModalStore()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState<'details' | 'maintenance'>('details')
    const [chatOpen, setChatOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<{ from: string, text: string }[]>([
        { from: 'support', text: `Hello ${owner?.name || 'there'}! How can we help you with your ${car?.carModel || 'vehicle'} today?` },
    ])
    const [maintenanceList, setMaintenanceList] = useState<MaintenanceItem[]>([])
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [selectedService, setSelectedService] = useState('')
    const [selectedDate, setSelectedDate] = useState<1 | 2 | null>(null)
    const [serviceError, setServiceError] = useState('')
    const [serviceLoading, setServiceLoading] = useState(false)

    const socketRef = useRef<ReturnType<typeof connectSocket> | null>(null)

    useEffect(() => {
        if (!token || !owner || !car) return

        const socket = connectSocket()
        socketRef.current = socket

        // Join the owner's private room
        socket.emit('joinRoom', owner._id)

        // Listen for incoming messages
        socket.on('receiveMessage', (message: { from: string, text: string }) => {
            setMessages(prev => [...prev, message])
        })

        return () => {
            socket.off('receiveMessage')
        }
        }, [token, owner, car])

        useEffect(() => {
        return () => {
            disconnectSocket()
        }
    }, [])

    useEffect(() => {
        if (token) {
            getMaintenance(token)
                .then(data => setMaintenanceList(data.maintenance))
                .catch(err => console.error(err))
        }
    }, [token])

    const allowedServices = [
        'Oil Change',
        'Brake Inspection',
        'Tire Rotation & Alignment',
        'Full Vehicle Inspection',
        'Air Filter Replacement',
        'Brake Fluid Change',
        'Battery Check',
        'Wheel Alignment',
        'Transmission Service',
        'Coolant Flush',
    ]

    const getDateFromSelection = (selection: 1 | 2) => {
        const now = new Date()
        const target = new Date(now.getFullYear(), now.getMonth() + selection, 1)
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return `${months[target.getMonth()]} ${target.getFullYear()}`
    }

    const getMonthLabel = (selection: 1 | 2) => {
        const now = new Date()
        const target = new Date(now.getFullYear(), now.getMonth() + selection, 1)
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return `${months[target.getMonth()]} ${target.getFullYear()}`
    }

    const handleServiceRequest = async () => {
        if (!selectedService) {
            setServiceError('Please select a service')
            return
        }
        if (!selectedDate) {
            setServiceError('Please select a timeframe')
            return
        }

        try {
            setServiceLoading(true)
            setServiceError('')
            const date = getDateFromSelection(selectedDate)
            await requestService(token!, selectedService, date)
            const data = await getMaintenance(token!)
            setMaintenanceList(data.maintenance)
            setShowServiceForm(false)
            setSelectedService('')
            setSelectedDate(null)
        } catch (err) {
            setServiceError(err instanceof Error ? err.message : 'Failed to request service')
        } finally {
            setServiceLoading(false)
        }
    }

    // Redirection to home page if not logged in
    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [token, navigate])

    const sendMessage = () => {
        if (!message.trim() || !socketRef.current || !owner || !car) return

        socketRef.current.emit('sendMessage', {
            ownerId: owner._id,
            text: message,
            from: 'owner',
            carModel: car.carModel,
            ownerName: owner.name,
        })
        setMessage('')
    }

    if (!token || !car || !owner) return null

    return (
        <main className={styles.page}>

            {/* Background */}
            <div className={styles.bg}>
                <div className={styles.bgOrb1} />
                <div className={styles.bgOrb2} />
            </div>

            <div className={styles.content}>

                {/* Header */}
                <div className={styles.header}>
                    <div>
                        <p className={styles.headerTag}>Owner Dashboard</p>
                        <h1 className={styles.headerTitle}>Welcome back, {owner.name}</h1>
                        <p className={styles.headerSub}>Vulcan {car.carModel} · VIN ****-****-****-{owner.vinLast4}</p>
                    </div>
                    <button
                        onClick={() => { logout(); navigate('/') }}
                        className={styles.logoutBtn}
                    >
                        Log Out
                    </button>
                </div>

                {/* Tabs */}
                <div className={styles.tabs}>
                    {(['details', 'maintenance'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                        >
                            {tab === 'details' ? 'Car Details' : 'Maintenance'}
                        </button>
                    ))}
                </div>

                {/* Car Details Panel */}
                <div className={activeTab === 'details' ? styles.panelActive : styles.panel}>
                    <div className={styles.carPanel}>

                        {/* Image */}
                        <div className={styles.carImg}>
                            <img src={car.image} alt={car.carModel} className={styles.carImgPhoto} />
                        </div>

                        {/* Right */}
                        <div className={styles.carRight}>
                            <div>
                                <p className={styles.carYear}>{owner.year}</p>
                                <h2 className={styles.carName}>
                                    Vulcan <span className={styles.carNameAccent}>{car.carModel}</span>
                                </h2>
                            </div>
                            <div className={styles.infoGrid}>
                                <div className={styles.infoCard}>
                                    <p className={styles.infoLabel}>Color</p>
                                    <p className={styles.infoVal}>{owner.carColor}</p>
                                </div>
                                <div className={styles.infoCard}>
                                    <p className={styles.infoLabel}>Horsepower</p>
                                    <p className={styles.infoVal}>{car.horsepower} HP</p>
                                </div>
                                <div className={styles.infoCard}>
                                    <p className={styles.infoLabel}>Mileage</p>
                                    <p className={styles.infoVal}>{owner.mileage.toLocaleString()} km</p>
                                </div>
                                <div className={styles.infoCard}>
                                    <p className={styles.infoLabel}>Last Service</p>
                                    <p className={styles.infoVal}>{owner.lastService}</p>
                                </div>
                                <div className={styles.infoCard}>
                                    <p className={styles.infoLabel}>Engine</p>
                                    <p className={styles.infoVal}>{car.engineSize}</p>
                                </div>
                                <div className={styles.infoCard}>
                                    <p className={styles.infoLabel}>Safety Rating</p>
                                    <p className={styles.infoVal}>{car.safetyLevel} / 8</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Maintenance Panel */}
                <div className={activeTab === 'maintenance' ? styles.panelActive : styles.panel}>
                    <div className={styles.maintHeader}>
                        <p className={styles.maintTitle}>Service History</p>
                        <div className={styles.requestBtnWrap}>
                            <button
                                className={styles.maintBtn}
                                onClick={() => setShowServiceForm(!showServiceForm)}
                            >
                                {showServiceForm ? 'Cancel' : '+ Request Service'}
                            </button>

                            {showServiceForm && (
                                <div className={styles.dropdown}>
                                    <p className={styles.dropdownTitle}>Request a Service</p>

                                    {serviceError && (
                                        <p className={styles.serviceFormError}>{serviceError}</p>
                                    )}

                                    <label className={styles.dropdownLabel}>Service Type</label>
                                    <select
                                        className={styles.dropdownSelect}
                                        value={selectedService}
                                        onChange={e => {
                                            setSelectedService(e.target.value)
                                            setServiceError('')
                                        }}
                                    >
                                        <option value="">Select a service...</option>
                                        {allowedServices.map(service => (
                                            <option key={service} value={service}>{service}</option>
                                        ))}
                                    </select>

                                    <label className={styles.dropdownLabel}>Preferred Timeframe</label>
                                    <div className={styles.dateButtons}>
                                        <button
                                            className={`${styles.dateBtn} ${selectedDate === 1 ? styles.dateBtnSelected : ''}`}
                                            onClick={() => { setSelectedDate(1); setServiceError('') }}
                                        >
                                            Schedule Soon
                                            <span className={styles.dateSubtext}>{getMonthLabel(1)}</span>
                                        </button>
                                        <button
                                            className={`${styles.dateBtn} ${selectedDate === 2 ? styles.dateBtnSelected : ''}`}
                                            onClick={() => { setSelectedDate(2); setServiceError('') }}
                                        >
                                            Schedule Later
                                            <span className={styles.dateSubtext}>{getMonthLabel(2)}</span>
                                        </button>
                                    </div>

                                    <div className={styles.dropdownDivider} />

                                    <button
                                        className={styles.dropdownSubmit}
                                        onClick={handleServiceRequest}
                                        disabled={serviceLoading}
                                    >
                                        {serviceLoading ? 'Submitting...' : 'Submit Request'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={styles.maintList}>
                        {maintenanceList.length === 0 ? (
                            <p style={{ color: '#5C6A8A', fontSize: '14px' }}>No service records found.</p>
                        ) : (
                            maintenanceList.map((item) => (
                                <div key={item._id} className={styles.maintItem}>
                                    <div>
                                        <p className={styles.maintItemName}>{item.serviceName}</p>
                                        <p className={styles.maintItemDate}>{item.date}</p>
                                    </div>
                                    <span className={item.status === 'completed' ? styles.statusDone : styles.statusPending}>
                                        {item.status === 'completed' ? 'Completed' : item.status === 'upcoming' ? 'Upcoming' : 'Pending'}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>

            {/* Floating Chat Button */}
            <button className={styles.chatBtn} onClick={() => setChatOpen(!chatOpen)}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Chat Window */}
            {chatOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.chatHeader}>
                        <p className={styles.chatHeaderTitle}>Vulcan Support</p>
                        <p className={styles.chatHeaderStatus}>● Online</p>
                    </div>
                    <div className={styles.chatMessages}>
                        {messages.map((msg, i) => (
                            <div key={i} className={msg.from === 'support' ? styles.msgSupport : styles.msgOwner}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className={styles.chatInputWrap}>
                        <input
                            className={styles.chatInput}
                            placeholder="Type a message..."
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && sendMessage()}
                        />
                        <button className={styles.chatSend} onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}

        </main>
    )
}