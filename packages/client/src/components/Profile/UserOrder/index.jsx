import { Avatar, border, Box, Button, Flex, Grid, HStack, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, Select, Center } from "@chakra-ui/react"
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons"
import obat_3 from "../../../public/gambar_obat/obat_3.png"
import obat_2 from "../../../public/gambar_obat/obat_2.png"
import Image from "next/image"
import UserOrderCard from "../../Card/UserOrderCard"
import { useState } from "react"
import { axiosInstance } from "../../../library/api"
import { useSelector } from "react-redux"
import { useEffect } from "react"

const UserOrder = () => {
    const [ userOrder, setUserOrder ] = useState([])
    const [ orderStatus, setOrderStatus ] = useState([])
    const [ recentStatus, setRecentStatus ] = useState("")
    const [ page, setPage ] = useState(1)

    const userSelector = useSelector((state) => {return state.auth})

    const fetchUserOrder = async(filter) => {
        let order = ""
        let sort = ""

        if (filter == 'date_asc') {
            order = 'createdAt';
            sort = "ASC"
        } else if (filter == 'date_desc') {
            order = 'createdAt';
            sort = "DESC"
        } else if (filter == 'price_desc') {
            order = 'sell_price';
            sort = "DESC"
        } else if (filter == 'price_asc') {
            order = 'sell_price';
            sort = "ASC"
        } else {
            order = '';
            sort = ""
        }
        
        try {
            await axiosInstance.get(`/order/user/`, {params: {
                user_id: userSelector?.id,
                status: recentStatus,
                sort,
                orderBy : order,
                limit: 5,
                page

            }}).then((res) => {
                const data = res.data.result
                setUserOrder([...data])
                console.log(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchOrderStatus = async () => {
        
        try {
            await axiosInstance.get("/order/status").then((res) => {
                const data = res.data.result
                setOrderStatus([...data])
            })
        } catch (error) {
            console.log(error)
        }
    }

    const renderOrderStatus = () => {
        return orderStatus.map((val) => {
            return (
                <>
                    <Tab 
                        _selected={{ color: "#005E9D", p: "5px", borderTop: "solid 2px #005E9D"}} 
                        fontSize={14}
                        onClick ={() => {setRecentStatus(val.status_name)}}
                    >
                        {val.status_name}
                    </Tab>
                </>
            )
        })
    }
    const renderOrderCard = () => {
        return userOrder.map((val) => {
            return (
                <>
                    <UserOrderCard
                        product_name = {val.order_details[0].product.product_name}
                        product_price = {val.order_details[0].product_price}
                        quantity = {val.order_details[0].quantity}
                        total_price = {val.order_price}
                        order_status = {val.order_status.status_name}
                        product_img = {val.order_details[0].product.product_imgs[0].img_url}
                        no_invoice = {val.no_invoice}
                    />
                </>
            )
        })
    }

    useEffect(() => {
        fetchUserOrder()
        fetchOrderStatus()
    }, [page, recentStatus])

    return (
        <VStack w="54em" spacing={3} p={1}>
            <Flex w='full' justify='space-between'>
                <Box alignSelf='left' flex={4}>
                    <Text fontSize={18} fontWeight='bold'>Order</Text>
                    <Text>See your order in here</Text>
                </Box>
                <Select onChange={(event) => {fetchUserOrder(event.target.value)}} flex={1}>
                    <option value=''>Urutkan</option>
                    <option value='date_asc'>DateAscending</option>
                    <option value='date_desc'>Date Descending</option>
                    <option value='price_desc'>Highest Price</option>
                    <option value='price_asc'>Lowest Price</option>
                </Select>
            </Flex>
            <Box w='full' h={1} borderBottom="2px" borderColor='#005E9D' mt={2} boxShadow='dark-lg'></Box>
            

            <Box w='full' p={3}>
                <Tabs isFitted variant='enclosed-colored' color='#005E9D'>
                    <TabList mb='1em'>
                        <Tab onClick={() => {setRecentStatus('')}}>
                            All
                        </Tab>
                        {renderOrderStatus()}
                    </TabList>

                    {renderOrderCard()} 
                </Tabs>
            </Box>

            <Center my={5}>
                <HStack>
                    <Button onClick={() => {setPage(page-1)}} size='sm' 
                        bgColor='#005E9D' 
                        color='white'
                        _hover={{
                            backgroundColor: "#e3eeee",
                            color: "#005E9D"
                        }}
                        disabled ={page <= 1 ? true : false}
                    >
                        Prev
                    </Button>
                    
                    
                    <Box sz='sm'>{page}</Box>
                    
                    <Button onClick={() => {setPage(page + 1)}} size='sm'
                        bgColor='#005E9D' 
                        color='white'
                        _hover={{
                            backgroundColor: "#e3eeee",
                            color: "#005E9D"
                        }}
                        disabled = {userOrder.length < 5 ? true : false}
                    >
                        Next
                    </Button>
                </HStack>
            </Center>
        </VStack> 
    )
}  

export default UserOrder