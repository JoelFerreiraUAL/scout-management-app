import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import ItemPage from "./components/ItemPage";
import HomePage from "./components/HomePage";
function App() {
  return (
    <>
      <NavBar />
      <div className="container-fluid p-2">
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route path="/items" element={<ItemPage />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
