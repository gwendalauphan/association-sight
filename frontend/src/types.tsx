export interface MediaItem {
  type: 'image' | 'video';
  src: string; // pour l'URL ou le chemin local
  isYouTube?: boolean; // optionnel si on veut préciser que c’est une vidéo YouTube
}

export interface CardDetails {
  project: string;
  solution: string;
  labels: string;
  goals: string[];
  officialWebsite: string;
  socialLinks: string[];
  donationsUse: string;
}

export interface CardData {
  title: string;
  imageUrl: string;
  imagesCardDetails: MediaItem[]; // on renomme éventuellement en mediaCardDetails
  description: string;
  tags: string[];
  details?: CardDetails; // Peut être optionnel (?) si toutes les cartes n’ont pas de détails
}


// Exemple d'interface (optionnelle)
export interface DeveloperInfo {
  name: string;
  linkedInUrl: string;
  enterpriseUrl: string;
  enterpriseName: string;
}