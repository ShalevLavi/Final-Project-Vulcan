import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold tracking-widest">
                VULCAN
            </Link>
            <div className="flex gap-8">
                <Link to="/" className="hover:text-red-500 transition">Home</Link>
                <Link to="/collections" className="hover:text-red-500 transition">Collections</Link>
                <Link to="/about" className="hover:text-red-500 transition">About</Link>
                <Link to="/login" className="hover:text-red-500 transition">Owner Portal</Link>
            </div>
        </nav>
    )
}