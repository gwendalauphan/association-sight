// src/App.test.tsx
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App component', () => {
  it('affiche le message de bienvenue', () => {
    render(<App />)
    // Vérifie que le texte est présent dans le document
    expect(screen.getByText(/Bienvenue sur mon site/i)).toBeInTheDocument()
  })
})
