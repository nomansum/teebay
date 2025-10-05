
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

export const MY_LENT_PRODUCTS = gql`
  query MyLentProducts {
    myLentProducts {
      id
      startDate
      endDate
      renter {
        id
        email
      }
      product {
        id
        title
        description
        categories
        buyPrice
        price
        pricingType
        availableForBuy
        availableForRent
      }
    }
  }
`;

export const MY_BORROWED_PRODUCTS = gql`
  query MyBorrowedProducts {
    myBorrowedProducts {
      id
      startDate
      endDate
      product {
        id
        title
        description
        categories
        buyPrice
        price
        pricingType
        availableForBuy
        availableForRent
      
      }
      renter {
        id
        email
      }
    }
  }
`;

export const MY_SOLD_PRODUCTS = gql`
  query MySoldProducts {
    mySoldProducts {
      id
      date
      buyer {
        id
        email
      }
      product {
        id
        title
        description
        categories
        buyPrice
        price
        pricingType
        availableForBuy
        availableForRent
      }
    }
  }
`;

export const ALL_PRODUCTS = gql`
  query AllProducts {
    allProducts {
      id
      title
      description
      categories
      buyPrice
      price
      pricingType
      availableForBuy
      availableForRent
      owner {
        id
        email
      }
    }
  }
`;