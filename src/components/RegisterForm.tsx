import { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";

import {
    FormControl,
    FormLabel,
  } from '@chakra-ui/form-control'
import axios from "axios";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
      try{
      const response = await axios.post(
        "http://localhost:8000/api/v1/register",
        { username: email, password: password },
        
      )}catch(error){
        console.error (error);
      }
    
    alert(`Registering with username: ${email}`);
  };

  return (
    <Box bg="white" p={6} borderRadius="md" boxShadow="md" width="300px">
      <Text fontSize="xl" mb={4} fontWeight="bold" textAlign="center">
        Register
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
        <FormControl id="confirmPassword" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="teal" width="full" onClick={handleRegister}>
          Register
        </Button>
      </VStack>
    </Box>
  );
};

export default RegisterForm;
