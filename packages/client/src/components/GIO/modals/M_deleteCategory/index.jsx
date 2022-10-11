import {
  Button,
  Text,
  MenuItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  Icon,
} from "@chakra-ui/react";

import { FiDelete } from "react-icons/fi";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../../library/api";
import { useRouter } from "next/router";

const m_deleteCategory = (props) => {
  const toast = useToast();
  const { id } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const autoRender = useSelector((state) => {
    return state.render;
  });
  const router = useRouter();

  const dispatch = useDispatch();
  return (
    <>
      <Button ml={"10"} onClick={onOpen}>
        <Text>DELETE</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>

          <ModalBody>
            <Text>Are you sure want to delete this category?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              CANCEL
            </Button>

            <Button
              variant="ghost"
              colorScheme={"green"}
              onClick={async () => {
                await axiosInstance
                  .delete("/categories/" + id)
                  .then(() => {
                    toast({
                      title: "your category has been deleted successfully",
                      status: "success",
                      duration: 1000,
                    });

                    dispatch({
                      type: "AUTO_RENDER",
                      payload: {
                        value: !autoRender.value,
                      },
                    });
                  })
                  .then(() => {
                    onClose();
                    router.push("/admin/category");
                  });
              }}
            >
              DELETE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default m_deleteCategory;
