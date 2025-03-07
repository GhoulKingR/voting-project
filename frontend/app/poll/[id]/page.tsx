'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Poll, Vote } from '@/lib/types';
import VoteResults from '@/components/VoteResults';

export default function PollPage() {
  const { id } = useParams();
  const router = useRouter();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userVote, setUserVote] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/polls/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Poll not found');
            return;
          }
          throw new Error('Failed to fetch poll');
        }
        
        const data = await response.json();
        setPoll(data.poll);
        
        // Check if user has already voted
        // In a real app, you'd check auth and get the real user ID
        const userId = 'current-user-id';
        const voteResponse = await fetch(`/api/polls/${id}/vote?userId=${userId}`);
        if (voteResponse.ok) {
          const voteData = await voteResponse.json();
          if (voteData.vote) {
            setUserVote(voteData.vote.optionId);
          }
        }
      } catch (error) {
        console.error('Error fetching poll:', error);
        setError('Failed to load the poll. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPoll();
    }
  }, [id]);

  const handleVote = async () => {
    if (!selectedOption) return;
    
    try {
      setSubmitting(true);
      // In a real app, you'd get the authenticated user's ID
      const userId = 'current-user-id';
      
      const response = await fetch(`/api/polls/${id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          optionId: selectedOption,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit vote');
      }

      // Update local state to reflect the vote
      setUserVote(selectedOption);
      
      // Refetch poll to get updated vote counts
      const pollResponse = await fetch(`/api/polls/${id}`);
      const pollData = await pollResponse.json();
      setPoll(pollData.poll);
      
    } catch (error) {
      console.error('Error submitting vote:', error);
      alert('Failed to submit your vote. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading poll...</div>;
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-4">{error}</h2>
          <Link 
            href="/dashboard" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded inline-block"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!poll) {
    return <div className="text-center p-8">Poll not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Link 
        href="/dashboard" 
        className="text-blue-600 hover:text-blue-800 inline-block mb-6"
      >
        ← Back to Dashboard
      </Link>

      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">{poll.title}</h1>
        <p className="text-gray-600 mb-6">{poll.description}</p>

        {userVote ? (
          <div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800">
                You voted for:{' '}
                <span className="font-semibold">
                  {poll.options.find(opt => opt.id === userVote)?.text}
                </span>
              </p>
            </div>
            
            <h2 className="text-xl font-semibold mb-4">Current Results</h2>
            <VoteResults poll={poll} highlightedOption={userVote} />
            
            <button
              onClick={() => {
                // Copy the poll URL to clipboard
                navigator.clipboard.writeText(window.location.href);
                alert('Poll link copied to clipboard!');
              }}
              className="mt-6 text-blue-600 hover:text-blue-800 text-sm flex items-center"
            >
              Share this poll with others
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Cast Your Vote</h2>
            <div className="space-y-3 mb-6">
              {poll.options.map((option: any) => (
                <div 
                  key={option.id} 
                  className={`
                    border rounded-lg p-4 cursor-pointer transition
                    ${selectedOption === option.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'}
                  `}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <div className="flex items-center">
                    <div className={`
                      w-5 h-5 mr-3 rounded-full border flex items-center justify-center
                      ${selectedOption === option.id 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300'}
                    `}>
                      {selectedOption === option.id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-lg">{option.text}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={handleVote}
              disabled={!selectedOption || submitting}
              className={`
                w-full py-3 rounded-lg text-white font-medium
                ${!selectedOption || submitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'}
              `}
            >
              {submitting ? 'Submitting...' : 'Submit Vote'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
