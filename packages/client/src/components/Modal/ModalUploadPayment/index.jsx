import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";

const ModalUploadPayment = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const inputFileRef = useRef()

    return (
        <>
            <Button colorScheme='green' onClick={onOpen}>Upload Bukti Pembayaran</Button>

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
