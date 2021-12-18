import { Component } from "react";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      difficulty: 5,
      memorizeMode: false,
      guessMode: false,
      selectedTiles: [],
      correctTiles: [],
      isComplete: false,
      correct: 0,
      incorrect: 0
    };
  }

  play = () => {
    this.resetGame();
    this.setCorrectTiles();
    this.setMemorizeMode();
  };

  setCorrectTiles = () => {
    let { difficulty } = this.state;
    let tileNums = [];
    for (let i = 0; i < difficulty ** 2; i++) {
      tileNums.push(i);
    }

    let correctTiles = [];
    for (let i = 0; i < difficulty; i++) {
      let index = Math.floor(Math.random() * tileNums.length);
      correctTiles.push(tileNums[index]);
      tileNums.splice(index, 1); // this is to avoid duplication
    }

    this.setState({ correctTiles });
  };

  setMemorizeMode = () => {
    this.setState({ memorizeMode: true, selectedTiles: [], isComplete: false });
    setTimeout(() => {
      // continue to guessMode only if the difficulty has not been updated
      let { memorizeMode } = this.state;
      if (memorizeMode) {
        this.setState({ memorizeMode: false, guessMode: true });
      }
    }, 1500);
  };

  updateDifficulty = (val) => {
    this.setState({ difficulty: val });
    this.resetGame();
  };

  resetGame = () => {
    let memorizeMode = false;
    let guessMode = false;
    let selectedTiles = [];
    let correctTiles = [];
    let isComplete = false;
    let correct = 0;
    let incorrect = 0;
    this.setState({
      memorizeMode,
      guessMode,
      selectedTiles,
      correctTiles,
      isComplete,
      correct,
      incorrect
    });
  };

  selectTile = (val) => {
    let { selectedTiles, guessMode, isComplete } = this.state;

    // only handle click if in guessMode
    if (guessMode && !isComplete) {
      selectedTiles.push(val);
      this.setState({ selectedTiles });
      this.checkIfComplete(selectedTiles);
    }
  };

  checkIfComplete = (selectedTiles) => {
    let { correctTiles } = this.state;
    let correctSelected = [];

    // find correct selected
    correctTiles.forEach((correct) => {
      if (selectedTiles.includes(correct)) {
        correctSelected.push(correct);
      }
    });

    // update correct and incorrect counts
    let correct = correctSelected.length;
    let incorrect = selectedTiles.length - correctSelected.length;

    // complete game if all corrects are selected
    let isComplete = false;
    if (correctTiles.length === correctSelected.length) {
      isComplete = true;
    }

    this.setState({ correct, incorrect, isComplete });
  };

  render() {
    let {
      difficulty,
      memorizeMode,
      guessMode,
      selectedTiles,
      correctTiles,
      isComplete,
      correct,
      incorrect
    } = this.state;

    let rows = [];
    let tiles = [];
    for (let i = 0; i < difficulty; i++) {
      rows.push([]);
      tiles.push(<div key={i} style={{ height: "100%", width: "100%" }}></div>);
    }

    return (
      <div className="home">
        <div>
          <input
            onChange={(e) => this.updateDifficulty(e.target.value)}
            type="range"
            min="2"
            max="20"
            value={difficulty}
          />
          <p style={{ display: "inline", marginLeft: "10px" }}>
            Difficulty: {difficulty}
          </p>
        </div>
        <h1>Memory Game</h1>
        <div className="subHeader">
          <span
            style={{ display: guessMode && !isComplete ? "inline" : "none" }}
          >
            Click the cells that were highlighted!
          </span>
          <span
            style={{ display: guessMode && !isComplete ? "inline" : "none" }}
          >
            {correct} right out of {difficulty} total with {incorrect} mistake
            {incorrect !== 1 ? "s" : ""}.
          </span>
          <span style={{ display: isComplete ? "block" : "none" }}>
            You got all of the boxes with {incorrect} mistake
            {incorrect !== 1 ? "s" : ""}!
          </span>
          <span style={{ display: memorizeMode ? "block" : "none" }}>
            Memorize the highlighted cells!
          </span>
        </div>
        <button
          onClick={this.play}
          style={{
            display:
              (!memorizeMode && !guessMode) || isComplete ? "block" : "none"
          }}
        >
          {isComplete ? "Play again?" : "Play"}
        </button>
        <div className="board">
          {rows.map((row, i) => (
            <div
              key={i}
              className="row"
              style={{ height: `calc(100% / ${difficulty})` }}
            >
              {tiles.map((tile, j) => (
                <div
                  key={j}
                  className="tile"
                  id={i * difficulty + j}
                  style={{
                    width: `calc(100% / ${difficulty} - 5px)`,
                    backgroundColor: memorizeMode
                      ? correctTiles.includes(i * difficulty + j)
                        ? "blue"
                        : "gray"
                      : guessMode
                      ? selectedTiles.includes(i * difficulty + j)
                        ? correctTiles.includes(i * difficulty + j)
                          ? "green"
                          : "red"
                        : isComplete
                        ? "gray"
                        : "white"
                      : "gray"
                  }}
                  onClick={() => {
                    this.selectTile(i * difficulty + j);
                  }}
                >
                  {tile}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
