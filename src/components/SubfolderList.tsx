import { getSubfolder } from "@/lib/api";
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

  useEffect(() => {
    if (selectedFolderId !== null) {
      getSubfolder(selectedFolderId).then(({ data }) => setSubfolders(data));
    }
  });

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
