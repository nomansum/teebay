const {gql} = require('apollo-server-express');


const productTypeDef = gql `

enum CategoryType {
  ELECTRONICS
  FURNITURE
  HOME_APPLIANCES
  SPORTING_GOODS
  OUTDOOR
  TOYS
}

enum PricingType {
   
   DAY
   HOUR
   MONTH

}

type Product {
  id: Int!
  title: String!
  description: String
  categories: [CategoryType!]!
  buyPrice: Float
  price: Float
  pricingType: PricingType
  owner:User!

}

type Query{
  
  myProducts: [Product!]

}

type Mutation{
 
 addProduct(title: String!, description: String, categories: [CategoryType!]!, buyPrice: Float, price: Float, pricingType: PricingType): Product!
 editProduct(id: Int!, title: String, description: String, categories: [CategoryType!], buyPrice: Float, price: Float, pricingType: PricingType): Product!
 deleteProduct(id: Int!): Boolean!

}


`


module.exports = productTypeDef;