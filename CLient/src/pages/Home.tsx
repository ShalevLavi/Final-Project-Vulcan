import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const collections = [
    {
        num: '01',
        title: 'Off-Road',
        desc: 'Built to handle extremes with confidence and control. Raw power meets intelligent engineering.',
        path: '/collections',
        tab: 'offroad',
    },
    {
        num: '02',
        title: 'Luxury',
        desc: 'Silence. Precision. Presence. Crafted for those who expect nothing less than extraordinary.',
        path: '/collections',
        tab: 'luxury',
    },
]

const stats = [
    { num: '47+', label: 'Countries' },
    { num: '12k+', label: 'Vehicles Delivered' },
    { num: '0.2s', label: 'Throttle Response' },
]

const benefits = [
    'Real-time vehicle health monitoring and diagnostics',
    'One-click maintenance scheduling with certified technicians',
    'Direct encrypted messaging with Vulcan support',
    'Full service history and warranty documentation',
]

const marqueeItems = [
    'Vulcan Motors', '·', 'Off-Road Series', '·', 'Luxury Series', '·',
    'Precision Engineering', '·', 'Owner Portal', '·', 'Est. 2019', '·',
    'Vulcan Motors', '·', 'Off-Road Series', '·', 'Luxury Series', '·',
    'Precision Engineering', '·', 'Owner Portal', '·', 'Est. 2019', '·',
]

export default function Home() {
    return (
        <main className={styles.page}>

            {/* Background */}
            <div className={styles.bg}>
                <div className={styles.bgOrb1} />
                <div className={styles.bgOrb2} />
                <div className={styles.bgGrid} />
            </div>

            <div className={styles.content}>

                {/* Hero */}
                <section className={styles.hero}>
                    <p className={styles.heroTag}>Est. 2019 · Vulcan Motors</p>
                    <h1 className={styles.heroTitle}>
                        Not just a car.<br />
                        <span className={styles.heroTitleAccent}>A statement.</span>
                    </h1>
                    <p className={styles.heroDesc}>
                        Vulcan Motors was founded on a single belief — that a vehicle should feel like an extension of who you are. Every curve, every system, every detail is engineered with intention.
                    </p>
                    <div className={styles.heroBtns}>
                        <Link to="/collections" className={styles.btnPrimary}>
                            Explore Collections
                        </Link>
                        <Link to="/login" className={styles.btnSecondary}>
                            Owner Portal
                        </Link>
                    </div>
                </section>

                {/* Marquee */}
                <div className={styles.marqueeWrap}>
                    <div className={styles.marqueeTrack}>
                        {marqueeItems.map((item, i) => (
                            <span key={i} className={styles.marqueeItem}>{item}</span>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className={styles.stats}>
                    {stats.map(({ num, label }) => (
                        <div key={label} className={styles.stat}>
                            <p className={styles.statNum}>{num}</p>
                            <p className={styles.statLabel}>{label}</p>
                        </div>
                    ))}
                </div>

                {/* Collections */}
                <section className={styles.collectionsSection}>
                    <p className={styles.sectionTag}>Our Collections</p>
                    <div className={styles.collectionsGrid}>
                        {collections.map(({ num, title, desc, path, tab }) => (
                            <Link key={num} to={path} state={{ tab }} className={styles.card}>
                                <div>
                                    <span className={styles.cardNum}>{num}</span>
                                    <h2 className={styles.cardTitle}>{title}</h2>
                                    <p className={styles.cardDesc}>{desc}</p>
                                </div>
                                <div className={styles.cardBottom}>
                                    <span className={styles.cardBadge}>Explore Collection</span>
                                    <span className={styles.cardArrow}>→</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* About */}
                <section className={styles.aboutSection}>
                    <div>
                        <p className={styles.aboutTag}>Our Story</p>
                        <h2 className={styles.aboutTitle}>
                            Forged in ambition.<br />Refined by obsession.
                        </h2>
                        <p className={styles.aboutDesc}>
                            Vulcan Motors was built on a singular premise — that performance and refinement need not be mutually exclusive. We build machines for those who refuse to compromise.
                        </p>
                    </div>
                    <div>
                        <p className={styles.aboutTag}>Owner Benefits</p>
                        <div className={styles.benefitsList}>
                            {benefits.map((text, i) => (
                                <div key={i} className={styles.benefit}>
                                    <div className={styles.benefitDot} />
                                    <p className={styles.benefitText}>{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className={styles.footer}>
                    <span className={styles.footerLogo}>VULCAN MOTORS</span>
                    <div className={styles.footerLinks}>
                        {['Privacy', 'Terms', 'Support'].map(link => (
                            <a key={link} href="#" className={styles.footerLink}>{link}</a>
                        ))}
                    </div>
                    <span className={styles.footerCopy}>© 2024 Vulcan Motors</span>
                </footer>

            </div>
        </main>
    )
}