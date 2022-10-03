/* eslint-disable react/no-children-prop */
import { useCounter } from "@chakra-ui/counter";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Divider, Flex, FormControl, FormLabel, HStack, IconButton, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, StackDivider, Text, useDisclosure, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { axiosInstance } from "../../../../library/api";

const AdminModalPrescription = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { img_url } = props
    const [ productName, setProductName ] = useState([])

    const [ numberOfProduct, setNumberOfProduct ] = useState([])
    const [ selectedUnit, setSelectedUnit ] = useState(false)
    const [ quantityProduct, setquantityProduct ] = useState([])

    const [ numberOfRacikan, setNumberOfRacikan ] = useState([])
    // const [ numberOfRacikanObat, setNumberOfRacikanObat] = useState([])
    const [ quantityRacikan, setquantityRacikan ] = useState([])

    const [reload, setReload] = useState(false)

    const [ status, setStatus ] = useState(false)
    const counter = useCounter({
        max: 10,
        min: 0,
        step: 1,
    })
    
    const Counter = (index) => {   
        return (
            <HStack >   
                <IconButton icon={<MinusIcon/>} onClick={() => counter.decrement()}/>
                <Input p={3} w='30%' onChange ={(event) => {quantityProduct[index] = event.target.value; alert(event.target.value)}} value={counter.value ? counter.value : 0}/>
                <IconButton icon={<AddIcon/>} onClick={() => counter.increment()}/>
            </HStack>
        )
    }

    const fetchAllProductName = async () => {
        try {
            await axiosInstance.get("/product/name").then((res) => {
                const data = res.data.result
                setProductName([...data])
                // console.log(data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const renderProductOption = () => {
        return productName.map((val) => {
            return (
                <>
                    <option value={Number(val.id)}>{val.product_name}</option>
                </>
            )
        })
    }

    const renderProductUnitOption = (product_id) => {
        return productName.map((val) => {
           return product_id == val.id ? (
                <>
                    <option value={false}>{val.product_stocks[0].main_unit}</option>
                    <option value={true}>{val.product_stocks[0].converted_unit}</option>
                </>
            ) : null
        })
    }


    const componentAddReceipt = () => {
        return (
            numberOfProduct?.map((val, index) => {
                return (
                    <>
                        <VStack spacing={5} p={2} w='full' borderRadius={15} justify='space-between' borderBottom='1px solid red'>
                            <HStack w="full">
                                <HStack w='full'>
                                    <Text>Product</Text>
                                    <Select defaultValue={val}  onChange={(event) => {{numberOfProduct[index] = event.target.value}; console.log(numberOfProduct)}}>
                                        {renderProductOption()}
                                    </Select>
                                </HStack>

                                <HStack w='full'>
                                    <Text> Unit</Text>
                                    <Select defaultValue={val} onChange = {(event) => {setSelectedUnit(event.target.value)}}>
                                        {renderProductUnitOption(numberOfProduct[index])}
                                    </Select>
                                </HStack>

                            </HStack>

                            <HStack w="100%">
                                <HStack w='full' align='center'>
                                    <Text>Quantity</Text>
                                    {Counter(index)}
                                    <Text w='92%'>stok tersedia</Text>
                                </HStack>
                            </HStack>
                            <Text fontSize={12} textAlign='end' color='red' w='full' p={0} onClick={() => {numberOfProduct.splice(index, 1);console.log(numberOfProduct)}}>hapus product {index}</Text>
                        </VStack>
                    </>
                )
            })
        )
    }

    const editItemRacikanObat = (index,idx,value) => {
        const temp = numberOfRacikan
        temp[index].racikan_item[idx].productId  = value
        setNumberOfRacikan(temp)
        setReload(!reload)

    }

    
    const editItemRacikanQty = (index,idx,value) => {
        const temp = numberOfRacikan
        temp[index].racikan_item[idx].qty  = value
        setNumberOfRacikan(temp)
    }
    
    function addItemRacikan(index) {
        const obj = {
            productId: 1,
        };

        const temp = numberOfRacikan;

        temp[index].racikan_item.push(obj)

        setNumberOfRacikan(temp)

        setReload(!reload)

        // temp[index].racikan_item[0].productId = productid;
        // temp[index].racikan_item[0].qty = qty;

        // console.log(temp[0])
        // alert(temp[index].racikan_item.length)
        // temp[index].racikan_item.push(obj)

        // const idx = 0;
        // const productid = 15;
        // const qty = 200;
        
       

        // temp[index].racikan_item.push(obj)

        // console.log(temp[0].racikan_item)
        // setNumberOfRacikan(temp)

        // setNumberOfRacikan(...numberOfRacikan, numberOfRacikan[0].racikan_item)
        

        
        // alert(numberOfRacikanObat?.length)
        // const updatedArray = numberOfRacikanObat?.length? [] : [obj] 
        // const updated = 


        // setNumberOfRacikanObat(numberOfRacikanObat.concat(obj))
        // console.log(obj)
        // console.log(numberOfRacikanObat)
    }
    
    function addRacikan() {
        // setNumberOfRacikan(numberOfRacikan.concat([numberOfRacikanObat])
        const obj = {
            nama_racikan : "",
            racikan_item : []
        }
        setNumberOfRacikan(numberOfRacikan.concat(obj))
    }

    const componentObatRacik = () => {
        console.log(numberOfRacikan)
        return (
            numberOfRacikan?.map((val, index) => {
                return (
                    <>
                        <VStack w='full' borderBottom='1px solid #b41974'borderRadius={15}>
                            <InputGroup>
                                <InputLeftAddon children='Nama Racikan'/>
                                <Input type='text' w='full' p={1}/>
                            </InputGroup>

                            { val.racikan_item?.map((val, idx) => {
                                return (
                                    <>
                                        <HStack spacing={5} p={2} w='full'>
                                            <VStack w="50%">
                                                <Text w='full'>Product ke {index+1}</Text>
                                                {/* <Select defaultValue={val} onChange={(event) => {{val[index].productId = event.target.value}; console.log(numberOfRacikanObat)}}> */}
                                                <Select defaultValue={val} onChange={(event) => editItemRacikanObat(index,idx,event.target.value)}>

                                                    {renderProductOption()}
                                                </Select>
                                            </VStack>

                                            <VStack w="50%">
                                                <HStack w='full' justify='space-between' align='start'>
                                                    <Text>quantity</Text>
                                                    <Text fontSize={12} color='red' onClick={() => {
                                                        numberOfProduct.splice(index, 1);
                                                        }
                                                        
                                                        }>hapus product {index}</Text>
                                                </HStack>
                                                {Counter(index)}
                                            </VStack>
                                        </HStack>
                                    </>
                                )
                            })
                                
                            }
                            <Button leftIcon={<AddIcon size='sm' />}
                            onClick={() => {addItemRacikan(index)}} 
                            size='sm'>Product</Button>

                            {/* <Button leftIcon={<AddIcon size='sm'/>} onClick = {() => {
                                // setNumberOfRacikanObat(numberOfRacikanObat.concat([{}]))
                                const obj = {
                                    productId: 1,
                                };
                                setNumberOfRacikanObat(numberOfRacikanObat.push(obj))
                                console.log(numberOfRacikanObat)
                                }} size='sm'>Product</Button> */}
                        </VStack>
                    </>
                )
            })
        )
    }

    useEffect(() => {
        componentAddReceipt()
        componentObatRacik()
        fetchAllProductName()

    }, [numberOfProduct, numberOfRacikan, reload])


    // useEffect(()=>{
    //     alert("asd")
    //     componentObatRacik()
    // },[reload])
   
    return (
        <>
            <Button colorScheme='blue' onClick={onOpen}>Buat Pesanan</Button>

            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent minW='80vw'>
                    <ModalHeader>Buat Pesanan User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex py={2}>
                            <Stack flex={1} align='left' borderRight='1px solid black' p={3} pr={6} mr={3}>
                                <Text p={2} fontWeight='bold' mb={5}>Resep Docter</Text>
                                <Image
                                    src= {`http:/${img_url}`}
                                    alt=""
                                    width="400em"
                                    height="400em"
                                />
                            </Stack>

                            <VStack flex={1} w='full' justify={'start'} align='center' p={3} minH='80vh'>
                                <Text p={2} w='full' fontWeight='bold' mb={3}>Buat Pesanan</Text>
                                <HStack w='full'>
                                    <Button colorScheme="green" onClick={() => {setStatus(false)}}>Tambah Product</Button>
                                    <Button colorScheme="blue" onClick={() => {setStatus(true)}}>Tambah Obat Racikan</Button>
                                </HStack>
                                {
                                    status === false ? (componentAddReceipt()) : (componentObatRacik())
                                }
                                <Box w='full' align={"center"}>
                                    { status === false ? (
                                            <Button mt={5} onClick={() => {setNumberOfProduct(numberOfProduct.concat([1]));console.log(numberOfProduct)}}>
                                                Tambah Product
                                            </Button>
                                        ) : (
                                            // <Button mt={5} onClick={() => {setNumberOfRacikan(numberOfRacikan.concat([numberOfRacikanObat]));console.log(numberOfRacikan)}}>
                                            //     Tambah Racikan Obat
                                            // </Button>
                                        
                                        <Button mt={5} onClick={addRacikan}>
                                                Tambah Racikan Obat
                                            </Button>
                                        )
                                    }
                                </Box>
                            </VStack>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>

                        <Button colorScheme="red" mr={3}>
                            Tolak
                        </Button>

                        <Button
                            colorScheme={"green"}
                        >
                            Buat Order
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AdminModalPrescription;
