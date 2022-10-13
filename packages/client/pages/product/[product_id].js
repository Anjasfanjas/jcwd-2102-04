import BreadcrumbPage from "../../components/Breadcrumb"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import ProductDetail from "../../components/Page/ProductDetailPage"

const ProductDetailPage = () => {
    return (
        <>
            <Navbar/>
                <BreadcrumbPage page={['store', 'product']}/>
                <ProductDetail/>
            <Footer/>
        </>
    )
}

export default ProductDetailPage