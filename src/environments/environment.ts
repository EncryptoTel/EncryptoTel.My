export const environment = {
  production: false,
  api_url: 'http://investor.loc/api',
  site_url: 'http://investor-front-dev.encry.ru',
  waves_api_url: 'https://nodes.wavesnodes.com',
  waves_api_dev: 'https://testnode1.wavesnodes.com',
  eth_api_url: 'https://api.etherscan.io/api',
  swap_url: 'https://swap.encryptotel.com',
  navigation: [
    {link: 'dashboard', value: 'Dashboard', visible: true, available: true},
    {link: 'transactions', value: 'Transactions', visible: true, available: true},
    {link: 'swap', value: 'Swap service', visible: true, available: true},
    {link: 'voting', value: 'Voting', visible: true, available: false},
    {link: 'bugs', value: 'Bugs', visible: true, available: true},
    {link: 'bonuses', value: 'Bonuses', visible: true, available: true},
    {link: 'roadmap', value: 'Roadmap', visible: true, available: true}
  ],
  copyright: '© Encrypto Telecom, 2018'
};
