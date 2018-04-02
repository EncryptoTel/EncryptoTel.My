interface AccoutModel {
  account: Account;
}

interface Account {
  email: string;
  profile: Profile;

}

interface Profile {
  firstname: string;
  language_id: number;
  lastname: string;
  new_comments: number;
  status_updates: number;
}
