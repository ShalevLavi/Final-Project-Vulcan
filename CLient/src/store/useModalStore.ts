import { create } from 'zustand'

interface Owner {
    _id: string
    name: string
    vinLast4: string
    lastService: string
    nextService: string
    year: number
}

interface Car {
    _id: string
    carModel: string
    color: string
    horsepower: number
    vin: string
    mileage: number
    carCollection: string
}

interface ModalStore {
    isLoginOpen: boolean
    token: string | null
    owner: Owner | null
    car: Car | null
    openLogin: () => void
    closeLogin: () => void
    setAuthData: (token: string, owner: Owner, car: Car) => void
    logout: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
    isLoginOpen: false,
    token: null,
    owner: null,
    car: null,
    openLogin: () => set({ isLoginOpen: true }),
    closeLogin: () => set({ isLoginOpen: false }),
    setAuthData: (token, owner, car) => set({ token, owner, car, isLoginOpen: false }),
    logout: () => set({ token: null, owner: null, car: null }),
}))