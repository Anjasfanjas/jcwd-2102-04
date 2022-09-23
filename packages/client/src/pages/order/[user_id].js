import BreadcrumbPage from "../../components/BreadcrumbPage"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import OrderPage from "../../components/OrderPage"


const Order = () => {
    return (
        <>
            <Navbar/>
                <BreadcrumbPage page={['store', 'payment']}/>
                <OrderPage/>
            <Footer/>
        </>
    )
}

export default Order