import BreadcrumbPage from "../../components/Breadcrumb"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import OrderPage from "../../components/Page/OrderPage"


const Order = () => {
    return (
        <>
            <Navbar/>
                <BreadcrumbPage page={['store', 'order']}/>
                <OrderPage/>
            <Footer/>
        </>
    )
}

export default Order