import { Button, useToast } from "@chakra-ui/react"
import QueryString from "qs"
import { useSelector } from "react-redux"
import { axiosInstance } from "../../../../lib/hoc/api"
import render_types from "../../../../redux/reducers/types/render"

const ConfrimButton = (props) => {
    const  { size, order_id } = props
    console.log(order_id)
    const autoRender = useSelector((state) => state.render)
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

                dispatch({
                    type: render_types.AUTO_RENDER,
                    payload: {
                        value : !autoRender.value
                    }
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