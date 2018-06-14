import iso3166 from './../../common/iso-3166-2';
/** @type {{countryCodes: string}} */
import config from './../config';

const countries = config.countryCodes.split(',');

export default (Object.keys(iso3166).reduce((reducer, countryCode) => {
  if (!countries.includes(countryCode)) {
    return reducer;
  }
  return {
    ...reducer,
    [countryCode]: {
      ...iso3166[countryCode],
      hideProvince: countryCode === 'DE',
    },
  };
}, {})
);
