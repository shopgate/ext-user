/**
 * @param {SDKContext} context
 * @param {{filters: Object[]}} input
 */
module.exports = async (context, input) => {
  const filters = input.filters || []

  return {
    filters: [
      {
        field: 'userId',
        value: context.meta.userId,
        condition: 'eq'
      },
      ...filters
    ]
  }
}
