import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Button, Divider, Flex, Grid, HStack, Text, VStack } from "@chakra-ui/react"
import moment from "moment/moment"
import Image from "next/image"
import { useState } from "react"
import AdminModalPrescription from "../../Modal/AdminModalPrescription"




const AdminPrescriptionCard = (props) => {
    const {date, prescription_img, user_name } = props

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
                        <Text fontSize={20}>{user_name}</Text>
                    </VStack>
                    
                    <AdminModalPrescription
                        img_url = {prescription_img ? prescription_img : ""}
                    />
                </HStack>


                {/* ini buat divider dan total order kebawah */}
            </Box>
        </Grid>
    )   
}

export default AdminPrescriptionCard