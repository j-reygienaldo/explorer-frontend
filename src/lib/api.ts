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
