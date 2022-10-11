import { Button, Flex, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { IoMdEye, IoMdEyeOff } from "react-icons/io"
import { RiLockPasswordLine } from "react-icons/ri"
import M_changePassword from "../../GIO/modals/M_changePassword"

const ModalPassword = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ showPassword, setShowPassword ] = useState(false)
    
    return (
        <>
            <Flex align='center' pt={6} cursor='pointer' fontSize={14} className='hover-rotate' onClick={() => {onOpen()}}>
                <Text mr={1}>Change Password</Text>
                <RiLockPasswordLine className="icon-rotate"/>
            </Flex>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size='sm'>
                <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Change your password here!</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <M_changePassword/>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalPassword