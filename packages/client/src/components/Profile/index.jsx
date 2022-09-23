import { Avatar, Box, Button, Center, Container, Flex, Heading, Icon, Link, Text, useToast } from "@chakra-ui/react"
import { FaRegAddressBook } from "react-icons/fa"
import { CgProfile, CgLogOut } from "react-icons/cg"
import { RiUserSettingsLine } from "react-icons/ri"
import { MdOutlineLocalShipping } from "react-icons/md"
import UserProfile from "./UserProfile"
import { useState } from "react"
import UserOrder from "./UserOrder"


const Profile = () => {
    const [menuActive, setMenuActive] = useState("profile")

    return (
        <Flex
            flexDir='row'
            overflow='hidden'
            maxW= "60em"
            minH='90vh'
            mx='auto'
            boxShadow='dark-lg'
            mt={10}
            mb={10}
        >
            {/* menu list */}
            <Flex
                bgColor='#020202'
                flexDir='column'
                alignItems='center'
                w='30%'
                color='white'
            >
                <Flex 
                    flexDir='column'
                    justifyContent='space-between'
                    h='full'
                    w="100%"
                    px={10}
                    marginY={10}
                >
                    {/* menu*/}
                    <Flex
                        flexDir='column'
                        as='nav'
                    >
                        {/* menu list */}
                        <Flex 
                            flexDir='column'
                            align='flex-start'
                            justifyContent='center'
                        >
                            {/* menu items */}
                            <Flex 
                                className='profile-menu' 
                                mb='1em' 
                                w="full"
                                cursor='pointer'
                                onClick={
                                    () => {setMenuActive("profile")}
                                }
                                align='center'
                            >
                                <Icon as={CgProfile} fontSize='2xl' className={menuActive== 'profile'? 'active-icons' : ''}/>
                                <Text ml='1em' className={menuActive == 'profile' ? "active" : ''}>Profile</Text>
                            </Flex>

                            <Flex 
                                className='profile-menu' 
                                mb='1em'
                                cursor='pointer'
                                w='full'
                                onClick={
                                    () => {setMenuActive("order")}
                                }
                                align='center'
                            >
                                <Icon as={MdOutlineLocalShipping} fontSize='2xl' className={menuActive== 'order'? 'active-icons' : ''}/>
                                <Text ml='1em' className={menuActive == 'order' ? "active" : ''}>Order</Text>
                            </Flex>
                        </Flex>
                    </Flex>

                    {/* Logout */}
                    <Flex
                        color='red'
                    >
                        <Icon as={CgLogOut} fontSize='2xl'/>
                        <Text ml='1em' fontSize='large'>Logout</Text>

                    </Flex>
                </Flex>
            </Flex>

            {/* Content */}
            <Flex minW='70%' justify='center' p={3}>
                {(() => {
                    if(menuActive == "profile"){
                        return <UserProfile/>
                    }

                    if(menuActive == "order"){
                        return <UserOrder/>
                    }
                })()}
            </Flex>
        </Flex>
    )
}

export default Profile