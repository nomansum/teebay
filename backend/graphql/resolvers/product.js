
import { myProducts } from './Query/myProducts.js'
import { addProductToUser } from './mutations/addProduct.js'

import { editProductOfUser } from './mutations/editProduct.js'
import { deleteProductOfUser } from './mutations/deleteProduct.js'
import { getAllProducts } from './Query/allProducts.js'
import { getOwnBoughtProducts } from './Query/myBoughtProducts.js'
import { getOwnSoldProducts } from './Query/mySoldProducts.js'
import { getOwnBorrowedProducts } from './Query/myBorrowedProducts.js'
import { getOwnLentProducts } from './Query/myLentProducts.js'
import { buyProductAsUser } from './mutations/buyProduct.js'
import { rentProductAsUser } from './mutations/rentProduct.js'

export const productResolvers={

 Query:{
   
    myProducts: myProducts,
    allProducts: getAllProducts,
    myBoughtProducts: getOwnBoughtProducts,
    mySoldProducts: getOwnSoldProducts,
    myBorrowedProducts: getOwnBorrowedProducts,
    myLentProducts: getOwnLentProducts

 },
Mutation:{
  
    addProduct: addProductToUser,

    editProduct:editProductOfUser,

    deleteProduct: deleteProductOfUser,
    buyProduct: buyProductAsUser,
    rentProduct: rentProductAsUser,
  },


}











