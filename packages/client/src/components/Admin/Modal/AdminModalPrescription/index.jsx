/* eslint-disable react/no-children-prop */
import { useCounter } from "@chakra-ui/counter";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Divider, Flex, FormControl, FormLabel, HStack, IconButton, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, StackDivider, Text, useDisclosure, VStack,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { axiosInstance } from "../../../../library/api";
import AdminAddProductOrder from "../AdminAddProductOrder";

const AdminModalPrescription = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { img_url, user_id } = props
    const [ AllProduct, setAllProduct ] = useState([])

    const fetchAllProductName = async () => {
        try {
            await axiosInstance.get("/product/name").then((res) => {
                const data = res.data.result
                setAllProduct([...data])
                console.log(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const renderProductTable = () => {
        return AllProduct.map((val) => {
            return (
                <>
                    <Tr>
                        <Td>
                            <AdminAddProductOrder 
                                product_name = {val.product_name}
                                main_stock = {val.product_stocks[0].main_stock}
                                converted_stock = {val.product_stocks[0].converted_stock}
                                sell_price = {val.product_stocks[0].sell_price}
                                product_id = {val.id}
                                user_id = {user_id}
                            />
                            <Button size='sm' leftIcon = {<AddIcon size='sm'/>}> Convert</Button>
                        </Td>
                        <Td>{val.product_name}</Td>
                        <Td>{val.product_stocks[0].main_unit}</Td>
                        <Td>{val.product_stocks[0].main_stock}</Td>
                        <Td>{val.product_stocks[0].converted_unit}</Td>
                        <Td>{val.product_stocks[0].converted_stock}</Td>
                        <Td>{Number(val.product_stocks[0].sell_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Td>
                    </Tr>
                </>
            )
        })
    }

    useEffect(() => {
        fetchAllProductName()

    }, [])
   
    return (
        <>
            <Button colorScheme='blue' onClick={onOpen}>Buat Pesanan</Button>

            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent minW='80vw'>
                    <ModalHeader>Buat Pesanan User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack w='full'>
                            <Flex py={2} w='full'>
                                <Stack flex={2} align='left' borderRight='1px solid black' p={3} pr={6} mr={3}>
                                    <Text p={2} fontWeight='bold' mb={5}>Resep Docter</Text>
                                    <Image
                                        src= {`http:/${img_url}`}
                                        alt=""
                                        width="400em"
                                        height="400em"
                                    />
                                </Stack>

                                <VStack flex={3} w='full' justify={'start'} align='center' p={3} minH='80vh'>

                                </VStack>
                            </Flex>
                            
                            <Box h={400} overflow='scroll' w='full'>
                                <TableContainer w='full' p={2} >
                                    <Table size='sm' variant='striped'>
                                        <Thead>
                                            <Tr>
                                                <Th textAlign='center' p={5}>Action</Th>
                                                <Th textAlign='center'>Nama Product</Th>
                                                <Th textAlign='center'>Main Unit</Th>
                                                <Th textAlign='center'>Main Stock</Th>
                                                <Th textAlign='center'>Converted Unit</Th>
                                                <Th textAlign='center'>Converted Stock</Th>
                                                <Th textAlign='center'>Sell Price</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {renderProductTable()}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>

                        <Button colorScheme="red" mr={3}>
                            Tolak
                        </Button>

                        <Button
                            colorScheme={"green"}
                        >
                            Buat Order
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AdminModalPrescription;
