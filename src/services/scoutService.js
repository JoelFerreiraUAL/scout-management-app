export async function getItems() {
  const response = await fetch("http://localhost:8080/api/subsection/getAll");
  const result = await response.json();
  console.log(result);
  return result;
}
