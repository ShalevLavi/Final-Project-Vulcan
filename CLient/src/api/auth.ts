const API_URL = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api`

export const loginOwner = async (ownerName: string, vinLast4: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ownerName, vinLast4 })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Failed to log in');
    }

    return data;
}

export const getOwnerCar = async (token: string) => {
    const response = await fetch(`${API_URL}/owner/car`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to get owner car');
    }
    return data;
}

export const getMaintenance = async (token: string) => {
    const response = await fetch(`${API_URL}/owner/maintenance`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch maintenance data')
    }

    return data
}

export const requestService = async (token: string, serviceName: string, date: string) => {
    const response = await fetch(`${API_URL}/owner/maintenance`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ serviceName, date }),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Failed to request service')
    }

    return data
}

export const getCars = async () => {
  const response = await fetch(`${API_URL}/cars`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch cars')
  }

  return data
}

export const deleteMaintenance = async (token: string, id: string) => {
  const response = await fetch(`${API_URL}/owner/maintenance/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to delete maintenance request')
  }

  return data
}