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
            <th>Categoria</th>
            <th>Nr de Inspeções</th>
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
                <td> {item.idCategory.category} </td>
                <td> {item.inspections.length} </td>
                <td> {item.idSubsection?.section?.section} </td>
                <td> {item.idSubsection.subSection} </td>
                <td>
                  <button
                    value={item.id}
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
