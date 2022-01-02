import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addSection, getItem, getSection } from "../services/scoutService";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function CreateSection(props) {
  const params = useParams();
  const navigation = useNavigate();
  const [section, setSection] = useState({
    id: null,
    section: "",
  });

  function handleChange({ target }) {
    const updateSection = { ...section, [target.name]: target.value };
    setSection(updateSection);
  }
  async function submitSection(event) {
    event.preventDefault();
    console.log(section);
    await addSection(section);
    navigation("/sections");
  }

  useEffect(() => {
    const slug = params.id;
    if (slug) {
      getSection(slug)
        .then((result) => {
          setSection(result);
        })
        .catch((err) => {
          navigation("/section");
        });
    }
  }, [params]);

  return (
    <>
      <h1>Dados Secao</h1>
      <div className="mt-3">
        <form onSubmit={submitSection}>
          <div className="row">
            <div className="col-4">
              <div className="mb-3">
                <label htmlFor="idCode" className="form-label">
                  Nome
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="section"
                  name="section"
                  value={section.section}
                  onChange={handleChange}
                ></input>
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
