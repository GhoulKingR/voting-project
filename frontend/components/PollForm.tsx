import { useState } from 'react';
import { Poll } from '@/lib/types';

interface PollFormProps {
  onSubmit: (pollData: Omit<Poll, 'id' | 'createdAt' | 'createdBy'>) => void;
  isSubmitting: boolean;
}

export default function PollForm({ onSubmit, isSubmitting }: PollFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['', '']);
  
  const addOption = () => {
    setOptions([...options, '']);
  };
  
  const removeOption = (index: number) => {
    if (options.length <= 2) return;
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };
  
  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim()) {
      alert('Please enter a poll title');
      return;
    }
    
    if (options.filter(opt => opt.trim()).length < 2) {
      alert('Please provide at least two valid options');
      return;
    }
    
    // Create poll data
    const pollData: Omit<Poll, 'id' | 'createdAt' | 'createdBy'> = {
      title: title.trim(),
      description: description.trim(),
      options: options
        .filter(opt => opt.trim())
        .map((text, index) => ({
          id: `option-${index}`,
          text: text.trim(),
          voteCount: 0
        })),
      isActive: true
    };
    
    onSubmit(pollData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block font-medium mb-1">
          Poll Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="Ask a question..."
          required
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block font-medium mb-1">
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="Provide additional context..."
          rows={3}
        />
      </div>
      
      <div>
        <label className="block font-medium mb-2">
          Poll Options *
        </label>
        <div className="space-y-3">
          {options.map((option, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                className="flex-1 p-2 border rounded-lg"
                placeholder={`Option ${index + 1}`}
                required
              />
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="text-red-600 hover:text-red-800 px-2"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        
        <button
          type="button"
          onClick={addOption}
          className="mt-3 text-blue-600 hover:text-blue-800"
        >
          + Add another option
        </button>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`
          w-full py-2 rounded-lg text-white font-medium
          ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}
        `}
      >
        {isSubmitting ? 'Creating Poll...' : 'Create Poll'}
      </button>
    </form>
  );
}
