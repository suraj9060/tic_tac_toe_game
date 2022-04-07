import React , {useState} from 'react'
import Board from './Board'
import {calculateWinner} from "./helper"

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true)
    const Winner = calculateWinner(history[stepNumber]);
    const XO = xIsNext ? "X" : "O";

    const handleClick = (i) => {
        const historyPoint = history.slice(0, stepNumber + 1);
        const current = historyPoint[stepNumber];
        const squares = [...current];

        // return if won or occupied

        if (Winner || squares[i]) return;

        //select square

        squares[i] = XO;
        setHistory([...historyPoint, squares]);
        setStepNumber(historyPoint.length);
        setXIsNext(!xIsNext)
    }

    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    };

    const renderMoves = () => 
      (  history.map((_step, move) => {
            const destination = move ? `Go To Move #${move}` : "Go To Start"
            return (
                <li key={move}>
                    <button onClick={()=> jumpTo(move)}>{ destination}</button>
                </li>
            )
        })
    )
  return (
    <>
      <h1>Tic Tik Toe game</h1>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div>
          <h3>History</h3>
          {renderMoves()}
        </div>
        <h3>{Winner ? "winner" + Winner : "Next Player:" + XO}</h3>
      </div>
    </>
  );
}

export default Game