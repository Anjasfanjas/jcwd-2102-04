import {
    Avatar,
    AvatarBadge,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    HStack,
    Icon,
    Input,
    Link,
    Stack,
    Text,
    textDecoration,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import React from "react";
import { BiCartAlt } from "react-icons/bi";
import { useEffect, useState } from "react"
import { axiosInstance } from "../../../library/api"
import { useDispatch, useSelector } from "react-redux"
import CartCard from "../../Card/CartCard";
import { DeleteIcon } from "@chakra-ui/icons";
import render_types from "../../../redux/reducers/types/render";
import qs from "qs";

const DrawerCart = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ cart, setCart ] = useState([])
    const [ totalCartPrice, setTotalCartPrice ] = useState(0)
    const btnRef = React.useRef();
    const toast = useToast()
    
    const userSelector = useSelector((state) =>  state.auth)
    const autoRender = useSelector((state) => state.render)
    const dispatch = useDispatch()

    const fetchDataCart = async() => {
        try {
            await axiosInstance.get(`/cart/${userSelector?.id}`).then((res) => {
                const data = res.data.result
                setCart([...data])
            })
        } catch (error) {
            console.log(error)
        }
    }

    const deletProductCart = async() => {
        try {
            await axiosInstance.delete("/cart/", {params: {user_id: userSelector?.id}}).then(() => {
                toast({
                    title: `your cart has been cleared`,
                    status: 'warning',
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
    
    let totalPrice = 0
    const renderDataCart = () => {
        return cart ? cart?.map((val) => {
            totalPrice += (val.product_price * val.quantity)
            return (
                <>
                    <CartCard
                        product_name = {val.product.product_name}
                        product_price = {val.product_price}
                        quantity = {val.quantity}
                        image_url = {val.product.product_imgs[0].img_url}
                        product_stock = {val.product.product_stocks[0].main_stock}
                        product_id = {val.product.id}
                        user_id = {userSelector?.id}
                    />
                </>
            )
        }): <div></div>
    }

    useEffect(() => {
        fetchDataCart()
        renderDataCart()
    }, [autoRender])

    return (
        <>
            <Flex 
                cursor='pointer'
                justify='space-evenly'
                align='center'
                ref={btnRef} 
                onClick={() => {userSelector?.id ? onOpen() : toast({ title: 'please log in to see your cart', status: 'warning', duration: 1000})}}
            >
                <Button onClick={() => {userSelector?.id ? onOpen() : toast({ title: 'please log in to see your cart', status: 'warning', duration: 1000})}} leftIcon={<BiCartAlt fontSize={22}/>} _hover={{backgroundColor: "#eee"}} disabled={ userSelector?.id ? false : true } bgColor="#eee">Cart</Button>
                {/* <Icon as ={BiCartAlt} fontSize='2xl' bgColor="#eee" mr={2}/>
                <Text fontSize={14}>Cart</Text> */}
            </Flex>

            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
                size="md"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader display='flex' justifyContent='space-between' alignItems='flex-end'>
                        <Text>Your cart list</Text>
                        <HStack cursor='pointer' color="red" mr={10} onClick={() => {deletProductCart()}}>
                            <Text fontSize={14}>clear your cart</Text>
                            <DeleteIcon fontSize={16}/>
                        </HStack>
                    </DrawerHeader>
                    
                    <DrawerBody>
                        <VStack spacing={3}>
                            {renderDataCart()}
                        </VStack>
                    </DrawerBody>

                    <DrawerFooter>
                        <VStack w='60%' align='start'>
                            <Text fontSize={16} fontWeight='bold'>TOTAL BELANJA CART KAMU</Text>
                            <Text fontSize={16} fontWeight='bold'>{Number(totalPrice).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                        </VStack>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Link href={`/order/${userSelector?.id}`} _hover={{textDecoration : "none"}}>
                            <Button colorScheme="blue" isDisabled={cart?.length < 1 ? true : false}>Checkout!</Button>
                        </Link>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default DrawerCart