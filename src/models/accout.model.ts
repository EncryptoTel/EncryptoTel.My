export interface AccountModel {
  account: Account;
}

interface Account {
  hash: string;
  email: string;
  profile: Profile;
  is_admin: number;
  wallets: Wallets;
}

export interface Profile {
  firstname: string;
  language_id: number;
  lastname: string;
  new_comments: number;
  status_updates: number;
  timezone: number;
}

export interface Wallets {
  address: string;
  kind: string;
  assets: any[];
}
