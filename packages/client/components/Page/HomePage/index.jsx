import { Box, Button, Center, color, Flex, FormControl, Grid, GridItem, Heading, HStack, Icon, Input, InputGroup, InputRightElement, Stack, Text, textDecoration, VStack, Image } from "@chakra-ui/react"
import { useFormik } from "formik"
import NextImage from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BiSearchAlt } from "react-icons/bi"
import { BsFileEarmarkMedical } from "react-icons/bs"
import { MdOutlineFileUpload } from "react-icons/md"
import { useSelector } from "react-redux"
import { axiosInstance } from "../../../library/api"
import Banner from "../../../public/Banner.png"
import ProductCard from "../../Card/ProductCard"
import ModalUploadPrescription from "../../Modal/ModalUploadPrescription"
import BannerVer1 from "../../../public/banner/Capture.png"
import BannerVer2 from "../../../public/banner/fit.png"
import promotion1 from "../../../public/banner/promo1.png"
import promotion2 from "../../../public/banner/promo2.png"
import jaminan1 from "../../../public/banner/jaminan1.png"
import jaminan2 from "../../../public/banner/jaminan2.png"
import jaminan3 from "../../../public/banner/jaminan3.png"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"

const HomePage = () => {
    const userSelector = useSelector((state) => {return state.auth})
    console.log(userSelector)
    const [ allCategories, setAllCategories ] = useState([])
    const [ recProduct, setRecProduct ] = useState([])
    const [ recProductVit, setRecProductVit ] = useState([])
    const [ page1, setPage1 ] = useState(1)
    const [ page2, setPage2 ] = useState(1)
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
                console.log(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDataProduct = async () => {
        try {
            await axiosInstance.get(`/product/`, {params: {
                category: "obat",
                limit : 3,
                page: page1,
            }}).then((res) => {
                const data = res.data.result
                setRecProduct([...data])
            })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDataProductVit = async () => {
        try {
            await axiosInstance.get(`/product/`, {params: {
                category: "vitamin",
                limit : 3,
                page: page2,
            }}).then((res) => {
                const data = res.data.result
                setRecProductVit([...data])
            })
        } catch (error) {
            console.log(error)
        }
    }

    const categoriesList = () => {
        return allCategories?.map((val) => {
            return (
                <>
                    <Flex justify='space-between' w='75%' align='center' onClick={() => {router.push(`/store?category=${val.category}`)}} cursor='pointer'>
                        <Image
                            alt=""
                            src={`https://${val.img_url}`}
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
                <Box flex={ recProduct.length <= 1 ? 0 : 1} minW={ recProduct.length <= 1 ? "35%" : ""} mr={1}>
                    <ProductCard key={index}
                        product_id = {val.id}
                        product_image = {`https://${val.product_imgs[0].img_url}`}
                        product_name = {val.product_name}
                        product_category = {val.product_categories}
                        product_price = {Number(val.product_stocks[0].sell_price)}
                        color = {'#2B478B'}
                    />
                </Box>
                </>
            )
        })
    }

    const productCardVit = () => {
        return recProductVit.map((val, index) => {
            return (
                <>
                <Box flex={ recProduct.length <= 1 ? 0 : 1} minW={ recProduct.length <= 1 ? "35%" : ""} mr={1}>
                    <ProductCard key={index}
                        product_id = {val.id}
                        product_image = {`https://${val.product_imgs[0].img_url}`}
                        product_name = {val.product_name}
                        product_category = {val.product_categories}
                        product_price = {Number(val.product_stocks[0].sell_price)}
                        color = {'#525234'}
                    />
                </Box>
                </>
            )
        })
    }

    useEffect(() => {
        fetchDataCategories()
        fetchDataProduct()
        fetchDataProductVit()
    }, [page1])

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
                <NextImage
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
                w= "80%"
                mx='auto'
            >
                <Flex w='full' flexDir='column'>
                    <Stack spacing={3} mb={5}>
                        <Heading as='h4' size='md' color='#213360'>Punya Resep Dari Dokter?</Heading>
                        <HStack p={5} w='full' justifyContent='space-between' px={20}>
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
                        <Heading as='h4' size='md' color='#213360'>Daftar Kategori Obat</Heading>
                        <Grid templateColumns='repeat(3, 1fr)' gap={6} p={5} px={12} justifyItems='center'>
                            {categoriesList()}
                        </Grid>
                    </Stack>

                    <Stack spacing={3} mb={5} position='relative' mt={5}>
                        <Center w='25%' p={0} boxShadow='dark-lg'>
                            <NextImage
                                alt=""
                                src={BannerVer1}
                                width={220}
                                height={290}
                            />
                        </Center>

                        <Text position='absolute' fontSize={22} fontWeight='bold' top={-7} left={230} font color='#2B478B'>Rekomendasi Product</Text>

                        <Flex w='80%' borderRadius={15} position='absolute' right={3} top={17} align='center' justify={recProduct.length >= 1 ? 'center' : 'start'}>
                            <Box position='absolute' left={0}>
                                <ChevronLeftIcon onClick={() => setPage1(page1 - 1)} cursor={page1 > 1 ? 'pointer' : 'unset'} fontSize={20} color='grey' _hover={page1 > 1 ? {color: "#b41974", padding: 0} : null}/>
                            </Box>
                            
                            <Flex w='90%' pb={1}>
                                {productCard()}
                            </Flex>
                            
                            <Box >
                                <ChevronRightIcon onClick={() => {recProduct.length > 1 ? setPage1(page1 + 1) : ''}} cursor={recProduct?.length > 1 ? 'pointer' : 'unset'} fontSize={20} color='grey' _hover={ recProduct.length > 1 ? { color: "#b41974", padding: 0} : null}/>
                            </Box>
                        </Flex>
                        <Box borderBottom='2px solid #2B478B' boxShadow='dark-lg' w='80%' position='absolute' bottom={1} right={13}></Box>
                        <Box borderBottom='2px solid #2B478B' boxShadow='dark-lg' w='68%' position='absolute' top={2} right={12}></Box>
                    </Stack>

                    <Stack spacing={3} mb={5} position='relative' mt={5}>
                        <Center w='25%' boxShadow='dark-lg'>
                            <NextImage
                                alt=""
                                src={BannerVer2}
                                width={220}
                                height={290}
                            />
                        </Center>
                        
                        <Text position='absolute' fontSize={22} fontWeight='bold' top={-7} left={230} font color='#525234'>Vitamin</Text>
                        
                        <Flex w='80%' borderRadius={15} position='absolute' right={3} top={17} align='center' justify='center'>
                            <Box position='absolute' left={0}>
                                <ChevronLeftIcon onClick={() => setPage1(page2 - 1)} cursor={page2 > 1 ? 'pointer' : 'unset'} fontSize={20} color='grey' _hover={page2 > 1 ? {color: "#b41974", padding: 0} : null}/>
                            </Box>
                            
                            <Flex w="90%">
                                {productCardVit()}
                            </Flex>
                            
                            <Box >
                                <ChevronRightIcon onClick={() => {recProductVit.length > 3 ? setPage1(page2 + 1) : ''}} cursor={recProductVit?.length > 1 ? 'pointer' : 'unset'} fontSize={20} color='grey' _hover={ recProductVit.length > 1 ? { color: "#b41974", padding: 0} : null}/>
                            </Box>
                        </Flex>
                        <Box borderBottom='2px solid #dc8879'boxShadow='dark-lg' w='80%' position='absolute' bottom={1} right={13}></Box>
                        <Box borderBottom='2px solid #dc8879' boxShadow='dark-lg' w='68%' position='absolute' top={2} right={50}></Box>
                    </Stack>

                    <Stack  mb={5} mt={10}>
                        <Heading as='h4' size='md' mb={2} color='#213360'>Mau mengurus vaksin atau check-up?</Heading>
                        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                            <GridItem w='100%' h='180' bg='blue.500' boxShadow='2xl' >
                                <NextImage
                                    alt=""
                                    src={promotion1}
                                    height={181}
                                    width={350}
                                />
                            </GridItem>

                            <GridItem w='100%' h='180' bg='blue.500' boxShadow='2xl'>
                                <NextImage
                                    alt=""
                                    src={promotion2}
                                    height={181}
                                    width={350}
                                />
                            </GridItem>
                        </Grid>
                    </Stack>

                    <Stack  mb={10} mt={10}>
                        <Heading as='h4' size='md' mb={2} color='#213360' fontWeight='bold'>Jaminan untuk anda</Heading>
                        <VStack w='full'>
                            <HStack w='full' justify='center'>
                                <Box boxShadow='2xl'>
                                    <NextImage
                                        alt=""
                                        src={jaminan1}
                                        height={181}
                                        width={350}
                                    />
                                </Box>

                                <Box boxShadow='2xl'>
                                    <NextImage
                                        alt=""
                                        src={jaminan2}
                                        height={181}
                                        width={350}
                                    />
                                </Box>
                            </HStack>

                            <Box boxShadow='2xl'>
                                <NextImage
                                    alt=""
                                    src={jaminan3}
                                    height={181}
                                    width={350}
                                />
                            </Box>
                        </VStack>
                    </Stack>
                </Flex>
            </VStack>
        </VStack>
    )
}

export default HomePage