import { useState } from 'react'



function Health(){
      const API_URL = import.meta.env.VITE_API_URL;
      const HEALTH_URL = `${API_URL}/health`
    
      const [healthMessage, setHealthMessage] = useState<string | null>(null)
      
      const handleCheckHealth = async () => {
        setHealthMessage(null) // Réinitialise le message
    
        try {
          const response = await fetch(HEALTH_URL)
          if (!response.ok) {
            // Par exemple, si le code HTTP est 500, 404, etc.
            throw new Error(`Erreur API: ${response.status}`)
          }
          const data = await response.text() // ou response.json() selon votre API
          // Affiche la réponse dans l’UI
          setHealthMessage(data)
        } catch (error: any) {
          // Gère les erreurs (réseau, CORS, etc.)
          setHealthMessage(`Erreur: ${error.message}`)
        }
      }

    return (
        <div>
        {/* Bouton pour appeler /health */}
        <button
        onClick={handleCheckHealth}
        className="
        inline-block 
        px-4 py-2 
        bg-blue-500 
        text-white 
        rounded 
        hover:bg-blue-600
        "
        >
        Vérifier la santé du serveur
        </button>

        {/* Affichage du résultat */}
        {healthMessage && (
            <p className="mt-2 text-sm text-gray-800">
            {healthMessage}
            </p>
        )}
    </div>
    )
}

export default Health;