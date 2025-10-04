import { ApolloClient,InMemoryCache,HttpLink } from "@apollo/client";

const client = new ApolloClient({

 link:new HttpLink({
    uri:"http://localhost:4000/graphql",
  //  uri:import.meta.env.GRAPHQL_URI,
    fetchOptions:{method:'POST'},
    headers:{
        authorization:localStorage.getItem('token') || '',

    },
 }),
 cache:new InMemoryCache(),



});

export default client;