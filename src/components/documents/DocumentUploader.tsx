import { useDocumentChamberStore } from "../../store/documentChamberStore";
import {
  Upload,
} from "lucide-react";
import { Button } from "../ui/Button";

export function DocumentUploader() {
  const uploadDocument = useDocumentChamberStore(
    (s) => s.uploadDocument
  );

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    uploadDocument(e.target.files[0]);
  };

  return (
    <div className="border rounded p-4">
      <input
        type="file"
        hidden
        accept=".pdf,.png,.jpg"
        onChange={handleUpload}
      />
      <Button leftIcon={<Upload size={18} />}>
            Upload Document
          </Button>
    </div>
  );
}
