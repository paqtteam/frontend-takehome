import {
  Box,
  Grid,
  Flex,
  Avatar,
  IconButton,
  Button,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Divider,
  Center,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon, BellIcon } from "@chakra-ui/icons";
import Link from "next/link";
import LogoMark from "../components/logo-mark";

const Layout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const createNewPaqtButton = {
    background: "#D52B3F",
    color: "#FFFFFF",
  };

  return (
    <Grid 
    w="100vw" h="100vh"
    templateRows="65px 1fr">
      <Box
        bg={useColorModeValue("whiteAlpha.100", "whiteAlpha.900")}
        px={4}
        borderBottomStyle="solid"
        borderBottomWidth="1px"
        boxShadow="0px 1px 4px rgba(0, 0, 0, 0.16)"
        position="relative"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Link href="/">
            <a>
              <LogoMark />
            </a>
          </Link>
          <Flex alignItems={"center"}>
            <Center height="48px">
              <Divider orientation="vertical" background="#E0E0E0" width="0.5" mx={2} />
            </Center>
            <BellIcon color="#9E9E9E" height={8} width={8} mr={2} />
            <Avatar
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              height={8}
              width={8}
              src={
                "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              }
            ></Avatar>
        </Flex>
        </Flex>
      </Box>
      <Flex maxH="calc(100vh - 65px)">
        {children}
      </Flex>
    </Grid>
  )};

export default Layout;
