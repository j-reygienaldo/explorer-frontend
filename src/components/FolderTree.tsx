import { getAllParentFolder } from "@/lib/api";
import {
  faFolder,
  faFileWord,
  faFileAudio,
  faFileImage,
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
  onFolderClick: (id: number) => void;
}

export default function FolderTree({ onFolderClick }: Props) {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    getAllParentFolder().then(({ data }) => {
      setFolders(data);
    });
  }, []);

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

  return (
    <div className="p-4 border-r h-full overflow-y-auto">
      {folders.map((folder, idx) => (
        <div
          key={idx}
          className="cursor-pointer hover:underline"
          onClick={!folder.type ? () => onFolderClick(folder.id) : () => {}}
        >
          <span className="mr-1">
            <FontAwesomeIcon icon={switchIcon(folder.type)} />
          </span>
          {folder.name}
        </div>
      ))}
    </div>
  );
}
