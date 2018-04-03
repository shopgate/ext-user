module.exports = {
  EINVAL: 'EINVAL', // validation code
  EAUTH: 'EAUTH',
  EINVALIDCREDENTIALS: 'EINVALIDCREDENTIALS',
  EACCESS: 'EACCESS',
  ENOTFOUND: 'ENOTFOUND',
  EUNKNOWN: 'EUNKNOWN',

  customError: (code, message) => {
    const error = new Error()
    error.code = code
    error.message = message
    return error
  }
}
