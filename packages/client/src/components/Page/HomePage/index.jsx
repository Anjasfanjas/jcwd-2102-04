import { Box, Button, color, Flex, FormControl, Grid, GridItem, Heading, HStack, Icon, Input, InputGroup, InputRightElement, Stack, Text, textDecoration, VStack } from "@chakra-ui/react"
import { useFormik } from "formik"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BiSearchAlt } from "react-icons/bi"
import { BsFileEarmarkMedical } from "react-icons/bs"
import { MdOutlineFileUpload } from "react-icons/md"
import { axiosInstance } from "../../../library/api"
import Banner from "../../../public/Banner.png"
import ProductCard from "../../Card/productCard"
import ModalUploadPrescription from "../../Modal/ModalUploadPrescription"

const HomePage = () => {
    const [ allCategories, setAllCategories ] = useState([])
    const [ recProduct, setRecProduct ] = useState([])
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            search: ""
        }
    })

    const fetchDataCategories = async () => {
        try {
            await axiosInstance.get('/product/categories').then((res) => {
                const data = res.data.result
                setAllCategories(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDataProduct = async () => {
        try {
            await axiosInstance.get(`/product/`, {params: {
                category: "Vitamin",
                limit : 16,
                page: 1,
            }}).then((res) => {
                const data = res.data.result
                setRecProduct(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const categoriesList = () => {
        return allCategories?.map((val) => {
            return (
                <>
                    <Flex justify='space-between' w='75%' align='center'>
                        <Image
                            alt=""
                            src={`http://${val.img_url}`}
                            width={50}
                            height={50}
                        />
                        <Text w='60%' textAlign='left' color='#262626'>{val.category}</Text>
                    </Flex>
                </>
            )
        })
    }

    const productCard = () => {
        return recProduct?.map((val, index) => {
            return (
                <>
                <Box flex={1} mx={4}>
                    <ProductCard key={index}
                        product_id = {val.id}
                        product_image = {`http://${val.product_imgs[0].img_url}`}
                        product_name = {val.product_name}
                        product_category = {val.product_categories}
                        product_price = {Number(val.product_stocks[0].sell_price)}
                    />
                </Box>
                </>
            )
        })
    }

    useEffect(() => {
        fetchDataCategories()
        fetchDataProduct()
    }, [])

    return (
        <VStack
            overflow='hidden'
            w= "80%"
            mx='auto'
            boxShadow='dark-lg'
            mt={10}
            mb={10}
        >
            <Flex
                w={'full'}
                backgroundSize={'cover'}
                backgroundPosition={'center center'}
                mb={5}
                position='relative'
            >
                <Image
                    alt=""
                    src={Banner}
                />
                <VStack position='absolute' color="white" top='17%' left="17%" align='left'>
                    <VStack align='left' spacing={0} mb={5} fontSize={45}>
                        <Text>Your Pharmacy,</Text>
                        <Text>Anytime, Anywhare</Text>
                    </VStack>

                    <Box
                        flex={5}
                        alignItems={"center"}
                        display={"flex"}
                        justifyContent={"center"}
                        w={480}
                    >
                        <FormControl w='full' borderEndRadius={5}>
                            <InputGroup>
                                <Input
                                    type={"text"}
                                    defaultValue={formik.values.search ? formik.values.search : null}
                                    placeholder={"Search..."}
                                    bgColor={"white"}
                                    color="black"
                                    onChange = {(event) => {formik.setFieldValue('search', event.target.value)}}
                                />
                                <InputRightElement w={70} cursor='pointer' bgColor='#F0BB62' borderEndRadius={5} onClick={() => {
                                    router.push(`/store?search=${formik.values.search}`)
                                }}>
                                    <BiSearchAlt size={24}/>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </Box>
                    <Text w='20%' fontSize={12} cursor='pointer' onClick={() => {router.push("/store")}} _hover={{
                        color: "#f0bb62",
                    }}>
                        Lihat Semua Obat
                    </Text>
                </VStack>
            </Flex>

            <VStack
                overflow='hidden'
                w= "67%"
                mx='auto'
            >
                <Flex w='full' flexDir='column'>
                    <Stack spacing={3} mb={5}>
                        <Heading as='h4' size='md'>Punya Resep Dari Dokter?</Heading>
                        <HStack p={5} w='full' justifyContent='space-between'>
                            <Flex>
                                <Icon as={BsFileEarmarkMedical} boxSize={10} color="#5F656B" mr={2}/>
                                <VStack align='left' spacing={0}>
                                    <Text color='#262626' fontWeight='500'>Unggah Resepmu</Text>
                                    <Text fontSize={12} color="#6E6E6E">klick tombol unggah untuk mengirim resep dokter</Text>
                                </VStack>
                            </Flex>
                            <ModalUploadPrescription/>
                        </HStack>
                    </Stack>

                    <Stack spacing={3} mb={5}>
                        <Heading as='h4' size='md'>Daftar Kategori Obat</Heading>
                        <Grid templateColumns='repeat(3, 1fr)' gap={6} p={5} justifyItems='center'>
                            {categoriesList()}
                        </Grid>
                    </Stack>

                    <Stack spacing={3} mb={5}>
                        <Heading as='h4' size='md'>Rekomendasi Vitamin</Heading>
                        <Flex w='full' p={5}>
                            {productCard()}
                        </Flex>
                    </Stack>
                </Flex>
            </VStack>
        </VStack>
    )
}

export default HomePage