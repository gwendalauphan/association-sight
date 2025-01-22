//import React from 'react'

interface CardProps {
    title: string;
    imageUrl: string;
    buttonText: string;
    description: string;
    tags: string[];
  }
  

function Card({ title, imageUrl, buttonText, description, tags }: CardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden p-4">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-60 object-contain"
      />
      <div className="p-4 flex flex-col">
        {/* Titre */}
        <h2 className="text-lg text-gray-500 mb-2 text-left">{title}</h2>
        {/* Description */}
        <p className="text-sm text-black font-semibold  mb-4 text-left">{description}</p>
        {/* Exemple d’étiquette (tag) en gris, si besoin */}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="
                px-3 py-1
                text-sm font-bold text-black
                bg-gray-200 
                rounded-full
              "
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bouton */}
        <button
          className="
            py-2 px-4 
            bg-black 
            text-white 
            font-bold 
            rounded-full // Bouton arrondi
            hover:bg-gray-800
          "
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default Card
