import React from "react";

function ItemList({ items }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {items.length > 0 ? (
          items.map((item) => {
            return (
              <tr key={item.id}>
                <td> {item.internalCode} </td>
                <td> {item.subSection} </td>
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
