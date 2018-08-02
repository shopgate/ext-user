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
import connect from './connector';

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
    isLoggedIn,
    List,
  } = props;

  // Make sure a user is available, when the other elements are set (otherwise that's not gmd)
  if (!isLoggedIn) {
    return null;
  }

  return (
    <Fragment>
      {/* Logout button */}
      <Portal name={NAV_MENU_LOGOUT_BEFORE} props={props} />
      <Portal name={NAV_MENU_LOGOUT} props={props}>
        <Divider close={handleClose} />
        <List>
          <Item
            title="navigation.logout"
            icon={LogoutIcon}
            close={handleClose}
            onClick={logout}
            testId="logoutButton"
          >
            <I18n.Text string="navigation.logout" />
          </Item>
        </List>
      </Portal>
      <Portal name={NAV_MENU_LOGOUT_AFTER} props={props} />
    </Fragment>
  );
};

LogoutMenuEntry.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  Item: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  Divider: PropTypes.func,
  handleClose: PropTypes.func,
  List: PropTypes.func,
};

LogoutMenuEntry.defaultProps = {
  Divider: () => null,
  // eslint-disable-next-line react/prop-types
  List: ({ children }) => (<Fragment>{children}</Fragment>),
  handleClose: null,
};

export default connect(LogoutMenuEntry);
