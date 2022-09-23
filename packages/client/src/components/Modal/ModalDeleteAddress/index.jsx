import { DeleteIcon } from "@chakra-ui/icons";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../../library/api";

const ModalDeleteAddress = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { address_id } = props
    const toast = useToast()
    const dispatch = useDispatch()

    const autoRender = useSelector((state) => {return state.render})

    const deleteAddress = async() => {
        try {
            await axiosInstance.delete(`/user/address/${address_id}`).then(() => {
                toast({
                    title: 'Your address has been deleted',
                    status: 'success',
                    duration: 1000
                })

                dispatch({
                    type: render_types.AUTO_RENDER,
                    payload: {
                        value : !autoRender.value
                    }
                })
            })

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <DeleteIcon
                w="1em"
                h="1em"
                cursor="pointer"
                _hover={{ color: "red" }}
                onClick={() => {
                    onOpen();
                }}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirmation!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Do you wanna delete this address?</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            No
                        </Button>
                        <Button colorScheme="green" onClick={() => {
                            deleteAddress()
                        }}>Yes</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalDeleteAddress;
