import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useModalStore } from '../store/useModalStore'

export default function Navbar() {
    const location = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)

    const openLogin = useModalStore((state) => state.openLogin)

    const linkClass = (path: string) =>
        `text-sm tracking-wider transition-colors duration-300 ${location.pathname === path ? 'text-[#B6BED1]' : 'text-[#8a9ab8] hover:text-[#B6BED1]'
        }`

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080c12] border-b border-[#0f1828]">

            {/* Main bar */}
            <div className="flex justify-between items-center px-12 py-5">

                {/* Logo */}
                <Link to="/">
                    <img
                        src="/VULCAN - LOGO .png"
                        alt="Vulcan"
                        className="h-8 w-auto transition-all duration-300 hover:h-9 hover:-translate-x-1"
                    />
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex gap-8 items-center">
                    <Link to="/collections" className={linkClass('/collections')}>
                        Collections
                    </Link>
                    <Link to="/about" className={linkClass('/about')}>
                        About
                    </Link>
                    <button
                        onClick={openLogin}
                        className="text-[#4F628F] text-sm tracking-wider px-6 py-2.5 rounded-full border border-[#1e2e50] transition-all duration-300 hover:border-[#788EBF] hover:text-[#788EBF] bg-transparent cursor-pointer"
                    >
                        Owner Portal
                    </button>
                </div>

                {/* Hamburger — mobile only */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer bg-transparent border-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className={`block w-6 h-px bg-[#8a9ab8] transition-all duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
                    <span className={`block w-6 h-px bg-[#8a9ab8] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-6 h-px bg-[#8a9ab8] transition-all duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
                </button>

            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden flex flex-col px-6 pb-6 gap-5 border-t border-[#0f1828]">
                    <Link
                        to="/collections"
                        className={`pt-5 ${linkClass('/collections')}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        Collections
                    </Link>
                    <Link
                        to="/about"
                        className={linkClass('/about')}
                        onClick={() => setMenuOpen(false)}
                    >
                        About
                    </Link>
                    <div className="h-px bg-[#0f1828]" />
                    <Link
                        to="/login"
                        className="text-center text-[#4F628F] text-sm tracking-wider px-6 py-3 rounded-full border border-[#1e2e50] transition-all duration-300 hover:border-[#788EBF] hover:text-[#788EBF]"
                        onClick={() => setMenuOpen(false)}
                    >
                        Owner Portal
                    </Link>
                </div>
            )}

        </nav>
    )
}