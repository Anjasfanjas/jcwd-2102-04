import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  HStack,
  VStack,
  Text,
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
} from '@chakra-ui/react';
import moment from 'moment';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../../../lib/hoc/api';
import CancleButton from '../../Button/CancleButton';
import ConfirmButton from '../../Button/ConfirmButtton';
import SendOrderButton from '../../Button/SendOrderButton'

const AdminModalCheckPayment = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { order_id, user_address_id, shipping_price, total_price, btn_title } = props
    const [ paymentData, setPaymentData ] = useState()
    const [ detailOrder, setDetailOrder ] = useState([])
    const [ userAddress, setUserAddress ] = useState([])


    const fetchPaymentData = async() => {
        try {
            await axiosInstance.get(`/payment/${order_id}`).then((res) => {
                const data = res.data.result
                setPaymentData(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchOrderDetail = async() => {
        try {
            await axiosInstance.get(`/order/detail/${order_id}`).then((res) => {
                const data = res.data.result
                setDetailOrder([...data])
                console.log(data)
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    const fetchUserAddress = async() => {
        try {
            await axiosInstance.get(`/user/address/byid/${user_address_id}`).then((res) => {
                const data = res.data.result
                console.log(data)
                setUserAddress([...data])
            })
        } catch (error) {
            console.log(error)
        }
    }
    console.log(userAddress)

    const renderTabelOrder = () => {
        return detailOrder.map((val, index) => {
            return (
                <>
                    <Tr>
                        <Td>{index + 1}</Td>
                        <Td>{val.product.product_name}</Td>
                        <Td>{val.quantity}</Td>
                        <Td>
                            <HStack>
                                <Text>{val.is_racikan === true ? val.product.product_stocks[0].converted_stock : val.product.product_stocks[0].main_stock}</Text>
                                <Text>{val.is_racikan === true ? "Stock Konversi" : ''}</Text>
                            </HStack>
                        </Td>
                        <Td>{Number(val.is_racikan === true ? val.product.product_stocks[0].converted_sell_price : val.product.product_stocks[0].sell_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Td>
                        <Td>
                            <Text>{val.is_racikan === true ? val.nama_racikan : "Bukan"}</Text>
                        </Td>
                    </Tr>
                </>
            )
        })
    }

    useEffect(() => {
        fetchPaymentData()
        fetchOrderDetail()
        fetchUserAddress()
    }, [order_id])

    return (
        <>
            <Button onClick={onOpen} size='xs' color='white' colorScheme='orange'>{btn_title}</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent minW = '70vw'>
                <ModalHeader >Details Pembayaran</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <HStack align='start'>
                        <VStack align='start'>
                            <Image
                                src={ paymentData ? "http:/" + paymentData?.payment_reciep_url : ''}
                                alt=''
                                width={350}
                                height={500}
                            />
                            <Text>Uploaded At :  {moment(paymentData?.createdAt).format("LLL")}</Text>
                            <Text>Order ID :  {order_id}</Text>
                        </VStack>

                        <VStack w='60%'>
                            <VStack>
                                <Text w='full' fontWeight='bold'>{userAddress[0]?.name}, +62{userAddress[0]?.phone_number}</Text>
                                <Text w='100%'>{userAddress[0]?.address_line}, {userAddress[0]?.province}, {userAddress[0]?.city}, {userAddress[0]?.post_code} </Text>
                            </VStack>

                            <Text fontWeight='bold'>Rincian Order</Text>
                            <Box maxH={400} overflow='scroll' w='full'>
                                <TableContainer w='full' p={2} >
                                    <Table size='sm' variant='striped'>
                                        <Thead>
                                            <Tr>
                                                <Th textAlign='center' p={5}>No.</Th>
                                                <Th textAlign='center'>Product</Th>
                                                <Th textAlign='center'>Quantity</Th>
                                                <Th textAlign='center'>Stock</Th>
                                                <Th textAlign='center'>Harga</Th>
                                                <Th textAlign='center'>Resep Dokter</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {renderTabelOrder()}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Box>


                            <VStack w='full' p={5}>
                                <Text fontWeight='bold'>Rincian Pembayaran</Text>
                                <Flex w='full' justify='space-between'>
                                    <Text flex={7}>Biaya Total Belanja</Text>
                                    <Text flex={3} textAlign='end'>{Number(total_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                                </Flex>

                                <Flex w='full' justify='space-between'>
                                    <Text flex={7}>Biaya Pengiriman</Text>
                                    <Text flex={3} textAlign='end'>{Number(shipping_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                                </Flex>

                                <Flex w='full' justify='space-between' fontWeight='bold' borderTop='solid 1px #b41974' pt={2}>
                                    <Text flex={7}>Total Belanja</Text>
                                    <Text flex={3} textAlign='end'>{(Number(total_price) + Number(shipping_price)).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                                </Flex>
                            </VStack>
                        </VStack>

                    </HStack>
                    
                </ModalBody>

                <ModalFooter>
                    <HStack>
                        <CancleButton size = 'md' order_id = {order_id}/>

                        {
                            btn_title === "Buat Order" ? null : <ConfirmButton size = 'md' order_id = {order_id}/>
                        }
                        <SendOrderButton size = 'md' order_id = {order_id} daftar_product={detailOrder}/>
                    </HStack>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AdminModalCheckPayment;
