import { useState, useEffect } from 'react';

function CountVote(){
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
        <div className='mt-2 text-md text-gray-800 font-semibold'>
            A voté: {voteCount !== null ? voteCount + " personnes" : 'Chargement...'}
        </div>
    );
}

export default CountVote;