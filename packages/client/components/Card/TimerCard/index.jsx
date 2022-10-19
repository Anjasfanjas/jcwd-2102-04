import { VStack, HStack, Box, Text,  } from "@chakra-ui/react"
import moment from "moment"

const TimerCard = (props) => {
    const { date } = props

    // let now = new Date().getTime()
    // let dateLine = new Date(moment(date).add(3, "day")).getTime()
    
    // let distance = dateLine - now
    
    // let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    // let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    // let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return (
        <VStack>
            <HStack spacing={2}>
                <Box color='white' borderRadius={5} fontSize={24} p={2} w={14} bgColor='#b41974'>
                    <VStack spacing={0}>
                        <Text>24</Text>
                        <Text fontSize={10}>Days</Text>
                    </VStack>
                </Box>

                <Text fontSize={32} color="#b41974">:</Text>

                <Box color='white' borderRadius={5} fontSize={24} w={14} p={2} bgColor='#b41974'>
                    <VStack spacing={0}>
                        <Text>24</Text>
                        <Text fontSize={10}>Hours</Text>
                    </VStack>
                </Box>

                <Text fontSize={32} color="#b41974">:</Text>

                <Box color='white' borderRadius={5} fontSize={24} p={2} w={14} bgColor='#b41974'>
                    <VStack spacing={0}>
                        <Text>24</Text>
                        <Text fontSize={10}>Minutes</Text>
                    </VStack>
                </Box>
                
                <Text fontSize={32} color="#b41974">:</Text>

                <Box color='white' borderRadius={5} fontSize={24} p={2} w={14} bgColor='#b41974'>
                    <VStack spacing={0}>
                        <Text>24</Text>
                        <Text fontSize={10}>Seconds</Text>
                    </VStack>
                </Box>
            </HStack>
        </VStack>
    )
}

export default TimerCard