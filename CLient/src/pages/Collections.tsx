import { useState } from 'react'
import styles from './Collections.module.css'

const offRoadCars = [
    {
        num: '01',
        tag: 'Off-Road · 01',
        name: 'Vulcan Zaurus',
        tagline: 'The apex predator. Engineered without compromise.',
        desc: 'Zaurus was built for those who refuse to be stopped by terrain. From granite ridges to flooded riverbeds, it combines raw mechanical dominance with intelligent all-terrain systems — delivering control where other vehicles simply give up.',
        specs: [
            { val: '520hp', label: 'Power' },
            { val: '4.1s', label: '0-60' },
            { val: '14"', label: 'Clearance' },
            { val: 'AWD', label: 'Drive' },
        ],
        highlights: [
            'Locking front and rear differentials for maximum traction on any surface',
            'Adaptive terrain suspension with 4 programmable off-road drive modes',
            'Full underbody skid plate protection and reinforced rock rails',
        ],
        features: ['Locking Diff', 'Rock Mode', 'Skid Plates', 'Terrain AI'],
    },
    {
        num: '02',
        tag: 'Off-Road · 02',
        name: 'Vulcan Orinex',
        tagline: 'Agile. Capable. Unrestrained.',
        desc: 'Orinex is the everyday off-roader — lighter and more agile than the Zaurus, yet equally uncompromising in its capability. Designed for those who need serious off-road performance without sacrificing daily refinement and comfort.',
        specs: [
            { val: '430hp', label: 'Power' },
            { val: '4.8s', label: '0-60' },
            { val: '11"', label: 'Clearance' },
            { val: '4WD', label: 'Drive' },
        ],
        highlights: [
            'Intelligent terrain AI that automatically adapts to Sand, Mud, Snow and Rock',
            'Lightweight composite body panels for improved agility off the beaten track',
            'Premium cabin insulation — refined comfort after the roughest of drives',
        ],
        features: ['Sand Mode', 'Mud Mode', 'Terrain AI', 'Composite Body'],
    },
]

const luxuryCars = [
    {
        num: '01',
        tag: 'Luxury · 01',
        name: 'Vulcan Grenyx',
        tagline: 'Understated power. Effortless presence.',
        desc: 'Grenyx is the entry point into the Vulcan luxury experience — and it sets the bar extraordinarily high. It delivers a seamless blend of performance and everyday comfort, wrapped in a design that speaks quietly but commands every room it enters.',
        specs: [
            { val: '890hp', label: 'Power' },
            { val: '2.3s', label: '0-60' },
            { val: 'Coilover', label: 'Suspension' },
            { val: 'RWD', label: 'Drive' },
        ],
        highlights: [
            'Full-grain leather interior with contrast stitching and ambient lighting',
            'Adaptive Coilover suspension that reads the road 500 times per second',
            'Vulcan Drive Assist — intelligent cruise, lane keeping and auto parking',
        ],
        features: ['Leather Interior', 'Coilover Suspension', 'Drive Assist'],
    },
    {
        num: '02',
        tag: 'Luxury · 02',
        name: 'Vulcan Evion',
        tagline: 'Long distances. Absolute silence.',
        desc: "Evion is Vulcan's grand tourer. Designed for those who travel far and arrive perfectly composed — its noise-cancelling cabin architecture and long-range powertrain make every journey feel effortless, no matter the distance.",
        specs: [
            { val: '670hp', label: 'Power' },
            { val: '3.2s', label: '0-60' },
            { val: 'Air', label: 'Suspension' },
            { val: 'AWD', label: 'Drive' },
        ],
        highlights: [
            'Noise-cancelling cabin architecture for a near-silent driving experience',
            '24-speaker Vulcan Reference audio system tuned by acoustic engineers',
            'Extended range powertrain — engineered for the long haul',
        ],
        features: ['Noise Cancelling', '24-Speaker Audio', 'Extended Range'],
    },
    {
        num: '03',
        tag: 'Luxury · 03',
        name: 'Vulcan Umbrix',
        tagline: 'The pinnacle. Hand-assembled. Bespoke.',
        desc: 'Umbrix sits at the very top of the Vulcan lineup. Every unit is hand-assembled by master craftsmen, with bespoke interior options and a powertrain that redefines what a luxury vehicle can do. This is not a car — it is a commission.',
        specs: [
            { val: '590hp', label: 'Power' },
            { val: '4.6s', label: '0-60' },
            { val: 'Air', label: 'Suspension' },
            { val: 'AWD', label: 'Drive' },
        ],
        highlights: [
            'Hand-assembled by master craftsmen — no two Umbrix vehicles are alike',
            'Fully bespoke interior program — materials, colors and layouts on request',
            'Active aerodynamics and carbon ceramic braking system as standard',
        ],
        features: ['Hand Assembled', 'Bespoke Interior', 'Limited Edition', 'Carbon Ceramic'],
    },
]

export default function Collections() {
    const [activeTab, setActiveTab] = useState<'offroad' | 'luxury'>('offroad')

    const cars = activeTab === 'offroad' ? offRoadCars : luxuryCars

    return (
        <main className={styles.page}>

            {/* Background */}
            <div className={styles.bg}>
                <div className={styles.bgOrb} />
                <div className={styles.bgGrid} />
            </div>

            <div className={styles.content}>

                {/* Header */}
                <p className={styles.headerTag}>Vulcan Motors</p>
                <h1 className={styles.headerTitle}>Our Collections</h1>
                <p className={styles.headerDesc}>
                    Two distinct lines. One uncompromising standard. Choose the Vulcan that speaks to you.
                </p>

                {/* Tabs */}
                <div className={styles.tabs}>
                    {(['offroad', 'luxury'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                        >
                            {tab === 'offroad' ? 'Off-Road' : 'Luxury'}
                        </button>
                    ))}
                </div>

                {/* Cards */}
                <div className={styles.cardList}>
                    {cars.map((car) => (
                        <div key={car.name} className={styles.card}>

                            {/* Image */}
                            <div className={`${styles.cardImg} ${activeTab === 'offroad' ? styles.cardImgOffroad : styles.cardImgLuxury}`}>
                                <span className={styles.cardImgLabel}>{car.name}</span>
                                <span className={styles.cardImgNum}>{car.num}</span>
                                <span className={styles.cardImgPlaceholder}>Vehicle Image</span>
                            </div>

                            {/* Info */}
                            <div className={styles.cardInfo}>
                                <div>
                                    <p className={styles.cardTag}>{car.tag}</p>
                                    <h2 className={styles.cardName}>{car.name}</h2>
                                    <p className={styles.cardTagline}>{car.tagline}</p>
                                    <p className={styles.cardDesc}>{car.desc}</p>

                                    <div className={styles.divider} />

                                    {/* Specs */}
                                    <div className={styles.specs}>
                                        {car.specs.map(({ val, label }) => (
                                            <div key={label} className={styles.spec}>
                                                <p className={styles.specVal}>{val}</p>
                                                <p className={styles.specLabel}>{label}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Highlights */}
                                    <div className={styles.highlights}>
                                        <p className={styles.highlightsTitle}>Key Highlights</p>
                                        <div className={styles.highlightList}>
                                            {car.highlights.map((h, i) => (
                                                <div key={i} className={styles.highlight}>
                                                    <div className={styles.dot} />
                                                    <p className={styles.highlightText}>{h}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom */}
                                <div className={styles.cardBottom}>
                                    <div className={styles.featureTags}>
                                        {car.features.map((f) => (
                                            <span key={f} className={styles.featureTag}>{f}</span>
                                        ))}
                                    </div>
                                    <button className={styles.cta}>Configure →</button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}