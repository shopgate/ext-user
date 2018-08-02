import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import Portal from '@shopgate/pwa-common/components/Portal';
import LogoutIcon from '@shopgate/pwa-ui-shared/icons/LogoutIcon';
import {
  NAV_MENU_LOGOUT_BEFORE,
  NAV_MENU_LOGOUT,
  NAV_MENU_LOGOUT_AFTER,
} from '@shopgate/pwa-common/constants/Portals';

/**
 * @param {Object} props component props
 * @returns {Object|null} JSX
 */
const LogoutMenuEntry = (props) => {
  const {
    Divider,
    handleClose,
    Item,
    logout,
    user,
  } = props;

  // Make sure a user is available, when the other elements are set (otherwise that's not gmd)
  if (!user) {
    return null;
  }

  return (
    <Fragment>
      {/* Logout button */}
      <Portal name={NAV_MENU_LOGOUT_BEFORE} props={props} />
      <Portal name={NAV_MENU_LOGOUT} props={props}>
        <Divider close={handleClose} />

        <Item
          title="navigation.logout"
          icon={LogoutIcon}
          close={handleClose}
          onClick={logout}
          testId="logoutButton"
        >
          <I18n.Text string="navigation.logout" />
        </Item>
      </Portal>
      <Portal name={NAV_MENU_LOGOUT_AFTER} props={props} />
    </Fragment>
  );
};

LogoutMenuEntry.propTypes = {
  Item: PropTypes.func.isRequired,
  Divider: PropTypes.func,
  handleClose: PropTypes.func,
  logout: PropTypes.func,
  user: PropTypes.shape(),
};

LogoutMenuEntry.defaultProps = {
  Divider: () => (null),
  handleClose: null,
  logout: null,
  user: null,
};

export default LogoutMenuEntry;