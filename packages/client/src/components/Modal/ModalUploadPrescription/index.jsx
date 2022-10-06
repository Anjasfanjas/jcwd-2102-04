import { Box, Button, Flex, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import Image from "next/image";
import qs from "qs";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md"
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../library/api";
import ModalChangeAddress from "../ModalChangeAddress";

const ModalUploadPrescription = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ selectedFile, setSelectedFile ] = useState(null)
    const [ userAddress, setUserAddress ] = useState([])
    const [addressDefault, setAddressDefault ] = useState({})
    const [ img, setImg ] = useState()
    const inputFileRef = useRef()
    const toast = useToast()

    const userSelector = useSelector((state) => {return state.auth})
    const formData = new FormData()
    formData.append('prescription', selectedFile)

    const handleFile = (event) => {
        setSelectedFile(event.target.files[0])
        setImg(URL.createObjectURL(event.target.files[0]))
    }


    const fetchUserAddress = async() => {
        try {
            await axiosInstance.get(`/user/address/${userSelector?.id}`).then((res) => {
                const data = res.data.result 
                setUserAddress([...data])
                data.map((val) => {
                    val.isDefault ? setAddressDefault({...val}) : null
                })

            })
        } catch (error) {
            console.log(error)
        }
    }

    const selectedAddress = () => {
        return (
            <VStack w='full' p={2} fontSize={16} align='start'>
                <HStack w='full' align='center' justify='space-between' paddingBottom={1} borderBottom='1px solid black'>
                    <Text>Alamat Pengiriman</Text>
                    <ModalChangeAddress
                        userAddress = {userAddress}
                    />
                </HStack>
                <VStack p={3}>
                    <Text w='full' fontWeight='bold'>{addressDefault.name}, +62{addressDefault.phone_number}</Text>
                    <Text w='100%%'>{addressDefault.address_line}, {addressDefault.province}, {addressDefault.city}, {addressDefault.post_code} </Text>
                </VStack>
            </VStack>
        )
    }

    const uploadFIle = async() => {
        try {
            let prescriptionRecentId
            await axiosInstance.post(`/prescription/${userSelector?.id}`, formData).then((val) => {
                prescriptionRecentId = val.data.result.id
                
                axiosInstance.post("/order", {
                    user_id: userSelector?.id,
                    user_address_id: addressDefault?.id,
                    user_prescription_id: prescriptionRecentId
                })

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

    useEffect(() => {
        fetchUserAddress()
    }, [])

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
                        {selectedAddress()}
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
