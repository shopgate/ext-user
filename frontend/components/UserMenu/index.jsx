import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
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
    handleClose,
    Headline,
    Item,
    List,
    SubHeader,
    isLoggedIn,

    // Rename config variables for convenience
    userMenuEntries: {
      accountProfile: displayAccountProfileMenuItem = true,
      addressBook: displayAddressBookMenuItem = true,
    } = {},
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
      <Divider close={handleClose} />
      <Headline small text="navigation.your_account" />
      <SubHeader title="navigation.your_account" />

      {/* Address book */}
      <Portal name={portals.NAV_MENU_ADDRESS_BOOK_BEFORE} props={props} />
      <Portal name={portals.NAV_MENU_ADDRESS_BOOK} props={props}>
        <List>
          {displayAccountProfileMenuItem &&
            <Item
              title="navigation.profile"
              href={path.USER_PROFILE_PATH}
              link={path.USER_PROFILE_PATH}
              icon={AccountBoxIcon}
              close={handleClose}
              testId="menuProfileButton"
            >
              <I18n.Text string="navigation.profile" />
            </Item>
          }
          {displayAddressBookMenuItem &&
            <Item
              title="navigation.address_book"
              href={path.USER_ADDRESS_BOOK_PATH}
              link={path.USER_ADDRESS_BOOK_PATH}
              icon={LocalShippingIcon}
              close={handleClose}
              testId="menuAddressBookButton"
            >
              <I18n.Text string="navigation.address_book" />
            </Item>
          }
        </List>
      </Portal>
      <Portal name={portals.NAV_MENU_ADDRESS_BOOK_AFTER} props={props} />

      {/* Hide duplicated bottom header before logout menu entry (ios)*/}
      <Helmet
        style={[{
            cssText: '[data-test-id="userMenu"] h2 {display: none}',
        }]}
      />

    </Fragment>
  );
};

UserMenu.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  Item: PropTypes.func.isRequired,
  Divider: PropTypes.func,
  handleClose: PropTypes.func,
  Headline: PropTypes.func,
  List: PropTypes.func,
  SubHeader: PropTypes.func,
  userMenuEntries: PropTypes.shape({
    accountProfile: PropTypes.bool,
    addressBook: PropTypes.bool,
  }),
};

UserMenu.defaultProps = {
  handleClose: null,
  Divider: () => (null), // Skip render by default
  Headline: () => (null), // Skip render by default
  // eslint-disable-next-line react/prop-types
  List: ({ children }) => (<Fragment>{children}</Fragment>), // Pass through by default
  SubHeader: () => (null), // Skip render by default
  userMenuEntries: {},
};

export default connect(UserMenu);
