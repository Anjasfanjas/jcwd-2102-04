import { Avatar, AvatarBadge, Box, Button, Flex, FormControl, HStack, Icon, Input, InputGroup, InputRightElement, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react"
import Image from "next/image"
import { BiSearchAlt, BiCartAlt, BiLogIn } from 'react-icons/bi'
import { MdOutlineStorefront, MdOutlineHome, MdOutlineFileUpload, MdNotificationsNone } from 'react-icons/md'
import Logo_navbar from "../../public/logo/Logo_navbar.png"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { axiosInstance } from "../../library/api"
import { useDispatch, useSelector } from "react-redux"
import DrawerCart from "../Drawer/DrawerCart"
import ModalUploadPrescription from "../Modal/ModalUploadPrescription"
import jsCoockie from "js-cookie"
import auth_types from "../../redux/reducers/types/auth"

const Navbar = () => {
    const router = useRouter()
    const userSelector = useSelector((state) =>  state.auth )
    const formik = useFormik({
        initialValues: {
            search: ""
        }
    })

    const dispatch = useDispatch()

    const handleLogout = () =>{
        jsCoockie.remove("auth_token")
        
        dispatch({
            type: auth_types.AUTH_LOGOUT
        })

        router.push("/auth")
    }

    return (        
        <Flex position='sticky' color= "#004776" cursor='pointer' top={0} bgColor='#eee' p={1} zIndex={3} boxShadow='xl' w='full' align='center' justify='center'>
            {/* Logo Box */}
            <Link ml={5} justify='center' href='../'>
                <Image
                    src={Logo_navbar}
                    alt='Logo'
                    width={120}
                    height={30}
                />
            </Link>

            <HStack flex={3} spacing={3} justify='center'>
                <Link 
                    justify='space-evenly'
                    align='center'
                    display='flex'
                    _hover={{textDecoration: 'none'}}
                    href='../store'
                    color="#004776"
                    
                >
                    <Icon as={MdOutlineStorefront} fontSize='2xl' mr={1}/>
                    <Text fontSize={14}>Store</Text>
                </Link>
                
                <ModalUploadPrescription 
                    border = {'#eee'}
                />
            </HStack>

            {/* Search Box */}
            <Box
                flex={5}
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
                            router.push(`/store?search=${formik.values.search}`)
                        }}>
                            <BiSearchAlt />
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
            </Box>

            {/* Menu Box */}
            <HStack flex={userSelector?.id ? 3 : 2} align='center' justify='space-evenly'>
                <DrawerCart/>
                {
                    userSelector?.id ? (
                        <Flex justify='space-between' align='center'>
                            <Text fontSize={14} fontWeight='bold' mr={2}>{userSelector?.username}</Text>
                            <Menu 
                                cursor='pointer'
                                justify='space-between'
                                align='center'
                            >
                                <MenuButton>
                                    <Avatar
                                        name='user'
                                        size='md'
                                        src={`http://${userSelector?.avatar_url}`}
                                    />
                                </MenuButton>

                                <MenuList>
                                    <Link onClick={() => router.push("/user/profile")} _hover={{textDecoration: 'none'}}>
                                        <MenuItem>
                                            Profile
                                        </MenuItem>
                                    </Link>

                                    <Link onClick={() => router.push("/user/order")} _hover={{textDecoration: 'none'}}>
                                        <MenuItem>
                                            Order Histories
                                        </MenuItem>
                                    </Link>
                                    
                                    <MenuDivider/>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>
                    ) : ( 
                        <Link 
                                display='flex' 
                                align='center' 
                                _hover={{textDecoration: 'none'}}
                                href="/auth"
                            >
                                <Button colorScheme="green" leftIcon={<BiLogIn/>}>                                
                                    Login
                                </Button>
                        </Link>
                    )

                }
                
            </HStack>
        </Flex>
    )
}

export default Navbar