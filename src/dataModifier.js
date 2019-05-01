const _ = require('lodash');

const minimumCount = 1;

const dataModifier = (data) => {
  const newData = [];

  data.forEach(load => {
    if (load.count > minimumCount) {
      newData.push({
        name: load.name,
        count: load.count,
        thumbnail: extractLogUrl(load.logos)
      });
    }
  });

  return newData;
};

const extractLogUrl = (logos) => {
  const firstLogo = _.find(logos, isLogoSizeAcceptable);
  if (firstLogo) {
    return firstLogo.url;
  }

  return '';
};

const isLogoSizeAcceptable = (logo) => {
  // assuming correct format for size string. Further validation possible...
  const parts = logo.size.match(/(\d+)x(\d+)/);
  return parts[1] >= 64 && parts[1] <= 128 && parts[2] >= 64 && parts[2] <= 128;
};

module.exports = dataModifier;
