import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Logo from "./connect.png"
import GIF from "./Connect4.gif"





function Hole(props) {
  return <div className="Hole"><div className={props.value}></div></div>
}

function Slat(props) {
  return <div className="Slat" onClick={() => props.handleClick()}>
    {[...Array(props.holes.length)].map((x, j) =>
      <Hole key={j} value={props.holes[j]}></Hole>)}
  </div>
}

class Board extends Component {

  constructor() {
    super();
    this.state = {
      boardState: new Array(7).fill(new Array(6).fill(null)),
      playerTurn: 'Red',
      Player1: '',
      Player2: '',
      gameMode: '',
      gameSelected: false,
      winner: '',
      play: ''
    }
  }

  selectedGame(mode) {
    if (this.state.Player1 === "" || this.state.Player2 === "") {
      alert("Please Enter the Player Names")
    }
    else {
      this.setState({
        gameMode: mode,
        gameSelected: true,
        boardState: new Array(7).fill(new Array(6).fill(null))
      })
    }
  }

  toMove(slatID) {
    const boardCopy = this.state.boardState.map(function (arr) {
      return arr.slice();
    });
    if (boardCopy[slatID].indexOf(null) !== -1) {
      let newSlat = boardCopy[slatID].reverse()
      newSlat[newSlat.indexOf(null)] = this.state.playerTurn
      newSlat.reverse()
      this.setState({
        playerTurn: (this.state.playerTurn === 'Red') ? 'Yellow' : 'Red',
        boardState: boardCopy
      })

    }

  }

  /*Only make moves if winner doesn't exist*/
  handleClick(slatID) {
    if (this.state.winner === '') {
      this.toMove(slatID)
    }
  }

  /*check the winner and make AI move IF game is in AI mode*/
  componentDidUpdate() {
    let winner = checkWinner(this.state.boardState)
    if (this.state.winner !== winner) {
      this.setState({
        winner: winner
      })
    }
  }

  updateResponse = (event) => {
    this.setState({
      Player1: event.target.value
    })
  }

  updateResponse1 = (event) => {
    this.setState({
      Player2: event.target.value
    })
  }




  render() {
    /*If a winner exists display the name*/

    let winnerMessageStyle;
    if (this.state.winner !== "") {
      winnerMessageStyle = "winnerMessage appear"
    } else {
      winnerMessageStyle = "winnerMessage"
    }

    /*Contruct slats allocating column from board*/
    let slats = [...Array(this.state.boardState.length)].map((x, i) =>
      <Slat
        key={i}
        holes={this.state.boardState[i]}
        handleClick={() => this.handleClick(i)}
      >

      </Slat>
    )



    return (
      <div>
        {this.state.gameSelected &&
          <div className="Board">
            {slats}
          </div>
        }
        {(!this.state.gameSelected) &&

          <div>
            <img src={GIF} alt="Logo" height="100px" width="100px" />
            <h2 className="Con">Please Enter the Players Names </h2>
            <p><b>Enter the name of Player 1:</b></p>
            <input className="Inp" type="text" value={this.state.Player1} onChange={this.updateResponse} placeholder="Enter the name for Player1 " />
            <br></br>
            <br></br>
            <p><b>Enter the name of Player 2:</b></p>
            <input className="Inp1" type="text" value={this.state.Player2} onChange={this.updateResponse1} placeholder="Enter the name for Player2 " />
            <br></br>
            <button value={this.state.play} onClick={() => this.selectedGame('Play')}>Enter The Game</button>


          </div>
        }

        {(this.state.playerTurn === "Red" && this.state.winner === '' && this.state.gameSelected) &&
          <div>
            <h2 className="Turn1">Player {this.state.Player1}'s Turn</h2>

          </div>
        }
        {(this.state.playerTurn === "Yellow" && this.state.winner === '' && this.state.gameSelected) &&
          <div>

            <h2 className="Turn2">Player {this.state.Player2}'s Turn</h2>

          </div>
        }
        <div className={winnerMessageStyle}>{this.state.winner}</div>
        {(this.state.winner !== '' && this.state.playerTurn === "Yellow") &&
          <div>
            <h2 className="Con">Congratulations {this.state.Player1}</h2>
            <button id="again" onClick={() => this.selectedGame('Play')}>Do you want to play Again?</button>
          </div>
        }

        {(this.state.winner !== '' && this.state.playerTurn === "Red") &&
          <div>
            <h2 className="Con">Congratulations {this.state.Player2} </h2>
            <button id="again" onClick={() => this.selectedGame('Play')}>Do you want to play Again?</button>
          </div>
        }
      </div>
    )
  }
}



class App extends Component {


  render() {
    return (
      <Router>
        <div className="App">

          <NavLink className="tags" to="/" exact activeStyle={
            { color: 'black' }
          }>Home</NavLink>

          <NavLink className="tags" to="/Game" exact activeStyle={
            { color: 'black' }
          }>Play</NavLink>






          <Route path="/" exact strict render={() => {
            return (<div>
              <br></br>
              <h1>Welcome to Connect 4</h1>
              <img src={Logo} alt="Logo" height="100px" width="100px" />
              <div className="App">
                <div className="App-header">

                  <h2>Rules of the Game</h2>

                  <ol>
                    <li className="list">
                      Make sure there are two players to play.
                    </li>
                    <li className="list">
                      There are 21 red checkers and 21 white checkers in the game
                    </li>
                    <li className="list">
                      Decide which player starts.
                    </li>
                    <li className="list">
                      Players will alternate turn after playing a checker.
                    </li>
                    <li className="list">
                      On your turn, drop one of your checkers down any of the slots in the top of the grid.
                    </li>
                    <li className="list">
                      Players alternates until one player gets 4 checkers of his color in a row.
                    </li>
                    <li className="list1">
                      After reading all the rules, click on play button which is available in navigation bar to start the game
                    </li>
                  </ol>
                </div>
              </div>
            </div>




            );
          }
          } />
          <Route path="/Game" exact strict render={
            () => {
              return (
                <div >
                  <br></br>
                  <br></br>
                  <br></br>
                  <div>

                  </div>
                  <div className="Game">
                    <Board></Board>
                  </div>
                </div>


              );
            }
          } />
        </div>
      </Router>
    );
  }
}


function checkLine(a, b, c, d) {
  return ((a !== null) && (a === b) && (a === c) && (a === d));
}



function checkWinner(color) {

  for (let c = 0; c < 7; c++)
    for (let r = 0; r < 4; r++)
      if (checkLine(color[c][r], color[c][r + 1], color[c][r + 2], color[c][r + 3]))
        return color[c][r] + ' wins!'

  for (let r = 0; r < 6; r++)
    for (let c = 0; c < 4; c++)
      if (checkLine(color[c][r], color[c + 1][r], color[c + 2][r], color[c + 3][r]))
        return color[c][r] + ' wins!'

  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 4; c++)
      if (checkLine(color[c][r], color[c + 1][r + 1], color[c + 2][r + 2], color[c + 3][r + 3]))
        return color[c][r] + ' wins!'

  for (let r = 0; r < 4; r++)
    for (let c = 3; c < 6; c++)
      if (checkLine(color[c][r], color[c - 1][r + 1], color[c - 2][r + 2], color[c - 3][r + 3]))
        return color[c][r] + ' wins!'

  return "";
}

export default App;