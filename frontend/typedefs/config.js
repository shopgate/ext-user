/**
 * @typedef {Object} UserConfig
 * @property {string[]} addressDefaultGroups
 * @property {Form} addressForm
 * @property {string[]} countryCodes
 * @property {UserMenuEntries} userMenuEntries
 */

/**
 * @typedef {Object} Form
 * @property {Locales} locales
 * @property {FormFields} fields
 */

/**
 * @typedef {Object} Locales
 */

/**
 * @typedef {{...:AnyFormField}} FormFields
 * @property {|null|undefined} custom
 */

/**
 * @typedef {BasicField|CountryField|CheckableField|SelectableField} AnyFormField
 */

/**
 * @typedef {TextField|DateField|PhoneField|NumberField|PasswordField|ProvinceField} BasicField
 */

/**
 * @typedef {CheckableField} SelectableField
 */

/**
 * @typedef {Object} TextField
 * @property {number|null|undefined} sortOrder
 * @property {string} label
 * @property {string} type
 * @property {string|null|undefined} default
 * @property {string|null|undefined} placeholder
 * @property {boolean|null|undefined} required
 * @property {boolean|null|undefined} visible
 * @property {FormFieldAction[]|null|undefined} actions
 */
/**
 * @typedef {TextField} DateField
 */
/**
 * @typedef {TextField} PhoneField
 */
/**
 * @typedef {TextField} EmailField
 */
/**
 * @typedef {TextField} PasswordField
 */
/**
 * @typedef {Object} NumberField
 * @property {number|null|undefined} sortOrder
 * @property {string} label
 * @property {string} type
 * @property {string|number|null|undefined} default
 * @property {string|null|undefined} placeholder
 * @property {boolean|null|undefined} required
 * @property {boolean|null|undefined} visible
 * @property {FormFieldAction[]|null|undefined} actions
 */

/**
 * @typedef {Object} CountryField
 * @property {number|null|undefined} sortOrder
 * @property {string} label
 * @property {string} type
 * @property {string|undefined} default
 * @property {string[]|null|undefined} countries
 * @property {string|undefined} placeholder
 * @property {boolean|null|undefined} required
 * @property {boolean|null|undefined} visible
 * @property {FormFieldAction[]|null|undefined} actions
 */

/**
 * @typedef {TextField} ProvinceField
 */

/**
 * @typedef {Object} CheckableField
 * @property {number|null|undefined} sortOrder
 * @property {string} label
 * @property {string} type
 * @property {string|undefined} default
 * @property {string[]|null|undefined} countries
 * @property {string|undefined} placeholder
 * @property {boolean|null|undefined} required
 * @property {boolean|null|undefined} visible
 * @property {FormFieldAction[]|null|undefined} actions
 */

/**
 * @typedef {Object} SelectableField
 * @property {number|null|undefined} sortOrder
 * @property {string} label
 * @property {string} type
 * @property {string|undefined} default
 * @property {SelectOptions|null|undefined} options
 * @property {string|undefined} placeholder
 * @property {boolean|null|undefined} required
 * @property {boolean|null|undefined} visible
 * @property {FormFieldAction[]|null|undefined} actions
 */

/**
 * @typedef {{...:string}[]} SelectOptions
 */

/**
 * @typedef {SelectableField} RadioField
 */

/**
 * @typedef {SelectableField} SelectField
 */

/**
 * @typedef {Object} FormFieldAction
 * @property {string} type "setVisibility, transform, setValue, (updateProvinceElement)"
 * @property {FormFieldActionRule[]|null|undefined} rules "default=[{context:currentFieldId}]"
 * @property {FormFieldActionParams|null|undefined} params "default={}"
 * @property {string|null|undefined} ruleConcatMethod "any, none, all; default=all"
 */

/**
 * @typedef {Object} FormFieldActionRule
 * @property {string} context
 * @property {string|null|undefined} type "oneOf, notIn, boolean, regex; default=boolean"
 * @property {string|string[]|boolean|number|null|undefined} data "default=true"
 */

/**
 * @typedef {Object} FormFieldActionParams
 * @property {string|undefined} type "based on action.type"
 * @property {string|string[]|number|number[]|boolean|boolean[]|null|undefined} value
 *
 * @comment
 *   "setVisibility" params:
 *     {} => visibility defined by rule evaluation
 *
 *   "transform" params:
 *     {type: "String.prototype|Number.prototype|Boolean.prototype", value: funcParam|funcParam[]}
 *
 *   "setValue" params:
 *     {type: "fixed, lengthOf, copyFrom", value: string|RelatedField}
 */

/**
 * @typedef {Object} FormElement
 * @property {string} id
 * @property {boolean} custom
 * @property {function} handleChange
 * @property {number|null|undefined} sortOrder
 * @property {string} label
 * @property {string} type
 * @property {string|null|undefined} default
 * @property {string|null|undefined} placeholder
 * @property {boolean|null|undefined} required
 * @property {boolean|null|undefined} visible
 * @property {FormFieldAction[]|null|undefined} actions
 */

/**
 * @typedef {Object} UserMenuEntries
 * @property {boolean} accountProfile
 * @property {boolean} addressBook
 */
