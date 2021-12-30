import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import ItemPage from "./components/ItemPage";
import HomePage from "./components/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateItem from "./components/CreateItem";
function App() {
  return (
    <>
      <NavBar />
      <div className="container p-2">
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route path="/items" element={<ItemPage />}></Route>
          <Route path="/item/:id" element={<CreateItem />} />
        </Routes>
      </div>
      <ToastContainer hideProgressBar={true} />
    </>
  );
}

export default App;
