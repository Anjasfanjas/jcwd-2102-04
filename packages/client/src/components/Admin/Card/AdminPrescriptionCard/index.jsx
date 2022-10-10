import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Button, Divider, Flex, Grid, HStack, Text, VStack } from "@chakra-ui/react"
import moment from "moment/moment"
import Image from "next/image"
import { useEffect, useState } from "react"
import { axiosInstance } from "../../../../library/api"
import AdminModalPrescription from "../../Modal/AdminModalPrescription"

const AdminPrescriptionCard = (props) => {
    const {date, prescription_img, user_name, user_id, no_invoice, user_address_id, order_id } = props
    const [ userAddress, setUserAddress ] = useState([])
    
    const fetchUserAddress = async() => {
        try {
            await axiosInstance.get(`/user/address/byid/${user_address_id}`).then((res) => {
                const data = res.data.result
                console.log(data)
                setUserAddress([...data])
            })
        } catch (error) {
            console.log(error)
        }
    }
    console.log(userAddress)
    
    useEffect(() => {
        fetchUserAddress()
    }, [])

    return (
        <Grid templateColumns = 'repeat(1, 1fr)' gap={3} mb={5}> 
            <Box p={3} boxShadow='dark-lg' borderRadius={5}>
                <Flex justifyContent='space-between' mb={5}>
                    <Flex fontSize={12} fontWeight='bold'>
                        <Text mr={2} pr={2} borderRight='1px' borderColor="black">Resep Docter</Text>
                        <Text ml={2} color='grey'>{moment(date).format("LLL")}</Text>
                    </Flex>
                </Flex>

                {/* ini adalah box item satuan */}
                <HStack display='flex' px={2} spacing={5}> 
                    <Box alignItems='center'>
                        <Image
                            src={prescription_img ? `http:/${prescription_img}` : ""}
                            alt=""
                            width={120}
                            height={120}
                        />
                    </Box>
                    <VStack flex={3} align='left'>
                        <HStack>
                            <Text>{no_invoice}</Text>
                            <Text>{user_name}</Text>
                        </HStack>
                        <VStack>
                            <Text w='full' fontWeight='bold'>{userAddress[0]?.name}, +62{userAddress[0]?.phone_number}</Text>
                            <Text w='100%'>{userAddress[0]?.address_line}, {userAddress[0]?.province}, {userAddress[0]?.city}, {userAddress[0]?.post_code} </Text>
                        </VStack>
                    </VStack>
                    
                    <AdminModalPrescription
                        img_url = {prescription_img ? prescription_img : ""}
                        user_id = {user_id}
                        user_address = {userAddress}
                        order_id = {order_id}
                    />
                </HStack>
                {/* ini buat divider dan total order kebawah */}
            </Box>
        </Grid>
    )   
}

export default AdminPrescriptionCard