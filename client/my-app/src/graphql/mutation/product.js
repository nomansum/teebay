
import { gql } from '@apollo/client';

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $title: String!
    $description: String
    $categories: [CategoryType!]!
    $buyPrice: Float
    $price: Float
    $pricingType: PricingType
  ) {
    addProduct(
      title: $title
      description: $description
      categories: $categories
      buyPrice: $buyPrice
      price: $price
      pricingType: $pricingType
    ) {
      id
      title
      description
      categories
      buyPrice
      price
      pricingType
    }
  }
`;

export const EDIT_PRODUCT = gql`
  mutation EditProduct(
    $id: Int!
    $title: String
    $description: String
    $categories: [CategoryType!]
    $buyPrice: Float
    $price: Float
    $pricingType: PricingType
  ) {
    editProduct(
      id: $id
      title: $title
      description: $description
      categories: $categories
      buyPrice: $buyPrice
      price: $price
      pricingType: $pricingType
    ) {
      id
      title
      description
      categories
      buyPrice
      price
      pricingType
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id)
  }
`;


export const BUY_PRODUCT = gql`
  mutation BuyProduct($id: Int!) {
    buyProduct(id: $id) {
      id
    }
  }
`;

export const RENT_PRODUCT = gql`
  mutation RentProduct($id: Int!, $startDate: String!, $endDate: String!) {
    rentProduct(id: $id, startDate: $startDate, endDate: $endDate) {
      id
    }
  }
`;