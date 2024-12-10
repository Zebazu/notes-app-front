import { useEffect, useState } from "react";

import {
  Box,
  Heading,
  Spinner,
  VStack,
  HStack,
  IconButton,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
import {Checkbox} from "@chakra-ui/checkbox";
import {useToast} from "@chakra-ui/toast";
import axios from "axios";
import { useAuth } from "./AuthContext";

interface Notes {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const NotesList: React.FC = () => {
  const [notes, setNotes] = useState<Notes[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  //const { token } = useAuth();

  // Obtener tareas desde el servidor
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/notas", {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
    } catch (error) {
      toast({
        title: "Error cargando lista de notas",
        description: "No se pudieron recuperar las notas",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Agregar una nueva tarea
  const addNotes = async () => {
    if (!newTitle.trim() || !newDescription.trim())  {
      toast({
        title: "Nota vacía",
        description: "La nota no puede ser vacía",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/notas",
        { title: newTitle, description: newDescription },
        {
          headers: {
            //Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes([...notes, response.data]);
      setNewTitle("");
      setNewDescription(""); // Limpia los campos de entrada
      toast({
        title: "Nota agregada",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error agregando nota",
        description: "No se pudo agregar la nota",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };


  //Actualizar una nota
  const toggleNotes = async (id: number) => {
    try {
      const updatedNotes = notes.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note
      );
      setNotes(updatedNotes);

      await axios.put(
        `http://localhost:5000/notas/${id}`,
        { completed: !notes.find((note) => note.id === id)?.completed },
        {
          headers: {
            //Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      toast({
        title: "Error actualizando nota",
        description: "No se pudo actualizar la nota",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Eliminar una tarea
  const deleteNote = async (id: number) => {
    try {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);

      await axios.delete(`http://localhost:5000/notas/${id}`, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });

      toast({
        title: "Nota borrada",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error borrando nota",
        description: "No se pudo borrar la nota",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text mt={4}>Cargando Notas</Text>
      </Box>
    );
  }

  return (
    <Box p={6} bg="gray.50" borderRadius="md" boxShadow="md" maxWidth="500px" mx="auto">
      <Heading size="lg" mb={4} textAlign="center">
        Notas
      </Heading>
      <VStack align="stretch">
        {/* Formulario para agregar tareas */}
        <VStack align="stretch">
        <Input
          placeholder="Título"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <Input
          placeholder="Descripción"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <Button colorScheme="teal" onClick={addNotes}>
          Add Task
        </Button>
      </VStack>

        {/* Lista de notas */}
        {notes.map((note) => (
          <HStack
            key={note.id}
            justifyContent="space-between"
            bg="white"
            p={4}
            borderRadius="md"
            boxShadow="sm"
          >
            <Input
              placeholder="Título"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <Input
              placeholder="Descripción"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <Button colorScheme="teal" onClick={addNotes}>
              Agregar Tarea
            </Button>
            <IconButton
              aria-label="Actualziar Nota"
              size="sm"
              colorScheme="green"
              onClick={() => toggleNotes(note.id)}
            />
            <IconButton
              aria-label="Borrar Nota"
              size="sm"
              colorScheme="red"
              onClick={() => deleteNote(note.id)}
            />
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default NotesList;
