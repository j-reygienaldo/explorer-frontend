export async function getAllParentFolder() {
  const res = await fetch("http://127.0.0.1:4000/api/v1/folders/parent");

  return res.json();
}

export async function getSubfolder(parentId: number) {
  const res = await fetch(
    `http://127.0.0.1:4000/api/v1/folders/${parentId}/sub`
  );

  return res.json();
}

export async function createFolder(name: string, parentId: number | null) {
  const res = await fetch("http://127.0.0.1:4000/api/v1/folders/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, parent_id: parentId }),
  });
  return res.json();
}

export async function updateFolder(id: number, name: string) {
  const res = await fetch(`http://127.0.0.1:4000/api/v1/folders/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return res.json();
}

export async function deleteFolder(id: number) {
  const res = await fetch(`http://127.0.0.1:4000/api/v1/folders/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function createFile(
  name: string,
  folderId: number | null,
  type: string
) {
  const res = await fetch("http://127.0.0.1:4000/api/v1/file", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, folder_id: folderId, type }),
  });
  return res.json();
}

export async function updateFile(
  id: number,
  name: string,
  type: string | null
) {
  const res = await fetch(`http://127.0.0.1:4000/api/v1/file/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, type }),
  });
  return res.json();
}

export async function deleteFile(id: number) {
  const res = await fetch(`http://127.0.0.1:4000/api/v1/file/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
