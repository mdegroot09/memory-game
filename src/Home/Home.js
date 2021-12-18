import { Component } from "react";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      difficulty: 2
    };
  }

  play = () => {
    this.showTiles();
  };

  showTiles = () => {
    let { difficulty } = this.state;
  };

  render() {
    let { difficulty } = this.state;

    let rows = [];
    let tiles = [];
    for (let i = 0; i < difficulty; i++) {
      rows.push([]);
      tiles.push(
        <div
          className="tile"
          style={{ width: `calc(100% / ${difficulty} - 5px)` }}
        ></div>
      );
    }

    return (
      <div className="home">
        <div>
          <input type="range" min="2" max="20" />
          <p style={{ display: "inline", marginLeft: "10px" }}>
            Difficulty: {difficulty}
          </p>
        </div>
        <h1>Memory Game</h1>
        <button onClick={this.play}>Play</button>
        <div className="board">
          {rows.map((row, i) => (
            <div
              className="row"
              style={{ height: `calc(100% / ${difficulty})` }}
            >
              {tiles.map((tile, j) => (
                <>{tile}</>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
