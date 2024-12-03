import React from "react";
import { Center, Spinner, Text } from "@chakra-ui/react";

const Loading = () => {
  return (
    <div className="min-h-screen w-full bg-bases-light fixed top-0 left-0 flex items-center justify-center z-50">
      <Center minHeight="100vh" flexDirection="column">
        <Spinner size="lg" color="green.500" />
        <Text mt={4} fontSize="xl" color="black.600">
          กำลังโหลดข้อมูล...
        </Text>
      </Center>
    </div>
  );
};

export default Loading;
