import type { Article, AuthResponse } from '../types/kb'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:3000'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  if (!res.ok) {
    throw new Error(`API ${res.status}`)
  }

  return (await res.json()) as T
}

export function login(email: string, password: string): Promise<AuthResponse> {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export function listArticles(query = '', tag = ''): Promise<Article[]> {
  const params = new URLSearchParams()
  if (query.trim()) params.set('q', query.trim())
  if (tag.trim()) params.set('tag', tag.trim())

  return request(`/articles?${params.toString()}`)
}

export function createArticle(token: string, payload: Pick<Article, 'title' | 'content' | 'tags'>): Promise<Article> {
  return request('/articles', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { Authorization: `Bearer ${token}` },
  })
}

export function updateArticle(
  token: string,
  id: string,
  payload: Pick<Article, 'title' | 'content' | 'tags'>,
): Promise<Article> {
  return request(`/articles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: { Authorization: `Bearer ${token}` },
  })
}

export function deleteArticle(token: string, id: string): Promise<void> {
  return fetch(`${API_URL}/articles/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    if (!res.ok) throw new Error(`API ${res.status}`)
  })
}
