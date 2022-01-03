import React from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
export default function CategoryList(props) {
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
          {props.categories.map((category) => {
            return (
              <tr key={category.id}>
                <td>
                  {" "}
                  <Link to={"/category/" + category.id}>
                    {" "}
                    {category.category}{" "}
                  </Link>{" "}
                </td>
                <td>
                  <button
                    value={category.id}
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
    </>
  );
}
