module.exports = {
  EINTERNAL: 'EINTERNAL',
  EINVAL: 'EINVAL', // validation code
  EINVALIDCREDENTIALS: 'EINVALIDCREDENTIALS',
  EACCESS: 'EACCESS',
  ENOTFOUND: 'ENOTFOUND',
  EEXISTS: 'EEXISTS',

  createCustomError: (code, message) => {
    const error = new Error()
    error.code = code
    error.message = message
    return error
  }
}
