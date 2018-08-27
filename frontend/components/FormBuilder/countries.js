import iso3166 from '@shopgate/user/common/iso-3166-2';

/** @type {{countryCodes: string}} */
import config from '@shopgate/user/config';

const countries = config.countryCodes.split(',');

export default countries
  // Map to full country information
  .map(countryCode => ({
    [countryCode]: iso3166[countryCode],
  }))
  // Combine countries together to 1 object
  .reduce((reducer, country) => ({
    ...reducer,
    ...country,
  }), {});