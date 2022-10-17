/* eslint-disable react/no-children-prop */
import { useCounter } from "@chakra-ui/counter";
import { AddIcon, DeleteIcon, EditIcon, MinusIcon } from "@chakra-ui/icons";
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
    useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import qs from "qs";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { axiosInstance } from "../../../../library/api";
import AdminAddProductOrder from "../AdminAddProductOrder";
import { GiCardExchange } from "react-icons/gi"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const AdminModalPrescription = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { img_url, user_id, user_address, order_id, total_price, shipping_price } = props
    const [ AllProduct, setAllProduct ] = useState([])
    const [ orderDetail, setOrderDetail ] = useState([])
    const [ deliveryOption, setDeliveryOption ] = useState()
    const [ shippingPrice, setShippingPrice] = useState(0)

    const autoRender = useSelector((state) => {return state.render})
    const toast = useToast()
    const dispatch = useDispatch()

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
    
    const fetchOrderDetail = async () => {
        try {
            await axiosInstance.get(`/order/detail/${order_id}`).then((res) => {
                const data = res.data.result
                setOrderDetail(data)
                console.log(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const deliveryCost = async (courier) => {
        console.log(courier)
        const body = {
            origin: 457,
            destination: user_address[0]?.city_id,
            weight: 10000,
            courier: courier,
        }

        try {
            await axios.post("https://api.rajaongkir.com/starter/cost", {"origin": "455", "destination": `${user_address[0]?.city_id}`, "weight": `1000`, "courier": courier }  , {headers: {"key" : "d2bbf841ca82c43bf952e17f16213b91"}}, qs.stringify(body)).then((res) => {
                console.log(res)
                const data = res.data.rajaongkir.results[0]
                setDeliveryOption(data.costs)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const deleteOrderDetail = async(id) => {
        try {
            await axiosInstance.delete(`/order/delete/${id}`).then((res) => {
                toast({
                    title: `product ${id}, has been deleted`,
                    status: "warning",
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

    const renderProductTable = () => {
        return AllProduct.map((val, index) => {
            return (
                <>
                    <Tr >
                        <Td >
                            <AdminAddProductOrder 
                                product_name = {val.product_name}
                                main_stock = {val.product_stocks[0].main_stock}
                                converted_stock = {val.product_stocks[0].converted_stock}
                                sell_price = {val.product_stocks[0].sell_price}
                                converted_sell_price = {val.product_stocks[0].converted_sell_price}
                                product_id = {val.id}
                                user_id = {user_id}
                                order_id = {order_id}
                                key={index}
                            /> 
                            <Button key={index} size='sm' leftIcon = {<GiCardExchange/>}> Convert</Button>
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

    const daftarRacikan = orderDetail.map((val) => {return val.nama_racikan})
    const setDaftarRacikan = new Set (daftarRacikan)
    const arrRacikan = [...setDaftarRacikan]
    let totalOrder = 0

    const buatOrder = async() => {
        try {
            await axiosInstance.patch(`/order/update/${order_id}`, qs.stringify({
                shipping_price : shippingPrice,
                order_price: totalOrder
            })).then((res) => {
                toast({
                    title: "order berhasil dibuat",
                    status: "success",
                    duration: 1000,
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    const renderProductDetailTable = () => {
        orderDetail.map((val) => { 
            totalOrder += val.total_price
        })

        return arrRacikan.map((val,index) => {
            return  (
                <> 
                    <VStack w='full' key={index}>
                        <Text w='full' textAlign='center' p={2} fontWeight='bold' bgColor='lightGrey'>DAFTAR ORDER {val? `OBAT RACIKAN : ${val}` : 'PRODUCT SATUAN'}</Text>
                        <Box maxH={250} w='full' overflow='scroll'>
                            <TableContainer w='full' key={index}>
                                <Table size='xs' variant='striped'>
                                    <Thead>
                                        <Tr fontSize={12}>
                                            <Th textAlign='center' p={2}>Action</Th>
                                            <Th textAlign='center'>Nama Product</Th>
                                            <Th textAlign='center'>Quantity</Th>
                                            <Th textAlign='center'>Price</Th>
                                            <Th textAlign='center'>Total Price</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {   
                                            orderDetail.map((val2,index) => {
                                                if(val2.nama_racikan === val){
                                                    return (
                                                        <Tr key={index}>
                                                            <Td>
                                                                <Button onClick={() =>  deleteOrderDetail(val2.id)} size='sm' leftIcon = {<DeleteIcon size='sm'/>} m='auto'></Button>
                                                            </Td>

                                                            <Td>{val2.product.product_name}</Td>
                                                            <Td>{val2.quantity}</Td>
                                                            <Td>{Number(val2.product_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Td>
                                                            <Td>{Number(val2.total_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Td>
                                                        </Tr>
                                                    )
                                                }
                                            })
                                        }
                                    </Tbody>

                                </Table>
                            </TableContainer>
                        </Box>
                    </VStack>
                    
                </>
            )
        })
    }

    useEffect(() => {
        fetchAllProductName()
        fetchOrderDetail()
        deliveryCost()

    }, [order_id])
   
    useEffect(() => {
        fetchAllProductName()
        fetchOrderDetail()
        
    }, [autoRender, order_id])
    return (
        <>
            <Button colorScheme='blue' onClick={onOpen}>Buat Pesanan</Button>

            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent minW='90vw'>
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

                                <VStack w='full' align='left' p={5}>
                                    <Text w='full' fontWeight='bold' borderBottom='1px solid #b41974' pb={2} mb={2}>Pilh jasa penigirman</Text>

                                    <FormControl w='full'>
                                        <Select defaultValue={"jne"} onChange={(event) => {deliveryCost(event.target.value)}}>
                                            <option value='jne'>JNE</option>
                                            <option value='pos'>Post Indonesia</option>
                                            <option value='tiki'>Tiki</option>
                                        </Select>
                                    </FormControl>

                                    <VStack w='full' align='left'>
                                        <Text w='full' fontWeight='bold' borderBottom='1px solid #b41974' pb={1} mb={2}>Pilih Paket Pengiriman dari</Text>

                                        <FormControl w='full'>
                                            <Select onChange={(event) => {setShippingPrice(event.target.value)}} >
                                                {deliveryOption?.map((val) => {
                                                    return (
                                                        <>
                                                            <option value={val.cost[0].value}>
                                                                <Flex>
                                                                    <Text>{val.service} </Text>
                                                                    <Text>{val.cost[0].etd} Hari </Text>
                                                                    <Text>{Number(val.cost[0].value).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                                                                </Flex>
                                                            </option>
                                                        </>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </VStack>
                                </VStack>
                                
                                </Stack>

                                <VStack flex={3} w='full' >
                                    <VStack justify={'start'} align='center' p={3} minH='80vh' spacing={5} overflow='scroll' maxH={300}>
                                        <VStack>
                                            <Text w='full' fontWeight='bold'>{user_address[0]?.name}, +62{user_address[0]?.phone_number}</Text>
                                            <Text w='100%'>{user_address[0]?.address_line}, {user_address[0]?.province}, {user_address[0]?.city}, {user_address[0]?.post_code} </Text>
                                        </VStack>
                                        

                                        {renderProductDetailTable()}
                                        <Flex w='full' justify='space-between' fontWeight='bold' p={2} bgColor='lightGrey'>
                                            <Text flex={9} textAlign='center'>TOTAL ORDER</Text>
                                            <Text flex={1}>{Number(totalOrder).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                                        </Flex>
                                    </VStack>
                                    
                                    <VStack align='center' w='full' px={10}>
                                        <Text w='full' fontWeight='bold' borderBottom='1px solid #b41974' pb={2} mb={2}>Payment</Text>
                                        
                                        <VStack w='full'>
                                            <HStack fontSize={14} w='full' justify='space-between'>
                                                <Text flex={7}>Total Harga Barang</Text>
                                                <Text flex={3} textAlign='end'>{Number(totalOrder).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                                            </HStack>

                                            <HStack fontSize={14} w='full'> 
                                                <Text flex={7}>Total Harga Pengiriman</Text>
                                                <Text flex={3} textAlign='end'>{Number(shippingPrice).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                                            </HStack>
                                        </VStack>

                                        <VStack fontSize={16} justify='center' fontWeight='bold'  w='full' borderTop='1px solid #b41974' pt={1} spacing={5}>
                                            <Flex w='full' justify='space-between' pt={2}>
                                                <Text flex={7}>Total Payment</Text>
                                                <Text flex={3} textAlign='end'>{(Number(totalOrder) + Number(shippingPrice)).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                                            </Flex>
                                        </VStack>
                                    </VStack>
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
                            onClick={buatOrder}
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
