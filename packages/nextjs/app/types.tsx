export type Session = {
  id: string;
  title: string;
  gateNFT: string;
  streamLink: string;
  difficulty5: string;
  difficulty10: string;
  difficulty15: string;
  difficulty20: string;
  votes1: number;
  votes2: number;
  votes3: number;
  votes4: number;
  created_at: number;
};

export type Poll = {
  id: string;
  title: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  votes1: number;
  votes2: number;
  votes3: number;
  votes4: number;
  created_at: number;
};

export const POLL_EXPIRY = 45 * 1000; // Expire polls after 3 months