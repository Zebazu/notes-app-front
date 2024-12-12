import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthView from "./components/AuthView";
import ProtectedRoute from "./components/ProtectedRoutes";
import NoteList from "./components/NoteList"
import { AuthProvider } from "./components/AuthContext";


const App: React.FC = () => {

  return (
    <ChakraProvider value={defaultSystem}>
      <AuthProvider>
      <Router>
          <Routes>
            <Route path="/" element={<AuthView/>} />
            <Route
              path="/notas"
              element={<ProtectedRoute element={<NoteList />} />}
            />
          </Routes>
        </Router>
        </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
