import { getSubfolder } from "@/lib/api";
import { useEffect, useState } from "react";

interface Folder {
  id: number;
  name: string;
  parent_id: number | null;
}

interface Props {
  selectedFolderId: number | null;
}

export default function SubfolderList({ selectedFolderId }: Props) {
  const [subfolders, setSubfolders] = useState<Folder[]>([]);

  useEffect(() => {
    if (selectedFolderId !== null) {
      getSubfolder(selectedFolderId).then(({ data }) => setSubfolders(data));
    }
  });

  if (selectedFolderId === null)
    return <div className="p-4">Click a folder to view subfolder</div>;

  return (
    <div className="p-4 overflow-y-auto">
      {subfolders.length === 0 ? (
        <p>No subfolder</p>
      ) : (
        subfolders.map((folder) => (
          <div key={folder.id} className="py-1">
            {folder.name}
          </div>
        ))
      )}
    </div>
  );
}
