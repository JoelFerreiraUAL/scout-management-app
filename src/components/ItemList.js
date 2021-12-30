import React from "react";
import { Link } from "react-router-dom";
function ItemList({ items }) {
  return (
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
        {items.length > 0 ? (
          items.map((item) => {
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
          })
        ) : (
          <tr>
            <td> no data </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default ItemList;
