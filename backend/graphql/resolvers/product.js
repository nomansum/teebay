
import jwt from 'jsonwebtoken'
import { myProducts } from './Query/myProducts.js'
import { addProductToUser } from './mutations/addProduct.js'

import { editProductOfUser } from './mutations/editProduct.js'
import { deleteProductOfUser } from './mutations/deleteProduct.js'

export const productResolvers={

 Query:{
   
    myProducts: myProducts



 }
,
Mutation:{
  
    addProduct: addProductToUser,

    editProduct:editProductOfUser,

    deleteProduct: deleteProductOfUser


}













}