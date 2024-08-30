import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

export default function AdminLogin() {
  const handleLogin = () => {};

  return (
    <Box
      className="bg-gray-50 min-h-screen flex items-center justify-center"
      px={4}
    >
      <Box
        maxW="md"
        w="full"
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="md"
        className="shadow-lg"
      >
        <h1 className="text-2xl text-center font-bold pb-4">
          ระบบจัดการข้อมูล
        </h1>
        <VStack spacing={4}>
          <FormControl id="account">
            <FormLabel>ชื่อบัญชีหรืออีเมล</FormLabel>
            <Input type="account" placeholder="ใส่ชื่อบัญชีหรืออีเมล" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>รหัสผ่าน</FormLabel>
            <Input type="password" placeholder="ใส่รหัสผ่าน" />
          </FormControl>
          <Button
            colorScheme="green"
            width="full"
            onClick={handleLogin}
            className="mt-4"
          >
            เข้าสู่ระบบ
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
