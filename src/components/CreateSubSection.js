import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addSubSection,
  getSection,
  getSections,
  getSubSection,
} from "../services/scoutService";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function CreateSubSection(props) {
  const params = useParams();
  const navigation = useNavigate();
  const [subSection, setSubSection] = useState({
    id: "",
    subSection: "",
    internalCode: "",
    section: {
      id: "",
      section: "",
    },
  });
  const [sections, setSections] = useState([]);
  function handleChange({ target }) {
    const updateSubSection = { ...subSection, [target.name]: target.value };
    setSubSection(updateSubSection);
  }
  async function submitSubSection(event) {
    event.preventDefault();
    await addSubSection(subSection);
    navigation("/subsections");
  }
  function handleSectionDropdownChange({ target }) {
    let _section = sections.find((result) => {
      return result.id === Number(target.value);
    });
    const updateSubSection = { ...subSection, [target.name]: _section };
    console.log(updateSubSection);
    setSubSection(updateSubSection);
  }

  useEffect(() => {
    const slug = params.id;
    if (slug) {
      getSubSection(slug)
        .then((result) => {
          if (result.section === null) {
            result.section = {
              id: "",
              section: "",
            };
          }
          setSubSection(result);
        })
        .catch((err) => {
          navigation("/subsections");
        });
    }
    getSections(1, 1000).then((allSections) => {
      allSections = allSections.map((element) => {
        if (element.section === null) {
          element.section = {
            id: "",
            section: "",
          };
        }
        return element;
      });
      setSections(allSections);
    });
  }, [params]);

  return (
    <>
      <h1>Dados Sub Secao</h1>
      <div className="mt-3">
        <form onSubmit={submitSubSection}>
          <div className="row">
            <div className="col-4">
              <div className="mb-3">
                <label htmlFor="idCode" className="form-label">
                  Nome
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="subSection"
                  name="subSection"
                  value={subSection.subSection}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="mb-3">
                <label htmlFor="section" className="form-label">
                  Seção
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="section"
                  value={subSection.section.id}
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
