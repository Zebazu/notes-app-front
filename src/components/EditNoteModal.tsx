import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Box,
  VStack,
  Text,
  AlertTitle,
  AlertDescription,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/modal";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { CloseButton } from "./ui/close-button";
import { Alert } from "./ui/alert"

interface NoteHistory {
  previous_title: string;
  previous_description: string;
  previous_timestamp: string;
}

interface EditNoteModalProps {
  noteId: number;
  isOpen: boolean;
  onClose: () => void;
}



const EditNoteModal: React.FC<EditNoteModalProps> = ({ noteId, isOpen, onClose }) => {
  const [note, setNote] = useState({ title: "", description: "" });
  const [history, setHistory] = useState<NoteHistory[]>([]);
  const { fetchToken } = useAuth();
  const [showAlertError, setShowAlertError] = useState(false);
  const [showAlertErrorMsg, setShowAlertErrorMsg] = useState("");
  const { open: confirmOpen, onOpen: confirmOpenModal, onClose: confirmCloseModal } = useDisclosure();

  
  useEffect(() => () => {
    axios
      .get(`http://localhost:8000/api/v1/notes/${noteId}/history`,{headers: {
        Authorization: `Bearer ${fetchToken()}`,
      }})
      .then((response) => setHistory(response.data.history))
      .catch((err) => console.error(err));
    
  }, [noteId]); 

  const updateHistory = () => {
    axios
    .get(`http://localhost:8000/api/v1/notes/${noteId}/history`,{headers: {
      Authorization: `Bearer ${fetchToken()}`,
    }})
      .then((response) => setHistory(response.data.history))
      .catch((err) => console.error(err));
    
  }

  const handleUpdate = () => {
    
    axios.put(`http://localhost:8000/api/v1/notes/${noteId}`, { title: note.title, description: note.description, version: history.length },
        {
          headers: {
            Authorization: `Bearer ${fetchToken()}`,
          },
        }).then( () => {alert("Nota actualizada con éxito")
        onClose()})
        .catch((err) => {
          if(err.response.status === 409) {
          setShowAlertErrorMsg(err.response.data.detail);
          setShowAlertError(true);
          confirmOpenModal();

          setTimeout(() => setShowAlertError(false), 4500);
        }
        });
     
  };
  const handleConfirmAction = (action: string) => {
    if (action === "recargar") {
      updateHistory();  
    } else if (action === "httpRequest" && note) {
      updateHistory()
      handleUpdate(); 
    }
    confirmCloseModal();  
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay bg="gray" />
      <ModalContent bg="white" p={4} borderRadius="lg" boxShadow="lg" >
        <ModalHeader>Editar Nota</ModalHeader>
        <ModalBody overflowY="auto" maxH="50%">
          <VStack align="stretch">
            <Input
              placeholder="Título"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
            <Textarea
              placeholder="Descripción"
              value={note.description}
              onChange={(e) => setNote({ ...note, description: e.target.value })}
            />
            <Box>
              <Text fontWeight="bold" mb={2}>
                Historial de Modificaciones:
              </Text>
              {history.length === 0 ? (
                <Text>No hay modificaciones previas.</Text>
              ) : (
                history.map((h, index) => (
                  <Box key={index} p={2} borderWidth="1px" borderRadius="md" mb={2}>
                    <Text><strong>Título:</strong> {h.previous_title}</Text>
                    <Text><strong>Descripción:</strong> {h.previous_description}</Text>
                    <Text fontSize="sm" color="gray.500">
                      Última modificación: {new Date(h.previous_timestamp).toLocaleString()}
                    </Text>
                  </Box>
                ))
              )}
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleUpdate} mr={3}>
            Guardar Cambios
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
          
        </ModalFooter>
        <Modal isOpen={confirmOpen} onClose={confirmCloseModal}>
        <ModalOverlay />
        <ModalContent
          bg="white"
          maxWidth="500px" 
          borderRadius="lg" 
          boxShadow="lg" 
          p={6} 
        >
          <ModalHeader>Confirmar Acción</ModalHeader>
          <ModalBody>
            ¿Deseas recargar la lista de notas o enviar de todos modos?
          </ModalBody>
          <ModalFooter>
            <Button borderRadius="md" colorScheme="green" mr={3} onClick={() => handleConfirmAction("recargar")}>
              Recargar Lista
            </Button>
            <Button borderRadius="md" colorScheme="red" onClick={() => handleConfirmAction("httpRequest")}>
              Eliminar Nota
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        {showAlertError && (
        <Alert status="error" variant="subtle" mt={4}>
          <Box>
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{showAlertErrorMsg}</AlertDescription>
          </Box>
          <CloseButton
          />
        </Alert>
        
      )}
      </ModalContent>
    </Modal>
    
    
  );
};

export default EditNoteModal;
