import React from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import * as moment from "moment";
export default function InspectionList(props) {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Nome do Item</th>
            <th>Data</th>
            <th>Descrição</th>
            <th>Acões</th>
          </tr>
        </thead>
        <tbody>
          {props.inspections.map((inspection) => {
            return (
              <tr key={inspection.id}>
                <td>
                  {" "}
                  <Link to={"/inspection/" + inspection.id}>
                    {" "}
                    {inspection.item.idCode}{" "}
                  </Link>{" "}
                </td>
                <td>
                  {" "}
                  {moment(new Date(inspection.date)).format("DD/MM/YYYY")}{" "}
                </td>
                <td> {inspection.description}</td>
                <td>
                  <button
                    value={inspection.id}
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
      {/* <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <div className="page-link" onClick={props.previous}>
              Previous
            </div>
          </li>
          <li className="page-item">
            <div className="page-link" onClick={props.next}>
              Next
            </div>
          </li>
        </ul>
      </nav> */}
    </>
  );
}
