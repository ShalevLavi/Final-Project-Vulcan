import styles from './About.module.css'

const storyStats = [
    {
        num: '2019',
        label: 'Founded',
        desc: 'Born from a refusal to accept the status quo in automotive engineering.',
    },
    {
        num: '12,000+',
        label: 'Vehicles Delivered',
        desc: 'Across 47 countries — each one built to the same uncompromising standard.',
    },
    {
        num: '5',
        label: 'Vehicle Models',
        desc: 'Two collections. Five distinct machines. One philosophy.',
    },
]

const values = [
    {
        icon: '⚡',
        title: 'Performance',
        desc: 'Every system, every component, every line of code is optimized for one thing — driving excellence.',
    },
    {
        icon: '🛡',
        title: 'Safety',
        desc: 'Military-grade encryption, real-time diagnostics, and driver assist systems as standard across every model.',
    },
    {
        icon: '◈',
        title: 'Precision',
        desc: 'Sub-millimeter tolerances. Every weld, every surface, every algorithm — exactness is non-negotiable.',
    },
    {
        icon: '∞',
        title: 'Longevity',
        desc: 'Built to last decades. Designed to be maintained, upgraded, and loved for a lifetime.',
    },
]

export default function About() {
    return (
        <main className={styles.page}>

            {/* Background */}
            <div className={styles.bg}>
                <div className={styles.bgOrb1} />
                <div className={styles.bgOrb2} />
            </div>

            <div className={styles.content}>

                {/* Hero */}
                <div className={styles.hero}>
                    <p className={styles.tag}>Vulcan Motors · Est. 2019</p>
                    <h1 className={styles.title}>
                        Built different.<br />
                        <span className={styles.titleAccent}>By design.</span>
                    </h1>
                    <p className={styles.desc}>
                        Vulcan Motors was founded on a refusal to accept the ordinary. We didn't set out to build another car company — we set out to redefine what a vehicle can be, what it can feel like, and what it means to its driver.
                    </p>
                </div>

                {/* Story */}
                <div className={styles.story}>
                    <div>
                        <p className={styles.storyTag}>Our Story</p>
                        <h2 className={styles.storyTitle}>
                            Forged in ambition.<br />Refined by obsession.
                        </h2>
                        <p className={styles.storyText}>
                            In 2019, a small team of engineers and designers walked away from the conventional automotive industry with a single question: what if a car felt truly alive?
                        </p>
                        <p className={styles.storyText}>
                            Five years later, Vulcan Motors has delivered over 12,000 vehicles across 47 countries — each one a testament to the belief that performance and refinement are not opposites. They are partners.
                        </p>
                        <p className={styles.storyText}>
                            Every Vulcan vehicle is the result of thousands of hours of engineering, testing, and obsessive attention to detail. We build machines for those who refuse to compromise.
                        </p>
                    </div>

                    <div className={styles.storyStats}>
                        {storyStats.map(({ num, label, desc }) => (
                            <div key={label} className={styles.storyStat}>
                                <p className={styles.storyStatNum}>{num}</p>
                                <p className={styles.storyStatLabel}>{label}</p>
                                <p className={styles.storyStatDesc}>{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Values */}
                <p className={styles.valuesTag}>What We Stand For</p>
                <div className={styles.valuesGrid}>
                    {values.map(({ icon, title, desc }) => (
                        <div key={title} className={styles.valueCard}>
                            <div className={styles.valueIcon}>{icon}</div>
                            <h3 className={styles.valueTitle}>{title}</h3>
                            <p className={styles.valueDesc}>{desc}</p>
                        </div>
                    ))}
                </div>

                {/* Closing */}
                <div className={styles.closing}>
                    <h2 className={styles.closingTitle}>Drive the future.</h2>
                    <p className={styles.closingSub}>Vulcan Motors · Precision · Power · Prestige</p>
                </div>

            </div>
        </main>
    )
}