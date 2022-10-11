import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Button, Center, Divider, Flex, Grid, HStack, Text, useToast, VStack } from "@chakra-ui/react"
import moment from "moment/moment"
import Image from "next/image"
import { useRouter } from "next/router"
import QueryString from "qs"
import { useState } from "react"
import { axiosInstance } from "../../../lib/hoc/api"
import ModalUploadPayment from "../../Modal/ModalUploadPayment"



const UserOrderCard = (props) => {
    const { product_name, product_price, quantity, order_status, total_price, no_invoice, product_img, date, order_id, data_product } = props
    const [ recentSeeMore, setRecentSeeMore ] = useState(false)
    const [ product, setProduct ] = useState(data_product)

    const router = useRouter()  
    const toast = useToast()

    console.log(order_id)

    const changeOrderStatus = async() => {
        try {
            await axiosInstance.patch("/order/update/status", QueryString.stringify({
                order_id, 
                order_status_id : 6
            })).then(() => {
                toast({
                    title: 'terimakasih sudah mengkonfirmasi',
                    status: 'success',
                    duration: 1000
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
                                    src={ product_img ? `http:/${product_img}` : ""}
                                    alt=""
                                    width={120}
                                    height={120}
                                />
                            )
                        }
                        
                    </Box>
                    
                    <VStack flex={3}>
                        <Flex align='center' justify='left' w='100%' fontSize={16} fontWeight='bold'>
                            <Text>{product_name}</Text>
                        </Flex>
                        <Text w='full' flex={1} align='left'>{quantity} X {Number(product_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                    </VStack>

                    <VStack align='start' fontWeight='bold'>
                        <Text w='full' mt={2} flex={8}>TOTAL HARGA</Text>
                        <Text w='full' mt={2} flex={2}>{Number(quantity * product_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                    </VStack>
                </HStack>
            ) : (
                product?.map((val) => {
                    return (
                        <>
                            <HStack display='flex' px={2}> 
                                <Box alignItems='center' flex={1}>
                                    {
                                        product_img === "" ? (
                                            <Center width={120} height={120}>Resep Docter </Center>
                                        ) : 
                                        (
                                            <Image
                                                src={`http:/${val.product.product_imgs[0].img_url}`}
                                                alt=""
                                                width={120}
                                                height={120}
                                            />
                                        )
                                    }
                                    
                                </Box>
                    
                                <VStack flex={3}>
                                    <Flex align='center' justify='left' w='100%' fontSize={16} fontWeight='bold'>
                                        <Text>{val.product.product_name}</Text>
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
                        <Button size='xs' colorScheme="red">Cancle Order</Button>
                    ) : null
                }

                { order_status === "Menunggu Pembayaran" ? (
                        <ModalUploadPayment 
                            order_id = {order_id}
                            size = 'xs'
                        />
                    ) : order_status === "Dikirim" ? (
                        <Button onClick={() => changeOrderStatus()} size='xs' colorScheme="green">Konfirmasi</Button>
                    ) : null
                }
            </HStack>
        )
    }

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
                        <Text w='50%' cursor='pointer' fontSize={16} onClick ={() => {setRecentSeeMore(!recentSeeMore)}}>{recentSeeMore === false ? "see more" : "see less"}</Text>
                        <Divider borderColor='#005E9D'/>
                </HStack> 

                <Flex justify='center' fontWeight='bold' mt={2} px={2}>
                    <Text mt={2} flex={8}>TOTAL ORDER</Text>
                    <Text mt={2} flex={2} align='end'>{Number(total_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                </Flex>
            </Box>
        </Grid>
    )   
}

export default UserOrderCard