import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginModal from './components/LoginModal'
import Home from './pages/Home'
import Collections from './pages/Collections'
import About from './pages/About'
import Dashboard from './pages/Owner/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <LoginModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App