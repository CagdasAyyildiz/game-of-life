import { Grid, GridItem } from "@chakra-ui/react";
import { Cell } from "../../types";

interface GameBoard {
  gameGrid: Cell[][];
  rowCount: number;
  columnCount: number;
  toggleCell: (row: number, col: number) => void;
  simpleMode: boolean;
}

export function GameBoard({
  gameGrid,
  rowCount,
  columnCount,
  toggleCell,
  simpleMode = false,
}: GameBoard) {
  const colorColumn = (column: Cell) => {
    if (column === "live") {
      return "green.300";
    }
    if (column === "dead") {
      return "red.500";
    }
    if (column === "overpopulation") {
      return "orange.300";
    }
    if (column === "underpopulation") {
      return "red.200";
    }
    if (column === "reproduction") {
      return "yellow.200";
    }
  };
  const simpleModeColorColumn = (column: Cell) => {
    if (column === "live" || column === "reproduction") {
      return "green.300";
    }
    if (
      column === "dead" ||
      column === "overpopulation" ||
      column === "underpopulation"
    ) {
      return "red.500";
    }
  };
  return (
    <Grid
      templateRows={`repeat(${rowCount}, 1fr)`}
      templateColumns={`repeat(${columnCount}, 1fr)`}
      color="blackAlpha.700"
      border={"1px solid black"}
      gridGap={"1px"}
      fontWeight="bold"
      w={"fit-content"}
    >
      {gameGrid.map((row: Cell[], rowIndex: number) =>
        row.map((column, columnIndex) => (
          <GridItem
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            w={"40px"}
            h={"40px"}
            bg={
              simpleMode ? simpleModeColorColumn(column) : colorColumn(column)
            }
            key={`${rowIndex}__${columnIndex}`}
            onClick={() => toggleCell(rowIndex, columnIndex)}
          />
        )),
      )}
    </Grid>
  );
}
