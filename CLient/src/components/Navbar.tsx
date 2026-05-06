import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const location = useLocation()

    const linkStyle = (path: string) => ({
        fontSize: '15px',
        color: location.pathname === path ? '#B6BED1' : '#8a9ab8',
        letterSpacing: '0.06em',
        textDecoration: 'none',
        transition: 'color 0.3s',
    })

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18px 48px',
            borderBottom: '0.5px solid #0f1828',
            background: '#080c12',
            position: 'fixed',
            top: 0, left: 0, right: 0,
            zIndex: 100,
        }}>
            <Link to="/">
                <img src="/src/assets/VULCAN - LOGO .png" alt="Vulcan" style={{ height: '32px', width: 'auto', transition: 'all 0.3s' }}
                    onMouseEnter={e => {
                        e.currentTarget.style.height = '37px';
                        e.currentTarget.style.transform = 'translateX(-5px)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.height = '32px';
                        e.currentTarget.style.transform = 'translateX(0)';
                    }} />
            </Link>

            <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                <Link to="/collections" style={linkStyle('/collections')}
                    onMouseEnter={e => (e.currentTarget.style.color = '#a0b0d0')}
                    onMouseLeave={e => (e.currentTarget.style.color = location.pathname === '/collections' ? '#a0b0d0' : '#5a6a90')}
                >
                    Collections
                </Link>
                <Link to="/about" style={linkStyle('/about')}
                    onMouseEnter={e => (e.currentTarget.style.color = '#a0b0d0')}
                    onMouseLeave={e => (e.currentTarget.style.color = location.pathname === '/about' ? '#a0b0d0' : '#5a6a90')}
                >
                    About
                </Link>
                <Link to="/login" style={{
                    background: 'transparent', color: '#4F628F', fontSize: '13px',
                    letterSpacing: '0.08em', padding: '13px 32px', borderRadius: '999px',
                    border: '0.5px solid #1e2e50', textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s'
                }}
                    onMouseEnter={e => {
                        e.currentTarget.style.borderColor = '#788EBF'
                        e.currentTarget.style.color = '#788EBF'
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.borderColor = '#4F628F'
                        e.currentTarget.style.color = '#4F628F'
                    }}
                >
                    Owner Portal
                </Link>
            </div>
        </nav>
    )
}