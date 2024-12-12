import { useState } from "react";
import { useAuth } from "./AuthContext";


import {
  Box,
  Button,
  Input,
  VStack,
  Text,
} from '@chakra-ui/react';

import {
  FormControl,
  FormLabel,
} from '@chakra-ui/form-control'

import { useNavigate } from "react-router-dom";


const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
        await login(email, password);
        alert(`Logging con Email: ${email}, Password: ${password}`);
        navigate("/notas");
    }catch (err){
        alert("ERRRRROOOR");
    }
  };

  return (
    <Box bg="white" p={6} borderRadius="md" boxShadow="md" width="300px">
      <Text fontSize="xl" mb={4} fontWeight="bold" textAlign="center">
        Login
      </Text>
      <VStack>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="teal" width="full" onClick={handleLogin}>
          Login
        </Button>
      </VStack>
    </Box>

  );
};

export default LoginForm;
