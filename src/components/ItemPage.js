import React from "react";
import { useEffect, useState } from "react";
import { addItems, getItems } from "../services/scoutService";
import ItemList from "./ItemList";
import * as XLSX from "xlsx";
function ItemPage() {
  const [items, setItems] = useState([]);
  const [_filteredItems, setFilteredItems] = useState([]);

  function findItem(event) {
    const name = event.target.value;
    let filteredItems = [...items];
    filteredItems = filteredItems.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredItems(filteredItems);
  }

  function importFile(e) {
    e.preventDefault();
    let newItems = [];

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
              newItems.push(item);
            }
          });
        }
      });
      addItems(newItems).then((result) => {
        console.log(result);
      });
    };
    reader.readAsBinaryString(f);
  }
  const getData = async () => {
    const items = await getItems();
    setItems(items);
    setFilteredItems(items);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <h1>Items</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button type="button" className="btn btn-primary">
              Criar Item
            </button>
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
            <ItemList items={_filteredItems} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemPage;
