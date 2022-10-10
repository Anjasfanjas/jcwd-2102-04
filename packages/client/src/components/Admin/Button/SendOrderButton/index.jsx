import { Button, useToast } from "@chakra-ui/react"
import QueryString from "qs"
import { axiosInstance } from "../../../../lib/hoc/api"

const SendOrderButton = (props) => {
    const  { size, order_id } = props
    console.log(order_id)

    const toast = useToast()

    const changeStatusToDikirim = async() => {
        try {
            await axiosInstance.patch(`/order/update/status`, QueryString.stringify({
                order_id : order_id,
                order_status_id : 5
            })).then(() => {
                toast({
                    title: `order ${order_id} has ben send to user`,
                    status: 'success',
                    duration: 1000
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Button onClick={() => {changeStatusToDikirim()}} size={size} colorScheme="green">Send Order</Button>
        </>
    )
}

export default SendOrderButton