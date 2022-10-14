import { Button, useToast } from "@chakra-ui/react"
import QueryString from "qs"
import { useDispatch } from "react-redux"
import { axiosInstance } from "../../../../lib/hoc/api"
import render_types from "../../../../redux/reducers/types/render"

const SendOrderButton = (props) => {
    const  { size, order_id, daftar_product } = props
    const toast = useToast()
    const dispatch = useDispatch()
    
    const updateStock = () => {
        daftar_product?.map( async (val) => {
            try {
                await axiosInstance.patch("/stock/penjualan", QueryString.stringify({
                    product_id : val.product_id,
                    main_unit_qty: val.is_racikan === true ? 0 : val.quantity,
                    converted_unit_qty: val.is_racikan === true ? val.quantity : 0,
                    desc: "penjualan",
                }))
            } catch (error) {
                console.log(error)
            }
        })    
    }

    const changeStatusToDikirim = async() => {
        updateStock()
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

            onclose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Button onClick={() => {
                    changeStatusToDikirim()
                    console.log(daftar_product)
                }
            } size={size} colorScheme="green">Send Order</Button>
        </>
    )
}

export default SendOrderButton