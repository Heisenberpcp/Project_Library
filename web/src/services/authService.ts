const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export interface User {
  id: number | string
  username: string
  email: string
}

interface StoredUser extends User {
  password: string
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`Authentication request failed (${response.status}).`)
  }

  return response.json() as Promise<T>
}

function toUser({ id, username, email }: StoredUser): User {
  return { id, username, email }
}

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const normalizedEmail = email.trim().toLowerCase()
    const users = await request<StoredUser[]>(`/users?email=${encodeURIComponent(normalizedEmail)}`)
    const user = users.find((candidate) => candidate.password === password)

    if (!user) {
      throw new Error('Invalid email or password.')
    }

    return toUser(user)
  },

  async register(username: string, email: string, password: string): Promise<User> {
    const normalizedEmail = email.trim().toLowerCase()
    const existingUsers = await request<StoredUser[]>(
      `/users?email=${encodeURIComponent(normalizedEmail)}`,
    )

    if (existingUsers.length > 0) {
      throw new Error('An account with this email already exists.')
    }

    const user = await request<StoredUser>('/users', {
      method: 'POST',
      body: JSON.stringify({
        username: username.trim(),
        email: normalizedEmail,
        password,
      }),
    })

    return toUser(user)
  },
}
