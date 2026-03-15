export interface User {
  id: string
  name: string
  email: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface Article {
  id: string
  title: string
  content: string
  tags: string[]
  authorId: string
  createdAt: string
  updatedAt: string
}
