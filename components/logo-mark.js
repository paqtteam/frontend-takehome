import {
	Box,
	HStack,
} from "@chakra-ui/react";
import paqtLogo from "../assets/paqtLogo.svg";

export default function LogoMark() {
    return (
        <HStack spacing={1} alignItems={"center"}>
            <img src={paqtLogo.src} />
            <Box fontWeight={700} fontSize={20} px="2">
                PAQT
            </Box>
        </HStack>
    )
} 