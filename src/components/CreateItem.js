import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { Link } from "react-router-dom";
import {
  getItem,
  getSubSections,
  getItemCategories,
  addItem,
} from "../services/scoutService";
import { useParams } from "react-router-dom";

function CreateItem(props) {
  const params = useParams();
  const navigation = useNavigate();
  const [item, setItem] = useState({
    id: null,
    name: "",
    description: "",
    purchaseat: "",
    endofllife: "",
    idCode: "",
    idCategory: {
      id: "",
      category: "",
    },
    idSubsection: {
      id: null,
      subSection: " ",
      internalCode: "",
      section: {
        id: null,
        section: "",
      },
    },
    itemInspection: [],
  });
  const [subSections, setSubSections] = useState([]);
  const [itemCategories, setItemCategories] = useState([]);

  function handleChange({ target }) {
    console.log(target);
    const updateItem = { ...item, [target.name]: target.value };
    setItem(updateItem);
  }
  function handleEndDateChange(date) {
    const updateItem = { ...item, endofllife: date };
    setItem(updateItem);
  }
  function handlePurchasedAtChange(date) {
    const updateItem = { ...item, purchaseat: date };
    setItem(updateItem);
  }

  function handleSubSectionDropdownChange({ target }) {
    let _subSection = subSections.find((result) => {
      return result.internalCode === Number(target.value);
    });
    const updateItem = { ...item, [target.name]: _subSection };
    setItem(updateItem);
  }
  function handleItemCategoryDropdownChange({ target }) {
    let _itemCategory = itemCategories.find((result) => {
      return result.id === Number(target.value);
    });
    const updateItem = { ...item, [target.name]: _itemCategory };
    setItem(updateItem);
  }
  async function submitItem(event) {
    event.preventDefault();
    await addItem(item);
    navigation("/items");
  }

  useEffect(() => {
    const slug = params.id;
    if (slug) {
      getItem(slug).then((result) => {
        setItem(result);
      });
    }
    getSubSections().then((result) => {
      setSubSections(result);
    });
    getItemCategories().then((result) => {
      setItemCategories(result);
    });
  }, [params]);

  return (
    <>
      <h1>Dados Item</h1>
      <div className="mt-3">
        <form onSubmit={submitItem}>
          <div className="row">
            <div className="col-4">
              <div className="mb-3">
                <label htmlFor="idCode" className="form-label">
                  Código
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
          <div className="row">
            <div className="col-4 mb-3">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Data Compra"
                  name="purchaseat"
                  id="purchaseat"
                  value={item.purchaseat}
                  onChange={handlePurchasedAtChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="row">
            <div className="col-4 mb-3">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Data Fim"
                  name="endofllife"
                  id="endofllife"
                  value={item.endofllife}
                  onChange={handleEndDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="mb-3">
                <label htmlFor="idSubSection" className="form-label">
                  Sub Seção
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="idSubsection"
                  value={item.idSubsection.internalCode}
                  onChange={handleSubSectionDropdownChange}
                >
                  <option value={""}></option>
                  {subSections.map((element) => {
                    return (
                      <option
                        key={element.internalCode}
                        value={element.internalCode}
                      >
                        {element.section.section} {element.subSection}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="mb-3">
                <label htmlFor="idCategory" className="form-label">
                  Categoria
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="idCategory"
                  value={item.idCategory.id}
                  onChange={handleItemCategoryDropdownChange}
                >
                  <option value={""}></option>
                  {itemCategories.map((element) => {
                    return (
                      <option key={element.id} value={element.id}>
                        {element.category}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <Link to="/items" className="btn btn-danger">
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

export default CreateItem;
