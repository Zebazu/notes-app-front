import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthView from "./components/AuthView";
import ProtectedRoute from "./components/ProtectedRoutes";
import NoteList from "./components/NoteList"


const App: React.FC = () => {

  return (
    <ChakraProvider value={defaultSystem}>
      <Router>
          <Routes>
            <Route path="/" element={<AuthView/>} />
            <Route
              path="/notas"
              element={
                <NoteList />
              }
            />
          </Routes>
        </Router>
    </ChakraProvider>
  );
};

export default App;
