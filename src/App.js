import "./styles.css";
import Home from "./Home/Home";

// const MemoryGame = () => {
//   return (
//     <>
//       <h1>Memory Game</h1>
//       <input type="range" min="2" max="20" />
//     </>
//   );
// };

export default function App() {
  return (
    <div className="App">
      <Home />
      {/* <MemoryGame /> */}
    </div>
  );
}
