// lib/types.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface PollOption {
  id: string;
  text: string;
  voteCount: number;
}

export interface Poll {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  options: PollOption[];
  isActive: boolean;
}

export interface Vote {
  id: string;
  pollId: string;
  userId: string;
  optionId: string;
  votedAt: Date;
}

export type PollWithVoteStatus = Poll & {
  hasVoted: boolean;
  votedFor?: string;
};
