import { useState, useEffect } from 'react';

export function CountVote(){
    const API_URL = import.meta.env.VITE_API_URL;
    const COUNT_VOTE_URL = `${API_URL}/count-vote`

    const [voteCount, setVoteCount] = useState<number | null>(null);

    const fetchVoteCount = async () => {
        try {
            const response = await fetch(COUNT_VOTE_URL);
            const data = await response.json();
            setVoteCount(data.count);
        } catch (error) {
            console.error('Error fetching vote count:', error);
        }
    };

    useEffect(() => {
        fetchVoteCount();
        const interval = setInterval(fetchVoteCount, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='text-gray-800 font-semibold'>
            A voté: {voteCount !== null ? voteCount + " personnes" : 'Chargement...'}
        </div>
    );
}


export interface VotePayload {
    title: string;
    username: string;
    email?: string;
    petitMot?: string;
}

export async function submitVote(
    payload: VotePayload,
  ): Promise<{ success: true } | { success: false; error: string }> {

    const API_URL = import.meta.env.VITE_API_URL;
    const SUBMIT_VOTE_URL = `${API_URL}/submit-vote`
    try {
      const response = await fetch(SUBMIT_VOTE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      if (response.ok) {
        // Succès
        return { success: true };
      } else {
        // On tente de récupérer le message d'erreur renvoyé par l'API
        const errorData = await response.json().catch(() => ({}));
        const apiErrorMsg =
          errorData?.message ||
          "Une erreur est survenue lors de la soumission.";
        return { success: false, error: apiErrorMsg };
      }
    } catch (error) {
      // Erreur réseau ou autre
      return {
        success: false,
        error: "Impossible de contacter le serveur. Réessayez plus tard.",
      };
    }
  }

export default CountVote;