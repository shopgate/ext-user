import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import Portal from '@shopgate/pwa-common/components/Portal';
import LocalShippingIcon from '@shopgate/pwa-ui-shared/icons/LocalShippingIcon';
import * as portals from '../../constants/Portals';
import { USER_ADDRESS_BOOK_PATH } from '../../constants/RoutePaths';

/**
 * @param {function} Item The Component to be used as address book menu entry
 * @param {function} handleClose Function to be called, when the Item element is clicked
 * @returns {JSX}
 */
const AddressBookItem = ({ Item, handleClose }) => (
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
);

AddressBookItem.propTypes = {
  Item: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
};

AddressBookItem.defaultProps = {
  handleClose: null,
};

/**
 * @param {Object} props component props
 * @returns {JSX}
 */
const UserMenu = (props) => {
  const {
    handleClose,
    Headline,
    Item,
    List,
    user,
  } = props;

  // Make sure a user is available, when the other elements are set (otherwise that's not gmd)
  if (!user && handleClose) {
    return null;
  }

  return (
    <Fragment>
      <Headline small text="navigation.your_account" />

      {/* Address book */}
      <Portal name={portals.NAV_MENU_ADDRESS_BOOK_BEFORE} props={props} />
      <Portal name={portals.NAV_MENU_ADDRESS_BOOK} props={props}>
        {List &&
          <List>
            <AddressBookItem Item={Item} />
          </List>
        }
        {!List && <AddressBookItem Item={Item} />}
      </Portal>
      <Portal name={portals.NAV_MENU_ADDRESS_BOOK_AFTER} props={props} />
    </Fragment>
  );
};

UserMenu.propTypes = {
  Item: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
  Headline: PropTypes.func,
  List: PropTypes.func,
  user: PropTypes.shape(),
};

UserMenu.defaultProps = {
  handleClose: null,
  Headline: null,
  List: null,
  user: null,
};

export default UserMenu;
