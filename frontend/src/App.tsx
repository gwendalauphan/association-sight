// src/App.tsx

// Vous pouvez remplacer cette URL par l'URL de votre choix
const TOP_IMAGE_URL = "https://via.placeholder.com/600x200"
const CARD_IMAGE_URL = "https://via.placeholder.com/300"

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Section du haut : image + message */}
      <header className="flex flex-col items-center justify-center pt-8">
        <img
          src={TOP_IMAGE_URL}
          alt="Banner"
          className="w-full max-w-xl object-cover rounded-md shadow-md"
        />
        <h1 className="mt-4 text-2xl font-bold text-gray-800 text-center">
          Bienvenue sur mon site
        </h1>
      </header>

      {/* Section des cartes */}
      <main className="py-8 px-4">
        <div
          className="
            grid 
            gap-6
            md:grid-cols-2 
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {/* Vous pouvez répéter ce composant Card 
              autant de fois que nécessaire */}
          <Card
            title="Titre 1"
            imageUrl={CARD_IMAGE_URL}
            buttonText="Action 1"
          />
          <Card
            title="Titre 2"
            imageUrl={CARD_IMAGE_URL}
            buttonText="Action 2"
          />
          <Card
            title="Titre 3"
            imageUrl={CARD_IMAGE_URL}
            buttonText="Action 3"
          />
          <Card
            title="Titre 4"
            imageUrl={CARD_IMAGE_URL}
            buttonText="Action 4"
          />
        </div>
      </main>
    </div>
  )
}

interface CardProps {
  title: string
  imageUrl: string
  buttonText: string
}

function Card({ title, imageUrl, buttonText }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <button
          className="
            mt-auto 
            py-2 px-4 
            bg-blue-500 
            text-white 
            font-bold 
            rounded 
            hover:bg-blue-600
          "
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default App
