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
} from "@chakra-ui/react";

import { useRef, useState } from "react";
import { useFormik } from "formik";
import { axiosInstance } from "../../../../library/api";
import { useDispatch, useSelector } from "react-redux";
// import auth_types from "../../../redux/reducers/types/auth";

const M_editCategory = (props) => {
  const userSelector = useSelector((state) => {
    return state.auth;
  });
  const autoRender = useSelector((state) => {
    return state.render;
  });
  const { category, img_url, id } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState(null);
  const toast = useToast();
  const inputFileRef = useRef(null);

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      category: category,
    },
    onSubmit: async () => {
      const formData = new FormData();
      const { category } = formik.values;

      formData.append("category", category);
      formData.append("img_url", selectedFile);

      console.log(formData);

      try {
        await axiosInstance
          .patch("/categories/" + id, formData)
          .then(() => {
            // dispatch({
            //   type: auth_types.AUTH_LOGIN,
            //   payload: val.data.user,
            // });

            toast({
              title: "Category has been edited successfully",
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
      <Button bgColor={"#e3e3e3"} onClick={onOpen}>
        EDIT
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>EDIT CATEGORY</ModalHeader>
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
                  <Input
                    onChange={(e) => {
                      formik.setFieldValue("category", e.target.value);
                    }}
                  ></Input>
                </FormControl>
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
              onClick={() => formik.handleSubmit()}
            >
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default M_editCategory;
