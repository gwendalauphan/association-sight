import { useState } from "react"
import Card from './Card'
import AssociationDetails from './AssociationDetails'
import { cardsData, developerInfo }  from "./data";
//import Health from "./Health";
import CountVote from "./Vote";
// Import des icônes sociales
import { SocialIcon } from 'react-social-icons'

function App() {

  const [showOverlay, setShowOverlay] = useState(false)

  const [selectedIndex, setSelectedIndex] = useState(0);

  // Quand on clique sur le bouton d'une carte, on reçoit son "cardData"
  const handleOpenOverlay = (index: number) => {
    setSelectedIndex(index);
    setShowOverlay(true);
  };
  
  const handleCloseOverlay = () => {
    setShowOverlay(false)
  }

  // Gestion du "précédent" et "suivant"
  const handlePrev = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : cardsData.length - 1
    );
  };
  const handleNext = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex < cardsData.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-cover bg-center"
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
          <CountVote />
          {/* <Health /> */}
        </div>
      </header>

      {/* Section principale en blanc avec border-radius en haut */}
      <div className="bg-white rounded-t-3xl -mt-2 pt-8">
        {/* Section cartes */}
        <main className="py-8 px-10">
          <div
            className={`
              grid 
              gap-10
              grid-cols-1
              ${cardsData.length > 1 ? 'md:grid-cols-2' : ''}
            `}
          >
            {/* Répéter les Card autant de fois que nécessaire */}
            {cardsData.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                imageUrl={card.imageUrl}
                imagesCardDetails={card.imagesCardDetails}
                description={card.description}
                tags={card.tags}
                onButtonClick={() => handleOpenOverlay(index)}
              />
            ))}
          </div>
        </main>
        {/* Affichage conditionnel de l'overlay */}
        {showOverlay && (
          <AssociationDetails
            onClose={handleCloseOverlay}
            cardData={cardsData[selectedIndex]}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </div>
      <div className= "pt-8">
        
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 mt-auto">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4">
        {/* Crédit développeur */}
        <div className="text-sm text-gray-600 items-center">
          Développé par{' '}
          <a
            href={developerInfo.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {developerInfo.name}
          </a>
          {" "}
          <SocialIcon
            key={developerInfo.name}
            url={developerInfo.linkedInUrl}
            style={{ height: 25, width: 25 }}
            target="_blank"
            rel="noopener noreferrer"
            />
          <div>© 2025</div>
        </div>

        {/* Barre de séparation pour les petits écrans */}
        <div className="sm:hidden block border-t border-gray-500 w-1/6 my-4 mx-auto"></div>

        {/* Icônes de réseaux sociaux */}
        <div className="mt-2 flex gap-4 items-center">
          <a
            href={developerInfo.enterpriseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black underline"
          >
            {developerInfo.enterpriseName}
          </a>


            <img
              src="logo_sight.gif"
              alt="Company Animation"
              className="h-12 w-auto bg-black"
            />
        </div>
      </div>
    </footer>
    </div>
  )
}

export default App

