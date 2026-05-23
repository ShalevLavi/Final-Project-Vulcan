import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useModalStore } from '../store/useModalStore'
import { loginOwner } from '../api/auth'


export default function LoginModal() {
    const { isLoginOpen, closeLogin, setAuthData } = useModalStore()
    const [name, setName] = useState('')
    const [vin, setVin] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    if (!isLoginOpen) return null

    const handleSubmit = async () => {
        // Client side validation
        if (!name.trim() || !vin.trim()) {
            setError('Please fill in all fields')
            return
        }

        if (!/^[A-Za-z ]+$/.test(name)) {
            setError('Name must contain only letters')
            return
        }

        if (!/^[A-Za-z0-9]{4}$/.test(vin)) {
            setError('VIN must be exactly 4 alphanumeric characters')
            return
        }

        try {
            setLoading(true)
            setError('')

            const data = await loginOwner(name.trim(), vin.toUpperCase())

            setAuthData(data.token, data.owner, data.car)

            navigate('/dashboard')

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Invalid name or VIN')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
                onClick={closeLogin}
            />

            {/* Modal */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-full max-w-lg px-4">
                <div className="relative bg-[#080c12] border border-[#1a2848] rounded-xl p-12 shadow-2xl">

                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#1e3a7a] via-[#4869B0] to-[#1e3a7a] rounded-t-xl" />

                    {/* Close button */}
                    <button
                        onClick={closeLogin}
                        className="absolute top-4 right-4 text-[#2a3a60] hover:text-[#8a9ab8] transition-colors duration-300 text-xl cursor-pointer bg-transparent border-none"
                    >
                        ✕
                    </button>

                    {/* Header */}
                    <p className="text-[11px] tracking-[0.4em] text-[#526BA1] uppercase mb-3">
                        Secure Owner Access
                    </p>
                    <h2 className="text-3xl font-light text-[#dde4f0] mb-2 tracking-tight">
                        Owner Portal
                    </h2>
                    <p className="text-base text-[#5C6A8A] leading-relaxed mb-8">
                        Enter your registered name and the last 4 digits of your Vulcan VIN to access your vehicle profile.
                    </p>

                    {/* Error message */}
                    {error && (
                        <div className="mb-6 px-4 py-3 rounded-md border border-red-900 bg-red-950/30 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Name field */}
                    <div className="mb-5">
                        <label htmlFor="ownerName"className="block text-[11px] tracking-[0.25em] text-[#526BA1] uppercase mb-2">
                            Full Name
                        </label>
                        <input
                            id="ownerName"
                            type="text"
                            value={name}
                            onChange={e => {
                                setName(e.target.value)
                                setError('')
                            }}
                            className="w-full bg-[#050810] border border-[#1a2848] rounded-md px-4 py-3.5 text-[#dde4f0] text-base placeholder-[#2a3a60] outline-none focus:border-[#4869B0] transition-colors duration-300"
                        />
                    </div>

                    {/*VIN field*/}
                    <div className="mb-8">
                        <label htmlFor="vinInput" className="block text-[11px] tracking-[0.25em] text-[#526BA1] uppercase mb-2">
                            Last 4 Digits of VIN
                        </label>
                        <input
                            id="vinInput"
                            type="text"
                            value={vin}
                            maxLength={4}
                            onChange={e => {
                                setVin(e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, ''))
                                setError('')
                            }}
                            className="w-full bg-[#050810] border border-[#1a2848] rounded-md px-4 py-4 text-[#dde4f0] text-lg placeholder-[#2a3a60] outline-none focus:border-[#4869B0] transition-colors duration-300 tracking-[0.3em] uppercase"
                        />
                        <p className="text-xs text-[#2a3a60] mt-2">
                            Found on your vehicle registration document
                        </p>
                    </div>

                    {/* Divider*/}
                    <div className="h-px bg-[#0f1828] mb-6" />

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-[#e8e4dc] hover:bg-white text-[#080c12] text-base font-medium tracking-wider py-4 rounded-md transition-all duration-300 cursor-pointer mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Verifying...' : 'Access My Vehicle'}
                    </button>

                    {/*Footer note */}
                    <p className="text-center text-xs text-[#2a3a60]">
                        Not a Vulcan owner yet?{' '}
                        <Link
                            to={"/collections"}
                            onClick={closeLogin}
                            className="text-[#526BA1] cursor-pointer hover:text-[#8aaae0] transition-colors duration-300"
                        >
                            Explore our collections →
                        </Link>
                    </p>

                </div>
            </div>
        </>
    )
}