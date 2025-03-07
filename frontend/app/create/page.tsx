'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PollForm from '@/components/PollForm';
import { Poll } from '@/lib/types';

export default function CreatePoll() {
  const [loading, setLoading] = useState(false);
  const [createdPoll, setCreatedPoll] = useState<Poll | null>(null);
  const router = useRouter();

  const handleCreatePoll = async (pollData: Omit<Poll, 'id' | 'createdAt' | 'createdBy'>) => {
    try {
      setLoading(true);
      // In a real app, you'd get the authenticated user's ID
      const userId = 'current-user-id';
      
      const response = await fetch('/api/polls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...pollData,
          createdBy: userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create poll');
      }

      const data = await response.json();
      setCreatedPoll(data.poll);
    } catch (error) {
      console.error('Error creating poll:', error);
      alert('Failed to create poll. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <Link 
          href="/dashboard" 
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Create a New Poll</h1>

      {createdPoll ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-800 mb-4">Poll Created Successfully!</h2>
          <div className="mb-4">
            <h3 className="font-medium mb-1">Share this link with others to vote:</h3>
            <div className="bg-white p-3 rounded border flex justify-between items-center">
              <span className="font-mono text-sm truncate">
                {`${window.location.origin}/poll/${createdPoll.id}`}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/poll/${createdPoll.id}`);
                  alert('Poll link copied to clipboard!');
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded ml-2 text-sm"
              >
                Copy
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => router.push(`/poll/${createdPoll.id}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              View Poll
            </button>
            <button
              onClick={() => {
                setCreatedPoll(null);
              }}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            >
              Create Another Poll
            </button>
          </div>
        </div>
      ) : (
        <PollForm 
          onSubmit={handleCreatePoll} 
          isSubmitting={loading} 
        />
      )}
    </div>
  );
}
