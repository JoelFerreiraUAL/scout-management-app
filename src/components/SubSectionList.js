import React from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

export default function SubSectionList(props) {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Seção</th>
            <th>Acões</th>
          </tr>
        </thead>
        <tbody>
          {props.subSections.map((subSection) => {
            return (
              <tr key={subSection.internalCode}>
                <td>
                  {" "}
                  <Link to={"/subsection/" + subSection.internalCode}>
                    {" "}
                    {subSection.subSection}{" "}
                  </Link>{" "}
                </td>
                <td> {subSection.section.section} </td>
                <td>
                  <button
                    value={subSection.internalCode}
                    type="button"
                    className="btn btn-danger"
                    onClick={props.delete}
                  >
                    Apagar
                  </button>
                </td>
              </tr>
            );
          })}

          <Spinner spinner={props.showSpinner} />
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-section">
            <div className="page-link" onClick={props.previous}>
              Previous
            </div>
          </li>
          <li className="page-section">
            <div className="page-link" onClick={props.next}>
              Next
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}
