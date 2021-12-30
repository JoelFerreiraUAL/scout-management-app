import { toast } from "react-toastify";
export async function getItems() {
  const response = await fetch("http://localhost:8080/api/items/getAll");
  const result = await response.json();
  return result;
}

export async function addItems(items) {
  const response = await fetch("http://localhost:8080/api/items/addItems", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(items),
  });
  const result = await response.json();
  toast.success("Importado com Sucesso !", {
    position: toast.POSITION.TOP_RIGHT,
  });
  return result;
}
export async function getItem(id) {
  const response = await fetch(
    "http://localhost:8080/api/items/getById?id=" + id
  );
  const result = await response.json();
  return result;
}
