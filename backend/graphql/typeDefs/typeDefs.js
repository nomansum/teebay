const { mergeTypeDefs } = require('@graphql-tools/merge');
const userTypeDefs = require('./user.js');

const typeDefs = mergeTypeDefs([userTypeDefs]);

module.exports = typeDefs;