import React, { useState, useEffect } from "react";
import {
  deleteSectionById,
  deleteSubSectionById,
  getSubSections,
} from "../services/scoutService";
import { Link } from "react-router-dom";
import SubSectionList from "./SubSectionList";
export default function SubSectionPage() {
  const [subSections, setSubSections] = useState([]);
  const [filteredSubSections, setfilteredSubSections] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [pageSize, setPageSize] = useState(1);
  const [take, setTake] = useState(10);

  const getData = async () => {
    let allSubSections = await getSubSections(pageSize, take);
    allSubSections = allSubSections.map((element) => {
      if (element.section === null) {
        element.section = {
          id: "",
          section: "",
        };
      }
      return element;
    });
    setSubSections(allSubSections);
    setfilteredSubSections(allSubSections);
  };

  function deleteSubSection(event) {
    let id = event.target.value;
    deleteSubSectionById(id)
      .then(() => {
        let currentSubSections = subSections.filter((element) => {
          return element.internalCode !== Number(id);
        });
        setSubSections(currentSubSections);
        setfilteredSubSections(currentSubSections);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getNext() {
    setSubSections([]);
    setfilteredSubSections([]);
    let currentSize = pageSize + 1;
    setPageSize(currentSize);
    setShowSpinner(true);
    getSubSections(currentSize, take).then((sections) => {
      sections = sections.map((element) => {
        if (element.section === null) {
          element.section = {
            id: "",
            section: "",
          };
        }
        return element;
      });
      setSubSections(sections);
      setfilteredSubSections(sections);
      setShowSpinner(false);
    });
  }
  function getPrevious() {
    let currentSize = pageSize - 1;
    if (currentSize < 1) {
      return;
    }
    setSubSections([]);
    setfilteredSubSections([]);
    setPageSize(currentSize);
    setShowSpinner(true);
    getSubSections(currentSize, take).then((sections) => {
      sections = sections.map((element) => {
        if (element.section === null) {
          element.section = {
            id: "",
            section: "",
          };
        }
        return element;
      });
      setSubSections(sections);
      setfilteredSubSections(sections);
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
          <h1>Sub Seção</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Link className="btn btn-primary" to="/subsection">
            Criar Sub Seção
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
          <SubSectionList
            subSections={filteredSubSections}
            next={getNext}
            previous={getPrevious}
            showSpinner={showSpinner}
            delete={deleteSubSection}
          />
        </div>
      </div>
    </>
  );
}
