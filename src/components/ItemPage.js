import React from "react";
import { useEffect, useState } from "react";
import { addItems, deleteItemById, getItems } from "../services/scoutService";
import { Link } from "react-router-dom";
import ItemList from "./ItemList";
import Spinner from "./Spinner";
import * as XLSX from "xlsx";

function ItemPage() {
  const [items, setItems] = useState([]);
  const [_filteredItems, setFilteredItems] = useState([]);
  const [pageSize, setPageSize] = useState(1);
  const [take] = useState(10);
  const [showSpinner, setShowSpinner] = useState(false);
  function findItem(event) {
    const name = event.target.value;
    let filteredItems = [...items];
    filteredItems = filteredItems.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredItems(filteredItems);
  }
  function deleteItem(event) {
    let id = event.target.value;
    deleteItemById(id).then(() => {
      let currentItems = items.filter((element) => {
        return element.id !== Number(id);
      });
      setItems(currentItems);
      setFilteredItems(currentItems);
    });
  }
  function getNext() {
    setItems([]);
    setFilteredItems([]);
    let currentSize = pageSize + 1;
    setPageSize(currentSize);
    setShowSpinner(true);
    getItems(currentSize, take).then((data) => {
      const items = data.map((element) => {
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
        return element;
      });
      setItems(items);
      setFilteredItems(items);
      setShowSpinner(false);
    });
  }
  function getPrevious() {
    let currentSize = pageSize - 1;
    if (currentSize < 1) {
      return;
    }
    setItems([]);
    setFilteredItems([]);
    setPageSize(currentSize);
    setShowSpinner(true);
    getItems(currentSize, take).then((data) => {
      const items = data.map((element) => {
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
        return element;
      });
      setItems(items);
      setFilteredItems(items);
      setShowSpinner(false);
    });
  }
  function importFile(e) {
    e.preventDefault();
    let importedItems = [];

    var files = e.target.files,
      f = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      readedData.SheetNames.forEach((sheet) => {
        if (sheet !== "Listas") {
          const wsname = sheet;
          const ws = readedData.Sheets[wsname];
          const fileItems = XLSX.utils.sheet_to_json(ws, { skipHeader: true });
          fileItems.forEach((currentItem) => {
            if (currentItem.hasOwnProperty("Descritivo")) {
              let item = {
                name: currentItem.Nome,
                description: currentItem.Descritivo,
                idCode: currentItem.Código,
                idCategory: {
                  category: currentItem.Tipo,
                },
                idSubsection: {
                  subSection: currentItem["Sub unidade"],
                  section: {
                    section: currentItem.Unidade,
                  },
                },
              };
              importedItems.push(item);
            }
          });
        }
      });
      addItems(importedItems).then(async () => {
        setShowSpinner(true);
        await getData();
        setShowSpinner(false);
      });
    };
    reader.readAsBinaryString(f);
  }
  const getData = async () => {
    let items = await getItems(pageSize, take);
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
      return element;
    });
    setItems(items);
    setFilteredItems(items);
  };
  useEffect(() => {
    setShowSpinner(true);
    getData().then(() => {
      setShowSpinner(false);
    });
  }, []);

  return (
    <>
      <div className="row">
        <div className="col">
          <h1>Items</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Link className="btn btn-primary" to="/item">
            Criar Item
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-5 mt-3">
          <input
            onChange={findItem}
            placeholder="procurar item"
            type="text"
            className="form-control"
          ></input>
        </div>
        <div className="col-3 mt-3 offset-md-4  ">
          <label htmlFor="inputFile" className="btn btn-primary">
            Importar Items
          </label>
          <input
            type="file"
            id="inputFile"
            name="inputFile"
            onChange={importFile}
            className="d-none"
            accept=".xlsx, .xls, .csv"
          ></input>
        </div>
      </div>
      <div className="row">
        <div className="col mt-3">
          <ItemList
            items={_filteredItems}
            next={getNext}
            previous={getPrevious}
            showSpinner={showSpinner}
            delete={deleteItem}
          />
        </div>
      </div>
    </>
  );
}

export default ItemPage;
