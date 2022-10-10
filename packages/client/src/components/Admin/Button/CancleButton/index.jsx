import { Button, useToast } from "@chakra-ui/react"
import QueryString from "qs"
import { axiosInstance } from "../../../../lib/hoc/api"

const CancleButton = (props) => {
    const  { size, order_id } = props
    console.log(order_id)

    const toast = useToast()

    const changeStatusToCancle = async() => {
        try {
            await axiosInstance.patch(`/order/update/status`, QueryString.stringify({
                order_id : order_id,
                order_status_id : 4
            })).then(() => {
                toast({
                    title: `order ${order_id} has ben cancled`,
                    status: 'warning',
                    duration: 1000
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Button onClick={() => {changeStatusToCancle()}} size={size} colorScheme="red">Cancle Order</Button>
        </>
    )
}

export default CancleButton