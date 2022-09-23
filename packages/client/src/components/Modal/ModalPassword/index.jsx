import { Button, Flex, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { IoMdEye, IoMdEyeOff } from "react-icons/io"
import { RiLockPasswordLine } from "react-icons/ri"

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
                        <VStack>
                            <Stack mb={5}>
                                <Text>Put your current password</Text>
                                <InputGroup borderRadius={5}>
                                    <Input type={showPassword ? 'tetx' : 'password'} />
                                    <InputRightElement bgColor='eee' borderEndRadius={5} onClick={() => {setShowPassword(!showPassword)}} cursor='pointer'>
                                        {showPassword ? <IoMdEyeOff/> : <IoMdEye/>}
                                    </InputRightElement>
                                </InputGroup>
                            </Stack>

                            <VStack>
                                <Stack>
                                    <Text>Your new password</Text>
                                    <InputGroup borderRadius={5}>
                                        <Input type={showPassword ? 'tetx' : 'password'} />
                                        <InputRightElement bgColor='eee' borderEndRadius={5} onClick={() => {setShowPassword(!showPassword)}} cursor='pointer'>
                                            {showPassword ? <IoMdEyeOff/> : <IoMdEye/>}
                                        </InputRightElement>
                                    </InputGroup>
                                </Stack>

                                <Stack>
                                    <Text>Confirm your new password</Text>
                                    <InputGroup borderRadius={5}>
                                        <Input type={showPassword ? 'tetx' : 'password'} />
                                        <InputRightElement bgColor='eee' borderEndRadius={5} onClick={() => {setShowPassword(!showPassword)}} cursor='pointer'>
                                            {showPassword ? <IoMdEyeOff/> : <IoMdEye/>}
                                        </InputRightElement>
                                    </InputGroup>
                                </Stack>
                            </VStack>

                            <Stack>

                            </Stack>
                        </VStack>    
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