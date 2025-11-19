let baseUrl = 'http://localhost:5000/api';

if (window.location.host === 'aquarium-admin-dev.falconweb.app') {
  baseUrl = 'https://aquarium-api-dev.falconweb.app/api';
} else if (
  window.location.host === 'aquarium-admin-qa.falconweb.app'
) {
  baseUrl = 'https://aquarium-api-qa.falconweb.app/api';
} else if (
  window.location.host === 'aquarium-admin-staging.falconweb.app'
) {
  baseUrl = 'https://aquarium-api-staging.falconweb.app/api';
} else if (window.location.host === 'app.aquariumservicepro.com') {
  baseUrl = 'https://api.aquariumservicepro.com/api';
}

const genMediaUrl = (url) => {
  if (url) {
    return baseUrl.replace('/api', '/') + url;
  }
  return null;
};

module.exports = { baseUrl, genMediaUrl };
