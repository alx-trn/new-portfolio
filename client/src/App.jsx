import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [apiStatus, setApiStatus] = useState({
    state: 'loading',
    message: 'Vérification de la connexion...',
  })

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/health', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`)
        }

        return response.json()
      })
      .then((data) => {
        setApiStatus({
          state: 'success',
          message: `API Node.js : ${data.status}`,
        })
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setApiStatus({
            state: 'error',
            message: `API Node.js indisponible : ${error.message}`,
          })
        }
      })

    return () => controller.abort()
  }, [])

  return (
    <main className="page">
      <p className="eyebrow">Portfolio · migration progressive</p>
      <h1>Nouvelle architecture</h1>
      <p className="intro">
        React prépare l’interface, Node.js fournit l’API, et les fonctionnalités
        de l’ancien site seront migrées progressivement.
      </p>

      <section className={`status status--${apiStatus.state}`} aria-live="polite">
        <span className="status__indicator" />
        <p>{apiStatus.message}</p>
      </section>

      <p className="note">
        Prochaine étape : migrer une fonctionnalité à la fois, sans supprimer
        l’application PHP avant d’avoir vérifié son remplacement.
      </p>
    </main>
  )
}

export default App