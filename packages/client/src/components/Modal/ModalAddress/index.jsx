import { AddIcon } from "@chakra-ui/icons"
import { Button, Select, Flex, FormControl, FormLabel, HStack, Input, InputGroup, InputLeftAddon, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea, useDisclosure, useToast, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { axiosInstance } from "../../../library/api";
import qs from "qs";
import axios from "axios";
import * as Yup from 'yup'


const ModalAddress = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ dataCity, setDataCity ] = useState([])
    const [ dataProvince, setDataProvince ] = useState([])
    const [ provinceName, setProvinceName ] = useState()
    const [ cityName, setCityName ] = useState()

    const dispatch = useDispatch()
    const toast = useToast()
    const userSelector = useSelector((state) => {return state.auth})
    const autoRender = useSelector((state) => {return state.render})
    
    const render_city_name = async () => {
        try {
            await axios.get(`https://api.rajaongkir.com/starter/city?province=${formik.values.province}` , {headers: {"key" : "d2bbf841ca82c43bf952e17f16213b91"}}).then ((val) => {
                setDataCity([...val.data.rajaongkir.results])
            }) 

        } catch (error) {
            console.log(error);   
        }
    }

    const optionProvince = () => {
        return dataProvince?.map((val) => {
            return (
                <>
                    <option value={val.province_id}>{val.province}</option>
                </>
            )
        })
    }

    const optionCity = () => {
        return dataCity?.map((val) => {
            if(val.province_id == formik.values.province_id){
                return (
                    <>
                        <option value={val.city_id}>{val.city_name}</option>
                    </>
                )
            }
        })
    }

    const optionCodePost = () => {
        return dataCity?.map((val) => {
            if (val.city_id == formik.values.city_id){
                return (
                    <>
                        <option value={val.postal_code}>{val.postal_code}</option>
                    </>
                )
            } 
            
        })
    }
    
    const render_province = async () => {
        try {
            await axios.get('https://api.rajaongkir.com/starter/province' , {headers: {"key" : "d2bbf841ca82c43bf952e17f16213b91 "}}).then ((val) => {
                setDataProvince([...val.data.rajaongkir.results])
            }) 

        } catch (error) {
            console.log(error);   
        }
    }

    const province_name = async () => {
        try {
            await axios.get(`https://api.rajaongkir.com/starter/province?id=${formik.values.province_id}` , {headers: {"key" : "d2bbf841ca82c43bf952e17f16213b91 "}}).then ((val) => {
                setProvinceName(val.data.rajaongkir.results.province)
            }) 

        } catch (error) {
            console.log(error)
        }
    }

    const city_name = async () => {
        try {
            await axios.get(`https://api.rajaongkir.com/starter/city?id=${formik.values.city_id}` , {headers: {"key" : "d2bbf841ca82c43bf952e17f16213b91 "}}).then ((val) => {
                setCityName(val.data.rajaongkir.results.city)
            }) 

        } catch (error) {
            console.log(error)
        }
    }
    
    const formik = useFormik({
        initialValues: {
            phone_number : '',
            name: '',
            province: '',
            province_id: '',
            city: '',
            city_id: '',
            post_code: '',
            address_line: '',
        },

        validationSchema: Yup.object().shape({
            name: Yup.string()
            .required("Your full name can not be empty ")
            .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),

            phone_number: Yup.string()
            .required('Phone number is required')
            .max(12, 'too long! caannot be more than 12 number')
        }),

        validateOnChange: false,

        onSubmit: async () => {
            const {
                phone_number,
                name,
                province_id,
                city_id,
                post_code,
                address_line,
            } = formik.values

            const body ={
                phone_number,
                city: cityName,
                province: provinceName,
                name,
                province_id,
                city_id,
                post_code,
                address_line,
                user_id: userSelector?.id,
            }

            console.log(body)

            try {
                await axiosInstance.post(`/user/address/${userSelector?.id}`, qs.stringify(body)).then(() => {
                    toast({
                        title: 'Your address has been added',
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
        render_city_name()
        render_province()
        
    }, [])

    useEffect(() => {
        render_city_name()
        render_province()
        province_name()
        city_name()

    }, [formik.values.province])


    return (
        <>
            <AddIcon w='1em' h='1em' color='#005E9D' cursor='pointer' className="icon-rotate" onClick={() =>{onOpen()}}/>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size='lg'>
                <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Add your address here!</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <VStack spacing={5} align='center'>
                            <HStack w='full' spacing={3}>
                                <FormControl>
                                    <FormLabel w='full'>
                                        <Input placeholder="Fullname" type='text' onChange={(event) => formik.setFieldValue('fullname', event.target.value)} />
                                    </FormLabel>
                                </FormControl>

                                <FormControl>
                                    <FormLabel w='full'>
                                        <InputGroup>
                                            <InputLeftAddon fontSize={16} py={1}>+62</InputLeftAddon>
                                            <Input placeholder="Phone number" type='number' onChange={(event) => formik.setFieldValue('phone_number', event.target.value)}/>
                                        </InputGroup>
                                    </FormLabel>
                                </FormControl>
                            </HStack>

                            <FormControl>
                                <Select size="md" placeholder='Province' onChange={(event) => formik.setFieldValue('province_id', event.target.value)}>
                                    {optionProvince()}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <Select size="md" placeholder='City' onChange={(event) => formik.setFieldValue('city_id', event.target.value)}>
                                    {optionCity()}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <Select size="md" placeholder='Post Code' onChange={(event) => formik.setFieldValue('post_code', event.target.value)}>
                                    {optionCodePost()}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <InputGroup>
                                    <Textarea sz='sm' placeholder='Address line or some more detail' onChange={(event) => formik.setFieldValue('address_line', event.target.value)}/>
                                </InputGroup>
                            </FormControl>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => {formik.handleSubmit()}}>
                            Save
                        </Button>
                        
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalAddress