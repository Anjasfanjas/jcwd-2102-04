import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Lorem,
  Button,
  useDisclosure,
  Icon,
  useToast,
  Flex,
  Stack,
  Input,
  FormLabel,
  Box,
  FormControl,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import { axiosInstance } from "../../../../library/api";
import { useDispatch, useSelector } from "react-redux";

const M_addCategory = () => {
  const userSelector = useSelector((state) => {
    return state.auth;
  });
  const autoRender = useSelector((state) => {
    return state.render;
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState(null);
  const toast = useToast();
  const inputFileRef = useRef();

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      category: "",
    },
    onSubmit: async () => {
      const formData = new FormData();
      const { category } = formik.values;

      formData.append("category", category);

      formData.append("img_url", selectedFile);

      try {
        await axiosInstance
          .post("/categories", formData)
          .then(() => {
            toast({
              title: "Pic has been posted successfully",
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
          .then(onClose());
      } catch (err) {
        console.log(err);
        toast({
          title: "Error",
          status: "error",
          duration: 1000,
        });
      }
    },
  });

  return (
    <>
      <Button
        size="md"
        bgColor="#FF8AAE"
        color="white"
        _hover={{
          color: "#FF8AAE",
          border: "2px",
          borderCollapse: "#FF8AAE",
          bgColor: "white",
        }}
        onClick={onOpen}
      >
        <Icon boxSize={4} as={AddIcon} /> <Text ml={2}>Add Category</Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Category</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Flex minH={"30vh"} align={"center"} justify={"center"}>
              <Stack spacing={4} w={["full", "full"]}>
                <FormControl display={"flex"} alignItems={"center"}>
                  <FormLabel>Category Image</FormLabel>
                  <Input
                    type={"file"}
                    display="none"
                    onChange={handleFile}
                    accept={"image/png, image/jpg, image/jpeg, image/gif"}
                    ref={inputFileRef}
                  />
                  <Button
                    colorScheme={"blue"}
                    onClick={() => inputFileRef.current.click()}
                  >
                    Upload Image
                  </Button>
                </FormControl>

                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Textarea
                    onChange={(e) => {
                      formik.setFieldValue("category", e.target.value);
                    }}
                    minH={"5vh"}
                    variant={"filled"}
                  />
                </FormControl>

                {/* <FormControl>
                  <FormLabel>Location</FormLabel>
                  <Input
                    onChange={(e) => {
                      formik.setFieldValue("location", e.target.value);
                    }}
                    variant="filled"
                  />
                </FormControl> */}
              </Stack>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>

            <Button
              variant="ghost"
              colorScheme={"green"}
              onClick={formik.handleSubmit}
            >
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default M_addCategory;
