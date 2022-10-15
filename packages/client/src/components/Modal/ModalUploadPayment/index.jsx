import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../library/api";

const ModalUploadPayment = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ selectedFile, setSelectedFile ] = useState(null)
    const inputFileRef = useRef()
    const [ img, setImg ] = useState()

    const userSelector = useSelector((state) => {return state.auth})
    const toast = useToast()

    const router = useRouter()

    const formData = new FormData()
    formData.append('Payment', selectedFile)

    const handleFile = (event) => {
        setSelectedFile(event.target.files[0])
        setImg(URL.createObjectURL(event.target.files[0]))
    }

    const uploadFIle = async() => {
        try {
            await axiosInstance.post('/payment', formData,  { params : { 
                user_id : userSelector?.id,
                order_id : props.order_id

            }}).then((val) => {                
                toast({
                    title: "Payment reciep has been posted successfuly",
                    status: "success",
                    duration: 1000
                })

                router.push("/user/order")
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
            <Button colorScheme='green' onClick={onOpen} size = {props.size}>Upload Bukti Pembayaran</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Upload Your Payment Recipt</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box align='center' w='full' >
                            <Image
                                src= {img}
                                alt=''
                                width={img? 300 : 0}
                                height={ img? 300 : 0}
                            />
                        </Box>
                        <Flex align={"center"} p={5} justify={"center"}>
                            <Stack spacing={4} w={["full", "full"]}>
                                <FormControl
                                    display={"flex"}
                                    alignItems={"center"}
                                >
                                    <FormLabel>Upload Payment Recipt</FormLabel>
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
                        <Text color='red' p={5} fontSize={14}>* Mohon untuk cek kembali file/gambar yang di upload untuk sesuai dengan bukti pembayaran, agar tidak terjadi pembatalan karena kesalahan upload</Text>
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

export default ModalUploadPayment;
