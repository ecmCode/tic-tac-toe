import React, { useState } from "react";
import style from "./App.module.css"

type BoardState = Array<string | null>;

const App: React.FC = () => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<string>("X");
  const [winner, setWinner] = useState<string | null>(null);

  const handleClick = (index: number) => {
    if (board[index] === null && !winner) {
      const updatedBoard = [...board];
      updatedBoard[index] = currentPlayer;
      setBoard(updatedBoard);
      checkWinner(updatedBoard);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const checkWinner = (board: BoardState) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        board[a] !== null &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        setWinner(board[a]);
        return;
      }
    }

    if (!board.includes(null)) {
      setWinner("draw");
    }
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <div>
      <h2>Tic tac toe</h2>
      <h3>current Player :{currentPlayer}</h3>
      <div className={style.board}>
        {board.map((cell, index) => (
          <button
            key={index}
            className={style.cell}
            onClick={() => handleClick(index)}
            disabled={cell !== null || winner !== null}
          >
            {cell}
          </button>
        ))}
      </div>
      {winner && (
        <div className="result">
          {winner === "draw" ? (
            <p>It's a draw!</p>
          ) : (
            <p>{`Player ${winner} wins!`}</p>
          )}
          <button className="restart" onClick={handleRestart}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default App;