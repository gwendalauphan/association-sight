import React, { useState, FormEvent } from "react"
import { CardData } from "./types"
import { SocialIcon } from "react-social-icons";


// Exemple d'URL d'API
const API_URL = import.meta.env.VITE_API_URL;

interface AssociationDetailsProps {
    onClose: () => void;
    cardData: CardData;
    onPrev?: () => void;
    onNext?: () => void;
  }

function AssociationDetails({   
    onClose,
    cardData,
    onPrev,
    onNext,
  }: AssociationDetailsProps) {
    // État pour la partie "En savoir plus"
    const [showMore, setShowMore] = useState(false);


    // État local des champs du formulaire
    const [username, setUsername] = useState("");
    const [petitMot, setPetitMot] = useState("");
    const [email, setEmail] = useState("");

    // État local pour les messages
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
  
    const {
      title,
      imagesCardDetails,
      description,
      // buttonText, // on n'affiche plus le bouton d'action principal
      tags,
    } = cardData;
  
    const handleShowMore = () => {
      setShowMore(!showMore);
    };

    // Gestion du clic sur “Soutenir gratuitement”
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Réinitialiser les messages
    setErrorMessage("");
    setSuccessMessage("");

    // Vérifier que username est renseigné
    if (!username.trim()) {
      setErrorMessage("Veuillez renseigner votre nom / prénom.");
      return;
    }

    // Construire le body à envoyer
    const payload: any = {
      title,      // le title de la carte
      username,   // l'utilisateur
      // petitMot n'est pas forcément envoyé, 
      // sauf si vous le souhaitez (ex: payload.petitMot = petitMot)
    };

    // Ajouter l'email uniquement s'il est non vide (et éventuellement si vous validez le format)
    if (email.trim()) {
      payload.email = email.trim();
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Succès
        setSuccessMessage("Votre vote a bien été pris en compte.");
      } else {
        // On tente de récupérer le message d'erreur renvoyé par l'API
        const errorData = await response.json().catch(() => ({}));
        const apiErrorMsg =
          errorData?.message || "Une erreur est survenue lors de la soumission.";
        setErrorMessage(apiErrorMsg);
      }
    } catch (err) {
      // Erreur réseau ou autre
      setErrorMessage("Impossible de contacter le serveur. Réessayez plus tard.");
    }
  };
  

    return (
        <div
          className="
            fixed inset-0 
            bg-black/50 
            z-50 
            flex 
            items-center 
            justify-center
          "
        >
          {/* Conteneur principal */}
          <div
            className="
              relative
              bg-white
              w-full
              max-w-screen-lg
              mx-auto
              rounded-lg
              shadow-2xl
              overflow-y-auto
              max-h-screen
            "
          >
          {/* Flèches pour changer de carte (top-left) */}
          <div className="sticky top-0 left-4 flex space-x-2 font-semibold mb-2 p-2">
            <button
              onClick={onPrev}
              className="
                absolute
                left-2 
                flex items-center justify-center
                w-8 h-8
                rounded-full
                bg-gray-200
                text-gray-600
                hover:text-gray-800
                text-2xl
              "
              aria-label="Carte précédente"
            >
              &lt;
            </button>
            <button
              onClick={onNext}
              className="
                absolute
                left-10
                flex items-center justify-center
                w-8 h-8
                rounded-full
                bg-gray-200
                text-gray-600
                hover:text-gray-800
                text-2xl
              "
              aria-label="Carte suivante"
            >
              &gt;
            </button>

            {/* Bouton pour fermer l’overlay (top-right) */}
          <button
            onClick={onClose}
            className="
              absolute
              right-2 
              flex items-center justify-center
              w-8 h-8
              rounded-full
              bg-gray-200
              text-gray-600
              hover:text-gray-800
              text-3xl
            "
          >
            &times;
          </button>
          </div>



            {/* Contenu principal */}

            <div className="p-6">

          {/* Grille : Image à gauche, Formulaire à droite */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-stretch">
            {/* Images à gauche (sous-forme de grille) */}
            <div className="h-full">
                <div
                className={`
                  grid
                  grid-cols-1
                  gap-2
                  place-items-center
                  w-full
                  h-full
                  ${imagesCardDetails.length > 1 ? 'sm:grid-cols-2' : ''}
                `}
                >
                {imagesCardDetails.map((src, idx) => (
                    <img
                    key={idx}
                    src={src}
                    alt={`Image ${idx}`}
                    className="w-full h-full object-cover rounded"
                    />
                ))}
                </div>
            </div>


            {/* Formulaire à droite */}
            <div className="h-full flex flex-col justify-between">
            <h2 className="text-black text-2xl font-bold mb-2">{title}</h2>
              <p className="text-gray-700 mb-4">{description}</p>

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

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nom / Prénom */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-xs text-black mb-1"
                  >
                    Username*
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="
                      w-full
                      p-2
                      bg-white
                      text-black
                      border border-black
                      rounded
                      focus:outline-none
                      hover:border-2
                      hover:border-black
                      focus:border-2
                      focus:border-black
                    "
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder=""
                  />
                </div>

                {/* Petit mot */}
                <div>
                  <label
                    htmlFor="petitmot"
                    className="block text-xs text-black mb-1"
                  >
                    Un petit mot ?
                  </label>
                  <textarea
                    id="petitmot"
                    name="petitmot"
                    rows={3}
                    className="
                      w-full
                      p-2
                      bg-white
                      text-black
                      border border-black
                      rounded
                      focus:outline-none
                      hover:border-2
                      hover:border-black
                      focus:border-2
                      focus:border-black
                    "
                    placeholder="Un mot, une phrase, un sourire à partager"
                    value={petitMot}
                    onChange={(e) => setPetitMot(e.target.value)}
                  ></textarea>
                </div>

                {/* Email (optionnel) */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs text-black mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="
                      w-full
                      p-2
                      bg-white
                      text-black
                      border border-black
                      rounded
                      focus:outline-none
                      hover:border-2
                      hover:border-black
                      focus:border-2
                      focus:border-black
                    "
                    placeholder="Pour recevoir des nouvelles du projet"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Message d’erreur */}
                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}

                {/* Message de succès */}
                {successMessage && (
                  <p className="text-green-600 text-sm">{successMessage}</p>
                )}

                {/* Bouton "Soutenir gratuitement" */}
                <button
                  type="submit"
                  className="
                    w-full 
                    py-2 px-4 
                    bg-gray-100
                    border border-purple-400 
                    text-black
                    font-semibold
                    rounded-full
                    hover:shadow-md
                  "
                >
                  Soutenir gratuitement
                </button>
              </form>
            </div>
          </div>

          {/* Séparateur avant la partie "En savoir plus" */}
          <hr className="my-6 border-t border-gray-300" />
    
              {/* Section "En savoir plus" (affichage conditionnel) */}
          {showMore && (
            <div className="space-y-4">
              {/* Mise en grille (3 colonnes sur grand écran, adaptatif) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Le projet</h3>
                  <p className="text-gray-700">
                    Projet autour de la protection de l’environnement.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">La solution</h3>
                  <p className="text-gray-700">
                    Mise en place de actions concrètes pour réduire l'impact
                    écologique.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Labels décernés</h3>
                  <p className="text-gray-700">
                    Reconnaissances officielles (Label X, Certification Y, etc.)
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Objectifs</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Sensibiliser le grand public</li>
                    <li>Planter 1000 arbres / an</li>
                    <li>Éduquer les plus jeunes</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Liens & Réseaux
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <a
                      href="https://www.exemple-asso.org"
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Site officiel
                    </a>
                  </p>
                  <div className="flex space-x-2">
                    <SocialIcon url="https://twitter.com/exempleAsso" style={{ height: 30, width: 30 }} />
                    <SocialIcon url="https://facebook.com/exempleAsso" style={{ height: 30, width: 30 }} />
                    <SocialIcon url="https://instagram.com/exempleAsso" style={{ height: 30, width: 30 }} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    À quoi serviront les dons ?
                  </h3>
                  <p className="text-gray-700">
                    Financer des outils et du matériel pour le reboisement,
                    soutenir la logistique, etc.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Bouton "En savoir plus" ou "Réduire" tout en bas */}
          <div className="mt-6 flex justify-center">
            {!showMore && (
              <button
                onClick={handleShowMore}
                className="
                  py-2 px-4
                  bg-blue-500
                  text-white
                  font-semibold
                  rounded-full
                  hover:bg-blue-600
                "
              >
                En savoir plus
              </button>
            )}

            {showMore && (
              <button
                onClick={handleShowMore}
                className="
                  py-2 px-4
                  bg-blue-500
                  text-white
                  font-semibold
                  rounded-full
                  hover:bg-blue-600
                "
              >
                Réduire
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export default AssociationDetails