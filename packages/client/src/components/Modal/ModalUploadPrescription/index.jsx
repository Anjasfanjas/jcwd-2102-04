import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md"
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../library/api";

const ModalUploadPrescription = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ selectedFile, setSelectedFile ] = useState(null)
    const inputFileRef = useRef()
    const toast = useToast()

    const userSelector = useSelector((state) => {return state.auth})
    const formData = new FormData()
    formData.append('prescription', selectedFile)

    const handleFile = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const uploadFIle = async() => {
        try {
            await axiosInstance.post(`/prescription/${userSelector?.id}`, formData).then((val) => {
                toast({
                    title: "prescription has been posted successfuly",
                    status: "success",
                    duration: 1000
                })
            })
        } catch (error) {
            console.log(error)
        toast({
          title: "Error",
          status: "error",
          duration: 1000,
        })
        }
    }

    return (
        <>
            <Button 
                variant='outline'
                color='#004776'
                borderColor="#5F656B"
                leftIcon={<MdOutlineFileUpload/>}
                onClick={onOpen}
            >
                <Text fontSize={14}>Upload Prescriptions</Text>
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Upload Your Payment Recipt</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex align={"center"} p={5} justify={"center"}>
                            <Stack spacing={4} w={["full", "full"]}>
                                <FormControl
                                    display={"flex"}
                                    alignItems={"center"}
                                >
                                    <FormLabel>Upload your prescription</FormLabel>
                                    <Input
                                        type={"file"}
                                        display="none"
                                        accept={
                                            "image/png, image/jpg, image/jpeg, image/gif"
                                        }
                                        ref={inputFileRef}
                                    />
                                    <Button
                                        colorScheme={"blue"}
                                        onClick={() => inputFileRef.current.click()}
                                    >
                                        <Input type='file' accept='image/png, image/jpg, image/jpeg' hidden ref={inputFileRef} onChange={handleFile}/>
                                        Upload Image
                                    </Button>
                                </FormControl>
                            </Stack>
                        </Flex>
                        <Text color='red' p={5} fontSize={14}>* Mohon untuk cek kembali file/gambar yang di upload, pastikan gambar yang di upload benar resep dari dokter dan bukan gambar lainnya </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>

                        <Button
                            variant="ghost"
                            colorScheme={"green"}
                            onClick={() => {uploadFIle()}}
                        >
                            Upload
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalUploadPrescription;
