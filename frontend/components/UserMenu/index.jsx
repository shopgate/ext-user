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
    Section,
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

  /**
   * @type {Section} @shopgate/pwa-ui-material/NavDrawer/components/Section
   */
  return (
    <Fragment>
      <Portal name={portals.NAV_MENU_USER_MENU_BEFORE} props={props} />
      <Portal name={portals.NAV_MENU_USER_MENU} props={props}>
        <Section title="navigation.your_account">
          {/* Address book */}
          <Portal name={portals.NAV_MENU_ACCOUNT_PROFILE_BEFORE} props={props} />
          <Portal name={portals.NAV_MENU_ACCOUNT_PROFILE} props={props}>
            {displayAccountProfileMenuItem &&
              <Section.Item
                label="navigation.profile"
                onClick={navigate(path.USER_PROFILE_PATH, 'navigation.profile')}
                icon={AccountBoxIcon}
                testId="menuProfileButton"
              >
                <I18n.Text string="navigation.profile" />
              </Section.Item>
            }
          </Portal>
          <Portal name={portals.NAV_MENU_ACCOUNT_PROFILE_AFTER} props={props} />
          <Portal name={portals.NAV_MENU_ADDRESS_BOOK_BEFORE} props={props} />
          <Portal name={portals.NAV_MENU_ADDRESS_BOOK} props={props}>
            {displayAddressBookMenuItem &&
              <Section.Item
                label="navigation.address_book"
                onClick={navigate(path.USER_ADDRESS_BOOK_PATH, 'navigation.address_book')}
                icon={LocalShippingIcon}
                testId="menuAddressBookButton"
              >
                <I18n.Text string="navigation.address_book" />
              </Section.Item>
            }
          </Portal>
          <Portal name={portals.NAV_MENU_ADDRESS_BOOK_AFTER} props={props} />
        </Section>
      </Portal>
      <Portal name={portals.NAV_MENU_USER_MENU_AFTER} props={props} />
    </Fragment>
  );
};

UserMenu.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  navigate: PropTypes.func.isRequired,
  Section: PropTypes.func.isRequired,
  userMenuEntries: PropTypes.shape({
    accountProfile: PropTypes.bool,
    addressBook: PropTypes.bool,
  }),
};

UserMenu.defaultProps = {
  userMenuEntries: {},
};

export default connect(UserMenu);
