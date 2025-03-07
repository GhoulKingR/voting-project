'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Poll, PollWithVoteStatus, Vote } from '@/lib/types';
import PollCard from '@/components/PollCard';
import VoteResults from '@/components/VoteResults';

export default function Dashboard() {
  const [createdPolls, setCreatedPolls] = useState<Poll[]>([]);
  const [votedPolls, setVotedPolls] = useState<PollWithVoteStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        // In a real app, you'd check auth and get the user ID
        const userId = 'current-user-id';
        
        // Fetch polls created by the user
        const createdRes = await fetch(`/api/polls?createdBy=${userId}`);
        const createdData = await createdRes.json();
        
        // Fetch polls voted by the user
        const votedRes = await fetch(`/api/polls?votedBy=${userId}`);
        const votedData = await votedRes.json();
        
        setCreatedPolls(createdData.polls);
        setVotedPolls(votedData.polls);
      } catch (error) {
        console.error('Failed to fetch polls:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading your polls...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Poll Dashboard</h1>
        <Link 
          href="/create" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Create New Poll
        </Link>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Polls You Created</h2>
        {createdPolls.length === 0 ? (
          <p>You haven't created any polls yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {createdPolls.map((poll) => (
              <div key={poll.id} className="border rounded-lg shadow-sm p-4">
                <PollCard poll={poll} />
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Poll Results</h3>
                  <VoteResults poll={poll} />
                </div>
                <div className="mt-4 flex justify-between">
                  <div className="text-sm text-gray-500">
                    Share link: <span className="font-mono text-xs bg-gray-100 p-1 rounded">
                      {`${window.location.origin}/poll/${poll.id}`}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/poll/${poll.id}`);
                      alert('Poll link copied to clipboard!');
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Polls You Voted In</h2>
        {votedPolls.length === 0 ? (
          <p>You haven't voted in any polls yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {votedPolls.map((poll) => (
              <div key={poll.id} className="border rounded-lg shadow-sm p-4">
                <PollCard poll={poll} />
                <div className="mt-2 text-sm">
                  <p>You voted for: <span className="font-medium">
                    {poll.options.find((opt :any) => opt.id === poll.votedFor)?.text}
                  </span></p>
                </div>
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Current Results</h3>
                  <VoteResults poll={poll} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
