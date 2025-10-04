import { gql } from "@apollo/client";

export const LOGIN = gql`
 mutation Login($email: String!, $password: String!){
  login(email: $email, password: $password)
}
`;

export const REGISTER = gql`
 mutation Registration($firstName: String!, $lastName: String!, $email: String!, $address: String!, $password: String!, $phone: String!) {
registration(firstName: $firstName, lastName: $lastName, email: $email, address: $address, password: $password, phone: $phone)
}

`