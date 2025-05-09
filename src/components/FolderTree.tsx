import { getAllParentFolder } from "@/lib/api";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface Folder {
  id: number;
  name: string;
  parent_id: number | null;
}

interface Props {
  onFolderClick: (id: number) => void;
}

export default function FolderTree({ onFolderClick }: Props) {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    getAllParentFolder().then(({ data }) => {
      setFolders(data);
    });
  }, []);

  return (
    <div className="p-4 border-r h-full overflow-y-auto">
      {folders.map((folder) => (
        <div
          key={folder.id}
          className="cursor-pointer hover:underline"
          onClick={() => onFolderClick(folder.id)}
        >
          <span className="mr-1">
            <FontAwesomeIcon icon={faFolder} />
          </span>
          {folder.name}
        </div>
      ))}
    </div>
  );
}
