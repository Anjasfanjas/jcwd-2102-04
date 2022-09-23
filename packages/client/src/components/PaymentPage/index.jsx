import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react"


const PaymentPage = () => {
    return  (
        <VStack
            overflow='hidden'
            w= "80%"
            mx='auto'
            boxShadow='dark-lg'
            mt={10}
            mb={10}
            p={5}
        >
            <Text w='full' fontSize={24} fontWeight='bold' mb={5}>Menunggu Pembayaran</Text>

            <HStack w='full' p={5} justify='space-between' borderBottom='1px solid #b41974'>
                <VStack align='left' spacing={0}>
                    <Text fontWeight={400} color='grey'>Batas akhir pembayaran</Text>
                    <Text fontWeight='bold' fontSize={18}>Kamis, 22 September 2022</Text>
                </VStack>

                <VStack>
                    <HStack spacing={2}>
                        <Box color='white' borderRadius={5} fontSize={24} p={2} w={14} bgColor='#b41974'>
                            <VStack spacing={0}>
                                <Text>24</Text>
                                <Text fontSize={10}>Days</Text>
                            </VStack>
                        </Box>

                        <Text fontSize={32} color="#b41974">:</Text>

                        <Box color='white' borderRadius={5} fontSize={24} w={14} p={2} bgColor='#b41974'>
                            <VStack spacing={0}>
                                <Text>24</Text>
                                <Text fontSize={10}>Hours</Text>
                            </VStack>
                        </Box>

                        <Text fontSize={32} color="#b41974">:</Text>

                        <Box color='white' borderRadius={5} fontSize={24} p={2} w={14} bgColor='#b41974'>
                            <VStack spacing={0}>
                                <Text>24</Text>
                                <Text fontSize={10}>Minutes</Text>
                            </VStack>
                        </Box>
                        
                        <Text fontSize={32} color="#b41974">:</Text>

                        <Box color='white' borderRadius={5} fontSize={24} p={2} w={14} bgColor='#b41974'>
                            <VStack spacing={0}>
                                <Text>24</Text>
                                <Text fontSize={10}>Seconds</Text>
                            </VStack>
                        </Box>
                    </HStack>
                </VStack>
            </HStack>

            <VStack w='full' p={5} borderBottom='1px solid #b41974'>
                <HStack w='full' align='center'>
                    <Text fontSize={20} fontWeight='bold'>Ringkasan Order</Text>
                    <Text color='grey'>Invoice : 1992837BGX</Text>
                </HStack>
            </VStack>

            <VStack w='full' p={5} align='left'>
                <Text fontSize={20} fontWeight='bold'> Rincian Pembayaran</Text>
                
                <HStack spacing={8}>
                    <VStack w='50%'>
                        <Flex w='full' justify='space-between'>
                            <Text flex={4}>Biaya Total Belanja</Text>
                            <Text flex={1}>RP.500.000,00</Text>
                        </Flex>

                        <Flex w='full' justify='space-between'>
                            <Text flex={4}>Biaya Pengiriman</Text>
                            <Text flex={1}>RP.50.000,00</Text>
                        </Flex>

                        <Flex w='full' justify='space-between' fontWeight='bold' borderTop='solid 1px #b41974' pt={2}>
                            <Text flex={4}>Total Belanja</Text>
                            <Text flex={1}>RP.550.000,00</Text>
                        </Flex>
                    </VStack>

                    <VStack w="50%">
                        <Text fontSize={14} color='red'>* Perhatikan nominal pembayaran samapi tiga digit terakhir, kekurangan digit angka pembayaran akan dikenakan sangsi pembayaran</Text>
                        <HStack display='flex' spacing={5} justify='space-between' w='full'>
                            <Button flex={1} colorScheme="red">Batalkan Order</Button>
                            <Button flex={1} colorScheme='green'>Upload Bukti Pembayaran</Button>
                        </HStack>
                    </VStack>
                </HStack>
            </VStack>
        </VStack>
    )
}

export default PaymentPage