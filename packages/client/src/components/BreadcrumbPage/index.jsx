import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Text } from "@chakra-ui/react"


const BreadcrumbPage = (props) => {

    const loopInput = () => {
        return props.page.map((val, index) => {
            if(index < (props.page.length - 1)){
                return (
                    <BreadcrumbItem color='grey'>
                        <BreadcrumbLink href={`/${val}`}>{val}</BreadcrumbLink>
                    </BreadcrumbItem>
                )
            } else {
                return (
                    <BreadcrumbItem isCurrentPage>
                        <Text color='#b41974'>{val}</Text>
                    </BreadcrumbItem>
                )
            }
        })
    }

    console.log(props.page)

    return(
        <Box pl={5} pt={5}>
            <Breadcrumb  fontSize={16}>
                {loopInput()}
            </Breadcrumb>
        </Box>
    )
}

export default BreadcrumbPage