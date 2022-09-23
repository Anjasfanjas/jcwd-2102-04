import { Box, Flex, HStack, Icon, Stack, Text, VStack } from "@chakra-ui/react"
import Image from "next/image"
import Logo from "../../public/logo/Logo.gif"
import { FaWhatsapp, FaTwitter } from "react-icons/fa"
import { HiOutlineMail } from "react-icons/hi"
import { BsTelephone, BsInstagram, BsFacebook } from "react-icons/bs"
import Logo_navbar from "../../public/logo/Logo_navbar.png"

const Footer = () => {
    return (
        <>
        <HStack minH={200} bgColor='black' color='white' w='full' p={2} justifyContent='space-evenly'>
            <VStack display='flex' w='full'>
                <Stack spacing={3}>
                    <Flex flex={1} w='full'>
                        <Image
                            alt=""
                            src={Logo_navbar}
                            width={120}
                            height={30}
                        />
                    </Flex>
                    
                    <HStack spacing={3}>
                        <Icon as={FaWhatsapp} fontSize={20}/>
                        <Text>+62 873 3284 9987</Text>
                    </HStack>

                    <HStack spacing={3}>
                        <Icon as={HiOutlineMail} fontSize={20}/>
                        <Text>tokoobat@gmail.com</Text>
                    </HStack>

                    <HStack spacing={3}>
                        <Icon as={BsTelephone} fontSize={20}/>
                        <Text>(021) 80643104 </Text>
                    </HStack>
                </Stack>
            </VStack>
            
            <VStack display='flex' w='full'>
                <Stack spacing={3}>
                    <Flex flex={1} w='full'>
                        <Text>About Us</Text>
                    </Flex>
                    
                    <Flex flex={1} w='full'>
                        <Text>FAQ</Text>
                    </Flex>

                    <Flex flex={1} w='full'>
                        <Text>Kebijakan dan Privasi</Text>
                    </Flex>

                    <Flex flex={1} w='full'>
                        <Text>Karir</Text>
                    </Flex>
                </Stack>
            </VStack>
            
            <VStack display='flex' w='full'>
                <Stack spacing={3}>
                    <Flex flex={1} w='full'>
                        <Text>Artikel</Text>
                    </Flex>
                    
                    <Flex flex={1} w='full'>
                        <Text>Cara Belanja</Text>
                    </Flex>

                    <Flex flex={1} w='full'>
                        <Text>Promo</Text>
                    </Flex>

                    <Flex flex={1} w='full'>
                        <Text>Diagnosis</Text>
                    </Flex>
                </Stack>
            </VStack>
            
            <VStack display='flex' w='full'>
                <Stack spacing={3}>
                    <Flex flex={1} w='full'>    
                        <Text fontSize={18} fontWeight='bold'>Follow Our Social Media</Text>
                    </Flex>

                    <HStack spacing={3}>
                        <Icon as={BsInstagram} fontSize={20}/>
                        <Text>@tokoobat_ind</Text>
                    </HStack>

                    <HStack spacing={3}>
                        <Icon as={BsFacebook} fontSize={20}/>
                        <Text>Tokoobat Indonesia</Text>
                    </HStack>

                    <HStack spacing={3}>
                        <Icon as={FaTwitter} fontSize={20}/>
                        <Text>Tokoobat Indonesia</Text>
                    </HStack>
                </Stack>
            </VStack>
        </HStack>
        <Flex w='full' f={20}>
            <Text fontSize={14} w= 'full' align='center' justifySelf='center'>Made by Arifanjas and Geovani Harado, mentored by Jordang Ong and Bapak Ayuskha</Text>
        </Flex>
        </>
    )
}

export default Footer