import { gql } from "apollo-server-express"

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
  availableForBuy: Boolean!
  availableForRent: Boolean!

}

type Purchase {
    id: Int!
    product: Product!
    seller: User!
    buyer: User!
    date: String!
  }

  type Rental {
    id: Int!
    product: Product!
    renter: User!
    startDate: String!
    endDate: String!
  }

type Query{
  
  myProducts: [Product!]
  allProducts: [Product!]
  myBoughtProducts: [Purchase!]
  mySoldProducts: [Purchase!]
  myBorrowedProducts: [Rental!]
  myLentProducts: [Rental!]

}

type Mutation{
 
 addProduct(title: String!, description: String, categories: [CategoryType!]!, buyPrice: Float, price: Float, pricingType: PricingType): Product!
 editProduct(id: Int!, title: String, description: String, categories: [CategoryType!], buyPrice: Float, price: Float, pricingType: PricingType): Product!
 deleteProduct(id: Int!): Boolean!
 buyProduct(id:Int!):Purchase!
 rentProduct(id:Int!,startDate:String!,endDate:String!): Rental!

}


`


export default productTypeDef