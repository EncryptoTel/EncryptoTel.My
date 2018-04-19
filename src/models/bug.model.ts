export interface BugModel {
  issues: Bug[];
}

export interface Bug {
  claim_exists: number;
  claims: number;
  kind_id: number;
  votes: number;
  vote_exists: number;
  comments: number;
  id: number;
  description: string;
  user: User;
  status: Status;
  summary: string;
  tags: Tag[];
  kind: number;
}

interface User {
  email: string;
  deleted_at: string;
  hash: string;
}

interface Status {
  name: string;
  is_closed: number;
  issues: number;
  id: number;
}

interface Tag {
  name: string;
}

export interface Tags {
  tags: Tag[];
}

export interface BugReview {
  claim_exists: number;
  claims: number;
  comments: Comments[];
  description: string;
  id: number;
  status: Status;
  summary: string;
  user: User;
  votes: number;
  vote_exists: number;
}

interface Comments {
  id: number;
  comment: string;
  user: User;
}

export interface Statuses {
  all: number;
  my: number;
  statuses: Status[];
}
