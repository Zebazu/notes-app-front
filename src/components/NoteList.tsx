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
  useDisclosure,
} from "@chakra-ui/react";
import {useToast} from "@chakra-ui/toast";
import axios from "axios";
import { useAuth } from "./AuthContext";
import EditNoteModal from "./EditNoteModal";
import DeleteNote from "./DeleteNoteModal";

interface Notes {
  id: number;
  title: string;
  description: string;
  timestamp: string
}

const NotesList: React.FC = () => {
  const [notes, setNotes] = useState<Notes[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const { fetchToken } = useAuth();
  const [selectedNote, setSelectedNote] = useState<Notes | null>(null);
  const { open, onOpen, onClose } = useDisclosure();

  // Obtener tareas desde el servidor
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/v1/notes", {
        headers: {
          Authorization: `Bearer ${fetchToken()}`,
        },
      });
      setNotes(response.data.notes);
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
        "http://localhost:8000/api/v1/notes",
        { title: newTitle, description: newDescription },
        {
          headers: {
            Authorization: `Bearer ${fetchToken()}`,
          },
        }
      );
      setNotes([...notes, response.data.note]);
      setNewTitle("");
      setNewDescription(""); // Limpia los campos de entrada

    } catch (error) {
      console.error(error);
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
              value={note.title}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <Input
              placeholder="Descripción"
              value={note.description}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <Input
              placeholder="Tiempo creada"
              value={note.timestamp}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            
            <IconButton
              aria-label="Editar Nota"
              size="sm"
              colorScheme="blue"
              onClick={() => {
                setSelectedNote(note);
                onOpen();
              }}
            />
            
                
                  <DeleteNote
                    noteId={note.id}
                    fetchToken={fetchToken}
                    onDeleteSuccess={() => {
                      const updatedNotes = notes.filter((n) => n.id !== note.id);
                      setNotes(updatedNotes);
                    }}
                  />
                
              
            
            
          </HStack>
        ))}
      </VStack>
      {selectedNote && (
  <EditNoteModal
    noteId={selectedNote.id}
    isOpen={open}
    onClose={() => {
      onClose();
      setSelectedNote(null);
      fetchNotes();
    }}
      />
      
    )}
    </Box>
    
    
  );
};

export default NotesList;
