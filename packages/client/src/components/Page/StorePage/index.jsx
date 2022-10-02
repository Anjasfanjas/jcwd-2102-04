/* eslint-disable react/no-unescaped-entities */
import { Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text, Button, AccordionPanel, AccordionIcon, Box, AccordionButton, AccordionItem, Accordion, Stack, Checkbox, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Input, VStack, Grid, GridItem, Center, Container, HStack, Link, Select } from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { useEffect, useState } from "react"
import Image from "next/image"
import { axiosInstance } from "../../../library/api"
import { useRouter } from "next/router"
import ProductCard from "../../Card/productCard"
import { useDispatch, useSelector } from "react-redux"
import render_types from "../../../redux/reducers/types/render"

const ProductStore = (props) => {
    const [sliderValue, setSliderValue] = useState(0)
    const [ allProduct, setAllProduct ] = useState([])
    const [ allCategories, setAllCategories ] = useState([])
    const [ recentCategory, setRecentCategory ] = useState("")
    const autoRender = useSelector((state) => {return state.render})

    const dispatch = useDispatch()
    const router = useRouter()
    
    // ----------------  fetching data  --------------------//
    // fetching all categories // 
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

    // fetching all product
    const fetchDataProduct = async (filter) => {
        let order = ""
        let sort = ""
        if (filter == 'name_asc') {
            order = 'product_name';
            sort = "ASC"
        } else if (filter == 'name_desc') {
            order = 'product_name';
            sort = "DESC"
        } else if (filter == 'price_desc') {
            order = 'sell_price';
            sort = "DESC"
        } else if (filter == 'price_asc') {
            order = 'sell_price';
            sort = "ASC"
        } else {
            order = '';
            sort = ""
        }

        try {
            await axiosInstance.get(`/product/`, {params: {
                category: recentCategory,
                limit : 21,
                page: 1,
                sort : sort,
                orderBy : order,
                min: (sliderValue[0] ? sliderValue[0]*1000 : 0),
                max: (sliderValue[1] ? sliderValue[1]*1000 : 200*1000 ),
                search: props.search
            }}).then((res) => {
                const data = res.data.result
                setAllProduct(data)
            })
        } catch (error) {
            console.log(error)
        }
    }
    // ------xxx-------  fetching data  ----------xxx--------//
    
    // ----------------  rendering data  --------------------//
    const categoriesList = () => {
        return allCategories?.map((val) => {
            return (
                <>
                    <Button size='sm' onClick={() => {
                        recentCategory == val.category ? setRecentCategory("") :
                        setRecentCategory(val.category)
                    }}
                    >
                       <Text align='left' w='70%'>{val.category}</Text>
                    </Button>
                </>
            )
        })
    }

    const productCard = () => {
        return allProduct?.map((val, index) => {
            return (
                <>
                    <ProductCard key={index}
                        product_id = {val.id}
                        product_image = {`http://${val.product_imgs[0].img_url}`}
                        product_name = {val.product_name}
                        product_category = {val.product_categories}
                        product_price = {Number(val.product_stocks[0].sell_price)}
                    />
                </>
            )
        })
    }

    // ------xxx-------  rendering data  ----------xxx--------//
    useEffect(() => {
        fetchDataProduct()
        fetchDataCategories()
    }, [recentCategory ,sliderValue, props.search])

    
    // useEffect(()=> {
    // alert("test")
    // },[sliderValue])
    return (
        <Flex
            flexDir='row'
            overflow='hidden'
            maxW= "90%"
            mx='auto'
            boxShadow='dark-lg'
            mt={10}
            mb={10}
        >
            <Flex
                flexDir='column'
                alignItems='center'
                px={5}
                w='20em'
            >
                <Flex 
                    flexDir='column'
                    justifyContent='space-between'
                    h='full'
                    w='full'
                    // px={10}
                    marginY={12}
                >
                    {/* menu*/}
                    <VStack 
                        display='inline'
                        spacing={5}
                    >
                        {/* menu list */}
                        <Accordion defaultIndex={[0]} allowMultiple>
                            <AccordionItem>
                                <AccordionButton bgColor='#005E9D' color='white' _hover={{bgColor: 'white', color: 'black'}}>
                                    <Box flex='1' textAlign='left'>
                                        <Text>Category</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                
                                <AccordionPanel pb={4}> 
                                    <Stack w='100%' spacing={3} className='link'>
                                        {categoriesList()}
                                    </Stack>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>

                        <Accordion defaultIndex={[0]} allowMultiple>
                            <AccordionItem>
                                <AccordionButton bgColor='#005E9D' color='white' _hover={{bgColor: 'white', color: 'black'}}>
                                    <Box flex='1' textAlign='left'>
                                        <Text>Harga</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                
                                <AccordionPanel pb={4}> 
                                    <Stack w='100%' spacing={3}>
                                        <RangeSlider 
                                            defaultValue={[0, 200]} 
                                            min={0} 
                                            max={200} 
                                            step={50}
                                            onChangeEnd={(val) => setSliderValue(val)}
                                            w='87%'
                                            alignSelf='center'
                                            mt={5}
                                        >                                        
                                            <RangeSliderTrack>
                                                <RangeSliderFilledTrack/>
                                            </RangeSliderTrack>

                                            <RangeSliderThumb bgColor='#005E9D' index={0}/>
                                            <RangeSliderThumb bgColor='#005E9D' index={1}/>
                                        </RangeSlider>

                                        <Flex w='105%' textAlign='center'>
                                            <Text flex={1} pr={1}>0</Text>
                                            <Text flex={1}>50</Text>
                                            <Text flex={1}>100</Text>
                                            <Text flex={1}>150</Text>
                                            <Text flex={1} pl={1}>200</Text>
                                        </Flex>

                                        <Input type={'number'} placeholder='min' value={sliderValue[0]}/>
                                        <Input type={'number'} placeholder='max' value={sliderValue[1]}/>

                                        <HStack justify='center' align='center' spacing={5}>
                                            <Button size='sm' onClick={() => {setSliderValue(0)}}>Reset</Button>
                                            <Button size='sm' >Save</Button>
                                        </HStack>
                                    </Stack>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </VStack>
                </Flex>
            </Flex>

            {/* Content */}
            <VStack minW='75%' p={3} ml={3}>
                <Flex w='full' flexDir='column'>
                    <Text fontWeight='bold' fontSize={17}>{recentCategory ? `${recentCategory}'s Category` : "All Product"}</Text>
                    <Box w='full' h={1} borderBottom="2px" borderColor='#005E9D' mt={2} boxShadow='dark-lg'></Box>
                </Flex>

                <Flex w='full' justify='space-between' align='center' p={2}>
                    <Box>
                        <Text>{allProduct.length} {recentCategory ? `Products in ${recentCategory}`: "Total Product"}</Text>
                    </Box>

                    <Box display='flex'>
                        <Select onChange={(event) => {fetchDataProduct(event.target.value )}}>
                            <option value=''>Urutkan</option>
                            <option value='name_asc'>Name Ascending</option>
                            <option value='name_desc'>Name Descending</option>
                            <option value='price_desc'>Highest Price</option>
                            <option value='price_asc'>Lowest Price</option>
                        </Select>
                    </Box>
                </Flex>

                <Box w='full'>
                    <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                        {/* <GridItem>
                            <Box w='full' borderRadius='.5em' className='product-card' cursor='pointer'> */}
                                {/*  product card */}
                                {productCard()}
                            {/* </Box>
                        </GridItem> */}
                    </Grid>
                    <Center my={5}>
                        <HStack>
                            <Button onClick={() => {setCounter(counter - 1)}} size='sm' 
                                bgColor='#005E9D' 
                                color='white'
                                _hover={{
                                    backgroundColor: "#e3eeee",
                                    color: "#005E9D"
                                }}
                            >
                                Prev
                            </Button>
                            
                            <Box sz='sm'>1</Box>
                            
                            <Button onClick={() => {setCounter(counter + 1)}} size='sm'
                                bgColor='#005E9D' 
                                color='white'
                                _hover={{
                                    backgroundColor: "#e3eeee",
                                    color: "#005E9D"
                                }}
                            >
                                Next
                            </Button>
                        </HStack>
                    </Center>
                </Box>
            </VStack>

        </Flex>
    )
}

export default ProductStore