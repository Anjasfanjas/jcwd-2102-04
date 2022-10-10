import { useCounter } from "@chakra-ui/counter";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Checkbox,
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
    Toast,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import qs from "qs";
import { useEffect } from "react";
import { useState } from "react";
import { axiosInstance } from "../../../../lib/hoc/api";
import { GiCardExchange } from "react-icons/gi"

function AdminAddProductOrder(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { product_name, product_stock, product_price, main_stock, converted_stock, sell_price,  converted_sell_price, product_id, user_id, order_id } = props

    const [ mainQuantity, setMainQuantity ] = useState(0)
    const [ convQuantity, setConvQuantity ] = useState(0)
    const [ racikan, setRacikan ] = useState([false, ""])

    const toast = useToast()

    const createOrderDetail = async() =>{
        try {
            await axiosInstance.post("/order/detail", qs.stringify({
                quantity: mainQuantity > 0 ? mainQuantity : convQuantity,
                product_price: mainQuantity > 0 ? sell_price : converted_sell_price,
                product_id,
                order_id,
                user_id,
                is_racikan: racikan[0] === true ? true : false,
                nama_racikan: racikan[0] === true ? racikan[1] : null
            })).then(() => {
                toast({
                    title: ` Add new item in user order ${order_id}`,
                    status: 'success',
                    duration: 1000,
                })
            })
        } catch (error) {
            console.log(error)
            toast({
                title: `something is not right, please check your input`,
                status: 'error',
                duration: 1000,
            })
        }
    }

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
                                <Text flex={2} ml={5}>{Number(converted_sell_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                            </Flex>
                            
                            <Flex w='full'>
                                <Text flex={1} fontWeight='bold' textAlign='end'>Main Quantity</Text>
                                <Box flex={2} ml={5}>
                                    <Input w='30%' type='number' defaultValue={mainQuantity} onClick={(event) => setMainQuantity(event.target.value)}/>
                                </Box>
                            </Flex>

                            <Flex w='full'>
                                <Text flex={1} fontWeight='bold' textAlign='end'>Converted Quantity</Text>
                                <Box flex={2} ml={5}>
                                    <Input w='30%' type='number' defaultValue={convQuantity} onChange={(event) => setConvQuantity(event.target.value)}/>
                                </Box>
                            </Flex>

                            <VStack w='full' align='start'>
                                <Checkbox 
                                    onChange={() => setRacikan([!racikan[0], ""])}
                                > 
                                    obat racikan? 
                                </Checkbox>
                                {
                                    racikan[0] === true ? (
                                        <Flex w='full' align='center'>
                                            <Text flex={1} w='full' textAlign='end'>Nama Racikan</Text>
                                            <Input flex={2} size='sm' w='80%' type='text' ml={5} onChange={(event) => setRacikan([true, event.target.value])}/>
                                        </Flex>
                                    ) : null
                                }
                            </VStack>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="green" onClick={createOrderDetail}>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AdminAddProductOrder;
