import { toast } from "react-toastify";
export async function getItems(skip, take) {
  const response = await fetch(
    "http://localhost:8080/api/items/getAll?skip=" + skip + "&take=" + take
  );
  if (!response.ok) {
    toast.error("Ocorreu ao obter os itens", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return;
  }
  const result = await response.json();
  return result;
}

export async function addItems(items) {
  const response = await toast.promise(
    fetch("http://localhost:8080/api/items/addItems", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    }),
    {
      pending: "A adicionar os items",
      success: "Importado com sucesso 👌",
      error: "Ocorreu um problema ao importar os dados 🤯",
    },
    { autoClose: 5000 }
  );
  const result = await response.json();
  return result;
}
export async function deleteItemById(id) {
  const response = await toast.promise(
    fetch("http://localhost:8080/api/items/deleteById?id=" + id, {
      method: "POST",
    }),
    {
      pending: "Apagar o item",
      success: "Apagado com sucesso 👌",
      error: "Ocorreu um problema ao apagar o item 🤯",
    },
    { autoClose: 5000 }
  );
  const result = await response.json();
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
export async function addSection(section) {
  const response = await fetch("http://localhost:8080/api/section/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(section),
  });
  console.log(response);
  if (!response.ok) {
    toast.error("Ocorreu um erro ao criar a secao ", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return;
  }
  const result = await response.json();
  if (section.id) {
    toast.success("Secao atualizada com sucesso !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  } else {
    toast.success("Secao criada com sucesso !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  return result;
}
export async function addSubSection(subSection) {
  const response = await fetch("http://localhost:8080/api/subsection/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subSection),
  });
  const result = await response.json();
  if (subSection.id) {
    toast.success("Secao atualizada com sucesso !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  } else {
    toast.success("Secao criada com sucesso !", {
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
export async function getSections(skip, take) {
  const response = await fetch(
    "http://localhost:8080/api/section/getAll?skip=" + skip + "&take=" + take
  );
  const result = await response.json();
  return result;
}
export async function getSection(id) {
  const response = await fetch(
    "http://localhost:8080/api/section/getById?id=" + id
  );
  const result = await response.json();
  return result;
}
export async function getItemInspection(id) {
  const response = await fetch(
    "http://localhost:8080/api/itemInspection/getById?id=" + id
  );
  const result = await response.json();
  return result;
}
export async function getSubSections(skip, take) {
  const response = await fetch(
    "http://localhost:8080/api/subsection/getAll?skip=" + skip + "&take=" + take
  );
  const result = await response.json();
  return result;
}
export async function getSubSection(id) {
  const response = await fetch(
    "http://localhost:8080/api/subsection/getById?id=" + id
  );
  const result = await response.json();
  return result;
}
export async function addCategory(category) {
  const response = await fetch("http://localhost:8080/api/itemCategory/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  const result = await response.json();
  if (category.id) {
    toast.success("Categoria atualizada com sucesso !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  } else {
    toast.success("Categoria criada com sucesso !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  return result;
}
export async function addInspection(inspection) {
  const response = await fetch("http://localhost:8080/api/itemInspection/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inspection),
  });
  const result = await response.json();
  if (inspection.id) {
    toast.success("Inspeção atualizada com sucesso !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  } else {
    toast.success("Inspeção Criado com sucesso !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  return result;
}
export async function deleteInspectionById(id) {
  const response = await toast.promise(
    fetch("http://localhost:8080/api/itemInspection/deleteById?id=" + id, {
      method: "POST",
    }),
    {
      pending: "Apagar o item",
      success: "Apagado com sucesso 👌",
      error: "Ocorreu um problema ao apagar o item 🤯",
    },
    { autoClose: 5000 }
  );
  const result = await response.json();
  return result;
}
export async function getItemCategories() {
  const response = await fetch("http://localhost:8080/api/itemCategory/getAll");
  const result = await response.json();
  return result;
}
export async function getCategoryById(id) {
  const response = await fetch(
    "http://localhost:8080/api/itemCategory/getById?id=" + id
  );
  const result = await response.json();
  return result;
}
export async function deleteSectionById(id) {
  const response = await toast.promise(
    fetch("http://localhost:8080/api/section/deleteById?id=" + id, {
      method: "POST",
    }),
    {
      pending: "Apagar Seção..",
      success: "Apagado com sucesso 👌",
      error: "Ocorreu um problema ao apagar a seção 🤯",
    },
    { autoClose: 5000 }
  );
  const result = await response.json();
  return result;
}
export async function deleteCategoryById(id) {
  const response = await toast.promise(
    fetch("http://localhost:8080/api/itemCategory/deleteById?id=" + id, {
      method: "POST",
    }),
    {
      pending: "Apagar Categoria..",
      success: "Apagado com sucesso 👌",
      error: "Ocorreu um problema ao apagar a categoria 🤯",
    },
    { autoClose: 5000 }
  );
  const result = await response.json();
  return result;
}
export async function deleteSubSectionById(id) {
  const response = await toast.promise(
    fetch("http://localhost:8080/api/subsection/deleteById?id=" + id, {
      method: "POST",
    }),
    {
      pending: "Apagar Seção..",
      success: "Apagado com sucesso 👌",
      error: "Ocorreu um problema ao apagar a seção 🤯",
    },
    { autoClose: 5000 }
  );
  const result = await response.json();
  return result;
}
