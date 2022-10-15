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
} from "react-icons/fi";
import { EditIcon } from "@chakra-ui/icons";
// import MyChart from "../../../components/Chart/index";

import Logo from "../../../public/NavbarLogoPink.gif";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import jsCoockie from "js-cookie";
import { useRouter } from "next/router";
import auth_types from "../../../redux/reducers/types/auth";
import M_addCategory from "../../modals/M_addCategory/index";
import M_addProduct from "../../modals/M_addProduct";
import * as moment from "moment";
import { axiosInstance } from "../../../library/api";

export default function NavbarA() {
  const [display, changeDisplay] = useState("hide");
  const [value, changeValue] = useState(1);
  const userSelector = useSelector((state) => {
    return state.auth;
  });

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

  const date = moment(new Date()).format("LLLL");

  const [loadPage, setLoadPage] = useState(1);
  const [contentList, setContentList] = useState([]);

  const fetchData = async () => {
    await axiosInstance
      .get("/categories")
      .then((res) => {
        const data = res.data.result;
        console.log("tryg" + data);
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
        <Tr key={index}>
          <Td>{val.category}</Td>
          <Td>
            <Img src={`http://${val.img_url}`} width={"90px"} height={"50px"} />
          </Td>
          <Td isNumeric>25.4</Td>
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
      <Flex
        w={["100%", "100%", "10%", "15%", "15%"]}
        flexDir="column"
        alignItems="center"
        backgroundColor="#005555"
        color="#fff"
      >
        <Flex
          flexDir="column"
          h={[null, null, "100vh"]}
          justifyContent="space-between"
        >
          <Flex flexDir="column" as="nav">
            <Heading
              mt={50}
              mb={[25, 50, 100]}
              fontSize={["4xl", "4xl", "2xl", "3xl", "4xl"]}
              alignSelf="center"
              letterSpacing="tight"
            >
              <Link href="/home">
                <Image src={Logo} alt="Logo" width={180} height={100} />
              </Link>
            </Heading>
            <Flex
              flexDir={["row", "row", "column", "column", "column"]}
              align={["center", "center", "center", "flex-start", "flex-start"]}
              wrap={["wrap", "wrap", "nowrap", "nowrap", "nowrap"]}
              justifyContent="center"
            >
              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <Link
                  href="/home"
                  display={["none", "none", "flex", "flex", "flex"]}
                >
                  <Icon as={FiHome} fontSize="2xl" className="active-icon" />
                </Link>
                <Link
                  href="/home"
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                >
                  <Text className="active">Home</Text>
                </Link>
              </Flex>
              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <Link
                  href="/admin/category"
                  display={["none", "none", "flex", "flex", "flex"]}
                >
                  <Icon as={FiGrid} fontSize="2xl" />
                </Link>
                <Link
                  href="/admin/category"
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                >
                  <Text>Category </Text>
                </Link>
              </Flex>

              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <Link
                  href="/admin/product"
                  display={["none", "none", "flex", "flex", "flex"]}
                >
                  <Icon as={FiShoppingCart} fontSize="2xl" />
                </Link>
                <Link
                  href="/admin/product"
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                >
                  <Text>Product </Text>
                </Link>
              </Flex>

              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <Link display={["none", "none", "flex", "flex", "flex"]}>
                  <Icon as={FiPieChart} fontSize="2xl" />
                </Link>
                <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                >
                  <Text>Report</Text>
                </Link>
              </Flex>
              <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                <Link display={["none", "none", "flex", "flex", "flex"]}>
                  <Icon as={FiBox} fontSize="2xl" />
                </Link>
                <Link
                  _hover={{ textDecor: "none" }}
                  display={["flex", "flex", "none", "flex", "flex"]}
                >
                  <Text>Setting</Text>
                </Link>
              </Flex>
            </Flex>
          </Flex>
          <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
            <Menu>
              <MenuButton bgColor={"#0055555"}>
                <Avatar
                  size="md"
                  name={userSelector?.username}
                  src={`http://${userSelector?.avatar_url}`}
                />
                <Text textAlign="center">{userSelector.username}</Text>
              </MenuButton>
              <MenuList>
                <Link href={`/profile/setting/${userSelector?.id}`}>
                  <MenuItem color="#005555" icon={<EditIcon />}>
                    Edit Profile
                  </MenuItem>
                </Link>
                <MenuDivider />
                <MenuItem
                  color="#005555"
                  icon={<FiLogOut />}
                  onClick={handleLogout}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Flex>

      {/* --------------Column 2------------- */}
      <Flex
        w={["100%", "100%", "60%", "60%", "55%"]}
        p="3%"
        flexDir="column"
        overflow="auto"
        minH="100vh"
      >
        <Heading fontWeight="normal" mb={4} letterSpacing="tight">
          Welcome back, {""}
          <Flex display="inline-flex" fontWeight="bold">
            {userSelector.username}
          </Flex>
        </Heading>

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

          <M_addCategory />
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

        <Flex justifyContent="space-between" mt={8}>
          <Flex align="flex-end">
            <Heading as="h2" size="lg" letterSpacing="tight">
              PRODUCT DATA
            </Heading>
            {/* <Text fontSize="small" color="gray" ml={4}>
              Apr 2021
            </Text> */}
          </Flex>
          <M_addProduct />
        </Flex>
        <Flex flexDir="column">
          <Flex overflow="auto">
            <Table variant="unstyled" mt={4}>
              <Thead>
                <Tr color="gray">
                  <Th>Name of transaction</Th>
                  <Th>Category</Th>
                  <Th isNumeric>Cashback</Th>
                  <Th isNumeric>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Flex align="center">
                      <Avatar size="sm" mr={2} src="amazon.jpeg" />
                      <Flex flexDir="column">
                        <Heading size="sm" letterSpacing="tight">
                          Amazon
                        </Heading>
                        <Text fontSize="sm" color="gray">
                          Apr 24, 2021 at 1:40pm
                        </Text>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td>Electronic Devices</Td>
                  <Td isNumeric>+$2</Td>
                  <Td isNumeric>
                    <Text fontWeight="bold" display="inline-table">
                      -$242
                    </Text>
                    .00
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Flex align="center">
                      <Avatar size="sm" mr={2} src="starbucks.png" />
                      <Flex flexDir="column">
                        <Heading size="sm" letterSpacing="tight">
                          Starbucks
                        </Heading>
                        <Text fontSize="sm" color="gray">
                          Apr 22, 2021 at 2:43pm
                        </Text>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td>Cafe and restaurant</Td>
                  <Td isNumeric>+$23</Td>
                  <Td isNumeric>
                    <Text fontWeight="bold" display="inline-table">
                      -$32
                    </Text>
                    .00
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Flex align="center">
                      <Avatar size="sm" mr={2} src="youtube.png" />
                      <Flex flexDir="column">
                        <Heading size="sm" letterSpacing="tight">
                          YouTube
                        </Heading>
                        <Text fontSize="sm" color="gray">
                          Apr 13, 2021 at 11:23am
                        </Text>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td>Social Media</Td>
                  <Td isNumeric>+$4</Td>
                  <Td isNumeric>
                    <Text fontWeight="bold" display="inline-table">
                      -$112
                    </Text>
                    .00
                  </Td>
                </Tr>
                {display == "show" && (
                  <>
                    <Tr>
                      <Td>
                        <Flex align="center">
                          <Avatar size="sm" mr={2} src="amazon.jpeg" />
                          <Flex flexDir="column">
                            <Heading size="sm" letterSpacing="tight">
                              Amazon
                            </Heading>
                            <Text fontSize="sm" color="gray">
                              Apr 12, 2021 at 9:40pm
                            </Text>
                          </Flex>
                        </Flex>
                      </Td>
                      <Td>Electronic Devices</Td>
                      <Td isNumeric>+$2</Td>
                      <Td isNumeric>
                        <Text fontWeight="bold" display="inline-table">
                          -$242
                        </Text>
                        .00
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Flex align="center">
                          <Avatar size="sm" mr={2} src="starbucks.png" />
                          <Flex flexDir="column">
                            <Heading size="sm" letterSpacing="tight">
                              Starbucks
                            </Heading>
                            <Text fontSize="sm" color="gray">
                              Apr 10, 2021 at 2:10pm
                            </Text>
                          </Flex>
                        </Flex>
                      </Td>
                      <Td>Cafe and restaurant</Td>
                      <Td isNumeric>+$23</Td>
                      <Td isNumeric>
                        <Text fontWeight="bold" display="inline-table">
                          -$32
                        </Text>
                        .00
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Flex align="center">
                          <Avatar size="sm" mr={2} src="youtube.png" />
                          <Flex flexDir="column">
                            <Heading size="sm" letterSpacing="tight">
                              YouTube
                            </Heading>
                            <Text fontSize="sm" color="gray">
                              Apr 7, 2021 at 9:03am
                            </Text>
                          </Flex>
                        </Flex>
                      </Td>
                      <Td>Social Media</Td>
                      <Td isNumeric>+$4</Td>
                      <Td isNumeric>
                        <Text fontWeight="bold" display="inline-table">
                          -$112
                        </Text>
                        .00
                      </Td>
                    </Tr>
                  </>
                )}
              </Tbody>
            </Table>
          </Flex>
          <Flex align="center">
            <Divider />
            <IconButton
              icon={display == "show" ? <FiChevronUp /> : <FiChevronDown />}
              onClick={() => {
                if (display == "show") {
                  changeDisplay("none");
                } else {
                  changeDisplay("show");
                }
              }}
            />
            <Divider />
          </Flex>
        </Flex>
      </Flex>

      {/* --------------Column 3------------ */}
      <Flex
        w={["100%", "100%", "30%"]}
        bgColor="#F5F5F5"
        p="3%"
        flexDir="column"
        overflow="auto"
        minW={[null, null, "300px", "300px", "400px"]}
      >
        <Flex alignContent="center">
          <InputGroup
            bgColor="#fff"
            mb={4}
            border="none"
            borderColor="#fff"
            borderRadius="10px"
            mr={2}
          >
            <InputLeftElement
              pointerEvents="none"
            >
              <FiSearch color="gray" />
            </InputLeftElement>
            <Input type="number" placeholder="Search" borderRadius="10px" />
          </InputGroup>
          <IconButton
            icon={<FiBell />}
            fontSize="sm"
            bgColor="#fff"
            borderRadius="50%"
            p="10px"
          />
          <Flex
            w={30}
            h={25}
            bgColor="#B57295"
            borderRadius="50%"
            color="#fff"
            align="center"
            justify="center"
            ml="-3"
            mt="-2"
            zIndex="100"
            fontSize="xs"
          >
            2
          </Flex>
        </Flex>

        {/* <MyChart /> */}
      </Flex>
    </Flex>
  );
}
