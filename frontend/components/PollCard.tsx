import { Poll } from '@/lib/types';

interface PollCardProps {
  poll: Poll;
}

export default function PollCard({ poll }: PollCardProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold">{poll.title}</h3>
      <p className="text-gray-600 mt-1">{poll.description}</p>
      <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
        <span>
          {poll.options.reduce((sum, option) => sum + option.voteCount, 0)} votes
        </span>
        <span>
          Created {new Date(poll.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

