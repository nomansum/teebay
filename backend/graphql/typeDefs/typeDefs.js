const { mergeTypeDefs } = require('@graphql-tools/merge');
const userTypeDefs = require('./user.js');
const productTypeDef = require('./product.js')

const typeDefs = mergeTypeDefs([userTypeDefs, productTypeDef]);

module.exports = typeDefs;