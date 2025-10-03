const { productResolvers } = require('./product.js');
const userResolvers = require('./user.js')
const {mergeResolvers} = require('@graphql-tools/merge');


const resolvers = mergeResolvers([ userResolvers,productResolvers ])


module.exports = resolvers;