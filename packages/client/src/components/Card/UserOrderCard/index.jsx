import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Button, Center, Divider, Flex, Grid, HStack, Text, useToast, VStack, Image } from "@chakra-ui/react"
import moment from "moment/moment"
import { useRouter } from "next/router"
import QueryString from "qs"
import { useEffect } from "react"
import { useState } from "react"
import { axiosInstance } from "../../../lib/hoc/api"
import ModalUploadPayment from "../../Modal/ModalUploadPayment"
import render_types from "../../../redux/reducers/types/render"
import { useDispatch, useSelector } from "react-redux"

const UserOrderCard = (props) => {
    const { product_name, product_price, quantity, order_status, total_price, no_invoice, product_img, date, order_id, data_product, shipping_price } = props
    const [ recentSeeMore, setRecentSeeMore ] = useState(false)
    const [ product, setProduct ] = useState([])

    const autoRender = useSelector((state) => state.render)


    const router = useRouter()  
    const toast = useToast()
    const dispatch = useDispatch()

    const fetchOrderDetail = async() => {
        try {
            await axiosInstance.get(`/order/detail/${order_id}`).then((res) => {
                const data = res.data.result
                console.log(data)
                setProduct([...data])
            })
        } catch (error) {
            console.log(error)
        }
    }
    console.log(data_product)
    console.log(order_id)

    const changeOrderStatus = async(order_status_id) => {
        try {
            await axiosInstance.patch("/order/update/status", QueryString.stringify({
                order_id, 
                order_status_id : order_status_id
            })).then(() => {
                toast({
                    title: order_status_id === 6 ?'terimakasih sudah mengkonfirmasi' : "order anda sudah di cancle",
                    status: order_status_id === 6 ? 'success' : 'error',
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

    const renderOrderDetail = () => {
        return (
            recentSeeMore === false ? (
                <HStack display='flex' px={2}> 
                    <Box alignItems='center' flex={1}>
                        {
                            product_img === "" ? (
                                <Center width={120} height={120}>Resep Docter </Center>
                            ) : 
                            (
                                <Image
                                    src={`https:/${product_img}`}
                                    alt=""
                                    width={120}
                                    height={120}
                                />
                            )
                        }
                    </Box>
                    
                    <VStack flex={3}>
                        <Flex align='center' justify='left' w='100%' fontSize={16} fontWeight='bold'>
                            <Text>{product[0]?.product.product_name} {product[0]?.is_racikan === true ? `Racikan Obat : ${product[0]?.nama_racikan}` : ''}</Text>
                        </Flex>
                        <Text w='full' flex={1} align='left'>{quantity} X {Number(product_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                    </VStack>

                    <VStack align='start' fontWeight='bold'>
                        <Text w='full' mt={2} flex={8}>TOTAL HARGA</Text>
                        <Text w='full' mt={2} flex={2}>{Number(quantity * product_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                    </VStack>
                </HStack>
            ) : (
                product?.map((val, index) => {
                    console.log(val)
                    console.log(product)
                    return (
                        <>
                            <HStack key={index} display='flex' px={2}> 
                                <Box alignItems='center' flex={1}>
                                    {
                                        product_img === "" ? (
                                            <Center width={120} height={120}>Resep Docter </Center>
                                        ) : 
                                        (
                                            <Image
                                                src={`https:/${val.product.product_imgs[0].img_url}`}
                                                alt=""
                                                width={120}
                                                height={120}
                                            />
                                        )
                                    }
                                </Box>
                    
                                <VStack flex={3}>
                                    <Flex align='center' justify='left' w='100%' fontSize={16} fontWeight='bold'>
                                        <Text>{val.product.product_name} {val.is_racikan === true ? `Racikan Obat : ${val.nama_racikan}`: ''}</Text>
                                    </Flex>
                                    <Text w='full' flex={1} align='left'>{val.quantity} X {Number(val.product_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                                </VStack>

                                <VStack align='start' fontWeight='bold'>
                                    <Text w='full' mt={2} flex={8}>TOTAL HARGA</Text>
                                    <Text w='full' mt={2} flex={2}>{Number(val.quantity * val.product_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                                </VStack>
                            </HStack>
                        </>
                    )
                })
            )
        )
    }

    const ButtonContainer = () => {
        return (
            <HStack>
                { order_status === "Menunggu Pembayaran" ? (
                        <Button onClick={() => changeOrderStatus(4)} size='xs' colorScheme="red">Cancle Order</Button>
                    ) : null
                }

                { order_status === "Menunggu Pembayaran" ? (
                        <ModalUploadPayment 
                            order_id = {order_id}
                            size = 'xs'
                        />
                    ) : order_status === "Dikirim" ? (
                        <Button onClick={() => changeOrderStatus(6)} size='xs' colorScheme="green">Konfirmasi</Button>
                    ) : null
                }
            </HStack>
        )
    }

    useEffect(() => {
        fetchOrderDetail()
    }, [order_id, autoRender])

    return (
        <Grid templateColumns = 'repeat(1, 1fr)' gap={3} mb={5}> 
            <Box p={3} boxShadow='dark-lg' borderRadius={5}>
                <Flex justifyContent='space-between' mb={1}>
                    <Flex fontSize={12} fontWeight='bold'>
                        <Text mr={2} pr={2} borderRight='1px' borderColor="black">{no_invoice}</Text>
                        <Text mr={2} pr={2} borderRight='1px solid black'>{moment(date).format("L")}</Text>
                        <Text>{order_status}</Text>
                    </Flex>
                    
                    {ButtonContainer()}
                </Flex>

                {/* ini adalah box item satuan */}
                {renderOrderDetail()}

                <HStack w='full' textAlign='center'>
                        <Divider borderColor='#005E9D'/>
                        <Text w='50%' cursor='pointer' fontSize={16} onClick ={() => {setRecentSeeMore(!recentSeeMore)}}>{recentSeeMore === false ? `see more` : `see less`}</Text>
                        <Divider borderColor='#005E9D'/>
                </HStack> 

                <VStack w='full' spacing={0}>
                    <Flex justify='center' w='full' py={0} px={2} fontSize={14}>
                        <Text flex={8} ml={3}>Total Belanja</Text>
                        <Text flex={2} align='end'>{Number(total_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                    </Flex>
                    <Flex justify='center' w='full' py={0} px={2} fontSize={14}>
                    <Text flex={8} ml={3}>Biaya Pengiriman</Text>
                        <Text flex={2} align='end'>{Number(shipping_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                    </Flex>
                    <Flex justify='center' w='full' fontWeight='bold' py={0} px={2}>
                        <Text mt={2} flex={8}>TOTAL ORDER</Text>
                        <Text mt={2} flex={2} align='end'>{(Number(total_price) + Number(shipping_price)).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                    </Flex>
                </VStack>

            </Box>
        </Grid>
    )   
}

export default UserOrderCard