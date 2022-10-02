import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, Grid, HStack, Text, VStack } from "@chakra-ui/react"
import Image from "next/image"



const AdminOrderCard = (props) => {
    const { product_name, product_price, quantity, order_status, total_price, no_invoice, product_img } = props

    const ButtonContainer = () => {
        return (
            <HStack>
                { order_status === "Menunggu Pembayaran" || "Menunggu Konfirmasi Pembayaran" ? (
                        <Button size='xs' colorScheme="red">Cancle Order</Button>
                    ) : null
                }

                { order_status === "Menunggu Konfirmasi Pembayaran" ? (
                        <>
                            <Button size='xs' colorScheme="Yellow">Check Upload Pembayaran</Button>
                            <Button size='xs' colorScheme="blue">Konfirmasi Pembayaran</Button>
                        </>
                    ) : null
                }
            </HStack>
        )
    }

    return (
        <Grid templateColumns = 'repeat(1, 1fr)' gap={3} mb={5}> 
            <Box p={3} boxShadow='dark-lg' borderRadius={5}>
                <Flex justifyContent='space-between' mb={1}>
                    <Flex fontSize={12} fontWeight='bold'>
                        <Text mr={2} pr={2} borderRight='1px' borderColor="black">{no_invoice}</Text>
                        <Text>{order_status}</Text>
                    </Flex>
                    
                    {ButtonContainer()}
                </Flex>

                {/* ini adalah box item satuan */}
                <HStack display='flex' px={2}> 
                    <Box alignItems='center' flex={1}>
                        <Image
                            src={ product_img ? `http:/${product_img}` : ""}
                            alt=""
                            width={120}
                            height={120}
                        />
                    </Box>
                    
                    <VStack flex={3}>
                        <Flex align='center' justify='left' w='100%' fontSize={16} fontWeight='bold'>
                            <Text>{product_name}</Text>
                        </Flex>
                        <Text w='full' flex={1} align='left'>{quantity} X {Number(product_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                    </VStack>

                    <VStack align='start' fontWeight='bold'>
                        <Text w='full' mt={2} flex={8}>TOTAL HARGA</Text>
                        <Text w='full' mt={2} flex={2}>{Number(quantity * product_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                    </VStack>
                </HStack>
                <Flex justify='center' fontWeight='bold' borderTop='1px' borderColor='#005E9D' mt={2} px={2}>
                    <Text mt={2} flex={8}>TOTAL ORDER</Text>
                    <Text mt={2} flex={2} align='end'>{Number(total_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                </Flex>
            </Box>
        </Grid>
    )   
}

export default AdminOrderCard