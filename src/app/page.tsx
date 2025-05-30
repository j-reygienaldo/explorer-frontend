"use client";

import { useState } from "react";

import FolderTree from "@/components/FolderTree";
import SubfolderList from "@/components/SubfolderList";

export default function Home() {
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-100">
        <FolderTree onFolderClick={setSelectedFolderId} />
      </div>
      <div className="w-2/3">
        <div className="border-b h-10"></div>
        <SubfolderList selectedFolderId={selectedFolderId} />
      </div>
    </div>
  );
}
