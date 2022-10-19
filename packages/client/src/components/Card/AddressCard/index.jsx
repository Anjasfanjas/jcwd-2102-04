import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Flex, HStack, Stack, Text, Tooltip, VStack } from "@chakra-ui/react"
import ModalDeleteAddress from "../../Modal/ModalDeleteAddress"
import ModalEditAddress from "../../Modal/ModalEditAddress"


const AddressCard = (props) => {
    const { name, phone_number, address_line, province, city, post_code, is_default, address_id, province_id, city_id } = props
    return (
        <Box p={3} boxShadow='xl' borderRadius={5} minW='full' >
            <VStack minW='full'>
                <Box minW='full'>
                    <Flex align='center' justify='space-between' mb={2}>
                        <Flex display='flex'>
                            <Text fontSize={16} fontWeight='bold' mr={2} pr={2} borderRight='1px' borderColor="black">{name}</Text>
                            <Text fontSize={16} mr={2} color='#005E9D'>+62{phone_number}</Text>
                            {
                                is_default ? 
                                <Text 
                                    fontSize={14} 
                                    borderRadius={3} 
                                    borderColor='#005E9D' 
                                    color='#b41974'
                                >
                                    Default
                                </Text>

                                : null
                            }
                        </Flex>
                        
                        <HStack align='center' spacing={3}>
                            <Tooltip label='edit ypur address'>
                                <ModalEditAddress
                                    name= {name}
                                    phone_number = {phone_number}
                                    province = {province}
                                    city = {city}
                                    post_code = {post_code}
                                    address_line = {address_line}
                                    city_id = {city_id}
                                    province_id = {province_id}
                                    address_id = {address_id}
                                />
                            </Tooltip>
                            <ModalDeleteAddress 
                                address_id = {address_id}
                            />
                        </HStack>
                    </Flex>
                    <Text fontSize={14} color="grey">{address_line}, {province}, {city}, {post_code}</Text>
                </Box>
            </VStack>
        </Box>
    )
}

export default AddressCard