import ReactGA from 'react-ga4';

export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (measurementId) {
    ReactGA.initialize(measurementId);
  } else {
    console.warn('Google Analytics Measurement ID is missing. Analytics not initialized.');
  }
};

export const logPageView = () => {
  if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
  }
};
