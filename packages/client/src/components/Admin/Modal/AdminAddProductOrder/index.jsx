import { useCounter } from "@chakra-ui/counter";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";

function AdminAddProductOrder(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { product_name, product_stock, product_price, main_stock, converted_stock, sell_price, product_id, user_id } = props

    const [ mainQuantity, setMainQuantity ] = useState()
    const [ convQuantity, setConvQuantity ] = useState()
    return (
        <>
            <Button size='sm' leftIcon = {<AddIcon size='sm'/>} mr={3} onClick={onOpen}> Add</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Tambah Product ke List Order</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack w='full' spacing={5}>
                            <Flex w='full'>
                                <Text flex={1} fontWeight='bold' textAlign='end'>Nama Product</Text>
                                <Text flex={2} ml={5}>{product_name}</Text>
                            </Flex>

                            <Flex w='full'>
                                <Text flex={1} fontWeight='bold' textAlign='end'>Main Stock</Text>
                                <Text flex={2} ml={5}>{main_stock}</Text>
                            </Flex>

                            <Flex w='full'>
                                <Text flex={1} fontWeight='bold' textAlign='end'>Main Price</Text>
                                <Text flex={2} ml={5}>{Number(sell_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                            </Flex>

                            <Flex w='full'>
                                <Text flex={1} fontWeight='bold' textAlign='end'>Converted Stock</Text>
                                <Text flex={2} ml={5}>{converted_stock}</Text>
                            </Flex>

                            <Flex w='full'>
                                <Text flex={1} fontWeight='bold' textAlign='end'>Converted Price</Text>
                                <Text flex={2} ml={5}>{Number(sell_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                            </Flex>
                            
                            <Flex w='full'>
                                <Text flex={1} fontWeight='bold' textAlign='end'>Main Quantity</Text>
                                <Box flex={2} ml={5}>
                                    <Input w='30%' type='number' onClick={(event) => setMainQuantity(event.target.value)}/>
                                </Box>
                            </Flex>

                            <Flex w='full'>
                                <Text flex={1} fontWeight='bold' textAlign='end'>Converted Quantity</Text>
                                <Box flex={2} ml={5}>
                                    <Input w='30%' type='number' onChange={(event) => setConvQuantity(event.target.value)}/>
                                </Box>
                            </Flex>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="green">Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AdminAddProductOrder;
