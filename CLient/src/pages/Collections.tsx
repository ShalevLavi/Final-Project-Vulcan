import { useState, useEffect } from 'react'
import { getCars } from '../api/auth'
import { useLocation } from 'react-router-dom'
import styles from './Collections.module.css'

interface CarData {
  _id: string
  carModel: string
  horsepower: number
  engineSize: string
  safetyLevel: number
  carCollection: string
  availableColors: string[]
  startingPrice: number
}

export default function Collections() {
    const location = useLocation()
    const initialTab = (location.state as { tab?: string })?.tab === 'luxury' ? 'luxury' : 'offroad'
    const [activeTab, setActiveTab] = useState<'offroad' | 'luxury'>(initialTab)
    const [offRoadCars, setOffRoadCars] = useState<CarData[]>([])
    const [luxuryCars, setLuxuryCars] = useState<CarData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCars()
            .then(data => {
            setOffRoadCars(data.cars.filter((c: CarData) => c.carCollection === 'offroad'))
            setLuxuryCars(data.cars.filter((c: CarData) => c.carCollection === 'luxury'))
            setLoading(false)
            })
            .catch(err => {
            console.error(err)
            setLoading(false)
            })
    }, [])

    const cars = activeTab === 'offroad' ? offRoadCars : luxuryCars

    if (loading) return (
        <main className={styles.page}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#526BA1', fontSize: '14px', letterSpacing: '0.2em' }}>
            LOADING...
            </div>
        </main>
    )

    const formatPrice = (price: number): string => {
        if (price >= 1000000) {
            const millions = price / 1000000
            return `₪${millions % 1 === 0 ? millions : millions.toFixed(1)}M`
        } else {
            return `₪${(price / 1000).toFixed(0)}K`
        }
    }

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
                        <div key={car._id} className={styles.card}>

                            {/* Image */}
                            <div className={`${styles.cardImg} ${activeTab === 'offroad' ? styles.cardImgOffroad : styles.cardImgLuxury}`}>
                                <span className={styles.cardImgLabel}>{car.carModel}</span>
                                <span className={styles.cardImgNum}>{cars.indexOf(car) + 1 < 10 ? `0${cars.indexOf(car) + 1}` : cars.indexOf(car) + 1}</span>
                                <span className={styles.cardImgPlaceholder}>Vehicle Image</span>
                            </div>

                            {/* Info */}
                            <div className={styles.cardInfo}>
                                <div>
                                    <p className={styles.cardTag}>{activeTab === 'offroad' ? 'Off-Road' : 'Luxury'} · 0{cars.indexOf(car) + 1}</p>
                                    <h2 className={styles.cardName}>Vulcan {car.carModel}</h2>
                                    <p className={styles.cardTagline}>{car.engineSize}</p>
                                    <p className={styles.cardDesc}>
                                        {activeTab === 'offroad'
                                            ? `Built to handle extremes with confidence and control. The ${car.carModel} combines raw mechanical dominance with intelligent all-terrain systems.`
                                            : `Where the future meets refinement. The ${car.carModel} redefines what it means to travel — every detail crafted for those who demand the extraordinary.`
                                        }
                                    </p>

                                    <div className={styles.divider} />

                                    {/* Specs */}
                                    <div className={styles.specs}>
                                        <div className={styles.spec}>
                                            <p className={styles.specVal}>{car.horsepower}hp</p>
                                            <p className={styles.specLabel}>Power</p>
                                        </div>
                                        <div className={styles.spec}>
                                            <p className={styles.specVal}>{car.safetyLevel}/8</p>
                                            <p className={styles.specLabel}>Safety</p>
                                        </div>
                                        <div className={styles.spec}>
                                            <p className={styles.specVal}>{formatPrice(car.startingPrice)}</p>
                                            <p className={styles.specLabel}>Starting Price</p>
                                        </div>
                                    </div>

                                    {/* Highlights */}
                                    <div className={styles.highlights}>
                                        <p className={styles.highlightsTitle}>Available Colors</p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                                            {car.availableColors.map((color: string) => (
                                            <span key={color} className={styles.featureTag}>{color}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom */}
                                <div className={styles.cardBottom}>
                                    <div className={styles.featureTags}>
                                        <span className={styles.featureTag}>{car.engineSize}</span>
                                        <span className={styles.featureTag}>Safety {car.safetyLevel}/8</span>
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