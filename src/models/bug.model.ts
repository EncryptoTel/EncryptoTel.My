export interface BugModel {
  data: Bug[];
}

export interface Bug {
  claim_exists: number;
  claims_count: number;
  comments_count: number;
  description: string;
  id: number;
  kind_id: number;
  priority: Priority;
  status: Status;
  summary: string;
  user: User;
  vote_exists: number;
  votes_count: number;
}

interface User {
  email: string;
  is_admin: number;
  hash: string;
}

interface Status {
  id: number;
  is_closed: number;
  name: string;
  issues?: number;
}

interface Tag {
  name: string;
}

export interface Tags {
  tags: Tag[];
}

export interface BugReview {
  claim_exists: number;
  claims_count: number;
  comments: Comments[];
  created_at: string;
  description: string;
  id: number;
  kind_id: number;
  priority: Priority;
  status: Status;
  summary: string;
  user: User;
  vote_exists: number;
  votes_count: number;
}

export interface Comments {
  claim_exists: number;
  claims: number;
  comment: string;
  created_at: string;
  id: number;
  status: null;
  user: User;
}

export interface Statuses {
  all: number;
  my: number;
  statuses: Status[];
}

export interface Priority {
  name: string;
}
