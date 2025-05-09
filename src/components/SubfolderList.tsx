import { createFile, createFolder, getSubfolder } from "@/lib/api";
import {
  faFileAudio,
  faFileImage,
  faFileWord,
  faFolder,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface Folder {
  id: number;
  name: string;
  parent_id: number | null;
  type: string | null;
}

interface Props {
  selectedFolderId: number | null;
}

export default function SubfolderList({ selectedFolderId }: Props) {
  const [subfolders, setSubfolders] = useState<Folder[]>([]);
  const [newName, setNewName] = useState("");
  const [type, setType] = useState<"folder" | "file">("folder");
  const [fileType, setFileType] = useState("document");

  useEffect(() => {
    if (selectedFolderId !== null) {
      getSubfolder(selectedFolderId).then(({ data }) => setSubfolders(data));
    }
  });

  const handleCreate = async () => {
    if (!newName.trim() || selectedFolderId === null) return;

    if (type === "folder") {
      await createFolder(newName, selectedFolderId);
    } else {
      await createFile(newName, selectedFolderId, fileType);
    }
    setNewName("");

    getSubfolder(selectedFolderId).then(({ data }) => setSubfolders(data));
  };

  const switchIcon = (type: string | null) => {
    switch (type) {
      case "document":
        return faFileWord;
        break;
      case "image":
        return faFileImage;
        break;
      case "music":
        return faFileAudio;
        break;
      default:
        return faFolder;
        break;
    }
  };

  if (selectedFolderId === null)
    return <div className="p-4">Click a folder to view subfolder</div>;

  return (
    <div className="p-4 overflow-y-auto">
      <div className="flex gap-2 mb-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "folder" | "file")}
          className="border px-2 py-1"
        >
          <option value="folder">Folder</option>
          <option value="file">File</option>
        </select>

        {type === "file" && (
          <select
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            className="border px-2 py-1"
          >
            <option value="document">Document</option>
            <option value="image">Image</option>
            <option value="music">Music</option>
          </select>
        )}

        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter name"
          className="border px-2 py-1"
        />

        <button onClick={handleCreate} className="px-3 py-1 rounded border-1">
          Create
        </button>
      </div>

      {subfolders.length === 0 ? (
        <p>No subfolder</p>
      ) : (
        subfolders.map((folder, idx) => (
          <div key={idx} className="py-1 cursor-pointer hover:underline">
            <span className="mr-1">
              <FontAwesomeIcon icon={switchIcon(folder.type)} />
            </span>
            {folder.name}
          </div>
        ))
      )}
    </div>
  );
}
