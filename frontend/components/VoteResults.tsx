import { Poll } from '@/lib/types';

interface VoteResultsProps {
  poll: Poll;
  highlightedOption?: string;
}

export default function VoteResults({ poll, highlightedOption }: VoteResultsProps) {
  const totalVotes = poll.options.reduce((sum, option) => sum + option.voteCount, 0);
  
  return (
    <div className="space-y-3">
      {poll.options.map((option) => {
        const percentage = totalVotes > 0 
          ? Math.round((option.voteCount / totalVotes) * 100) 
          : 0;
        
        return (
          <div key={option.id} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className={highlightedOption === option.id ? "font-medium" : ""}>
                {option.text}
              </span>
              <span>
                {option.voteCount} vote{option.voteCount !== 1 ? 's' : ''} ({percentage}%)
              </span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  highlightedOption === option.id ? 'bg-blue-600' : 'bg-blue-400'
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        );
      })}
      <div className="text-xs text-gray-500 pt-1">
        Total votes: {totalVotes}
      </div>
    </div>
  );
}

