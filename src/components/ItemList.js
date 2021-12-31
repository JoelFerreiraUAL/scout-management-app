import React from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
function ItemList(props) {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Seção</th>
            <th>Sub Seção</th>
            <th>Acões</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  {" "}
                  <Link to={"/item/" + item.id}> {item.idCode} </Link>{" "}
                </td>
                <td> {item.name} </td>
                <td> {item.description} </td>
                <td> {item.idSubsection.section.section} </td>
                <td> {item.idSubsection.subSection} </td>
                <td>
                  <span className="material-icons-outlined">more_vert</span>
                </td>
              </tr>
            );
          })}
          <tr>
            <td>
              <Spinner spinner={props.showSpinner} />
            </td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
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
      </nav>
    </>
  );
}

export default ItemList;
