import { Component } from "react";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      difficulty: 5,
      memorizeMode: false,
      guessMode: false,
      selectedTiles: [],
      correctTiles: []
    };
  }

  play = () => {
    this.setCorrectTiles();
    this.setMemorizationMode();
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
      correctTiles.push(tileNums[index]); // add as element id
      tileNums.splice(index, 1); // remove from tileNums to avoid duplication
    }

    this.setState({ correctTiles });
  };

  setMemorizationMode = () => {
    this.setState({ memorizeMode: true });
    setTimeout(() => {
      this.setState({ memorizeMode: false, guessMode: true });
    }, 1500);
  };

  updateDifficulty = (val) => {
    let memorizeMode = false;
    let guessMode = false;
    let selectedTiles = [];
    let correctTiles = [];
    this.setState({
      difficulty: val,
      memorizeMode,
      guessMode,
      selectedTiles,
      correctTiles
    });
  };

  selectTile = (val) => {
    let { selectedTiles } = this.state;
    selectedTiles.push(val);
    this.setState({ selectedTiles });
  };

  render() {
    let {
      difficulty,
      memorizeMode,
      guessMode,
      correctTiles,
      selectedTiles
    } = this.state;

    let rows = [];
    let tiles = [];
    for (let i = 0; i < difficulty; i++) {
      rows.push([]);
      tiles.push(
        <div
          key={i}
          // className="tile"
          style={{ height: "100%", width: "100%" }}
        ></div>
      );
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
        <button
          onClick={this.play}
          style={{ display: memorizeMode ? "none" : "block" }}
        >
          Play
        </button>
        <p style={{ display: memorizeMode ? "block" : "none" }}>
          Memorize the highlighted cells!
        </p>
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
