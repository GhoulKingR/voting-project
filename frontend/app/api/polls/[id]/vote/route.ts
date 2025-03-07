import { NextRequest, NextResponse } from 'next/server';
import { Poll } from '@/lib/types';

// This would be a database query in a real app
// Using the polls and votes arrays from the previous files
declare const polls: Poll[];
declare const votes: { userId: string; pollId: string; optionId: string }[];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const pollId = params.id;
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { error: 'User ID is required' },
      { status: 400 }
    );
  }

  const vote = votes.find(v => v.pollId === pollId && v.userId === userId);

  return NextResponse.json({ vote });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pollId = params.id;
    const body = await request.json();
    const { userId, optionId } = body;

    if (!userId || !optionId) {
      return NextResponse.json(
        { error: 'User ID and option ID are required' },
        { status: 400 }
      );
    }

    const poll = polls.find(p => p.id === pollId);
    if (!poll) {
      return NextResponse.json(
        { error: 'Poll not found' },
        { status: 404 }
      );
    }

    // Check if the option exists in the poll
    const option = poll.options.find((opt: any) => opt.id === optionId);
    if (!option) {
      return NextResponse.json(
        { error: 'Invalid option ID' },
        { status: 400 }
      );
    }

    // Check if the user has already voted
    // const existingVote = votes.find(v => v.pollId ===
  } catch (error) {
    console.error('Error creating poll:', error);
    return NextResponse.json(
      { error: 'Failed to create poll' },
      { status: 500 }
    );
  }
}
