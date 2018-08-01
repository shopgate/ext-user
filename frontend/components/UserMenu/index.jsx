import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import Portal from '@shopgate/pwa-common/components/Portal';
import LocalShippingIcon from '@shopgate/pwa-ui-shared/icons/LocalShippingIcon';
import * as portals from '../../constants/Portals';
import { USER_ADDRESS_BOOK_PATH } from '../../constants/RoutePaths';

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
    user,
  } = props;

  // Make sure a user is available of whom account data could be shown
  if (!user) {
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
        </List>
      </Portal>
      <Portal name={portals.NAV_MENU_ADDRESS_BOOK_AFTER} props={props} />
    </Fragment>
  );
};

UserMenu.propTypes = {
  Item: PropTypes.func.isRequired,
  Divider: PropTypes.func,
  handleClose: PropTypes.func,
  Headline: PropTypes.func,
  List: PropTypes.func,
  SubHeader: PropTypes.func,
  user: PropTypes.shape(),
};

UserMenu.defaultProps = {
  handleClose: null,
  Divider: () => (null), // Skip render by default
  Headline: () => (null), // Skip render by default
  // eslint-disable-next-line react/prop-types
  List: ({ children }) => (<Fragment>{children}</Fragment>), // Pass through by default
  SubHeader: () => (null), // Skip render by default
  user: null,
};

export default UserMenu;
