import { useEffect, useState } from "react";
import "./App.css";
import { Button, Flex, Divider, Tooltip, HStack, VStack } from "@chakra-ui/react";
import { GameBoard } from "./components/GameBoard";
import { executeNextStep } from "./utils/board";
import { BoardGenerator } from "./components/BoardGenerator/BoardGenerator";
import { Cell } from "./types";
import { Checkbox } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { Legend } from "./components/Legend";

function App() {
  const [dimension, setDimension] = useState<{
    rowCount: number;
    columnCount: number;
  }>({ rowCount: 3, columnCount: 3 });
  const [gameGrid, setGameGrid] = useState<Cell[][]>(() => {
    const gameGrid = new Array(dimension.rowCount);
    for (let i = 0; i < gameGrid.length; i++) {
      gameGrid[i] = Array.from({
        length: gameGrid.length,
      }).fill("dead");
    }
    return gameGrid;
  });
  const [simpleMode, setSimpleMode] = useState(true);
  const [initialBoard, setInitialBoard] = useState<Cell[][]>(gameGrid);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    let timer: number | null = null;
    if (isStarted) {
      timer = setInterval(() => {
        setGameGrid((prev) => executeNextStep(prev));
      }, 500);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isStarted]);
  const toggleCell = (row: number, col: number) => {
    setGameGrid((prev) => {
      const newArray = [];
      for (let i = 0; i < prev.length; i++) newArray[i] = prev[i].slice();
      if (prev[row][col] === "live" || prev[row][col] === "reproduction") {
        newArray[row][col] = "dead";
      }
      if (
        prev[row][col] === "dead" ||
        prev[row][col] === "underpopulation" ||
        prev[row][col] === "overpopulation"
      ) {
        newArray[row][col] = "live";
      }
      return newArray;
    });
    setInitialBoard((prev) => {
      const newArray = [];
      for (let i = 0; i < prev.length; i++) newArray[i] = prev[i].slice();
      if (prev[row][col] === "live" || prev[row][col] === "reproduction") {
        newArray[row][col] = "dead";
      }
      if (
        prev[row][col] === "dead" ||
        prev[row][col] === "underpopulation" ||
        prev[row][col] === "overpopulation"
      ) {
        newArray[row][col] = "live";
      }
      return newArray;
    });
  };

  return (
    <Flex direction={"column"} gap={4} alignItems={"center"} w={"full"}>
      <BoardGenerator
        setGameGrid={setGameGrid}
        setInitialBoard={setInitialBoard}
        setDimension={setDimension}
      />
      <Checkbox
        defaultChecked
        isChecked={simpleMode}
        onChange={(e) => setSimpleMode(e.target.checked)}
      >
        Simple Mode
        <Tooltip
          label="Simple Mode only shows the live and dead cells. You can turn off
          simple mode to see the underpopulated, overpopulated and reproduced
          cells"
          fontSize="md"
        >
          <InfoIcon ml={2} />
        </Tooltip>
      </Checkbox>
      <Divider />
      <GameBoard
        gameGrid={gameGrid}
        simpleMode={simpleMode}
        rowCount={dimension.rowCount}
        columnCount={dimension.columnCount}
        toggleCell={toggleCell}
      />
      <Legend simpleMode={simpleMode} />
      <VStack>
        <Button
          onClick={() => setGameGrid(executeNextStep(gameGrid))}
          w={"full"}
        >
          Next Step
        </Button>
        <Button w={"full"} onClick={() => setIsStarted((prev) => !prev)}>
          {isStarted ? "Pause Game" : "Start Game"}
        </Button>
        <Button
          w={"full"}
          onClick={() => {
            setIsStarted(false);
            setGameGrid(initialBoard);
          }}
        >
          Reset Game
        </Button>
      </VStack>
    </Flex>
  );
}

export default App;
