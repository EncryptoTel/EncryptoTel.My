export interface AccountModel {
  account: Account;
}

interface Account {
  hash: string;
  email: string;
  profile: Profile;
}

export interface Profile {
  firstname: string;
  language_id: number;
  lastname: string;
  new_comments: number;
  status_updates: number;
}
