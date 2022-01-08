import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addCategory,
  addSection,
  getCategoryById,
  getItem,
  getSection,
} from "../services/scoutService";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function CreateCategory(props) {
  const params = useParams();
  const navigation = useNavigate();
  const [category, setCategory] = useState({
    id: null,
    category: "",
  });

  function handleChange({ target }) {
    const updateCategory = { ...category, [target.name]: target.value };
    setCategory(updateCategory);
  }
  async function submitCategory(event) {
    event.preventDefault();
    await addCategory(category);
    navigation("/categories");
  }

  useEffect(() => {
    const slug = params.id;
    if (slug) {
      getCategoryById(slug)
        .then((result) => {
          setCategory(result);
        })
        .catch((err) => {
          navigation("/categories");
        });
    }
  }, [params]);

  return (
    <>
      <h1>Dados Categoria</h1>
      <div className="mt-3">
        <form onSubmit={submitCategory}>
          <div className="row">
            <div className="col-4">
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Nome da Categoria
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  value={category.category}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <Link to="/sections" className="btn btn-danger">
                Cancelar
              </Link>
              <button type="submit" className="btn btn-primary ms-3">
                Submeter
              </button>
            </div>
            <div className="col-3"></div>
          </div>
        </form>
      </div>
    </>
  );
}
