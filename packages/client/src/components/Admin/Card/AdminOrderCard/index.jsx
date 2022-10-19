import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Button, Center, Divider, Flex, Grid, HStack, Text, VStack, Image } from "@chakra-ui/react"
import moment from "moment/moment"
import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { axiosInstance } from "../../../../lib/hoc/api"
import CancleButton from "../../Button/CancleButton"
import AdminModalCheckPayment from "../../Modal/AdminCheckUploadPayment"
// import AdminModalCheckPayment from "../../Modal/AdminModelCheckPayment"

const AdminOrderCard = (props) => {
    const {order_status, date, total_price, no_invoice, product_order, order_id, shipping_price, user_address_id, user_prescription, user_prescription_url } = props
    const [ product, setProduct ] = useState(product_order)
    const [ recentSeeMore, setRecentSeeMore ] = useState(false)
    const autoRender = useSelector((state) => state.render)

    const renderBoxProduct = () => {
        return (
            recentSeeMore === false ? (
                <>
                    <HStack display='flex' px={2}> 
                        <Center flex={1}>
                        { user_prescription === false ? (
                            <Image
                                src={product ? `https:/${product[0]?.product.product_imgs[0].img_url}` : ""}
                                alt=""
                                width={120}
                                height={120}
                            /> ) : (
                                <Image
                                    src={ product ? `https:/${user_prescription_url}` : ''}
                                    alt=""
                                    width={120}
                                    height={120}
                                />
                            ) 
                        }
                        </Center>
                        
                        <VStack flex={3}>
                            <Flex align='center' justify='left' w='100%' fontSize={16} fontWeight='bold'>
                                <Text>{ user_prescription === false ?
                                    product[0]?.product.product_name : 'RESEP DOKTER'
                                }</Text>
                            </Flex>
                            <Text hidden={user_prescription === false ? false : true} w='full' flex={1} align='left'>{product[0]?.quantity} X {Number(product[0]?.product_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                        </VStack>
    
                        <VStack align='start' fontWeight='bold' hidden={user_prescription === false ? false : true}>
                            <Text w='full' mt={2} flex={8}>TOTAL HARGA</Text>
                            <Text w='full' mt={2} flex={2}>{Number(product[0]?.quantity * product[0]?.product_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                        </VStack>
                    </HStack>
                </>
            ) : (
                product.map((val) => {
                    return (
                        <>
                            <HStack display='flex' px={2}> 
                                <Center alignItems='center' flex={1}>
                                    <Image
                                        src={val ? `https:/${val.product.product_imgs[0].img_url}` : ""}
                                        alt=""
                                        width={120}
                                        height={120}
                                    />
                                </Center>
                                
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
            <>
                { order_status === "Menunggu Pembayaran" || order_status === "Diproses" ? (
                        <HStack>
                            <CancleButton size = {'xs'} order_id = {order_id}/>
                        </HStack>
                    ) : null
                }

            
                { order_status === "Menunggu Konfirmasi Pembayaran" || order_status === "Diproses" ? 
                    (
                        <HStack>
                            <AdminModalCheckPayment
                                btn_title = {order_status === "Menunggu Konfirmasi Pembayaran" ? 'Check Paypment Upload' : "Buat Order"}
                                order_id = {order_id}
                                user_address_id = {user_address_id}
                                shipping_price = {shipping_price}
                                total_price = {total_price}
                            />
                        </HStack>
                    ) : null
                }
            </>
        )
    }

    return (
        <Grid templateColumns = 'repeat(1, 1fr)' gap={3} mb={5}> 
            <Box p={3} boxShadow='dark-lg' borderRadius={5}>
                <Flex justifyContent='space-between' mb={1}>
                    <Flex fontSize={12} fontWeight='bold'>
                        <Text mr={2} pr={2} borderRight='1px' borderColor="black">{no_invoice}</Text>
                        <Text>{order_status}</Text>
                        <Text ml={2} color='grey'>{moment(date).format("LLL")}</Text>
                    </Flex>
                    <HStack>
                        {ButtonContainer()}
                    </HStack>
                </Flex>

                {/* ini adalah box item satuan */}
                    {renderBoxProduct()}

                {/* ini buat divider dan total order kebawah */}
                <HStack w='full' textAlign='center' hidden={user_prescription === true ? true : false}>
                    <Divider borderColor='#005E9D'/>
                    <Text w='15%' cursor='pointer' fontSize={16} onClick ={() => {setRecentSeeMore(!recentSeeMore)}}>{recentSeeMore === false ? "see more" : "see less"}</Text>
                    <Divider borderColor='#005E9D'/>
                </HStack>

                <Flex justify='center' fontWeight='bold' borderColor='#005E9D' mt={2} px={2}>
                    <Text mt={2} flex={8}>TOTAL ORDER</Text>
                    <Text mt={2} flex={2} align='end'>{(Number(total_price) + Number(shipping_price)).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                </Flex>
            </Box>
        </Grid>
    )   
}

export default AdminOrderCard