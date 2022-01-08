import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import ItemPage from "./components/ItemPage";
import HomePage from "./components/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateItem from "./components/CreateItem";
import SectionPage from "./components/SectionPage";
import SubSectionPage from "./components/SubSectionPage";
import ItemInspectionPage from "./components/ItemInspectionPage";
import CategoryPage from "./components/CategoryPage";
import CreateSection from "./components/CreateSection";
import CreateSubSection from "./components/CreateSubSection";
import CreateCategory from "./components/CreateCategory";
import CreateItemInspection from "./components/CreateItemInspection";
function App() {
  return (
    <>
      <NavBar />
      <div className="container-fluid  pt-2">
        <Routes>
          <Route exact path="/" element={<ItemPage />}></Route>
          <Route path="/items" element={<ItemPage />}></Route>
          <Route path="/item" element={<CreateItem />} />
          <Route path="/item/:id" element={<CreateItem />} />

          <Route path="/sections" element={<SectionPage />}></Route>
          <Route path="/section" element={<CreateSection />} />
          <Route path="/section/:id" element={<CreateSection />} />

          <Route path="/subsections" element={<SubSectionPage />}></Route>
          <Route path="/subsection" element={<CreateSubSection />} />
          <Route path="/subsection/:id" element={<CreateSubSection />} />

          <Route path="/categories" element={<CategoryPage />}></Route>
          <Route path="/category" element={<CreateCategory />} />
          <Route path="/category/:id" element={<CreateCategory />} />

          <Route path="/inspections" element={<ItemInspectionPage />}></Route>
          <Route path="/inspection" element={<CreateItemInspection />} />
          <Route path="/inspection/:id" element={<CreateItemInspection />} />
          <Route path="/category" element={<CategoryPage />}></Route>
        </Routes>
      </div>
      <ToastContainer autoClose={true} hideProgressBar={true} />
    </>
  );
}

export default App;
