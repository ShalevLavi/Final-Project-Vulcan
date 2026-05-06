import { Link } from 'react-router-dom'

const collections = [
    {
        num: '01',
        title: 'Off-Road',
        desc: 'Built to handle extremes with confidence and control. Raw power meets intelligent engineering.',
        path: '/collections',
    },
    {
        num: '02',
        title: 'Luxury',
        desc: 'Silence. Precision. Presence. Crafted for those who expect nothing less than extraordinary.',
        path: '/collections',
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
        <main style={{ background: '#080c12', color: '#f0ece4', minHeight: '100vh', fontFamily: 'Inter, sans-serif', overflowX: 'hidden', paddingTop: '69px' }}>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');

        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(25px); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .vl-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 36px 32px;
          cursor: pointer;
          background: rgba(10,18,38,0.7);
          border: 0.5px solid #1a2848;
          border-radius: 10px;
          min-height: 230px;
          transition: all 0.35s ease;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
        }
        .vl-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: #1e3a7a;
          transition: background 0.35s;
        }
        .vl-card:hover {
          background: rgba(14,26,58,0.9);
          border-color: #2a4a9a;
          transform: translateY(-3px);
          box-shadow: 0 14px 40px rgba(8,16,48,0.6);
        }
        .vl-card:hover::before { background: #5a8aef; }
        .vl-card:hover .vl-card-title { color: #c0d4f8; }
        .vl-card:hover .vl-card-arrow { color: #5a8aef; transform: translateX(4px); }
        .vl-card:hover .vl-card-badge { border-color: #2a4a9a; color: #5a8aef; }

        .vl-card-title {
          font-size: 30px;
          font-weight: 300;
          color: #5a78b0;
          transition: color 0.35s;
          margin-bottom: 12px;
        }
        .vl-card-arrow {
          font-size: 16px;
          color: #2a3a60;
          transition: all 0.35s;
        }
        .vl-card-badge {
          font-size: 11px;
          letter-spacing: 0.12em;
          color: #3a4a70;
          border: 0.5px solid #1a2848;
          padding: 6px 16px;
          border-radius: 999px;
          transition: all 0.35s;
        }
      `}</style>

            {/* Background */}
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
                <div style={{
                    position: 'absolute', width: '500px', height: '500px',
                    background: 'radial-gradient(circle, rgba(30,58,138,0.2) 0%, transparent 70%)',
                    top: '-150px', left: '-100px', borderRadius: '50%',
                    animation: 'orbFloat 12s ease-in-out infinite',
                }} />
                <div style={{
                    position: 'absolute', width: '350px', height: '350px',
                    background: 'radial-gradient(circle, rgba(15,40,100,0.15) 0%, transparent 70%)',
                    top: '150px', right: '-80px', borderRadius: '50%',
                    animation: 'orbFloat 16s ease-in-out infinite reverse',
                }} />
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'linear-gradient(rgba(30,58,138,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,138,0.05) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 0%, transparent 80%)',
                }} />
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>

                {/* Hero */}
                <section style={{ textAlign: 'center', padding: '80px 48px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p style={{ fontSize: '13px', letterSpacing: '0.4em', color: '#526BA1', textTransform: 'uppercase', marginBottom: '24px' }}>
                        Est. 2019 · Vulcan Motors
                    </p>
                    <h1 style={{ fontSize: '70px', fontWeight: 300, lineHeight: 1.15, color: '#dde4f0', marginBottom: '20px', letterSpacing: '-0.02em' }}>
                        Not just a car.<br />
                        <span style={{ color: '#4869B0' }}>A statement.</span>
                    </h1>
                    <p style={{ fontSize: '15px', color: '#6a7a9a', lineHeight: 1.9, maxWidth: '480px', marginBottom: '36px', fontWeight: 300 }}>
                        Vulcan Motors was founded on a single belief — that a vehicle should feel like an extension of who you are. Every curve, every system, every detail is engineered with intention.
                    </p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Link to="/collections" style={{
                            background: '#e8e4dc', color: '#080c12', fontSize: '13px',
                            letterSpacing: '0.08em', padding: '13px 32px', borderRadius: '999px',
                            textDecoration: 'none', fontWeight: 500, display: 'inline-block', transition: 'all 0.3s'
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = '#ffffff'
                                e.currentTarget.style.color = '#000'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = '#e8e4dc'
                                e.currentTarget.style.color = '#080c12'
                            }}>
                            Explore Collections
                        </Link>
                        <Link to="/login" style={{
                            background: 'transparent', color: '#4F628F', fontSize: '13px',
                            letterSpacing: '0.08em', padding: '13px 32px', borderRadius: '999px',
                            border: '0.5px solid #1e2e50', textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s'
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = '#92ADEF'
                                e.currentTarget.style.color = '#92ADEF'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = '#4F628F'
                                e.currentTarget.style.color = '#4F628F'
                            }}
                        >
                            Owner Portal
                        </Link>
                    </div>
                </section>

                {/* Marquee */}
                <div style={{ overflow: 'hidden', borderTop: '0.5px solid #0f1828', borderBottom: '0.5px solid #0f1828', padding: '13px 0', background: '#050810' }}>
                    <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 28s linear infinite' }}>
                        {marqueeItems.map((item, i) => (
                            <span key={i} style={{ fontSize: '13px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#3D5899', padding: '0 36px', whiteSpace: 'nowrap' }}>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '0.5px solid #0f1828' }}>
                    {stats.map(({ num, label }, i) => (
                        <div key={i} style={{ padding: '28px 0', textAlign: 'center', borderRight: i < 2 ? '0.5px solid #0f1828' : 'none' }}>
                            <p style={{ fontSize: '30px', fontWeight: 300, color: '#6a88c0', marginBottom: '6px' }}>{num}</p>
                            <p style={{ fontSize: '15px', color: '#5C6A8A', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{label}</p>
                        </div>
                    ))}
                </div>

                {/* Collections */}
                <section style={{ padding: '56px 48px' }}>
                    <p style={{ fontSize: '13px', letterSpacing: '0.35em', color: '#3D5899', textTransform: 'uppercase', marginBottom: '28px' }}>
                        Our Collections
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', maxWidth: '860px', margin: '0 auto' }}>
                        {collections.map(({ num, title, desc, path }) => (
                            <Link key={num} to={path} className="vl-card">
                                <div>
                                    <span style={{ fontSize: '11px', color: '#2a3a60', letterSpacing: '0.25em', display: 'block', marginBottom: '16px' }}>{num}</span>
                                    <h2 className="vl-card-title">{title}</h2>
                                    <p style={{ fontSize: '13px', color: '#5C6A8A', lineHeight: 1.8 }}>{desc}</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '28px' }}>
                                    <span className="vl-card-badge">Explore Collection</span>
                                    <span className="vl-card-arrow">→</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* About */}
                <section style={{ padding: '56px 48px', borderTop: '0.5px solid #0f1828', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px' }}>
                    <div>
                        <p style={{ fontSize: '13px', letterSpacing: '0.35em', color: '#3a5080', textTransform: 'uppercase', marginBottom: '18px' }}>Our Story</p>
                        <h2 style={{ fontSize: '28px', fontWeight: 300, color: '#6a88c0', lineHeight: 1.35, marginBottom: '18px' }}>
                            Forged in ambition.<br />Refined by obsession.
                        </h2>
                        <p style={{ fontSize: '14px', color: '#5C6A8A', lineHeight: 2, fontWeight: 300 }}>
                            Vulcan Motors was built on a singular premise — that performance and refinement need not be mutually exclusive. We build machines for those who refuse to compromise.
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: '13px', letterSpacing: '0.35em', color: '#3D5899', textTransform: 'uppercase', marginBottom: '18px' }}>Owner Benefits</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                            {benefits.map((text, i) => (
                                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                                    <div style={{ width: '4px', height: '4px', background: '#2a4a8a', borderRadius: '50%', marginTop: '8px', flexShrink: 0 }} />
                                    <p style={{ fontSize: '13px', color: '#5C6A8A', lineHeight: 1.8, fontWeight: 300 }}>{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer style={{ padding: '24px 48px', borderTop: '0.5px solid #0f1828', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.3em', color: '#3D5899' }}>VULCAN MOTORS</span>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        {['Privacy', 'Terms', 'Support'].map(link => (
                            <a key={link} href="#" style={{ fontSize: '11px', color: '#3D5899', textDecoration: 'none', letterSpacing: '0.08em' }}>{link}</a>
                        ))}
                    </div>
                    <span style={{ fontSize: '11px', color: '#3D5899', letterSpacing: '0.08em' }}>© 2024 Vulcan Motors</span>
                </footer>

            </div>
        </main>
    )
}