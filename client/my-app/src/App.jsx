import React from "react"
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications"
import { ApolloProvider } from "@apollo/client/react"
import client from "./apollo/client"
import { AuthProvider } from "./context/AuthContext"
import AppRouter from "./routes/AppRouter"

function App() {
  
  return (
    <MantineProvider   >
      <Notifications />
      <ApolloProvider client={client}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ApolloProvider>
    </MantineProvider>
  )
}

export default App
