import { Cell } from "../types";

const generateEmptyNewBoard = (rowCount: number, columnCount: number) => {
  const gameGrid = new Array(rowCount);
  for (let i = 0; i < gameGrid.length; i++) {
    gameGrid[i] = new Array(columnCount).fill("dead");
  }
  return gameGrid;
};

export const randomizeBoard = (gameGrid: Cell[][]): Cell[][] => {
  return gameGrid.map((row) => {
    return Array.from(
      {
        length: row.length,
      },
      (): Cell => (Math.random() < 0.5 ? "dead" : "live"),
    );
  });
};

export const executeNextStep = (gameGrid: Cell[][]) =>
  gameGrid.map((row, rowIndex) =>
    row.map((col, colIndex) => {
      const neigbourCount = getSurroundingCells(gameGrid, rowIndex, colIndex);
      if (col === "live" || col === "reproduction") {
        if (neigbourCount < 2) return "underpopulation";
        if (neigbourCount > 3) return "overpopulation";
        return "live";
      } else {
        if (neigbourCount === 3) return "reproduction";
        return "dead";
      }
    }),
  );

const getSurroundingCells = (
  gameGrid: Cell[][],
  rowIndex: number,
  colIndex: number,
) => {
  let total = 0;
  const above = gameGrid[rowIndex - 1]?.[colIndex];
  const below = gameGrid[rowIndex + 1]?.[colIndex];
  const left = gameGrid[rowIndex][colIndex - 1];
  const right = gameGrid[rowIndex][colIndex + 1];
  const aboveLeft = gameGrid[rowIndex - 1]?.[colIndex - 1];
  const aboveRight = gameGrid[rowIndex - 1]?.[colIndex + 1];
  const belowLeft = gameGrid[rowIndex + 1]?.[colIndex - 1];
  const belowRight = gameGrid[rowIndex + 1]?.[colIndex + 1];
  if ((above && above === "live") || above === "reproduction") total++;
  if ((below && below === "live") || below === "reproduction") total++;
  if ((left && left === "live") || left === "reproduction") total++;
  if ((right && right === "live") || right === "reproduction") total++;
  if ((aboveLeft && aboveLeft === "live") || aboveLeft === "reproduction")
    total++;
  if ((aboveRight && aboveRight === "live") || aboveRight === "reproduction")
    total++;
  if ((belowLeft && belowLeft === "live") || belowLeft === "reproduction")
    total++;
  if ((belowRight && belowRight === "live") || belowRight === "reproduction")
    total++;
  return total;
};

export const createExampleBoard = (
  example: string,
): {
  rowCount: number;
  columnCount: number;
  gameGrid: Cell[][];
} => {
  switch (example) {
    case "block":
      return {
        rowCount: 4,
        columnCount: 4,
        gameGrid: [
          ["dead", "dead", "dead", "dead"],
          ["dead", "live", "live", "dead"],
          ["dead", "live", "live", "dead"],
          ["dead", "dead", "dead", "dead"],
        ],
      };
    case "beehive":
      return {
        rowCount: 5,
        columnCount: 6,
        gameGrid: [
          ["dead", "dead", "dead", "dead", "dead", "dead"],
          ["dead", "dead", "live", "live", "dead", "dead"],
          ["dead", "live", "dead", "dead", "live", "dead"],
          ["dead", "dead", "live", "live", "dead", "dead"],
          ["dead", "dead", "dead", "dead", "dead", "dead"],
        ],
      };
    case "loaf":
      return {
        rowCount: 6,
        columnCount: 6,
        gameGrid: [
          ["dead", "dead", "dead", "dead", "dead", "dead"],
          ["dead", "dead", "live", "live", "dead", "dead"],
          ["dead", "live", "dead", "dead", "live", "dead"],
          ["dead", "dead", "live", "dead", "live", "dead"],
          ["dead", "dead", "dead", "live", "dead", "dead"],
          ["dead", "dead", "dead", "dead", "dead", "dead"],
        ],
      };
    case "boat":
      return {
        rowCount: 5,
        columnCount: 5,
        gameGrid: [
          ["dead", "dead", "dead", "dead", "dead"],
          ["dead", "live", "live", "dead", "dead"],
          ["dead", "live", "dead", "live", "dead"],
          ["dead", "dead", "live", "dead", "dead"],
          ["dead", "dead", "dead", "dead", "dead"],
        ],
      };
    case "tub":
      return {
        rowCount: 5,
        columnCount: 5,
        gameGrid: [
          ["dead", "dead", "dead", "dead", "dead"],
          ["dead", "dead", "live", "dead", "dead"],
          ["dead", "live", "dead", "live", "dead"],
          ["dead", "dead", "live", "dead", "dead"],
          ["dead", "dead", "dead", "dead", "dead"],
        ],
      };
    case "blinker":
      return {
        rowCount: 5,
        columnCount: 5,
        gameGrid: [
          ["dead", "dead", "dead", "dead", "dead"],
          ["dead", "dead", "live", "dead", "dead"],
          ["dead", "dead", "live", "dead", "dead"],
          ["dead", "dead", "live", "dead", "dead"],
          ["dead", "dead", "dead", "dead", "dead"],
        ],
      };
    case "toad":
      return {
        rowCount: 6,
        columnCount: 6,
        gameGrid: [
          ["dead", "dead", "dead", "dead", "dead", "dead"],
          ["dead", "dead", "dead", "live", "dead", "dead"],
          ["dead", "live", "dead", "dead", "live", "dead"],
          ["dead", "live", "dead", "dead", "live", "dead"],
          ["dead", "dead", "live", "dead", "dead", "dead"],
          ["dead", "dead", "dead", "dead", "dead", "dead"],
        ],
      };
    case "beacon":
      return {
        rowCount: 6,
        columnCount: 6,
        gameGrid: [
          ["dead", "dead", "dead", "dead", "dead", "dead"],
          ["dead", "live", "live", "dead", "dead", "dead"],
          ["dead", "live", "live", "dead", "dead", "dead"],
          ["dead", "dead", "dead", "live", "live", "dead"],
          ["dead", "dead", "dead", "live", "live", "dead"],
          ["dead", "dead", "dead", "dead", "dead", "dead"],
        ],
      };
    default:
      return {
        rowCount: 3,
        columnCount: 3,
        gameGrid: [
          ["dead", "dead", "dead"],
          ["dead", "dead", "dead"],
          ["dead", "dead", "dead"],
        ],
      };
  }
};

export default generateEmptyNewBoard;
