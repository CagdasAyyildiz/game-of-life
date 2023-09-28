import React, { useState } from "react";
import { Button, Input, VStack, Text, Select } from "@chakra-ui/react";
import generateEmptyNewBoard, {
  randomizeBoard,
  createExampleBoard,
} from "../../utils/board";
import { Cell } from "../../types";

interface BoardGeneratorProps {
  setGameGrid: React.Dispatch<React.SetStateAction<Cell[][]>>;
  setDimension: React.Dispatch<
    React.SetStateAction<{
      rowCount: number;
      columnCount: number;
    }>
  >;
  setInitialBoard: React.Dispatch<React.SetStateAction<Cell[][]>>;
}

export const BoardGenerator = ({
  setGameGrid,
  setDimension,
  setInitialBoard,
}: BoardGeneratorProps) => {
  const [example, setExample] = useState<string>("custom");

  const changeGridLayout: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      row: { value: string };
      col: { value: string };
    };
    setDimension({
      rowCount: parseInt(target.row.value),
      columnCount: parseInt(target.col.value),
    });
    const emptyNewBoard = generateEmptyNewBoard(
      parseInt(target.row.value),
      parseInt(target.col.value),
    );
    if (example === "random") {
      const randomizedBoard = randomizeBoard(emptyNewBoard);
      setGameGrid(randomizedBoard);
      setInitialBoard(randomizedBoard);
    } else {
      setGameGrid(emptyNewBoard);
      setInitialBoard(emptyNewBoard);
    }
  };

  const changeExample: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setExample(e.target.value);
    const { rowCount, columnCount, gameGrid } = createExampleBoard(
      e.target.value,
    );
    setDimension({ rowCount, columnCount });
    setGameGrid(gameGrid);
    setInitialBoard(gameGrid);
  };
  return (
    <form onSubmit={changeGridLayout}>
      <VStack>
        <Select
          placeholder="Select option"
          defaultValue={"custom"}
          value={example}
          onChange={changeExample}
          w={"full"}
        >
          <option value="custom">Custom</option>
          <option value="random">Random</option>
          <option value="block">Still Life - Block</option>
          <option value="beehive">Still Life - Beehive</option>
          <option value="loaf">Still Life - Loaf</option>
          <option value="boat">Still Life - Boat</option>
          <option value="tub">Still Life - Tub</option>
          <option value="blinker">Oscillator - Blinker</option>
          <option value="toad">Oscillator - Toad</option>
          <option value="beacon">Oscillator - Beacon</option>
        </Select>
        {(example === "custom" || example === "random") && (
          <VStack gap={"1rem"} alignItems={"flex-end"}>
            <VStack>
              <Text>Row Count</Text>
              <Input type="number" name="row" defaultValue={3} />
            </VStack>
            <VStack>
              <Text>Column Count</Text>
              <Input type="number" name="col" defaultValue={3} />
            </VStack>
            <Button type="submit" w={"full"}>
              Change Game Grid
            </Button>
          </VStack>
        )}
      </VStack>
    </form>
  );
};
