import React, { useState, useEffect } from "react";
import {
  deleteSectionById,
  getItemCategories,
  getSections,
} from "../services/scoutService";
import { Link } from "react-router-dom";
import SectionList from "./SectionList";
export default function SectionPage() {
  const [sections, setSections] = useState([]);
  const [filteredSections, setfilteredSections] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [pageSize, setPageSize] = useState(1);
  const [take, setTake] = useState(10);

  const getData = async () => {
    let allSections = await getSections(pageSize, take);
    setSections(allSections);
    setfilteredSections(allSections);
  };

  function deleteSection(event) {
    let id = event.target.value;
    deleteSectionById(id)
      .then(() => {
        let currentSections = sections.filter((element) => {
          return element.id !== Number(id);
        });
        setSections(currentSections);
        setfilteredSections(currentSections);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getNext() {
    setSections([]);
    setfilteredSections([]);
    let currentSize = pageSize + 1;
    setPageSize(currentSize);
    setShowSpinner(true);
    getSections(currentSize, take).then((sections) => {
      setSections(sections);
      setfilteredSections(sections);
      setShowSpinner(false);
    });
  }
  function getPrevious() {
    let currentSize = pageSize - 1;
    if (currentSize < 1) {
      return;
    }
    setSections([]);
    setfilteredSections([]);
    setPageSize(currentSize);
    setShowSpinner(true);
    getSections(currentSize, take).then((sections) => {
      setSections(sections);
      setfilteredSections(sections);
      setShowSpinner(false);
    });
  }
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
          <h1>Seção</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Link className="btn btn-primary" to="/section">
            Criar Seção
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-5 mt-3">
          {/* <input
            onChange={findItem}
            placeholder="procurar item"
            type="text"
            className="form-control"
          ></input> */}
        </div>
      </div>
      <div className="row">
        <div className="col mt-3">
          <SectionList
            sections={filteredSections}
            next={getNext}
            previous={getPrevious}
            showSpinner={showSpinner}
            delete={deleteSection}
          />
        </div>
      </div>
    </>
  );
}
