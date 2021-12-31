import { toast } from "react-toastify";
export async function getItems(skip, take) {
  const response = await fetch(
    "http://localhost:8080/api/items/getAll?skip=" + skip + "&take=" + take
  );
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
export async function addItem(item) {
  const response = await fetch("http://localhost:8080/api/items/addItem", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  const result = await response.json();
  if (item.id) {
    toast.success("Item atualizado com sucesso !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  } else {
    toast.success("Item Criado com sucesso !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  return result;
}
export async function getItem(id) {
  const response = await fetch(
    "http://localhost:8080/api/items/getById?id=" + id
  );
  const result = await response.json();
  return result;
}
export async function getSubSections() {
  const response = await fetch("http://localhost:8080/api/subsection/getAll");
  const result = await response.json();
  return result;
}
export async function getItemCategories() {
  const response = await fetch("http://localhost:8080/api/itemCategory/getAll");
  const result = await response.json();
  return result;
}
