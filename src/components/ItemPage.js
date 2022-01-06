import React from "react";
import { useEffect, useState } from "react";
import {
  addItems,
  deleteItemById,
  getItemCategories,
  getItems,
  getSections,
  getSubSections,
} from "../services/scoutService";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import ItemList from "./ItemList";
import * as XLSX from "xlsx";

function ItemPage() {
  const [items, setItems] = useState([]);
  const [dates, setDates] = useState([null, null]);
  const [_filteredItems, setFilteredItems] = useState([]);
  const [pageSize, setPageSize] = useState(1);
  const [take] = useState(10);
  const [showSpinner, setShowSpinner] = useState(false);
  const [subSection, setSubSection] = useState({
    id: null,
    subSection: "",
    internalCode: "",
    section: {
      id: "",
      section: "",
    },
  });
  const [section, setSection] = useState({
    id: "",
    section: "",
  });
  const [category, setCategory] = useState({
    id: "",
    category: "",
  });

  const [sections, setSections] = useState([]);
  const [subSections, setSubSections] = useState([]);

  const [itemCategories, setItemCategories] = useState([]);

  function findItem(event) {
    const name = event.target.value;
    let filteredItems = [...items];
    filteredItems = filteredItems.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredItems(filteredItems);
  }

  function handleDateChange(data) {
    setDates(data);
    if (data[0] != null && data[1] != null) {
      let date1 = Date.parse(data[0]);
      let date2 = Date.parse(data[1]);

      let filteredItems = [...items];
      let foundItems = [];
      filteredItems.filter((item) => {
        if (item.inspections.length > 0) {
          item.inspections.forEach((inspection) => {
            console.log(inspection);
            if (
              Date.parse(inspection.date) >= date1 ||
              Date.parse(inspection.date) <= date2
            ) {
              foundItems.push(item);
            }
          });
        }
      });
      setFilteredItems(foundItems);
    }
  }
  function handleSectionDropdownChange({ target }) {
    let filteredItems = [...items];
    let section = sections.find(
      (element) => element.id === Number(target.value)
    );
    filteredItems = filteredItems.filter(
      (item) => item.idSubsection.section.id === Number(target.value)
    );
    setSection(section);
    setFilteredItems(filteredItems);
  }
  function handleSubSectionDropdownChange({ target }) {
    let id = target.value;
    if (id === "") {
      return;
    }
    let filteredItems = [...items];
    filteredItems = filteredItems.filter(
      (item) => item.idSubsection.internalCode === Number(target.value)
    );
    let _subSection = subSections.find((result) => {
      return result.internalCode === Number(id);
    });
    setFilteredItems(filteredItems);
    setSubSection(_subSection);
  }
  function handleItemCategoryDropdownChange({ target }) {
    let _itemCategory = itemCategories.find((result) => {
      return result.id === Number(target.value);
    });
    if (_itemCategory === undefined) {
      _itemCategory = {
        id: "",
        category: "",
      };
    }
    let filteredItems = [...items];
    filteredItems = filteredItems.filter(
      (item) => item.idCategory.id === Number(target.value)
    );

    setCategory(_itemCategory);
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
    setSection({
      id: "",
      section: "",
    });
    setSubSection({
      id: null,
      subSection: "",
      internalCode: "",
      section: {
        id: "",
        section: "",
      },
    });
    setCategory({
      id: "",
      category: "",
    });
    setDates([null, null]);
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
    setSection({
      id: "",
      section: "",
    });
    setSubSection({
      id: null,
      subSection: "",
      internalCode: "",
      section: {
        id: "",
        section: "",
      },
    });
    setCategory({
      id: "",
      category: "",
    });
    setDates([null, null]);
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
    getSections(1, 20).then((allSections) => {
      setSections(allSections);
    });
    getSubSections(1, 50).then((result) => {
      setSubSections(result);
    });
    getItemCategories().then((result) => {
      setItemCategories(result);
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
        <div className="col-2 mt-3">
          <input
            onChange={findItem}
            placeholder="procurar item"
            type="text"
            className="form-control"
          ></input>
        </div>
        <div className="col-2 mt-3">
          <select
            className="form-select"
            aria-label="Default select example"
            name="section"
            placeholder="seção"
            value={section.id}
            onChange={handleSectionDropdownChange}
          >
            <option value={""}></option>
            {sections.map((element) => {
              return (
                <option key={element.id} value={element.id}>
                  {element.section}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-2 mt-3">
          <select
            className="form-select"
            aria-label="Default select example"
            name="idSubsection"
            value={subSection.internalCode}
            onChange={handleSubSectionDropdownChange}
          >
            <option value={""}></option>
            {subSections.map((element) => {
              return (
                <option key={element.internalCode} value={element.internalCode}>
                  {element.section.section} {element.subSection}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-2 mt-3">
          <select
            className="form-select"
            aria-label="Default select example"
            name="category"
            value={category.id}
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
        <div className="col-2 mt-3  ">
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
        <div className="col-2 mt-3">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Data Inicio"
              endText="Data Fim"
              value={dates}
              onChange={handleDateChange}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> Entre </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
              fullWidth
            />
          </LocalizationProvider>
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
