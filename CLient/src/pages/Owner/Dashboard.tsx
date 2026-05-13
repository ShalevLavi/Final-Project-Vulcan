import { useState } from 'react'
import styles from './Dashboard.module.css'

const carDetails = {
    name: 'Zaurus',
    year: '2024',
    vin: '****-****-****-X4K9',
    color: 'Midnight Black',
    hp: '520 HP',
    lastService: 'Mar 2024',
    nextService: 'Sep 2024',
}

const maintenanceHistory = [
    { name: 'Annual Service & Oil Change', date: 'March 15, 2024', status: 'done' },
    { name: 'Brake Inspection', date: 'January 8, 2024', status: 'done' },
    { name: 'Tire Rotation & Alignment', date: 'Scheduled · September 2024', status: 'pending' },
]

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<'details' | 'maintenance'>('details')
    const [chatOpen, setChatOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([
        { from: 'support', text: 'Hello! How can we help you with your Zaurus today?' },
    ])

    const sendMessage = () => {
        if (!message.trim()) return
        setMessages(prev => [...prev, { from: 'owner', text: message }])
        setMessage('')
        setTimeout(() => {
            setMessages(prev => [...prev, { from: 'support', text: 'Thanks for your message! A Vulcan specialist will be with you shortly.' }])
        }, 1000)
    }

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
                    <p className={styles.headerTag}>Owner Dashboard</p>
                    <h1 className={styles.headerTitle}>Welcome back, John</h1>
                    <p className={styles.headerSub}>{carDetails.name} · VIN {carDetails.vin}</p>
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
                                <p className={styles.carYear}>2024</p>
                                <h2 className={styles.carName}>
                                    Vulcan <span className={styles.carNameAccent}>Zaurus</span>
                                </h2>
                            </div>
                            <div className={styles.infoGrid}>
                                <div className={styles.infoCard}>
                                    <p className={styles.infoLabel}>Color</p>
                                    <p className={styles.infoVal}>Midnight Black</p>
                                </div>
                                <div className={styles.infoCard}>
                                    <p className={styles.infoLabel}>Horsepower</p>
                                    <p className={styles.infoVal}>520 HP</p>
                                </div>
                                <div className={styles.infoCard}>
                                    <p className={styles.infoLabel}>Last Service</p>
                                    <p className={styles.infoVal}>Mar 2024</p>
                                </div>
                                <div className={styles.infoCard}>
                                    <p className={styles.infoLabel}>Next Service</p>
                                    <p className={styles.infoVal}>Sep 2024</p>
                                </div>
                                <div className={styles.infoCard}>
                                    <p className={styles.infoLabel}>Warranty</p>
                                    <p className={styles.infoVal}>Valid until 05/2027</p>
                                </div>
                                <div className={styles.infoCard}>
                                    <p className={styles.infoLabel}>Drive Type</p>
                                    <p className={styles.infoVal}>AWD</p>
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
                        {maintenanceHistory.map(({ name, date, status }) => (
                            <div key={name} className={styles.maintItem}>
                                <div>
                                    <p className={styles.maintItemName}>{name}</p>
                                    <p className={styles.maintItemDate}>{date}</p>
                                </div>
                                <span className={status === 'done' ? styles.statusDone : styles.statusPending}>
                                    {status === 'done' ? 'Completed' : 'Upcoming'}
                                </span>
                            </div>
                        ))}
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