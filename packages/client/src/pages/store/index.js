import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import ProductStore from "../../components/ProductStore"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Store = () => {
    const { search } = useRouter().query
    
    useEffect(() => {
        search
    }, [useRouter().isReady])
    
    return (
        <>
            <Navbar/>
            <ProductStore search={search}/>
            <Footer/>
        </>
    )
}

export default Store