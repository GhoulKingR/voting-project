import { NextRequest, NextResponse } from 'next/server';
import { Poll } from '@/lib/types';

// This would be a database query in a real app
// Using the polls array from the previous file
declare const polls: Poll[];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const pollId = params.id;
  const poll = polls.find(p => p.id === pollId);

  if (!poll) {
    return NextResponse.json(
      { error: 'Poll not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ poll });
}
