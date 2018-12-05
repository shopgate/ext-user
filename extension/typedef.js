/**
 * @typedef {Object} SDKContext
 * @property {ExtensionConfig} config
 * @property {SDKContextMeta} meta
 * @property {SDKContextStorage} storage
 * @property {SDKContextLog} log
 * @property {function} tracedRequest
 */

/**
 * @typedef {Object} ExtensionConfig
 */

/**
 * @typedef {Object} SDKContextMeta
 * @property {string} deviceId
 * @property {string} appId
 * @property {string} userId
 * @property {string} appLanguage
 */

/**
 * @typedef {Object} SDKContextStorage
 * @property {SDKContextEntityStorage} extension
 * @property {SDKContextEntityStorage} device
 * @property {SDKContextEntityStorage} user
 */

/**
 * @typedef {Object} SDKContextEntityStorage
 * @property {function} get - (string key, function cb)
 * @property {function} set - (string key, mixed value, function cb)
 * @property {function} del - (string key, function cb)
 */

/**
 * @typedef {Object} SDKContextLog
 * @property {function} trace
 * @property {function} debug
 * @property {function} info
 * @property {function} warn
 * @property {function} error
 * @property {function} fatal
 */

/**
 * @typedef {Object} ExtUser
 * @property {string} id
 * @property {string|undefined} title
 * @property {string|undefined} prefix
 * @property {string} firstName
 * @property {string|undefined} middleName
 * @property {string} lastName
 * @property {string|undefined} suffix
 * @property {string} mail
 * @property {string} password
 * @property {string|undefined} gender male|female
 * @property {string|undefined} phone
 * @property {string|undefined} birthday YYYY-MM-DD
 * @property {ExtUserGroup[]} userGroups
 * @property {Object} customAttributes key value attributes
 */

/**
 * @typedef {Object} ExtUserGroup
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} ExtUserAddress
 * @property {string} id
 * @property {string|undefined} title
 * @property {string|undefined} prefix
 * @property {string} firstName
 * @property {string|undefined} middleName
 * @property {string} lastName
 * @property {string|undefined} suffix
 * @property {string|undefined} phone
 * @property {string} company
 * @property {string} street1
 * @property {string} street2
 * @property {string} zipCode
 * @property {string} city
 * @property {string} province ISO code
 * @property {string} country ISO alpha-2 code
 * @property {string[]} tags default, shipping, billing, etc.
 * @property {Object} customAttributes key value attributes
 */
