import React from "react";
import { useEffect, useState } from "react";
import { getItems } from "../services/scoutService";
import ItemList from "./ItemList";
function ItemPage() {
  const [items, setItems] = useState([]);
  const getData = async () => {
    const items = await getItems();
    setItems(items);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <h1>Items</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <ItemList items={items} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemPage;
