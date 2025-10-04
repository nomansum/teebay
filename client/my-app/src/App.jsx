
import { ApolloProvider } from "@apollo/client/react"
import client from "./apollo/client"
import { AuthProvider } from "./context/AuthContext"
import AppRouter from "./routes/AppRouter"

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ApolloProvider>
  );
}
export default App
