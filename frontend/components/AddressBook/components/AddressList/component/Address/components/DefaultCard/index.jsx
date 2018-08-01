import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@shopgate/pwa-common/components/Grid';
import TickIcon from '@shopgate/pwa-ui-shared/icons/TickIcon';
import I18n from '@shopgate/pwa-common/components/I18n';
import style from './style';

/**
 * Render a card to show if address is default
 * @param {string} tag for default address
 * @param {bool} isDefault is default
 * @param {function} setAsDefault set as default handler
 * @param {bool} underline has underline or not
 * @constructor
 */
const DefaultCard = ({
  tag, isDefault, setAsDefault, underline,
}) => (
  <div className={underline ? style.underline : null}>
    {isDefault &&
      <Grid className={style.defaultAddress}>
        <Grid.Item grow={1}>
          <I18n.Text string={`addresses.defaults.${tag}`} />
        </Grid.Item>
        <Grid.Item grow={0} className={style.doneIcon}>
          <TickIcon size={24} />
        </Grid.Item>
      </Grid>
    }
    {!isDefault &&
      <div
        className={style.setDefaultAddress}
        onClick={setAsDefault}
        aria-hidden
      >
        <I18n.Text string={`addresses.setAsDefault.${tag}`} />
      </div>
    }
  </div>
);

DefaultCard.propTypes = {
  isDefault: PropTypes.bool.isRequired,
  setAsDefault: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
  underline: PropTypes.bool.isRequired,
};

export default DefaultCard;
