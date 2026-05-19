import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useModalStore } from '../../store/useModalStore'
import styles from './Dashboard.module.css'

export default function Dashboard() {
    const { token, owner, car, logout } = useModalStore()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState<'details' | 'maintenance'>('details')
    const [chatOpen, setChatOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([
        { from: 'support', text: `Hello ${owner?.name || 'there'}! How can we help you with your ${car?.carModel || 'vehicle'} today?` },
    ])

    // Redirect if not logged in
    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [token, navigate])

    const sendMessage = () => {
        if (!message.trim()) return
        setMessages(prev => [...prev, { from: 'owner', text: message }])
        setMessage('')
        setTimeout(() => {
            setMessages(prev => [...prev, { from: 'support', text: 'Thanks for your message! A Vulcan specialist will be with you shortly.' }])
        }, 1000)
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
                            <span className={styles.carImgPlaceholder}>Vehicle Image</span>
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
                                    <p className={styles.infoVal}>{car.color}</p>
                                </div>
                                <div className={styles.infoCard}>
                                    <p className={styles.infoLabel}>Horsepower</p>
                                    <p className={styles.infoVal}>{car.horsepower} HP</p>
                                </div>
                                <div className={styles.infoCard}>
                                    <p className={styles.infoLabel}>Last Service</p>
                                    <p className={styles.infoVal}>{owner.lastService}</p>
                                </div>
                                <div className={styles.infoCard}>
                                    <p className={styles.infoLabel}>Next Service</p>
                                    <p className={styles.infoVal}>{owner.nextService}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Maintenance Panel */}
                <div className={activeTab === 'maintenance' ? styles.panelActive : styles.panel}>
                    <div className={styles.maintHeader}>
                        <p className={styles.maintTitle}>Service History</p>
                    </div>
                    <div className={styles.maintList}>
                        <div className={styles.maintItem}>
                            <div>
                                <p className={styles.maintItemName}>Annual Service & Oil Change</p>
                                <p className={styles.maintItemDate}>{owner.lastService}</p>
                            </div>
                            <span className={styles.statusDone}>Completed</span>
                        </div>
                        <div className={styles.maintItem}>
                            <div>
                                <p className={styles.maintItemName}>Upcoming Service</p>
                                <p className={styles.maintItemDate}>Scheduled · {owner.nextService}</p>
                            </div>
                            <span className={styles.statusPending}>Upcoming</span>
                        </div>
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