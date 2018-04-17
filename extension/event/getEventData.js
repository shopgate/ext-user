/**
 * @param {SDKContext} context
 * @param {Object} input
 * @param {function} cb
 */
module.exports = function (context, input, cb) {
  cb(null, {
    eventData: input
  })
}
