import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Flex, HStack, Text, Tooltip, VStack } from "@chakra-ui/react"
import ModalDeleteAddress from "../../Modal/ModalDeleteAddress"
import ModalEditAddress from "../../Modal/ModalEditAddress"


const AddressCard = (props) => {
    const { name, phone_number, address_line, province, city, post_code, is_default, address_id } = props
    return (
        <Box p={3} boxShadow='dark-lg' borderRadius={5} minW='full'>
            <Flex justifyContent='space-between' mb={3} w='full' justify='flex-end'>
                {
                    is_default ? 
                    <Text 
                        fontSize={14} 
                        border='1px' 
                        p={1} 
                        borderRadius={3} 
                        borderColor='#005E9D' 
                        color='#005E9D'
                    >
                        Default
                    </Text>

                    : <Text> </Text>
                }
                
                <HStack align='center' spacing={3}>
                    <Tooltip label='edit ypur address'>
                        <ModalEditAddress
                            name= {name}
                            phone_number = {phone_number}
                            province = {province}
                            city = {city}
                            post_code = {post_code}
                            address_line = {address_line}
                        />
                    </Tooltip>
                    <ModalDeleteAddress 
                        address_id = {address_id}
                    />
                </HStack>
            </Flex>

            <VStack minW='full'>
                <Box minW='full'>
                    <Flex align='center' justify='left'>
                        <Text fontSize={14} fontWeight='bold' mr={2} pr={1} borderRight='1px' borderColor="black">{name}</Text>
                        <Text fontSize={14} mr={2} color='#005E9D'>{phone_number}</Text>
                    </Flex>
                    <Text fontSize={14} color="grey">{address_line}, {province}, {city}, {post_code}</Text>
                </Box>
            </VStack>
        </Box>
    )
}

export default AddressCard