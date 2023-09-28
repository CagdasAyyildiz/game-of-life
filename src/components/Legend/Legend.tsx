import { Box, HStack, Text } from "@chakra-ui/react";

interface LegendProps {
  simpleMode: boolean;
}

export const Legend = ({ simpleMode }: LegendProps) => {
  return (
    <HStack>
      <HStack>
        <Box h={3} w={3} bg={"green.300"} />
        <Text>Alive</Text>
      </HStack>
      <HStack>
        <Box h={3} w={3} bg={"red.500"} />
        <Text>Dead</Text>
      </HStack>
      {!simpleMode && (
        <>
          <HStack>
            <Box h={3} w={3} bg={"orange.300"} />
            <Text>Died from Overpopulation</Text>
          </HStack>
          <HStack>
            <Box h={3} w={3} bg={"red.200"} />
            <Text>Died from Underpopulation</Text>
          </HStack>
          <HStack>
            <Box h={3} w={3} bg={"yellow.200"} />
            <Text>Reproduced</Text>
          </HStack>
        </>
      )}
    </HStack>
  );
};
