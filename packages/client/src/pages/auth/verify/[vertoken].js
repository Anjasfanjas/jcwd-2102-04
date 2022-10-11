import VerifyingPage from "../../../components/GIO/VerifyingPage"
import { useRouter } from 'next/router'

const UserVerify = () =>{
    const router = useRouter()

    const { vertoken } = router.query

    return (
        <>
            <VerifyingPage token={vertoken} />
        </>
    )
}

export default UserVerify