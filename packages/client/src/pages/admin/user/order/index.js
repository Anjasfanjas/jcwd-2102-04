import { useEffect } from "react";
import { useSelector } from "react-redux";
import AdminUserOrder from "../../../../components/Admin/AdminUserOrder"


const UserOrder = () => {
    const userSelector = useSelector((state) => {return state.auth});

    useEffect(() => {
        if (!userSelector?.role === 'user') {
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