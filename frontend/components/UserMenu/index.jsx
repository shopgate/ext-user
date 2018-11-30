import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import Portal from '@shopgate/pwa-common/components/Portal';
import AccountBoxIcon from '@shopgate/pwa-ui-shared/icons/AccountBoxIcon';
import LocalShippingIcon from '@shopgate/pwa-ui-shared/icons/LocalShippingIcon';
import * as portals from '../../constants/Portals';
import * as path from '../../constants/RoutePaths';
import connect from './connector';

/**
 * @param {Object} props component props
 * @returns {JSX}
 */
const UserMenu = (props) => {
  const {
    Divider,
    Headline,
    Item,
    isLoggedIn,

    // Rename config variables for convenience
    userMenuEntries: {
      accountProfile: displayAccountProfileMenuItem = true,
      addressBook: displayAddressBookMenuItem = true,
    } = {},
    navigate,
  } = props;

  // Make sure a user is available of whom account data could be shown
  if (!isLoggedIn) {
    return null;
  }

  // Check if any menu entries are there to be displayed
  if (!displayAccountProfileMenuItem && !displayAddressBookMenuItem) {
    return null;
  }

  return (
    <Fragment>
      <Divider />
      <Headline small text="navigation.your_account" />
      {/* @REFACTOR <SubHeader title="navigation.your_account" /> */}

      {/* Address book */}
      <Portal name={portals.NAV_MENU_ADDRESS_BOOK_BEFORE} props={props} />
      <Portal name={portals.NAV_MENU_ADDRESS_BOOK} props={props}>
          {displayAccountProfileMenuItem &&
          <Item
            label="navigation.profile"
            onClick={navigate(path.USER_PROFILE_PATH, 'navigation.profile')}
            icon={AccountBoxIcon}
            testId="menuProfileButton"
          >
            <I18n.Text string="navigation.profile" />
          </Item>
          }
          {displayAddressBookMenuItem &&
          <Item
            label="navigation.address_book"
            onClick={navigate(path.USER_ADDRESS_BOOK_PATH, 'navigation.address_book')}
            icon={LocalShippingIcon}
            testId="menuAddressBookButton"
          >
            <I18n.Text string="navigation.address_book" />
          </Item>
          }
      </Portal>
      <Portal name={portals.NAV_MENU_ADDRESS_BOOK_AFTER} props={props} />
    </Fragment>
  );
};

UserMenu.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  Item: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  Divider: PropTypes.func,
  Headline: PropTypes.func,
  userMenuEntries: PropTypes.shape({
    accountProfile: PropTypes.bool,
    addressBook: PropTypes.bool,
  }),
};

UserMenu.defaultProps = {
  userMenuEntries: {},
  Divider: () => null,
  Headline: () => null,
};

export default connect(UserMenu);
