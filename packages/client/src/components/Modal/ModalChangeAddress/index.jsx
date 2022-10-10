import { AddIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import QueryString from "qs";
import { axiosInstance } from "../../../library/api";
import AddressCard from "../../Card/AddressCard";

const ModalChangeAddress = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { userAddress} = props;
    const toast = useToast()

    const changeAddress = async(user_id, address_id) => {
        try {
            await axiosInstance.patch(`/user/address/update`, QueryString.stringify({user_id: user_id, id: address_id})).then(() => {
                toast({
                    title: "Your Address has been changed",
                    status: 'success',
                    duration: 1000
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Button
                size="sm"
                onClick={onOpen}
                colorScheme="green"
                variant="ghost"
            >
                Ganti Alamat
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Daftar Alamatmu</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody p={3}>
                        <VStack spacing={5}>
                            {userAddress.map((val) => {
                                return (
                                    <>
                                        <Box w="full" onClick={ () => {changeAddress(val.user_id, val.id), onClose()}} _hover={{backgroundColor: "grey"}}>
                                            <AddressCard
                                                name={val.name}
                                                phone_number={val.phone_number}
                                                address_line={val.address_line}
                                                province={val.province}
                                                city={val.city}
                                                post_code={val.post_code}
                                                is_default={val.isDefault}
                                                address_id={val.id}
                                            />
                                        </Box>
                                    </>
                                );
                            })}

                            {userAddress.length < 3 ? (
                                <Button
                                    w='full'
                                    leftIcon={<AddIcon />}
                                    colorScheme="green"
                                    
                                >
                                    Tambah Alamat
                                </Button>
                            ) : null}
                        </VStack>
                    </ModalBody>

                    {/* <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Confirm!</Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalChangeAddress;
