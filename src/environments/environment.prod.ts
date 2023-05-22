export const environment = {
  production: true,
  apiUrl: 'https://er7money.herokuapp.com/',
  tokenAllowedDomains: [ new RegExp('er7moneyapi.herokuapp.com') ],
  tokenDisallowedRoutes: [ new RegExp('\/oauth\/token') ]
};
