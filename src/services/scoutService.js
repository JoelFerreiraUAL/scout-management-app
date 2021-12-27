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
  console.log(result);
  return result;
}
