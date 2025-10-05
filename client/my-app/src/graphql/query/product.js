
import { gql } from '@apollo/client';

export const MY_PRODUCTS = gql`
  query MyProducts {
    myProducts {
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
