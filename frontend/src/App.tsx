//import React from 'react'
import Card from './Card'
import  cardsData  from "./data";
// Import des icônes sociales
import { SocialIcon } from 'react-social-icons'

function App() {
  return (
    <div className="relative flex flex-col min-h-screen        // Applique un flou significatif
      
      bg-cover bg-center 
      "
      style={{ 
        backgroundImage: "url('aqua-grey-theme.png')" 
      }}
      >
      {/* Header */}
      <header className=" p-6">
        <div className="max-w-4xl mx-auto text-center ">
          {/* Logo de la boîte */}
          <img
            src="logo_sight.png"
            alt="Company Logo"
            className="mx-auto h-32 w-auto"
          />
          <p className="text-black text-l font-semibold p-4">
            Sight s'engage avec Dift et vous permet de soutenir gratuitement l'association de votre choix !
          </p>
        </div>
      </header>

      {/* Section principale en blanc avec border-radius en haut */}
      <div className="bg-white rounded-t-3xl -mt-2 pt-8">
        {/* Section cartes */}
        <main className="py-8 px-10">
          <div
            className="
              grid 
              gap-10
              md:grid-cols-2 
              lg:grid-cols-3
              xl:grid-cols-3
            "
          >
            {/* Répéter les Card autant de fois que nécessaire */}
            {cardsData.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                imageUrl={card.imageUrl}
                buttonText={card.buttonText}
                description={card.description}
                tags={card.tags}
              />
            ))}
          </div>
        </main>
      </div>
      <div className= "pt-8">
        
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
          <div className="text-sm text-gray-600">
            Développé par 
            {' '}
            <a 
              href="https://www.linkedin.com/in/votreLinkedIn" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 underline"
            >
              VotreNom
            </a>
          </div>
          <div className="flex space-x-2 mt-2 md:mt-0">
            <SocialIcon url="https://twitter.com/votreEntreprise" style={{ height: 30, width: 30 }} />
            <SocialIcon url="https://facebook.com/votreEntreprise" style={{ height: 30, width: 30 }} />
            <SocialIcon url="https://linkedin.com/company/votreEntreprise" style={{ height: 30, width: 30 }} />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

