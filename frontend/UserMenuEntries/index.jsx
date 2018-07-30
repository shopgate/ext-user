import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import Portal from '@shopgate/pwa-common/components/Portal';
import LocalShippingIcon from '@shopgate/pwa-ui-shared/icons/LocalShippingIcon';
import * as portals from './portals';

const USER_ADDRESS_BOOK_PATH = '/user/addresses';

/**
 * @param {Object} props component props
 * @returns {Object|null} JSX
 */
const UserMenuEntries = (props) => {
  const {
    handleClose,
    Item,
    user,
  } = props;

  // Make sure a user is available, when the other elements are set (otherwise that's not gmd)
  if (!user && handleClose) {
    return null;
  }

  return (
    <Fragment>
      {/* Address book */}
      <Portal name={portals.NAV_MENU_ADDRESS_BOOK_BEFORE} props={props} />
      <Portal name={portals.NAV_MENU_ADDRESS_BOOK} props={props}>
        <Item
          title="navigation.address_book"
          href={`${USER_ADDRESS_BOOK_PATH}`}
          link={`${USER_ADDRESS_BOOK_PATH}`}
          icon={LocalShippingIcon}
          close={handleClose}
          testId="menuAddressBookButton"
        >
          <I18n.Text string="navigation.address_book" />
        </Item>
      </Portal>
      <Portal name={portals.NAV_MENU_ADDRESS_BOOK_AFTER} props={props} />
    </Fragment>
  );
};

UserMenuEntries.propTypes = {
  Item: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
  user: PropTypes.shape(),
};

UserMenuEntries.defaultProps = {
  handleClose: null,
  user: null,
};

export default UserMenuEntries;
