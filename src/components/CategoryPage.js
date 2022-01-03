import React, { useState, useEffect } from "react";
import {
  getItemCategories,
  deleteCategoryById,
} from "../services/scoutService";
import { Link } from "react-router-dom";
import CategoryList from "./CategoryList";
import Spinner from "./Spinner";
export default function CategoryPage() {
  const [itemCategories, setItemCategories] = useState([]);
  const [filteredCategories, setfilteredCategories] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    setShowSpinner(true);
    getItemCategories().then((result) => {
      setItemCategories(result);
      setfilteredCategories(result);
      setShowSpinner(false);
    });
  }, []);
  function findCategory(event) {
    const name = event.target.value;
    let _itemCategories = [...itemCategories];
    _itemCategories = _itemCategories.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
    setfilteredCategories(_itemCategories);
  }
  function deleteCategory(event) {
    let id = event.target.value;
    deleteCategoryById(id).then(() => {
      let currentCategories = itemCategories.filter((element) => {
        return element.id !== Number(id);
      });
      setItemCategories(currentCategories);
      setfilteredCategories(currentCategories);
    });
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <h1>Categorias</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Link className="btn btn-primary" to="/category">
            Criar Categoria
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-5 mt-3">
          <input
            onChange={findCategory}
            placeholder="procurar categoria"
            type="text"
            className="form-control"
          ></input>
        </div>
      </div>
      <div className="row">
        <div className="col mt-3">
          <CategoryList
            categories={filteredCategories}
            showSpinner={showSpinner}
            delete={deleteCategory}
          />
        </div>
      </div>
    </>
  );
}
