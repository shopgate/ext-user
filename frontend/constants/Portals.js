// FEATURES
const NAV_MENU = 'nav-menu';

// CONTENTS
const PROFILE = 'profile';
const ADDRESS_BOOK = 'address-book';
const USER = 'user';
const ADDRESSES = 'addresses';
const ADDRESS = 'address';
const FORM = 'form';
const ADDRESS_FORM = 'address-form';
const ADD = 'add';
const DEFAULT = 'default';
const BUTTON = 'button';

// POSITIONS
const BEFORE = 'before';
const AFTER = 'after';

// PORTAL COMPOSITIONS
export const NAV_MENU_ADDRESS_BOOK_BEFORE = `${NAV_MENU}.${ADDRESS_BOOK}.${BEFORE}`;
export const NAV_MENU_ADDRESS_BOOK = `${NAV_MENU}.${ADDRESS_BOOK}`;
export const NAV_MENU_ADDRESS_BOOK_AFTER = `${NAV_MENU}.${ADDRESS_BOOK}.${AFTER}`;

export const USER_PROFILE_BEFORE = `${USER}.${PROFILE}.${BEFORE}`;
export const USER_PROFILE = `${USER}.${PROFILE}`;
export const USER_PROFILE_AFTER = `${USER}.${PROFILE}.${AFTER}`;

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

export const USER_FORM_BEFORE = `${USER}.${FORM}.${BEFORE}`;
export const USER_FORM = `${USER}.${FORM}`;
export const USER_FORM_AFTER = `${USER}.${FORM}.${AFTER}`;

export const USER_ADDRESS_FORM_BEFORE = `${USER}.${ADDRESS_FORM}.${BEFORE}`;
export const USER_ADDRESS_FORM = `${USER}.${ADDRESS_FORM}`;
export const USER_ADDRESS_FORM_AFTER = `${USER}.${ADDRESS_FORM}.${AFTER}`;

export const USER_ADDRESS_FORM_BUTTON_BEFORE = `${USER}.${ADDRESS_FORM}.${BUTTON}.${BEFORE}`;
export const USER_ADDRESS_FORM_BUTTON = `${USER}.${ADDRESS_FORM}.${BUTTON}`;
export const USER_ADDRESS_FORM_BUTTON_AFTER = `${USER}.${ADDRESS_FORM}.${BUTTON}.${AFTER}`;
