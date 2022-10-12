import React, { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  Avatar,
  AvatarGroup,
  Text,
  Icon,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Link,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  FormControl,
  useToast,
  TableContainer,
  TableCaption,
  Tfoot,
  Image as Img,
} from "@chakra-ui/react";
import {
  FiHome,
  FiPieChart,
  FiDollarSign,
  FiBox,
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiPlus,
  FiCreditCard,
  FiSearch,
  FiBell,
  FiGrid,
  FiLogOut,
  FiShoppingCart,
  FiEdit,
  FiDelete,
} from "react-icons/fi";
import { EditIcon } from "@chakra-ui/icons";
// import MyChart from "../../../components/Chart/index";

// import Logo from "../../../public/NavbarLogoPink.gif";
// import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import jsCoockie from "js-cookie";
import { useRouter } from "next/router";
import auth_types from "../../../../redux/reducers/types/auth";
import M_addCategory from "../../modals/M_addCategory/index";
import M_deleteCategory from "../../modals/M_deleteCategory";
import M_editCategory from "../../modals/M_editCategory";
import * as moment from "moment";
import { axiosInstance } from "../../../../library/api";

export default function NavbarA(props) {
  const [display, changeDisplay] = useState("hide");
  const [value, changeValue] = useState(1);
  const userSelector = useSelector((state) => {
    return state.auth;
  });

  const { id } = props;

  const autoRender = useSelector((state) => {
    return state.post;
  });

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    jsCoockie.remove("auth_token");

    dispatch({
      type: auth_types.AUTH_LOGOUT,
    });
    setIsLoading(true);
    router.push("/auth");
  };

  useEffect(() => {
    setIsLoading(false);
  }, [autoRender]);

  // const current = new Date();
  // const date = `${current.getDate()}/${
  //   current.getMonth() + 1
  // }/${current.getFullYear()}`;
  const date = moment(new Date()).format("LLLL");

  const [loadPage, setLoadPage] = useState(1);
  const [contentList, setContentList] = useState([]);

  const fetchData = async () => {
    await axiosInstance
      .get("/categories")
      .then((res) => {
        const data = res.data.result;
        console.log(data);
        setContentList(res.data.result);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (autoRender?.value !== undefined) {
      setLoadPage(loadPage);
      fetchData();
      console.log(contentList);
    }
  }, [autoRender?.value]);

  const renderCategory = () => {
    return contentList.map((val, index) => {
      return (
        <Tr>
          <Td>{val.category}</Td>
          <Td>
            <Img src={`http://${val.img_url}`} width={"90px"} height={"50px"} />
          </Td>

          <Td>
            <Flex justify="flex-end" ml="10">
              <M_editCategory key={index} id={val.id} />
              <M_deleteCategory key={index} id={val.id} />
            </Flex>
          </Td>
        </Tr>
      );
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Flex
      h={[null, null, "100vh"]}
      maxW="2000px"
      flexDir={["column", "column", "row"]}
      overflow="hidden"
    >
      {/* Column 1 */}

      {/* --------------Column 2------------- */}
      <Flex
        w={["100%", "100%", "60%", "60%", "55%"]}
        p="2%"
        flexDir="column"
        overflow="auto"
        minH="full"
        minW="full"
      >
        {/* <Heading fontWeight="normal" mb={4} letterSpacing="tight">
          Welcome back, {""}
          <Flex display="inline-flex" fontWeight="bold">
            {userSelector.username}
          </Flex>
        </Heading> */}

        {/* -------------CATEGORY------------ */}

        <Flex justifyContent="space-between" mt={8}>
          <Flex align="flex-end">
            <Heading as="h2" size="lg" letterSpacing="tight">
              CATEGORY
            </Heading>
            <Text fontSize="small" color="gray" ml={4}>
              {date}
            </Text>
          </Flex>

          <FormControl alignItems={"center"} maxW={"30%"}>
            {/* <Input type={"text"} placeholder={"Search...."} bgColor={"white"} /> */}

            <InputGroup
              bgColor="#fff"
              // mb={4}
              border="none"
              borderColor="gray"
              borderRadius="10px"
              mr={2}
            >
              <InputLeftElement
                pointerEvents="none"
                children={<FiSearch color="gray" />}
              />
              <Input type="number" placeholder="Search" borderRadius="10px" />
            </InputGroup>
          </FormControl>

          <Flex justifyContent={"flex-end"}>
            <Link href="/home">
              <Icon as={FiHome} fontSize="4xl" mr="5" />
            </Link>
            <M_addCategory />
          </Flex>
        </Flex>
        <Box
          mt={5}
          borderRadius={5}
          // bgColor={"#e3e3e3"}
          minH="40vh"
          minW="80vh"
          boxShadow={"dark-lg"}
          border={2}
        >
          {/* -----------TABLE CATEGORY---------- */}
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th>Category</Th>
                  <Th>Image</Th>
                  <Th isNumeric>Setting</Th>
                </Tr>
              </Thead>
              <Tbody>{renderCategory()}</Tbody>
              <Tfoot>
                <Tr>
                  <Th>To convert</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>

        {/* ------------PRODUCT DATA--------- */}
      </Flex>

      {/* --------------Column 3------------ */}
    </Flex>
  );
}
