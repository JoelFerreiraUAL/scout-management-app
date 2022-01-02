import React from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
function SectionList(props) {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Acões</th>
          </tr>
        </thead>
        <tbody>
          {props.sections.map((section) => {
            return (
              <tr key={section.id}>
                <td>
                  {" "}
                  <Link to={"/section/" + section.id}>
                    {" "}
                    {section.section}{" "}
                  </Link>{" "}
                </td>
                <td>
                  <button
                    value={section.id}
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

export default SectionList;
