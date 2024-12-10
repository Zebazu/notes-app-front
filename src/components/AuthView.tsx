import {useState} from 'react'
import {Box, Button } from "@chakra-ui/react";
import {AuthProvider} from "./AuthContext"

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";


const AuthView: React.FC = () => {
const [isRegistering, setIsRegistering] = useState(false);
return (
    <AuthProvider>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bg="gray.50"
      p={6}
    >
      {isRegistering ? (
        <RegisterForm />
      ) : (
        <LoginForm />
      )}
      <Button
        mt={4}
        onClick={() => setIsRegistering(!isRegistering)}
        colorScheme="teal"
      >
        {isRegistering ? "Switch to Login" : "Switch to Register"}
      </Button>
      
    </Box>
    </AuthProvider>
  
);
}
export default AuthView;
