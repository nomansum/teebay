
import { mergeTypeDefs } from '@graphql-tools/merge';
import {userTypeDefs} from './user.js'
import productTypeDef from './product.js'

const typeDefs = mergeTypeDefs([userTypeDefs, productTypeDef]);

export default typeDefs