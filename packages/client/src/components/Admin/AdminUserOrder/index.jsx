import { Box, Button, Center, Flex, HStack, Tab, TabList, Tabs, Text, VStack, Select, FormControl, InputGroup, Input, InputRightElement } from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"
import { axiosInstance } from "../../../library/api"
import AdminOrderCard from "../Card/AdminOrderCard"
import AdminPrescriptionCard from "../Card/AdminPrescriptionCard"
import { BiSearchAlt, BiCartAlt, BiLogIn } from 'react-icons/bi'
import { useRouter } from "next/router"
import { useFormik } from "formik"
import moment from "moment"


const AdminUserOrder = () => {
    const [ allOrder, setAllOrder ] = useState([])
    const [ orderStatus, setOrderStatus ] = useState([])
    const [ prescriptionOrder, setPrescriptionOrder ] = useState([])
    const [ recentStatus, setRecentStatus ] = useState("")
    const [ page, setPage ] = useState(1)
    const router = useRouter()

    const { search } = router.query
    console.log(search)


    const formik = useFormik({
        initialValues: {
            search: "",
            dateFrom: "" ,
            dateTo: "" 
        }
    })


    const fetchAllOrder = async (filter) => {
        console.log(formik.values)
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
            await axiosInstance.get("/order/admin/order", {params : {
                limit: 5,
                page,
                status: recentStatus,
                sort,
                orderBy : order,
                search: search? search : '',
                dateFrom : formik.values.dateFrom ? formik.values.dateFrom : null,
                dateTo : formik.values.dateTo ? formik.values.dateTo  : null,
            }}).then((res) => {
                const data = res.data.result
                setAllOrder([...data])
                console.log(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchPrescriptionOrder = async(filter) => {
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
            await axiosInstance.get("/order/admin/prescription", {params : {
                limit: 5,
                page: page,
                sort,
                orderBy : order,
            }}).then((res) => {
                const data = res.data.result
                setPrescriptionOrder([...data])
            })
        } catch (error) {
            
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
        return allOrder.map((val, index) => {
            return (
                <>
                    <AdminOrderCard
                        key = {index}
                        product_order = {val.order_details}
                        total_price = {val.order_price}
                        no_invoice = {val.no_invoice}
                        date= {val.updatedAt}
                        order_status = {val.order_status.status_name}
                        order_id = {val.id}
                        shipping_price = {val.shipping_price}
                        user_address_id = {val.user_address_id}
                        user_prescription = {val.user_prescription_id ? true : false}
                        user_prescription_url = {val.user_prescription_id ? val.user_doctor_prescription.img_url : ''}
                    />
                </>
            )
        })
    }

    const renderPrescriptionCard = () => {
        return prescriptionOrder.map((val, index) => {
            return (
                <>
                    <AdminPrescriptionCard
                        key = {index}
                        date = {val.updatedAt}
                        user_name = {val.user_doctor_prescription.user.username}
                        prescription_img = {val.user_doctor_prescription.img_url}
                        user_id = {val.user_id}
                        no_invoice = {val.no_invoice}
                        user_address_id = {val.user_address_id}
                        order_id = {val.id}
                        order_status = {val.order_status.status_name}
                    />
                </>
            )
        })
    }

    useEffect(() => {
        fetchAllOrder()
        fetchOrderStatus()
        fetchPrescriptionOrder()
    }, [recentStatus, router?.isReady, search, page, formik.values.dateFrom, formik.values.dateTo])

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
            <HStack display='flex' w='full' justify='space-between'>
                <Box alignSelf='left' flex={3}>
                    <Text fontSize={18} fontWeight='bold'>user orders List</Text>
                    <Text>These are all the orders form user</Text>
                </Box>

                <Box
                    flex={7}
                    alignItems={"center"}
                    display={"flex"}
                    justifyContent={"center"}
                >
                    <FormControl w='full' borderEndRadius={5}>
                        <InputGroup>
                            <Input
                                type={"text"}
                                defaultValue={formik.values.search ? formik.values.search : null}
                                placeholder={"Search..."}
                                bgColor={"white"}
                                onChange = {(event) => {formik.setFieldValue('search', event.target.value)}}
                            />
                            <InputRightElement cursor='pointer' bgColor='#F0BB62' borderEndRadius={5} onClick={() => {
                                router.push(`/admin/user/order?search=${formik.values.search}`)
                            }}>
                                <BiSearchAlt />
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                </Box>

                <Select onChange={(event) => {fetchAllOrder(event.target.value)}} flex={2}>
                    <option value=''>Urutkan</option>
                    <option value='date_asc'>DateAscending</option>
                    <option value='date_desc'>Date Descending</option>
                    <option value='price_desc'>Highest Price</option>
                    <option value='price_asc'>Lowest Price</option>
                </Select>
            </HStack>

            <Flex w='full'>
                    <HStack flex={1} >
                        <Text w='30%' textAlign='end'>From : </Text>
                        <Input
                            size="md"
                            type="date"
                            onChange = {(event) => {
                                formik.setFieldValue('dateFrom', moment(event.target.value).format("YYYY-MM-DD")); 
                                formik.values.dateTo ? fetchAllOrder()
                                : null
                            }}
                        />
                    </HStack>

                    <HStack flex={1} mr={2}>
                        <Text w='20%' textAlign='end'>To : </Text>
                        <Input
                            size="md"
                            type="date"
                            defaultValue=''
                            onChange = {(event) => {
                                formik.setFieldValue('dateTo', moment(event.target.value).format("YYYY-MM-DD"));
                                formik.values.dateFrom ? fetchAllOrder() : null
                            }}
                        />
                    </HStack>
                    <Button onClick={() => {formik.setFieldValue('dateFrom', ''); formik.setFieldValue('dateTo', '') }}>
                        Reset
                    </Button>
                </Flex>

            <Box w='full' h={1} borderBottom="2px" borderColor='#005E9D' mt={2} boxShadow='dark-lg'></Box>
            

            <Box w='full' p={3}>
                <Tabs isFitted variant='enclosed-colored' color='#005E9D'>
                    <TabList mb='1em'>
                        <Tab onClick ={() => {setRecentStatus("")}}>
                            ALL
                        </Tab>
                        <Tab onClick ={() => {setRecentStatus("prescription")}}>
                            Konfirmasi Resep
                        </Tab>
                        {renderOrderStatus()}
                    </TabList>
                    { recentStatus === "prescription" ? renderPrescriptionCard() : renderOrderCard() }
                </Tabs>
            </Box>

            <Center my={5}>
                <HStack>
                    <Button 
                        size='sm' 
                        bgColor='#005E9D' 
                        color='white'
                        _hover={{
                            backgroundColor: "#e3eeee",
                            color: "#005E9D"
                        }}
                        onClick={() => {setPage(page-1)}}
                        disabled ={page <= 1 ? true : false}
                    >
                        Prev
                    </Button>
                    
                    
                    <Box sz='sm'>{page}</Box>
                    
                    <Button size='sm'
                        bgColor='#005E9D' 
                        color='white'
                        _hover={{
                            backgroundColor: "#e3eeee",
                            color: "#005E9D"
                        }}
                        onClick={() => {setPage(page + 1)}}
                        disabled = {allOrder.length < 5 ? true : false}
                    >
                        Next
                    </Button>
                </HStack>
            </Center>
        </VStack>
    )
}

export default AdminUserOrder