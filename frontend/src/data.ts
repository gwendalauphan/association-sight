import { CardData, DeveloperInfo } from "./types";

export const cardsData: CardData[] = [
  {
      title: "Futur Association", 
      imageUrl: "futur_association.png",
      imagesCardDetails: [
          { type: 'image', src: 'futur_association.png' },
          {
            type: 'video',
            src: 'https://www.youtube.com/watch?v=oYsq5wjdKUA',
            isYouTube: true
          }, // vidéo YouTube
      ],
      description: "Futur Asso souhaite faire évoluer notre regard sur les animaux et l’écologie en proposant un changement culturel.",
      tags: ["Environnement", "Bien-être animal"],
      details: {
          project: "L'association FUTUR veut faire évoluer notre regard sur les animaux et l’écologie en proposant un changement culturel.",
          solution: "FUTUR appelle à une réflexion écologique plus inclusive, non anthropocentrée, prenant en compte les intérêts des animaux sentients.",
          labels: "",
          goals: [
            "Changer notre regard sur les animaux et comprendre que ce sont des individus.",
            "Faire évoluer notre écologie en y intégrant la problématique liée à l'élevage et à la consommation de viande.",
            "Apporter plus d'empathie et des nouvelles pratiques (mode de vie végétal) à notre humanité.",
          ],
          officialWebsite: "https://www.futur-asso.com/", // Lien site
          socialLinks: [
            "https://www.facebook.com/FuturAssociationOfficiel/",
            "https://www.instagram.com/futur_asso/",
            "https://x.com/Futur_Asso?mx=2",
            "https://www.tiktok.com/@asso_futur",
            "https://www.youtube.com/c/Futur_Asso",
          ],
          donationsUse:
            "Chaque don est essentiel pour promouvoir les droits des animaux, assurer leur protection et encourager des choix alimentaires responsables dans la lutte contre le changement climatique. ",
        },
  },
  {
      title: "Les Enfants de la Balle",
      imageUrl: "les_enfants_de_la_balle.jpg",
      imagesCardDetails: [
          { type: 'image', src: "les_enfants_de_la_balle.jpg"},
          {
            type: 'video',
            src: 'https://www.youtube.com/watch?v=IA74IuCkqm0',
            isYouTube: true
          }, // vidéo YouTube
      ],
      description: "Les Enfants de la Balle facilite l’accès au sport pour les enfants ayant des handicaps invisibles grâce à un système de binôme avec des bénévoles.",
      tags: ["Social", "Inclusion", "Handicap"],
      details: {
          project: "L’association Les Enfants de la Balle a pour objectif de créer une communauté de clubs sportifs inclusifs pour les enfants en situation de handicap.",
          solution: "Nous sensibilisons et formons toutes les parties prenantes du club qui interviennent dans la mise en œuvre de l’inclusion.",
          labels: "Label Solidarité & Inclusion 2022",
          goals: [
            "Rendre le sport accessible au plus grand nombre",
            "Pas à pas vers une société plus inclusive",
            "Jouer ensemble en toute simplicité, dans un club près de chez soi",
          ],
          officialWebsite: "https://www.lesenfantsdelaballe.org",
          socialLinks: [
            "https://www.facebook.com/associationlesenfantsdelaballe",
            "https://fr.linkedin.com/company/les-enfants-de-la-balle-asso",
            "https://www.instagram.com/lesenfantsdelaballeasso/",
            "https://www.youtube.com/@lesenfantsdelaballe9274",
            "https://x.com/EDLB_officiel",
            "https://www.tiktok.com/@lesenfantsdelaballe",
          ],
          donationsUse:
            "Achat de matériel spécialisé, organisation de rencontres sportives inclusives, etc.",
        },
  },
];
  
// Exemple d’objet de configuration
export const developerInfo: DeveloperInfo = {
  name: "Gwendal Auphan",
  linkedInUrl: "https://www.linkedin.com/in/gwendal-auphan/",
  enterpriseName: "Sight",
  enterpriseUrl:"https://www.sight.consulting/",
  
};