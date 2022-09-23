import { Box } from "@chakra-ui/react"
import Footer from "../../../components/Footer"
import Navbar from "../../../components/Navbar"
import Profile from "../../../components/Profile"

const UserProfile = () => {
    return (
        <Box>
            <Navbar/>
            <Profile/>
            <Footer/>
        </Box>
    )
}

export default UserProfile