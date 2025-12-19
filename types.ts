export interface ImageData {
  id: string;
  url: string; // Base64 for this demo
  name: string;
  votesYes: number;
  votesNo: number;
}

export interface Session {
  id: string;
  createdAt: number;
  images: ImageData[];
  creatorId?: string;
  isActive: boolean;
}

export interface Vote {
  sessionId: string;
  imageId: string;
  type: VoteType;
  timestamp: number;
}

export enum VoteType {
  YES = "YES",
  NO = "NO",
}
