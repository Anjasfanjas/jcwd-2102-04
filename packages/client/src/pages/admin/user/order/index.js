import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AdminUserOrder from "../../../../components/Admin/AdminUserOrder"
import Auth from "../../../../components/GIO/Auth"


const UserOrder = () => {
    const userSelector = useSelector((state) => {return state.auth});
    const Router = useRouter()

    useEffect(() => {
        if (!userSelector?.id){
            Router.push('/auth')
        } else if (userSelector?.role === 'user' && userSelector?.id) {
            Router.push("/");
        } 
        
    }, [userSelector?.id]);
    
    return (
        <>
            <AdminUserOrder/>
        </>
    )
}

export default UserOrder