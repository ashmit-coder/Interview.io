"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FileUpload = ({ onChange }: any) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];

    // Basic validation for file type and size
    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        setError("File size must be less than 2MB.");
        setFile(null);
        onChange(null); // Clear the parent state
        return;
      }
      if (!selectedFile.name.match(/\.(pdf|doc|docx)$/)) {
        setError("Only PDF and Word documents are allowed.");
        setFile(null);
        onChange(null); // Clear the parent state
        return;
      }

      setError(""); // Clear any previous error
      setFile(selectedFile);
      onChange(selectedFile); // Pass the file back to the parent
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError("");
    onChange(null); // Clear the parent state
  };

  return (
    <div className="flex flex-col">
      <Input type="file" onChange={handleFileChange} className="mb-2" />
      {file && (
        <div className="flex items-center justify-between">
          <span>{file.name}</span>
          <Button type="button" onClick={handleRemoveFile} className="ml-2">
            Remove
          </Button>
        </div>
      )}
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  );
};

export default FileUpload;
