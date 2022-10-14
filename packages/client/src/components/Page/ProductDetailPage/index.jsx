import { Box, Button, Center, Flex, HStack, Icon, Input, PinInput, PinInputField, Stack, Text, useToast, VStack } from "@chakra-ui/react"
import Image from "next/image"
import { useCounter } from "@chakra-ui/counter"
import { HiPlus, HiMinus } from "react-icons/hi"
import { BiCartAlt} from "react-icons/bi"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { axiosInstance } from "../../../library/api"
import { useDispatch, useSelector } from "react-redux"
import render_types from "../../../redux/reducers/types/render"
import qs from "qs"

const ProductDetail = () => {
    const router = useRouter()
    const [ counter, setCounter ] = useState(0)
    const [ product, setProduct ] = useState()
    const [ desc, setDesc ] = useState()
    const [ quantity, setQuantity ] = useState(1)

    const userSelector = useSelector((state) => {return state.auth})
    const autoRender = useSelector((state) => {return state.render})

    const dispatch = useDispatch()
    const { product_id } = router.query

    const toast = useToast()

    const fetchDataProduct = async () => {
        try {
            console.log(product_id)
            await axiosInstance.get(`/product/${product_id}`).then((res) => {
                const data = res.data.result
                console.log(data)
                setProduct(data)
                setDesc(data.product_description)
            })

        } catch (error) {
            console.log(error)
        }
    }

    const addToCart = async () => {
        const body = {
            product_price: product?.product_stocks[0].sell_price,
            quantity: quantity,
            user_id: userSelector?.id,
            product_id: product_id,
        }

        try {
            await axiosInstance.post('/cart', qs.stringify(body)).then((res) => {
                toast({
                    title: `${product?.product_name} has been added to your cart`,
                    status: 'success',
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

    useEffect(() => {
        fetchDataProduct()

    }, [router?.isReady])

    return (
        <Flex
            flexDir='row'
            overflow='hidden'
            maxW= "80%"
            mx='auto'
            boxShadow='dark-lg'
            mt={10}
            mb={10}
            minH='80vh'
        >
            <Flex flex={4} flexDir='column'>
                <VStack flex={1} p={5}>
                    <Image
                        alt='gambar product'
                        src={product ?  `http://${product?.product_imgs[0]?.img_url}` : ""}
                        width={200}
                        height={200}
                    />
                </VStack>
            </Flex>

            <VStack flex={5} p={4}>
                {/* Box harga dan nama product */}
                <VStack w='full' align='start' spacing={3}>
                    <VStack spacing={0} w='80%'h='full'>
                        <Text w='full' fontWeight='bold' fontSize={14}>{product?.product_categories[0].category.category}</Text>
                        <Text w='full' fontSize={22}>{product?.product_name}</Text>
                        
                        <HStack w='full'>
                            <Text fontWeight='bold' fontSize={24}>{Number(product?.product_stocks[0].sell_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>                        
                            <Text fontSize={15}>/ {product?.product_stocks[0].main_unit} </Text>
                        </HStack>
                    </VStack>

                    <HStack>
                        <Button disabled={quantity < 1 ? true : false} onClick={() => {setQuantity(quantity - 1)}} size='sm'>
                            <Icon as={HiMinus}/>
                        </Button>
                        
                        <Input value={quantity} type='number'w={70} mx='auto' size='sm' justifySelf='center'/>
                        
                        <Button disabled={quantity >= product?.product_stocks[0].main_stock ? true : false } onClick={() => {setQuantity(quantity + 1)}} size='sm'>
                            <Icon as={HiPlus}/>
                        </Button>
                        <Text w='full' fontSize={12}>Stock tersisa {product?.product_stocks[0].main_stock}</Text>
                    </HStack>

                    <HStack>
                        <Button disabled={quantity <= 0 ? true : false} colorScheme="green" justifyContent='space-evenly' onClick={addToCart}>
                            <Icon as={BiCartAlt} mr={2}/>
                            <Text>Add to Cart</Text>
                        </Button>
                    </HStack>
                </VStack>

                {/* Box description */}
                <VStack w='full' paddingY={7}>
                    <Center borderY='1px' w='full' h={10} align='center' fontSize={14}>
                        <Text flex={1} fontWeight='bold'>Description</Text>
                    </Center>

                    <VStack w='full' spacing={5}>
                        <HStack w='full' align='start'>
                            <Text flex={1} fontWeight='bold'>Indikasi / Kegunaan</Text>
                            <Text flex={1}>{desc?.kegunaan}</Text>
                        </HStack>

                        <HStack w='full' align='start'>
                            <Text flex={1} fontWeight='bold'>Kemasan</Text>
                            <Text flex={1}>{desc?.kemasan}</Text>
                        </HStack> 

                        <HStack w='full' align='start'>
                            <Text flex={1} fontWeight='bold'>Golongan</Text>
                            <Text flex={1}>{desc?.golongan}</Text>
                        </HStack> 

                        <HStack w='full' align='start'>
                            <Text flex={1} fontWeight='bold'>Butuh resep</Text>
                            <Text flex={1}>{String(desc?.need_prescription)}</Text>
                        </HStack> 

                        <HStack w='full' align='start'>
                            <Text flex={1} fontWeight='bold'>Cara penyimpanan</Text>
                            <Text flex={1}>{desc?.cara_penyimpanan}</Text>
                        </HStack> 

                        <HStack w='full' align='start'>
                            <Text flex={1} fontWeight='bold'>Nomor Ijin Edar (NIE)</Text>
                            <Text flex={1}>{desc?.nomor_ijin_edar}</Text>
                        </HStack>

                        <HStack w='full' align='start'>
                            <Text flex={1} fontWeight='bold'>Cara Pakai</Text>
                            <Text flex={1}>{desc?.cara_pakai}</Text>
                        </HStack>     

                        <HStack w='full' align='start' color='red'>
                            <Text flex={1} fontWeight='bold'>Peringatan</Text>
                            <Text flex={1}>{desc?.pringatan}</Text>
                        </HStack>  
                    </VStack>
                </VStack>
            </VStack>

        </Flex>
    )
}

export default ProductDetail