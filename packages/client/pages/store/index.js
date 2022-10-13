import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import ProductStore from "../../components/Page/StorePage"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Store = () => {
    const { search, category } = useRouter().query
    
    useEffect(() => {
        search, category
    }, [useRouter().isReady])
    
    return (
        <>
            <Navbar/>
            <ProductStore search={search} category={category} pageList = {[1, 1]}/>
            <Footer/>
        </>
    )
}

export default Store