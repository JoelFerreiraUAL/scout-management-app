import React from "react";

function ItemList({ items }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Description</th>
          <th>Section</th>
          <th>Sub Section</th>
        </tr>
      </thead>
      <tbody>
        {items.length > 0 ? (
          items.map((item) => {
            return (
              <tr key={item.id}>
                <td> {item.idCode} </td>
                <td> {item.name} </td>
                <td> {item.description} </td>
                <td> {item.idSubsection.section.section} </td>
                <td> {item.idSubsection.subSection} </td>
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
