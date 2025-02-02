import { useState, FormEvent } from "react"
import { CardData } from "./types"
import { SocialIcon } from "react-social-icons";
import { submitVote, VotePayload } from "./Vote";


interface AssociationDetailsProps {
    onClose: () => void;
    cardData: CardData;
    onPrev?: () => void;
    onNext?: () => void;
  }

function convertYouTubeUrlToEmbed(url: string) {
  // Méthode simple : récupérer la partie après "v="
  const videoId = url.split('v=')[1];
  // Parfois, il y a un "&" ensuite pour d’autres paramètres
  const ampersandPosition = videoId.indexOf('&');
  const cleanVideoId =
    ampersandPosition !== -1
      ? videoId.substring(0, ampersandPosition)
      : videoId;

  return `https://www.youtube.com/embed/${cleanVideoId}`;
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

    // Gestion du clic sur “Soutenir gratuitement”
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      // Réinitialiser les messages
      setErrorMessage("");
      setSuccessMessage("");

      // Vérifier que username est renseigné
      if (!username.trim()) {
        setErrorMessage("Veuillez renseigner votre username");
        return;
      }

      //Create a popup to confirm the vote and say that you can only vote once
      if (confirm("Voulez-vous vraiment voter pour cette association ? Vous ne pourrez voter qu'une seule fois.")) {
        console.log("You pressed OK!");
      } else {
        console.log("You pressed Cancel!");
        return;
      }
      

      // Construire le payload à envoyer
      const payload: VotePayload = {
        title,
        username,
        // Ajout email seulement s'il existe
        ...(email.trim() ? { email: email.trim() } : {}),
        // Ajout petitMot seulement si tu veux l'envoyer
        ...(petitMot.trim() ? { petitMot: petitMot.trim() } : {}),
      };

      // Appel à la fonction externe
      const result = await submitVote(payload);

      if (result.success) {
        setSuccessMessage("Votre vote a bien été pris en compte.");
      } else {
        setErrorMessage(result.error);
      }
    };

    const {
      title,
      imagesCardDetails,
      description,
      tags,
      details,
    } = cardData;
    
  
    const handleShowMore = () => {
      setShowMore(!showMore);
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
            overflow-y-auto   /* Active le scroll sur l'arrière-plan */
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
          <div className="sticky top-0 left-4 flex space-x-2 font-semibold mb-2 p-2 z-10">
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
              z-20
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
                `}
                >
                {imagesCardDetails.map((media, idx) => {
                      if (media.type === 'image') {
                        // Cas image
                        return (
                          <img
                            key={idx}
                            src={media.src}
                            alt={`Media ${idx}`}
                            className="w-full h-full object-cover rounded"
                          />
                        );
                      } else if (media.type === 'video') {
                        // Cas vidéo
                        if (media.isYouTube) {
                          // Vidéo YouTube => iframe ou composant dédié
                          // Pour utiliser l'embed, il faut transformer l'URL
                          // en https://www.youtube.com/embed/{VIDEO_ID}

                          // Option la plus simple si tu stockes déjà l'URL embed :
                          // <iframe src={media.src} ... />

                          return (
                            <iframe
                              key={idx}
                              className="w-full h-full rounded"
                              src={convertYouTubeUrlToEmbed(media.src)}
                              allowFullScreen
                              title={`YouTube video ${idx}`}
                            />
                          );
                        } else {
                          // Vidéo locale => <video>
                          return (
                            <video
                              key={idx}
                              src={media.src}
                              controls
                              className="w-full h-full object-cover rounded"
                            />
                          );
                        }
                      }
                      return null;
                    })}
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
                    {/* Le projet */}
                    <div>
                      <h3 className="text-black text-lg font-semibold mb-2">Le projet</h3>
                      <p className="text-gray-700">
                        {details?.project}
                      </p>
                    </div>

                    {/* La solution */}
                    <div>
                      <h3 className="text-black text-lg font-semibold mb-2">La solution</h3>
                      <p className="text-gray-700">
                        {details?.solution}
                      </p>
                    </div>

                    {/* Labels décernés */}
                    <div className={details?.labels ? "" : "hidden"}>
                      <h3 className="text-black text-lg font-semibold mb-2">Labels décernés</h3>
                      <p className="text-gray-700">
                        {details?.labels}
                      </p>
                    </div>

                    {/* Objectifs */}
                    <div>
                      <h3 className="text-black text-lg font-semibold mb-2">Objectifs</h3>
                      <ul className="list-disc list-inside text-gray-700">
                        {details?.goals?.map((goal) => (
                          <li key={goal}>{goal}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Liens & Réseaux */}
                    <div>
                      <h3 className="text-black text-lg font-semibold mb-2">Liens & Réseaux</h3>
                      {/* Site officiel */}
                      <p className="text-gray-700 mb-2">
                        <a
                          href={details?.officialWebsite}
                          className="text-blue-600 underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Site officiel
                        </a>
                      </p>

                      {/* Réseaux sociaux */}
                      <div className="flex space-x-2">
                        {details?.socialLinks?.map((socialUrl) => (
                          <SocialIcon
                            key={socialUrl}
                            url={socialUrl}
                            style={{ height: 30, width: 30 }}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        ))}
                      </div>
                    </div>

                    {/* À quoi serviront les dons ? */}
                    <div>
                      <h3 className="text-black text-lg font-semibold mb-2">
                        À quoi serviront les dons ?
                      </h3>
                      <p className="text-gray-700">
                        {details?.donationsUse}
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