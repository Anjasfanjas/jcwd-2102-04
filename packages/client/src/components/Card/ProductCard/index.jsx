import { Button, GridItem, HStack, Link, Stack, Text, Tooltip, useToast, VStack } from "@chakra-ui/react"
import Image from "next/image"
import { useState } from "react"
import { axiosInstance } from "../../../library/api"
import { useDispatch, useSelector } from "react-redux"
import auth_types from "../../../redux/reducers/types/auth"
import render_types from "../../../redux/reducers/types/render"
import qs from "qs"

const ProductCard = (props) => {
    const userSelector = useSelector((state) => {return state.auth})
    const autoRender = useSelector((state) => state.render)
    const dispatch = useDispatch()
    const [ onHover, setOnHover ] = useState(false)
    const { 
        product_name, 
        product_image, 
        product_id, 
        product_category, 
        product_price ,
        color
    } = props

    const body = {
        product_price: product_price,
        quantity: 1,
        user_id: userSelector?.id,
        product_id: product_id,
    }
    
    const toast = useToast()
    console.log(body)

    const addToCart = async () => {
        try {
            await axiosInstance.post('/cart', qs.stringify(body)).then((res) => {
                toast({
                    title: `${product_name} has been added to your cart`,
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

    const hoverWhenNotLogin = () => {
        return (
            toast({
                title: `you need to loggin`,
                status: 'warning',
                duration: 1000
            })
        )
    }

    return (
        <GridItem>
            <Stack w='full' h='full' borderRadius='.5em' className='product-card' cursor='pointer' bgColor='white'>
                <VStack>
                    <Link href={`/product/${product_id}`} _hover={{textDecoration: 'none'}} w='full' align='center'>
                        <Image
                            alt=''
                            src={product_image}
                            width='100px'
                            height='100px'
                            layout='fixed'
                        />

                        <Stack align='center' justify='center' w='full' spacing={2} textAlign='center'>
                            <Text fontWeight='bold' fontSize={14}>{product_name}</Text>
                            <HStack>
                                { product_category.map((val) => {
                                    return (
                                            <>
                                                <Text fontSize={12} color='grey' border='1px' borderColor='grey' p={1} borderRadius={15}>{val.category.category}</Text>
                                            </>
                                        )
                                    })
                                }
                            </HStack>
                            <Text fontWeight='bold'>{Number(product_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                        </Stack>
                    </Link>
                    <Tooltip label={"you need to login"} hidden={userSelector?.id ? true : false}>
                        <Button 
                            w='full' 
                            borderBottomRadius={'.5em'} 
                            borderTopRadius={0} 
                            bgColor= {color} 
                            color='white'
                            _hover={{
                                backgroundColor: "#e3eeee",
                                color: color,
                            }}
                            disabled={ userSelector?.id ? false : true}
                            onClick={() => {addToCart()}}
                        >
                            Add to Cart
                        </Button>
                    </Tooltip>
                </VStack>
            </Stack>
        </GridItem>
    )
}

export default ProductCard