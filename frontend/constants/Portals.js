// FEATURES
const NAV_MENU = 'nav-menu';

// CONTENTS
const ADDRESS_BOOK = 'address-book';
const USER = 'user';
const ADDRESSES = 'addresses';
const ADDRESS = 'address';
const ADD = 'add';
const DEFAULT = 'default';

// POSITIONS
const BEFORE = 'before';
const AFTER = 'after';

// PORTAL COMPOSITIONS
export const NAV_MENU_ADDRESS_BOOK_BEFORE = `${NAV_MENU}.${ADDRESS_BOOK}.${BEFORE}`;
export const NAV_MENU_ADDRESS_BOOK = `${NAV_MENU}.${ADDRESS_BOOK}`;
export const NAV_MENU_ADDRESS_BOOK_AFTER = `${NAV_MENU}.${ADDRESS_BOOK}.${AFTER}`;

export const USER_ADDRESSES_BEFORE = `${USER}.${ADDRESSES}.${BEFORE}`;
export const USER_ADDRESSES = `${USER}.${ADDRESSES}`;
export const USER_ADDRESSES_AFTER = `${USER}.${ADDRESSES}.${AFTER}`;

export const USER_ADDRESSES_ADDRESS_BEFORE = `${USER}.${ADDRESSES}.${ADDRESS}.${BEFORE}`;
export const USER_ADDRESSES_ADDRESS = `${USER}.${ADDRESSES}.${ADDRESS}`;
export const USER_ADDRESSES_ADDRESS_AFTER = `${USER}.${ADDRESSES}.${ADDRESS}.${AFTER}`;

export const USER_ADDRESSES_ADDRESS_DEFAULT_BEFORE = `${USER}.${ADDRESSES}.${ADDRESS}.${DEFAULT}.${BEFORE}`;
export const USER_ADDRESSES_ADDRESS_DEFAULT = `${USER}.${ADDRESSES}.${ADDRESS}.${DEFAULT}`;
export const USER_ADDRESSES_ADDRESS_DEFAULT_AFTER = `${USER}.${ADDRESSES}.${ADDRESS}.${DEFAULT}.${AFTER}`;

export const USER_ADDRESSES_ADD_BEFORE = `${USER}.${ADDRESSES}.${ADD}.${BEFORE}`;
export const USER_ADDRESSES_ADD = `${USER}.${ADDRESSES}.${ADD}`;
export const USER_ADDRESSES_ADD_AFTER = `${USER}.${ADDRESSES}.${ADD}.${AFTER}`;
