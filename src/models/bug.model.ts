export interface BugModel {
  issues: Bug[];
}

export interface Bug {
  comments: number;
  votes: number;
  id: number;
  description: string;
  user: User;
  status: Status;
  summary: string;
  tags: Tag[];
}

interface User {
  email: string;
  deleted_at: string;
  hash: string;
}

interface Status {
  name: string;
  is_closed: number;
  issues: number
}

interface Tag {
  name: string;
}

export interface Tags {
  tags: Tag[];
}

export interface BugReview {
  comments: Comments[];
  description: string;
  id: number;
  status: Status;
  summary: string;
  user: User;
  votes: number;
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
