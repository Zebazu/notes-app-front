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

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert(`Registering with Email: ${email}, Password: ${password}`);
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