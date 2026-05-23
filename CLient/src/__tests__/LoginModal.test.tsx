import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import LoginModal from '../components/LoginModal'
import { useModalStore } from '../store/useModalStore'

// Mock the API
vi.mock('../api/auth', () => ({
  loginOwner: vi.fn(),
}))

const renderModal = () => {
  useModalStore.setState({ isLoginOpen: true })
  return render(
    <BrowserRouter>
      <LoginModal />
    </BrowserRouter>
  )
}

describe('LoginModal', () => {

  beforeEach(() => {
    useModalStore.setState({ isLoginOpen: true, token: null, owner: null, car: null })
  })

  describe('Rendering', () => {

    it('should render the modal when open', () => {
      renderModal()
      expect(screen.getByText('Owner Portal')).toBeInTheDocument()
    })

    it('should render name input field', () => {
      renderModal()
      expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument()
    })

    it('should render VIN input field', () => {
      renderModal()
      expect(screen.getByLabelText(/Last 4 Digits of VIN/i)).toBeInTheDocument()
    })

    it('should render submit button', () => {
      renderModal()
      expect(screen.getByText('Access My Vehicle')).toBeInTheDocument()
    })

    it('should not render when closed', () => {
      useModalStore.setState({ isLoginOpen: false })
      render(
        <BrowserRouter>
          <LoginModal />
        </BrowserRouter>
      )
      expect(screen.queryByText('Owner Portal')).not.toBeInTheDocument()
    })

  })

  describe('Validation', () => {

    it('should show error when submitting empty form', async () => {
      renderModal()
      await userEvent.click(screen.getByText('Access My Vehicle'))
      expect(screen.getByText('Please fill in all fields')).toBeInTheDocument()
    })

    it('should show error when name contains numbers', async () => {
      renderModal()
      await userEvent.type(screen.getByLabelText(/Full Name/i), 'Shalev123')
      await userEvent.type(screen.getByLabelText(/Last 4 Digits of VIN/i), 'X4K9')
      await userEvent.click(screen.getByText('Access My Vehicle'))
      expect(screen.getByText('Name must contain only letters')).toBeInTheDocument()
    })

    it('should show error when VIN is less than 4 characters', async () => {
      renderModal()
      await userEvent.type(screen.getByLabelText(/Full Name/i), 'Shalev Lavi')
      await userEvent.type(screen.getByLabelText(/Last 4 Digits of VIN/i), 'X4')
      await userEvent.click(screen.getByText('Access My Vehicle'))
      expect(screen.getByText('VIN must be exactly 4 alphanumeric characters')).toBeInTheDocument()
    })

    it('should show error when only name is provided', async () => {
      renderModal()
      await userEvent.type(screen.getByLabelText(/Full Name/i), 'Shalev Lavi')
      await userEvent.click(screen.getByText('Access My Vehicle'))
      expect(screen.getByText('Please fill in all fields')).toBeInTheDocument()
    })

    it('should show error when only VIN is provided', async () => {
      renderModal()
      await userEvent.type(screen.getByLabelText(/Last 4 Digits of VIN/i), 'X4K9')
      await userEvent.click(screen.getByText('Access My Vehicle'))
      expect(screen.getByText('Please fill in all fields')).toBeInTheDocument()
    })

  })

  describe('Interactions', () => {

    it('should close modal when X button is clicked', async () => {
      renderModal()
      await userEvent.click(screen.getByText('✕'))
      expect(useModalStore.getState().isLoginOpen).toBe(false)
    })

    it('should convert VIN input to uppercase', async () => {
      renderModal()
      const vinInput = screen.getByLabelText(/Last 4 Digits of VIN/i)
      await userEvent.type(vinInput, 'x4k9')
      expect((vinInput as HTMLInputElement).value).toBe('X4K9')
    })

    it('should clear error when user starts typing', async () => {
      renderModal()
      await userEvent.click(screen.getByText('Access My Vehicle'))
      expect(screen.getByText('Please fill in all fields')).toBeInTheDocument()
      await userEvent.type(screen.getByLabelText(/Full Name/i), 'S')
      expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument()
    })

  })

})