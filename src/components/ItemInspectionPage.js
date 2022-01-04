import React from "react";
import { useEffect, useState } from "react";
import { deleteItemById, getItems } from "../services/scoutService";
import { Link } from "react-router-dom";
import InspectionList from "./InspectionList";

export default function ItemInspectionPage() {
  const [itemsInspection, setitemsInspection] = useState([]);
  const [_filteredItemsInspection, setFilteredItemsInspection] = useState([]);
  const [pageSize, setPageSize] = useState(1);
  const [take] = useState(10);
  const [showSpinner, setShowSpinner] = useState(false);
  function findInspection(event) {
    const name = event.target.value;
    let filtereditemsInspection = [...itemsInspection];
    filtereditemsInspection = filtereditemsInspection.filter((inspection) =>
      inspection.description.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredItemsInspection(filtereditemsInspection);
  }
  function deleteInspection(event) {
    let id = event.target.value;
    deleteItemById(id).then(() => {
      let currentInspection = itemsInspection.filter((element) => {
        return element.id !== Number(id);
      });
      setitemsInspection(currentInspection);
      setFilteredItemsInspection(currentInspection);
    });
  }
  function getNext() {
    setitemsInspection([]);
    setFilteredItemsInspection([]);
    let currentSize = pageSize + 1;
    setPageSize(currentSize);
    setShowSpinner(true);
    getItems(currentSize, take).then((data) => {
      let inspections = [];
      data.forEach((element) => {
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
            let inspectionItem = {
              id: result.id,
              date: result.date,
              description: result.description,
              item: {
                id: element.id,
                idCode: element.idCode,
              },
            };
            inspections.push(inspectionItem);
          });
        }
      });
      console.log(inspections);
      setitemsInspection(inspections);
      setFilteredItemsInspection(inspections);
      setShowSpinner(false);
    });
  }
  function getPrevious() {
    let currentSize = pageSize - 1;
    if (currentSize < 1) {
      return;
    }
    setitemsInspection([]);
    setFilteredItemsInspection([]);
    setPageSize(currentSize);
    setShowSpinner(true);
    getItems(currentSize, take).then((data) => {
      let inspections = [];
      data.forEach((element) => {
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
            let inspectionItem = {
              id: result.id,
              date: result.date,
              description: result.description,
              item: {
                id: element.id,
                idCode: element.idCode,
              },
            };
            inspections.push(inspectionItem);
          });
        }
      });
      setitemsInspection(inspections);
      setFilteredItemsInspection(inspections);
      setShowSpinner(false);
    });
  }
  const getData = async () => {
    setShowSpinner(true);
    let data = await getItems(pageSize, take);
    let inspections = [];
    data.forEach((element) => {
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
          let inspectionItem = {
            id: result.id,
            date: result.date,
            description: result.description,
            item: {
              id: element.id,
              idCode: element.idCode,
            },
          };
          inspections.push(inspectionItem);
        });
      }
    });
    console.log(inspections);
    setitemsInspection(inspections);
    setFilteredItemsInspection(inspections);
    setShowSpinner(false);
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
          <h1>Inspecoes</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Link className="btn btn-primary" to="/item">
            Criar Inspecao
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-5 mt-3">
          <input
            onChange={findInspection}
            placeholder="procurar item"
            type="text"
            className="form-control"
          ></input>
        </div>
      </div>
      <div className="row">
        <div className="col mt-3">
          <InspectionList
            inspections={itemsInspection}
            showSpinner={showSpinner}
          />
        </div>
      </div>
    </>
  );
}
