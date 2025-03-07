import { NextRequest, NextResponse } from 'next/server';
import { Poll } from '@/lib/types';

// This would be replaced with a real database in a production app
let polls: Poll[] = [];
let votes: { userId: string; pollId: string; optionId: string }[] = [];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const createdBy = searchParams.get('createdBy');
  const votedBy = searchParams.get('votedBy');

  if (createdBy) {
    // Get polls created by a specific user
    const userPolls = polls.filter(poll => poll.createdBy === createdBy);
    return NextResponse.json({ polls: userPolls });
  } 
  
  if (votedBy) {
    // Get polls voted by a specific user
    const userVotes = votes.filter(vote => vote.userId === votedBy);
    const votedPolls = polls
      .filter(poll => userVotes.some(vote => vote.pollId === poll.id))
      .map(poll => {
        const userVote = userVotes.find(vote => vote.pollId === poll.id);
        return {
          ...poll,
          hasVoted: true,
          votedFor: userVote?.optionId
        };
      });
    return NextResponse.json({ polls: votedPolls });
  }

  // Get all polls
  return NextResponse.json({ polls });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, options, createdBy } = body;

    if (!title || !options || options.length < 2 || !createdBy) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newPoll: Poll = {
      id: `poll-${Date.now()}`,
      title,
      description: description || '',
      createdBy,
      createdAt: new Date(),
      options: options.map((option: any) => ({
        id: option.id || `option-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        text: option.text,
        voteCount: 0
      })),
      isActive: true
    };

    polls.push(newPoll);

    return NextResponse.json({ poll: newPoll });
  } catch (error) {
    console.error('Error creating poll:', error);
    return NextResponse.json(
      { error: 'Failed to create poll' },
      { status: 500 }
    );
  }
}

