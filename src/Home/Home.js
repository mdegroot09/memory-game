import { Component } from "react";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      difficulty: 2,
      memorizeMode: false,
      guessMode: false,
      correctTiles: {}
    };
  }

  play = () => {
    this.setMemorizationMode();
  };

  setMemorizationMode = () => {
    this.setState({ memorizeMode: true });
    setTimeout(() => {
      this.setState({ memorizeMode: false, guessMode: true });
    }, 1500);
  };

  updateDifficulty = (val) => {
    this.setState({ difficulty: val });
  };

  render() {
    let { difficulty, memorizeMode } = this.state;

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
                  style={{ width: `calc(100% / ${difficulty} - 5px)` }}
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
