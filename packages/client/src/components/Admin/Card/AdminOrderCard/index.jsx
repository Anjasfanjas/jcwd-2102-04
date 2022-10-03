import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Button, Divider, Flex, Grid, HStack, Text, VStack } from "@chakra-ui/react"
import moment from "moment/moment"
import Image from "next/image"
import { useState } from "react"




const AdminOrderCard = (props) => {
    const {order_status, date, total_price, no_invoice, product_order } = props
    const [ product, setProduct ] = useState(product_order)
    const [ recentSeeMore, setRecentSeeMore ] = useState(false)

    const renderBoxProduct = () => {
        return (
            recentSeeMore === false ? (
                <>
                    <HStack display='flex' px={2}> 
                        <Box alignItems='center' flex={1}>
                            <Image
                                src={product ? `http:/${product[0].product.product_imgs[0].img_url}` : ""}
                                alt=""
                                width={120}
                                height={120}
                            />
                        </Box>
                        
                        <VStack flex={3}>
                            <Flex align='center' justify='left' w='100%' fontSize={16} fontWeight='bold'>
                                <Text>{product[0].product.product_name}</Text>
                            </Flex>
                            <Text w='full' flex={1} align='left'>{product[0].quantity} X {Number(product[0].product_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                        </VStack>
    
                        <VStack align='start' fontWeight='bold'>
                            <Text w='full' mt={2} flex={8}>TOTAL HARGA</Text>
                            <Text w='full' mt={2} flex={2}>{Number(product[0].quantity * product[0].product_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                        </VStack>
                    </HStack>
                </>
            ) : (
                product.map((val) => {
                    return (
                        <>
                            <HStack display='flex' px={2}> 
                                <Box alignItems='center' flex={1}>
                                    <Image
                                        src={val ? `http:/${val.product.product_imgs[0].img_url}` : ""}
                                        alt=""
                                        width={120}
                                        height={120}
                                    />
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
                { order_status === "Menunggu Pembayaran" || "Menunggu Konfirmasi Pembayaran" ? (
                        <Button size='xs' colorScheme="red">Cancle Order</Button>
                    ) : null
                }

                { order_status === "Menunggu Konfirmasi Pembayaran" ? (
                        <>
                            <Button size='xs' colorScheme="yellow">Check Upload Pembayaran</Button>
                            <Button size='xs' colorScheme="green">Konfirmasi Pembayaran</Button>
                        </>
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
                        <Text>{order_status}</Text>
                        <Text ml={2} color='grey'>{moment(date).format("LLL")}</Text>
                    </Flex>
                    
                    {ButtonContainer()}
                </Flex>

                {/* ini adalah box item satuan */}
                    {renderBoxProduct()}

                {/* ini buat divider dan total order kebawah */}
                <HStack w='full' textAlign='center'>
                    <Divider borderColor='#005E9D'/>
                    <Text w='15%' cursor='pointer' fontSize={16} onClick ={() => {setRecentSeeMore(!recentSeeMore)}}>{recentSeeMore === false ? "see more" : "see less"}</Text>
                    <Divider borderColor='#005E9D'/>
                </HStack>

                <Flex justify='center' fontWeight='bold' borderColor='#005E9D' mt={2} px={2}>
                    <Text mt={2} flex={8}>TOTAL ORDER</Text>
                    <Text mt={2} flex={2} align='end'>{Number(total_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                </Flex>
            </Box>
        </Grid>
    )   
}

export default AdminOrderCard