

import { gql } from "apollo-server-express";
export const userTypeDefs = gql`

type User{
 id:Int!
 firstName:String
 lastName:String
 email:String
 phone:String
 address:String
 
 
}


type Query{
  me: User
}


type Mutation{
 
login(email:String!,password:String!):String! #JWT TOKEN
registration(firstName:String!,lastName:String!,email:String!,address:String!,password:String!,phone:String!):String!

}

`;
