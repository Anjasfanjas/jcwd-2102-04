import { AddIcon } from "@chakra-ui/icons"
import { Divider, Flex, FormControl, HStack, Text, VStack, Select, Button, Box, IconButton, Link } from "@chakra-ui/react"
import axios from "axios"
import { useRouter } from "next/router"
import qs from "qs"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { axiosInstance } from "../../../library/api"
import AddressCard from "../../Card/AddressCard"
import CartCard from "../../Card/CartCard"
import ModalAddress from "../../Modal/ModalAddress"
import ModalChangeAddress from "../../Modal/ModalChangeAddress"


const OrderPage = () => {
    const [ userAddress, setUserAddress ] = useState([])
    const [addressDefault, setAddressDefault ] = useState({})
    const [ cart, setCart ] = useState([])
    const [ deliveryOption, setDeliveryOption ] = useState()
    
    let totalPrice = 0
    const router = useRouter()
    const userSelector = useSelector((state) => state.auth)

    const fetchUserAddress = async() => {
        try {
            await axiosInstance.get(`/user/address/${userSelector?.id}`).then((res) => {
                const data = res.data.result 
                setUserAddress([...data])
                data.map((val) => {
                    val.isDefault ? setAddressDefault({...val}) : null
                })

            })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDataCart = async() => {
        try {
            await axiosInstance.get(`/cart/${userSelector?.id}`).then((res) => {
                const data = res.data.result
                console.log(data)
                setCart([...data])
            })
        } catch (error) {
            console.log(error)
        }
    }

    

    const renderDataCart = () => {
        return cart.map((val) => {
            totalPrice += (val.product_price * val.quantity)
            return (
                <>
                    <CartCard
                        product_name = {val.product.product_name}
                        product_price = {val.product_price}
                        quantity = {val.quantity}
                        image_url = {val.product.product_imgs[0].img_url}
                        product_stock = {val.product.product_stocks[0].stock}
                    />
                </>
            )
        })
    }

    const selectedAddress = () => {
        return (
            <VStack w='full' p={2} fontSize={16} align='start'>
                <HStack w='full' align='center' justify='space-between'>
                    <Text fontWeight='bold'>{addressDefault.name}, +62{addressDefault.phone_number}</Text>
                    <ModalChangeAddress
                        userAddress = {userAddress}
                    />
                </HStack>
                
                <Text w='60%'>{addressDefault.address_line}, {addressDefault.province}, {addressDefault.city}, {addressDefault.post_code} </Text>
            </VStack>
        )
    }

    const renderDataOrder = async() => {
        const order = await axiosInstance.post("/order", {
            user_id: userSelector?.id,
            order_price: totalPrice,
            user_address_id: addressDefault?.id
        })
        
        cart.map(async(val) => {
            try {
                await axiosInstance.post('/order/detail', {
                        product_id: val.product_id,
                        user_id: userSelector?.id,
                        quantity: val.quantity,
                        product_price: val.product_price,
                        order_id : order?.data.result.id
                    }
                )
            } catch (error) {
                console.log(error)
            } 
        })

        router.push(`/payment/${order.data.result.id}`)

    }

    const deliveryCost = async (courier) => {
        console.log(courier)
        const body = {
            origin: 457,
            destination: addressDefault?.city_id,
            weight: 10000,
            courier: courier
        }

        try {
            await axios.post("https://api.rajaongkir.com/starter/cost" , {headers: {"key" : "d2bbf841ca82c43bf952e17f16213b91"}}, qs.stringify(body)).then((res) => {
                console.log(res)
                const data = res.data.rajaongkir.results
                setDeliveryOption(data)
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        fetchUserAddress()
        selectedAddress()
        fetchDataCart()
        renderDataCart()
        deliveryCost()
    }, [])
    
    return (
        <HStack
            overflow='hidden'
            maxW= "90%"
            mx='auto'
            boxShadow='dark-lg'
            my={10}
            p={5}
            spacing={10}
            align='start'
        >

            <VStack flex={2} spacing={10} p={3}>
                <VStack w='full'>
                    <HStack w='full' borderBottom='1px solid #b41974' pb={2} mb={2} align='center'>
                        <Text fontWeight='bold'>Alamat Pengirim</Text>
                        <Box hidden={ userAddress.length >= 3 ? true : false}>
                            <ModalAddress/>
                        </Box>
                    </HStack>
                    {selectedAddress()}
                </VStack>

                <VStack w='full' align='left'>
                    <Text w='full' fontWeight='bold' borderBottom='1px solid #b41974' pb={3} mb={2}>Ringkasan order</Text>
                    <VStack w='full' align='left' spacing={5}>
                        {renderDataCart()}
                    </VStack>
                </VStack>
            </VStack> 
  
            <VStack flex={1} p={3}>
                <VStack w='full' align='left'>
                    <Text w='full' fontWeight='bold' borderBottom='1px solid #b41974' pb={1} mb={2}>Pilh jasa penigirman</Text>

                    <FormControl w='full'>
                        <Select placeholder='Daftar ekspedisi' onChange={(event) => {deliveryCost(event.target.value); alert('aa'); console.log(deliveryCost)}}>
                            <option value='jne'>JNE</option>
                            <option value='post'>Post Indonesia</option>
                            <option value='tiki'>Tiki</option>
                        </Select>
                    </FormControl>

                    {
                        deliveryOption ? (
                            <VStack w='full' align='left'>
                                <Text w='full' fontWeight='bold' borderBottom='1px solid #b41974' pb={1} mb={2}>Pilih Paket Pengiriman dari</Text>

                                <FormControl w='full'>
                                    <Select placeholder='Daftar ekspedisi' onChange={(event) => {deliveryCost(event.target.value)}}>
                                        {deliveryOption.costs[0].map((val) => {
                                            return (
                                                <>
                                                    <option value={val.cost[0].value}>
                                                        <VStack>
                                                            <Text fontWeight='bold'>{val.service}</Text>
                                                            <Text>{val.description}</Text>
                                                        </VStack>
                                                        <Text>Estimasi Waktu {val.cost[0].etd} Hari</Text>
                                                        <Text>{Number(val.cost[0].value).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                                                    </option>
                                                </>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </VStack>
                        ) : null
                    }
                </VStack>

                <VStack borderRadius='1em' boxShadow='dark-lg' align='center' w='full' p={3}>
                    <Text w='full' fontWeight='bold' borderBottom='1px solid #b41974' pb={2} mb={2}>Payment</Text>
                    
                    <VStack w='90%'>
                        <HStack fontSize={14} w='full' justify='space-between'>
                            <Text>Total Harga Barang</Text>
                            <Text>{Number(totalPrice).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                        </HStack>

                        <HStack fontSize={14} w='full'>
                            <Text flex={1}>Total Harga Pengiriman</Text>
                            <Text flex={1}></Text>
                        </HStack>
                    </VStack>

                    <VStack fontSize={16} justify='center' fontWeight='bold'  w='full' borderTop='1px solid #b41974' pt={1} spacing={5}>
                        <Flex justify='space-between' w='90%'>
                            <Text>Total Payment</Text>
                            <Text>{Number(totalPrice).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                        </Flex>
                        
                        <Link w='full' _hover={{textDecoration: 'none'}}>
                            <Button 
                                w='full'
                                mt={10} 
                                colorScheme="blue"
                                onClick={() => {renderDataOrder()}}
                            >
                                Confirm!
                            </Button>
                        </Link>
                    </VStack>
                </VStack>
            </VStack>
        </HStack>
    )
}

export default OrderPage