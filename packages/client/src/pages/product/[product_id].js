import BreadcrumbPage from "../../components/BreadcrumbPage"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import ProductDetail from "../../components/ProductDetail"

const productDetail = () => {
    return (
        <>
            <Navbar/>
                <BreadcrumbPage page={['store', 'product']}/>
                <ProductDetail/>
            <Footer/>
        </>
    )
}

export default productDetail