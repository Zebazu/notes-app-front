import {
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import {  Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,

} from "@chakra-ui/modal"

import axios from "axios";

interface DeleteNoteProps {
  noteId: number;
  onDeleteSuccess: () => void;
  fetchToken: () => string | null; 
}

const DeleteNote: React.FC<DeleteNoteProps> = ({ noteId, onDeleteSuccess, fetchToken }) => {
  const { open, onOpen, onClose } = useDisclosure();

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/notes/${noteId}`,
        {
          headers: {
            Authorization: `Bearer ${fetchToken()}`,
          },
        });

      onDeleteSuccess(); 
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
    }
  };

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Borrar
      </Button>

      <Modal isOpen={open} onClose={onClose}>
        <ModalOverlay bg="gray" />
        <ModalContent bg="white" p={4} borderRadius="md" boxShadow="lg">
        <ModalHeader>Confirmar eliminación</ModalHeader>
          <ModalBody>
            ¿Estás seguro de que deseas eliminar esta nota? Esta acción no se puede deshacer.
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose} mr={3}>
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              onClick={confirmDelete}
            >
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteNote;
