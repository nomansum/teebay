import { productResolvers } from './product.js';
import userResolvers from './user.js'
import { mergeResolvers } from '@graphql-tools/merge';

const resolvers = mergeResolvers([ userResolvers,productResolvers ])


export default resolvers