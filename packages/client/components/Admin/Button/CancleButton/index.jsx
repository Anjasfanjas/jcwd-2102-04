import { Button, useToast } from "@chakra-ui/react"
import QueryString from "qs"
import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from "../../../../lib/hoc/api"
import render_types from "../../../../redux/reducers/types/render"

const CancleButton = (props) => {
    const  { size, order_id } = props
    console.log(order_id)

    const toast = useToast()
    const dispatch = useDispatch()
    const autoRender = useSelector((state) => state.render)

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
            <Button onClick={() => {changeStatusToCancle()}} size={size} colorScheme="red">Cancle Order</Button>
        </>
    )
}

export default CancleButton