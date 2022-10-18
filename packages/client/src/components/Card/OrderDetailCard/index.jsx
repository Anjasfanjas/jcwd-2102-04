import { HStack, Text, VStack } from "@chakra-ui/react"
import Image from "next/image"

const OrderDetailCard = (props) => {
    const { product_name, nomor, product_price, quantity, image_url, product_unit, total_price, user_id, cart_id } = props

    return (
        <HStack w='full' align='center' justify='space-between' boxShadow='xl' p={3}>
                <HStack>
                    <Text mr={3} p={1} my={1} fontWeight='bold' fontSize={14} borderBottom='1px solid #b41974' borderEnd='1px solid #b41974' borderRadius={4}>{nomor}</Text>
                    <Image
                        src={`https://${image_url}`}
                        alt=""
                        width={120}
                        height={120}
                    />

                    <VStack align="start">
                        <Text fontWeight='bold' fontSize={16}>{product_name}</Text>
                        <HStack spacing={1} align='center'>
                            <Text color='grey' fontSize={14}>{quantity} {product_unit}</Text>
                            <Text fontSize={14} >X {Number(product_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                        </HStack>
                    </VStack>
                </HStack>

                <VStack fontWeight='bold'>
                    <Text w='full'>Total Harga</Text>
                    <Text w='full'>{Number(total_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                </VStack>
        </HStack>
    )
}

export default OrderDetailCard