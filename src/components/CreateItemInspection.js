import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import {
  addInspection,
  addSection,
  getItem,
  getItemInspection,
  getItems,
  getSection,
} from "../services/scoutService";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function CreateItemInspection(props) {
  const params = useParams();
  const navigation = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const [inspection, setInspection] = useState({
    id: null,
    date: "",
    description: "",
  });
  const [item, setItem] = useState({
    id: "",
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
    inspections: [],
  });
  const [items, setItems] = useState([]);
  function handleChange({ target }) {
    const updateInspection = { ...inspection, [target.name]: target.value };
    setInspection(updateInspection);
  }
  async function submitItemInspection(event) {
    event.preventDefault();
    let newInspection = {
      id: inspection.id,
      date: inspection.date,
      description: inspection.description,
      item: item,
      itemId: item.id,
    };
    newInspection.item.inspections = [];
    await addInspection(newInspection);
    navigation("/inspections");
  }
  function handlePurchasedAtChange(date) {
    const updateDate = { ...inspection, date: date };
    setInspection(updateDate);
  }
  function handleSubSectionDropdownChange({ target }) {
    let item = items.find((result) => {
      return result.id === Number(target.value);
    });
    console.log(item);
    setItem(item);
  }
  const getData = async () => {
    setShowSpinner(true);
    let items = await getItems(1, 200);
    items = items.map((element) => {
      if (element.idSubsection === null) {
        element.idSubsection = {
          id: null,
          subSection: "",
          section: {
            id: null,
            section: "",
          },
        };
      }
      if (element.inspections.length > 0) {
        element.inspections.forEach((result) => {
          console.log(inspection);
          if (result.id === Number(params.id)) {
            setItem(element);
          }
        });
      }
      return element;
    });
    setItems(items);
    setShowSpinner(false);
    console.log(items);
  };
  useEffect(() => {
    const slug = params.id;
    if (slug) {
      getItemInspection(slug)
        .then((result) => {
          setInspection(result);
        })
        .catch((err) => {
          navigation("/inspections");
        });
    }
    getData();
  }, [params]);

  return (
    <>
      <h1>Dados Inspecao</h1>
      <div className="mt-3">
        <form onSubmit={submitItemInspection}>
          <div className="row">
            <div className="col-4">
              <div className="mb-3">
                <label htmlFor="idCode" className="form-label">
                  Descricao
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={inspection.description}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4 mb-3">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Data Inspecao"
                  name="date"
                  id="date"
                  value={inspection.date}
                  onChange={handlePurchasedAtChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="mb-3">
                <label htmlFor="item" className="form-label">
                  Items
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="idSubsection"
                  value={item.id}
                  onChange={handleSubSectionDropdownChange}
                >
                  <option value={""}></option>
                  {items.map((element) => {
                    return (
                      <option key={element.id} value={element.id}>
                        {element.idCode} {element.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            {showSpinner && (
              <div className="spinner-border mt-4" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
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
