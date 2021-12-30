import React, { useState, useEffect } from "react";
import { getItem } from "../services/scoutService";
import { useParams } from "react-router-dom";
function CreateItem() {
  const params = useParams();
  const [item, setItem] = useState({
    id: null,
    name: "",
    description: "",
    purchaseSeat: "",
    endOfLife: "",
    idCode: "",
    idCategory: {
      id: null,
      category: "",
    },
    idSubSection: {
      id: null,
      subSection: "",
    },
  });
  function handleChange({ target }) {
    const updateItem = { ...item, [target.name]: target.value };
    setItem(updateItem);
  }

  useEffect(() => {
    const slug = params.id;
    if (slug) {
      getItem(slug).then((result) => {
        setItem(result);
      });
    }
  }, [params]);

  return (
    <>
      <h1>Dados Item</h1>
      <div className="mt-3">
        <form>
          <div className="row">
            <div className="col-4">
              <div className="mb-3">
                <label htmlFor="idCode" className="form-label">
                  Item Codigo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="idCode"
                  name="idCode"
                  value={item.idCode}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nome
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={item.name}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Descrição
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={item.description}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateItem;
