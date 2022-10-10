import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons"
import { Avatar, Box, Button, useToast, Flex, FormControl, FormHelperText, Grid, GridItem, HStack, Icon, Input, InputGroup, InputRightElement, MenuDivider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Text, Tooltip, useDisclosure, VStack } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { GrUserSettings } from "react-icons/gr"
import { RiLockPasswordLine, RiSettings2Line } from "react-icons/ri"
import { IoMdEye, IoMdEyeOff } from "react-icons/io"
import ModalPassword from "../../Modal/ModalPassword"
import ModalAddress from "../../Modal/ModalAddress"
import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from "../../../library/api"
import { useFormik } from "formik"
import * as Yup from 'yup'
import qs from "qs"
import auth_types from "../../../redux/reducers/types/auth"
import render_types from "../../../redux/reducers/types/render"
import AddressCard from "../../Card/AddressCard"

const UserProfile = () => {
    const [ edit, setEdit ] = useState(false)
    const [ selectedFile, setSelectedFile ] = useState(null)
    const [ userAddress, setUserAddress ]= useState([])
    const [ userAddressLength, setUserAddressLength ]= useState()
    const inputFileRef = useRef()

    const [ dataUser, setDataUser ] = useState([])
    const [ dataUnique, setDataUnique ] = useState()
    const { fullname, email, username, id, date_of_birth, phone_number, gender, avatar_url  } = dataUser

    const dispatch = useDispatch()
    const toast = useToast()
    const userSelector = useSelector((state) => {return state.auth})
    const autoRender = useSelector((state) => {return state.render})

    const fetchDataUser = async () => {
        try {
            await axiosInstance.get(`/user/${userSelector?.id}`).then((res) => {
                const data = res.data.result
                setDataUser(data)
            })   
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUserAddress = async () => {
        try {
            await axiosInstance.get(`/user/address/${userSelector?.id}`).then((val) => {
                const data = val.data.result
                setUserAddress([...data])
                setUserAddressLength(data.length)
                // console.log("ssadasd")
                // console.log(userAddress)

            })
            

        } catch (error) {
            console.log(error)
        }
    }

    const boxAddress = () => {
        console.log(userAddress)
        return userAddress?.map((val) => {
            return (
                <>
                    <AddressCard
                        name = {val.name}
                        phone_number = {val.phone_number}
                        address_line = {val.address_line}
                        province = {val.province}
                        city = {val.city}
                        post_code = {val.post_code}
                        is_default = {val.isDefault}
                        address_id = {val.id}
                    />
                </>
            )
        }) 
    }

    const fetchingDataUnique = async () => {
        await axiosInstance.get('/user').then((res) => {
            const username = res.data.result.username
            const email = res.data.result.email
            console.log(username)
            
            setDataUnique([[username], [email]])
        })
    }

    const formik = useFormik({
        initialValues: {
            id : userSelector?.id,
            fullname : userSelector?.fullname,
            username : userSelector?.username,
            email : userSelector?.email,
            phone_number : userSelector?.phone_number,
            gender : userSelector?.gender,
            avatar_url : userSelector?.avatar_url
        },

        validationSchema: Yup.object().shape({
            username: Yup.string()
            .required('username can not be empty')
            .test
            ('unique username', 'username already in used', 
                function() {
                    return new Promise((resolve) => {
                        let checkUsername = dataUnique[0].find((val) => {
                            return val == formik.values.username
                        })

                        if(checkUsername && username !== checkUsername){
                            formik.setFieldError('username', 'username already in used')
                            resolve(false)
                            
                        } else {
                            formik.setFieldError('username', '')
                            resolve(true)
                        }

                    })
                }
            ),

            email: Yup.string()
            .required('email can not be empty')
            .test
            ('unique email', 'email has been registered', 
                function () {
                    return new Promise((resolve) => {
                        let checkEmail = dataUnique[1].find((val) => {
                            return val == formik.values.email
                        })

                        if(checkEmail && email !== checkEmail){
                            alert(userSelector.email)
                            formik.setFieldError('email', 'email already in used')
                            resolve(false)

                        } else {
                            formik.setFieldError('email', '')
                            resolve(true)
                        }
                    })
                }
            ),

            fullname : Yup.string()
            .required("Your full name can not be empty ")
            .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
        }),

        validateOnChange: false,

        onSubmit: async () => {
            const { 
                fullname,
                username,
                email,
                phone_number,
                gender,
                id,

            } = formik.values

            const body = {
                fullname,
                username,
                email,
                phone_number,
                gender,
            }
            
            try {
                await axiosInstance.patch(`/user/${userSelector?.id}`, qs.stringify(body)).then((res) =>{
                    console.log(qs.stringify(body))
                    dispatch({
                        type: auth_types.AUTH_LOGIN,
                        payload: res.data.user
                    })

                    toast({
                        title: 'Your profile has been edited',
                        status: 'success',
                        duration: 1000
                    })

                    dispatch({
                        type: render_types.AUTO_RENDER,
                        payload: {
                            value : !autoRender.value
                        }
                    })
                })
            } catch (error) {
                console.log(error)
                toast({
                    title: "Error",
                    description: "please check again, you may forget something",
                    status: "error",
                    duration: 1000,
                })
            }

            formik.setSubmitting(false)
        }
    })
    
    useEffect(() => {
        fetchingDataUnique()
    }, [])

    useEffect(() => {
        fetchDataUser()
        fetchUserAddress()
    }, [userSelector?.id])

    const handleFile = (event) =>{
        setSelectedFile(event.target.files[0])
    }

    return (
        <VStack w="54em" spacing={3} p={1}>
            <Box alignSelf='left' justifyContent='space-between' w='full' ml={2} display='flex'>
                <Box>
                    <Text fontSize={18} fontWeight='bold'>Profile</Text>
                    <Text>Manage and protect your account</Text>
                </Box>

                <HStack spacing={3}>
                    {/* Modal passowrd */}
                    <ModalPassword/>

                    <Flex align='center' pt={6} cursor='pointer' fontSize={14} className='hover-rotate' onClick={() => {setEdit(!edit)}}>
                        <Text mr={1}>Setting</Text>
                        <RiSettings2Line/>
                    </Flex>
                </HStack>
            </Box>
            <Box w='full' h={1} borderBottom="2px" borderColor='#005E9D' mt={2} boxShadow='dark-lg'></Box>
            <Box w='full' p={3}>
                <Flex>
                    <Box w="35%" align="center">
                        <Avatar
                            src = {`http://${userSelector?.avatar_url}`}
                            name = {userSelector?.fullname}
                            size="2xl"
                            mb={2}
                        />
                        <Button color='grey' fontSize={12} mb={2} onClick={() => {inputFileRef.current.click()}}>
                            <Input type='file' accept='image/png, image/jpg, image/jpeg' hidden ref={inputFileRef} onChange={handleFile}/>
                            Select Images
                        </Button>
                        <Text fontSize={12} color="grey">Maximum 1 MB and file extension must be .JPEG, .JPG, .gif, and .PNG</Text>
                    </Box>

                    <VStack spacing={3} m='auto' w='70%'>
                        <Flex w='full' align='center'>
                            <Text fontWeight="bold" flex={1} align='end' mr={3}>username</Text>
                            {!edit ? 
                                <Text flex={1}>{username}</Text> 
                                
                                :
                                <FormControl flex={1}>
                                    <Input  
                                        defaultValue={username} 
                                        size='sm' 
                                        onChange={(event) => formik.setFieldValue('username', event.target.value)}
                                    />
                                    <FormHelperText textAlign='left' ml={2} mb={2} color='red'>{formik.errors.username}</FormHelperText>
                                </FormControl> 
                            } 
                        </Flex>
                        
                        <Flex w='full' align='center'>
                            <Text fontWeight="bold" flex={1} align='end' mr={3}>name</Text>
                            {!edit ? 
                                <Text flex={1}>{fullname}</Text> 
                                
                                :
                                <FormControl flex={1}>
                                    <Input 
                                        defaultValue={fullname} 
                                        size='sm' 
                                        w='full'
                                        onChange={(event) => formik.setFieldValue('fullname', event.target.value)}
                                    />
                                    <FormHelperText textAlign='left' ml={2} mb={2} color='red'>{formik.errors.fullname}</FormHelperText>
                                </FormControl> 
                            } 
                        </Flex>
                        
                        <Flex w='full' align='center'>
                            <Text fontWeight="bold" flex={1} align='end' mr={3}>email</Text>
                            {!edit ? 
                                <Text flex={1}>{email}</Text> 
                                :
                                <FormControl flex={1}>
                                    <Input 
                                        defaultValue={email} 
                                        size='sm' 
                                        w='full'
                                        type='email'
                                        onChange={(event) => formik.setFieldValue('email', event.target.value)}
                                    />
                                    <FormHelperText textAlign='left' ml={2} mb={2} color='red'>{formik.errors.email}</FormHelperText>
                                </FormControl> 
                            }
                        </Flex>
                        
                        <Flex w='full' align='center'>
                            <Text fontWeight="bold" flex={1} align='end' mr={3}>date of birth</Text>
                            {!edit ? 
                                <Text flex={1}>{date_of_birth}</Text> 
                                
                                :
                                <FormControl flex={1}>
                                    <Input 
                                        defaultValue={date_of_birth} 
                                        size='sm' 
                                        w='full'
                                        type='date'
                                        onChange={(event) => formik.setFieldValue('date_of_birth', event.target.value)}
                                    />
                                    <FormHelperText textAlign='left' ml={2} mb={2} color='red'>{formik.errors.date_of_birth}</FormHelperText>
                                </FormControl> 
                            }
                        </Flex>
                        
                        <Flex w='full' align='center'>
                            <Text fontWeight="bold" flex={1} align='end' mr={3}>phone number</Text>
                            {!edit ? 
                                <Text flex={1}>{phone_number}</Text> 
                                
                                :
                                <FormControl flex={1}>
                                    <Input 
                                        defaultValue={phone_number} 
                                        size='sm' 
                                        w='full'
                                        typr='number'
                                        onChange={(event) => formik.setFieldValue('phone_number', event.target.value)}
                                    />
                                    <FormHelperText textAlign='left' ml={2} mb={2} color='red'>{formik.errors.phone_number}</FormHelperText>
                                </FormControl> 
                            }
                        </Flex>
                        
                        <Flex w='full' align='center'>
                            <Text fontWeight="bold" flex={1} align='end' mr={3}>gender</Text>
                            {!edit ? 
                                <Text flex={1}>{gender}</Text> 
                                
                                :
                                <FormControl flex={1}>
                                    <Select
                                        size='sm' 
                                        w='full'
                                        onChange={(event) => formik.setFieldValue('gender', event.target.value)}
                                        defaultValue={gender}
                                        >
                                        <option value='male'>male</option>
                                        <option value='female'>female</option>
                                    </Select> 
                                </FormControl> 
                            }
                        </Flex>

                        {edit ? 
                            <Flex w='full' justify='flex-end'>
                                <Button mr={5} colorScheme='red' size='sm' onClick={() => setEdit(!edit)}>CANCLE</Button>
                                <Button colorScheme="green" size='sm' onClick={() => {
                                    formik.handleSubmit()
                                    setEdit(!edit)
                                }}
                                >SAVE</Button>
                            </Flex>
                            :
                        null}
                    </VStack>
                </Flex>
            </Box>

            <Box w="full" p={2}>
                <Flex align='center'>
                    <Text fontWeight="bold" fontSize={18} mr={3}>Your Address</Text>
                    
                    {/* Modal Address */}
                    {
                        userAddress.length == 3 ? null : <ModalAddress/>
                    }
                </Flex>

                <Box w='full' h={1} borderBottom="2px" borderColor='#005E9D' mt={2} mb={4} boxShadow='dark-lg'></Box>
                
                <Grid templateColumns = 'repeat(1, 1fr)' gap={3}>
                    <VStack spacing={5}>
                        {boxAddress()}
                    </VStack>
                </Grid>
            </Box>
        </VStack>
    )
}

export default UserProfile