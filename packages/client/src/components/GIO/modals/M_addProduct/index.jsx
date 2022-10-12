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
  FormHelperText,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import { axiosInstance } from "../../../../library/api";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const M_addProduct = () => {
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
      product_code: "",
      product_name: "",
    },

    validationSchema: Yup.object().shape({
      product_code: Yup.string()
        .required("Product Code is required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(4, "Must be exactly 4 digits")
        .max(4, "Must be exactly 4 digits"),

      product_name: Yup.string()
        .required("Product Name is required")
        .max(20, "Must be less than 20 characters"),
    }),
    validateOnChange: false,

    onSubmit: async () => {
      const formData = new FormData();
      const { product_code, product_name } = formik.values;

      formData.append("product_code", product_code);
      formData.append("product_name", product_name);
      formData.append("user_id", userSelector?.id);
      formData.append("image_url", selectedFile);

      try {
        await axiosInstance
          .post("/product", formData)
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
        <Icon boxSize={4} as={AddIcon} /> <Text ml={2}>Add Product</Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Flex minH={"55vh"} align={"center"} justify={"center"}>
              <Stack spacing={4} w={["full", "full"]}>
                <FormControl display={"flex"} alignItems={"center"}>
                  <FormLabel>Product Image</FormLabel>
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

                <FormControl isRequired isInvalid={formik.errors.product_code}>
                  <FormLabel>Product Code</FormLabel>
                  <Input
                    required
                    onChange={(e) => {
                      formik.setFieldValue("product_code", e.target.value);
                    }}
                    // minH={"20vh"}
                    variant={"filled"}
                  />
                  <FormHelperText
                    textAlign={"left"}
                    ml={2}
                    mb={2}
                    mt={0}
                    color={"red"}
                  >
                    {formik.errors.product_code}
                  </FormHelperText>
                </FormControl>

                <FormControl isRequired isInvalid={formik.errors.product_name}>
                  <FormLabel>Product Name</FormLabel>
                  <Input
                    required
                    onChange={(e) => {
                      formik.setFieldValue("product_name", e.target.value);
                    }}
                    // minH={"20vh"}
                    variant={"filled"}
                  />
                  <FormHelperText
                    textAlign={"left"}
                    ml={2}
                    mb={2}
                    mt={0}
                    color={"red"}
                  >
                    {formik.errors.product_name}
                  </FormHelperText>
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

export default M_addProduct;
