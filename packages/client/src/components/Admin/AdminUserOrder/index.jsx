import { Box, Button, Center, Flex, HStack, Tab, TabList, Tabs, Text, VStack, Select } from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { axiosInstance } from "../../../library/api"
import AdminOrderCard from "../Card/AdminOrderCard"


const AdminUserOrder = () => {
    const [ allOrder, setAllOrder ] = useState([])
    const [ orderStatus, setOrderStatus ] = useState([])
    const [ recentStatus, setRecentStatus ] = useState("")
    const [ page, setPage ] = useState(1)

    const fetchAllOrder = async () => {
        try {
            await axiosInstance.get("/order/admin/order").then((res) => {
                const data = res.data.result
                setAllOrder([...data])
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
        return (
            <>
                <AdminOrderCard/>
            </>
        )
    }

    useEffect(() => {
        fetchAllOrder()
        fetchOrderStatus()
    }, [])

    return (
        <VStack
            overflow='hidden'
            w= "80%"
            mx='auto'
            boxShadow='dark-lg'
            mt={10}
            mb={10}
            p={5}
        >
            <Flex w='full' justify='space-between'>
                <Box alignSelf='left' flex={4}>
                    <Text fontSize={18} fontWeight='bold'>user orders List</Text>
                    <Text>These are all the orders form user</Text>
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
                        <Tab>
                            Konfirmasi Resep
                        </Tab>
                        
                        {renderOrderStatus()}
                    </TabList>
                    {renderOrderCard()}
                </Tabs>
            </Box>

            <Center my={5}>
                <HStack>
                    <Button size='sm' 
                        bgColor='#005E9D' 
                        color='white'
                        _hover={{
                            backgroundColor: "#e3eeee",
                            color: "#005E9D"
                        }}
                        
                    >
                        Prev
                    </Button>
                    
                    
                    <Box sz='sm'>1</Box>
                    
                    <Button size='sm'
                        bgColor='#005E9D' 
                        color='white'
                        _hover={{
                            backgroundColor: "#e3eeee",
                            color: "#005E9D"
                        }}
                        
                    >
                        Next
                    </Button>
                </HStack>
            </Center>
        </VStack>
    )
}

export default AdminUserOrder