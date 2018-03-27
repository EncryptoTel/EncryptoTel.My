export const environment = {
  production: false,
  api_url: 'http://api_url',
  navigation: [
    {link: 'dashboard', value: 'Dashboard', visible: true, available: true},
    {link: 'transactions', value: 'Transactions', visible: true, available: true},
    {link: 'swap', value: 'Swap service', visible: true, available: true},
    {link: 'voting', value: 'Voting', visible: true, available: false},
    {link: 'bugs', value: 'Bugs', visible: true, available: true},
    {link: 'bonuses', value: 'Bonuses', visible: true, available: true},
    {link: 'roadmap', value: 'Roadmap', visible: true, available: true}
  ]
};
