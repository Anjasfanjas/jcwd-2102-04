import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useState } from "react"
import moment from 'moment'
import { axiosInstance } from "../../../library/api"
import OrderDetailCard from "../../Card/OrderDetailCard"
import ModalUploadPayment from "../../Modal/ModalUploadPayment"


const PaymentPage = () => {
    const [dataOrder, setDataOrder] = useState()
    const [dataOrderDetail, setDataOrderDetail] = useState()
    const [dateLine, setDateLine] = useState()
    
    const router = useRouter()
    const { order_id } = router?.query
    

    const fetchDataOrder = async() => {
        try {
            const order = await axiosInstance.get(`/order/${order_id}`).then((res) => {
                const data = res.data.result
                setDataOrder(data)
                const date = (moment((moment(data.createdAt)).add(3, "days").toString()).format("LLL"))
                console.log(data.createdAt)
                setDateLine(date)
            })
            
            const orderDetail = await axiosInstance.get(`/order/detail/${order_id}`).then((res) => {
                const data = res.data.result
                setDataOrderDetail(data)
                console.log(data)
            })
            
            
        } catch (error) {
            console.log(error)
        }
    }

    const orderCard = () => {
        return dataOrderDetail?.map((val, index) => {
            return (
                <>
                    <OrderDetailCard
                        key = {index}
                        nomor= {index+1}
                        image_url = {val?.product.product_imgs[0].img_url}
                        product_name = {val?.product.product_name}
                        quantity = {val?.quantity}
                        product_unit = {val?.product.product_stocks[0].main_unit}
                        product_price = {val?.product_price}
                        total_price = {val?.total_price}
                    />
                </>
            )
        })
    }

    useEffect(() => {
        fetchDataOrder()
    }, [router?.isReady])

    return  (
        <VStack
            overflow='hidden'
            w= "60%"
            mx='auto'
            boxShadow='dark-lg'
            mt={10}
            mb={10}
            p={5}
        >
            <Text w='full' fontSize={24} fontWeight='bold' mb={5}>Menunggu Pembayaran</Text>

            <HStack w='full' p={5} justify='space-between' borderBottom='1px solid #b41974'>
                <VStack align='left' spacing={0}>
                    <Text fontWeight={400} color='grey'>Batas akhir pembayaran</Text>
                    <Text fontWeight='bold' fontSize={18}>{dateLine}</Text>
                    <Text color = 'grey' fontSize={12} >{moment(dateLine).fromNow()}</Text>
                </VStack>

                <VStack>
                    <HStack spacing={2}>
                        <Box color='white' borderRadius={5} fontSize={24} p={2} w={14} bgColor='#b41974'>
                            <VStack spacing={0}>
                                <Text>24</Text>
                                <Text fontSize={10}>Days</Text>
                            </VStack>
                        </Box>

                        <Text fontSize={32} color="#b41974">:</Text>

                        <Box color='white' borderRadius={5} fontSize={24} w={14} p={2} bgColor='#b41974'>
                            <VStack spacing={0}>
                                <Text>24</Text>
                                <Text fontSize={10}>Hours</Text>
                            </VStack>
                        </Box>

                        <Text fontSize={32} color="#b41974">:</Text>

                        <Box color='white' borderRadius={5} fontSize={24} p={2} w={14} bgColor='#b41974'>
                            <VStack spacing={0}>
                                <Text>24</Text>
                                <Text fontSize={10}>Minutes</Text>
                            </VStack>
                        </Box>
                        
                        <Text fontSize={32} color="#b41974">:</Text>

                        <Box color='white' borderRadius={5} fontSize={24} p={2} w={14} bgColor='#b41974'>
                            <VStack spacing={0}>
                                <Text>24</Text>
                                <Text fontSize={10}>Seconds</Text>
                            </VStack>
                        </Box>
                    </HStack>
                </VStack>
            </HStack>

            <VStack w='full' p={5} borderBottom='1px solid #b41974'>
                <VStack w='full' align='start' spacing={0}>
                    <Text fontSize={20} fontWeight='bold'>Ringkasan Order</Text>
                    <Text color='grey' fontSize={14}>No Invoice : {dataOrder?.no_invoice}</Text>
                    <VStack  w='full' spacing={1}>
                        {orderCard()}
                    </VStack>
                </VStack>
            </VStack>

            <VStack w='full' p={5} align='left'>
                <Text fontSize={20} fontWeight='bold'> Rincian Pembayaran</Text>
                
                <HStack spacing={8}>
                    <VStack w='50%'>
                        <Flex w='full' justify='space-between'>
                            <Text flex={4}>Biaya Total Belanja</Text>
                            <Text flex={1}>{Number(dataOrder?.order_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                        </Flex>

                        <Flex w='full' justify='space-between'>
                            <Text flex={4}>Biaya Pengiriman</Text>
                            <Text flex={1}>{Number(dataOrder?.shipping_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                        </Flex>

                        <Flex w='full' justify='space-between' fontWeight='bold' borderTop='solid 1px #b41974' pt={2}>
                            <Text flex={4}>Total Belanja</Text>
                            <Text flex={1}>{(Number(dataOrder?.order_price) + Number(dataOrder?.shipping_price)).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                        </Flex>
                    </VStack>

                    <VStack w="50%">
                        <Text fontSize={14} color='red'>* Perhatikan nominal pembayaran samapi tiga digit terakhir, kekurangan digit angka pembayaran akan dikenakan sangsi pembayaran</Text>
                        <HStack display='flex' spacing={5} justify='space-between' w='full'>
                            <Button colorScheme="red">Batalkan Order</Button>
                            <ModalUploadPayment 
                                order_id = {order_id}
                                size = 'md'
                            />
                        </HStack>
                    </VStack>
                </HStack>
            </VStack>
        </VStack>
    )
}

export default PaymentPage