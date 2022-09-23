import { Button, FormControl, FormLabel, HStack, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, VStack } from "@chakra-ui/react"
import { Select } from "chakra-react-select"

const ModalUpload = () => {
    return (
        <>
            <Button color='grey' fontSize={12} mb={2}>Select Images</Button>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size='lg'>
                <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Add your address here!</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <VStack spacing={5} align='center'>
                            
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

export default ModalUpload