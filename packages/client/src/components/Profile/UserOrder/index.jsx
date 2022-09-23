import { Avatar, border, Box, Button, Flex, Grid, HStack, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react"
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons"
import obat_3 from "../../../public/gambar_obat/obat_3.png"
import obat_2 from "../../../public/gambar_obat/obat_2.png"
import Image from "next/image"

const UserOrder = () => {
    return (
        <VStack w="54em" spacing={3} p={1}>
            <Box alignSelf='left' w='full'>
                <Text fontSize={18} fontWeight='bold'>Order</Text>
                <Text>See your order in here</Text>
                <Box w='full' h={1} borderBottom="2px" borderColor='#005E9D' mt={2} boxShadow='dark-lg'></Box>
            </Box>

            <Box w='full' p={3}>
                <Tabs isFitted variant='enclosed-colored' color='#005E9D'>
                    <TabList mb='1em'>
                        <Tab _selected={{ color: "#005E9D", p: "5px", borderTop: "solid 2px #005E9D"}} fontSize={14}>All</Tab>
                        <Tab _selected={{ color: "#005E9D", p: "5px", borderTop: "solid 2px #005E9D"}} fontSize={14}>To Pay</Tab>
                        <Tab _selected={{ color: "#005E9D", p: "5px", borderTop: "solid 2px #005E9D"}} fontSize={14}>On Shipping</Tab>
                        <Tab _selected={{ color: "#005E9D", p: "5px", borderTop: "solid 2px #005E9D"}} fontSize={14}>Complated</Tab>
                        <Tab _selected={{ color: "#005E9D", p: "5px", borderTop: "solid 2px #005E9D"}} fontSize={14}>Cancelled</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            {/* ini adalah box satu invoice */}
                            <Grid templateColumns = 'repeat(1, 1fr)' gap={3} mb={5}> 
                                <Box p={3} boxShadow='dark-lg' borderRadius={5}>
                                    <Flex justifyContent='space-between' mb={3}>
                                        <Flex fontSize={14} fontWeight='bold'>
                                            <Text mr={2} pr={2} borderRight='1px' borderColor="black">Nomor invoice</Text>
                                            <Text>Status</Text>
                                        </Flex>
                                        <Flex align='center'>
                                            <EditIcon mr={3} cursor='pointer' _hover={{color: "green"}}/>
                                            <DeleteIcon mr={3} cursor='pointer' _hover={{color: "red"}}/> 
                                        </Flex>
                                    </Flex>

                                    {/* ini adalah box item satuan */}
                                    <HStack> 
                                        <Box alignItems='center'>
                                            <Image
                                                src={obat_3}
                                                alt=""
                                                w={50}
                                                h={50}
                                            />
                                        </Box>
                                        
                                        <VStack>
                                            <Flex align='center' justify='left' w='100%' fontSize={14} fontWeight='bold'>
                                                <Text>Nama product</Text>
                                            </Flex>
                                            <Flex>
                                                <Text fontSize={14} color="grey" flex={3}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam saepe autem quasi nulla suscipit eum ut est vel aspernatur quod?</Text>
                                                <Text flex={1} align='center' m='auto'>Harga satuan</Text>
                                            </Flex>
                                        </VStack>
                                    </HStack>
                                    <Flex justify='center' fontWeight='bold' borderTop='1px' borderColor='#005E9D' mt={2}>
                                        <Text mt={2} flex={8}>TOTAL HARGA</Text>
                                        <Text mt={2} flex={2}>Rp. 190.123,02</Text>
                                    </Flex>
                                </Box>
                            </Grid>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </VStack> 
    )
}  

export default UserOrder