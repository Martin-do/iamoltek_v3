import ReactGA from 'react-ga4';

export const initGA = () => {
  // Using the actual Measurement ID you provided
  ReactGA.initialize('G-0J08ZTPRQH');
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
};
