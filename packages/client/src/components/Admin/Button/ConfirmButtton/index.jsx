import { Button, useToast } from "@chakra-ui/react"
import QueryString from "qs"
import { axiosInstance } from "../../../../lib/hoc/api"

const ConfrimButton = (props) => {
    const  { size, order_id } = props
    console.log(order_id)

    const toast = useToast()

    const changeStatusToDiproses = async() => {
        try {
            await axiosInstance.patch(`/order/update/status`, QueryString.stringify({
                order_id : order_id,
                order_status_id : 3
            })).then(() => {
                toast({
                    title: `order ${order_id} has ben proccessed`,
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
            <Button onClick={() => {changeStatusToDiproses()}} size={size} colorScheme="purple">Confirm</Button>
        </>
    )
}

export default ConfrimButton