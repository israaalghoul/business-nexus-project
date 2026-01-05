import { ChamberDocument } from "../../types/document";

export function DocumentPreview({ doc }: { doc: ChamberDocument }) {
  if (!doc.fileUrl) {
    return (
      <div className="border rounded h-96 flex items-center justify-center text-gray-400">
        No preview available
      </div>
    );
  }

  const isPdf = doc.fileUrl.endsWith(".pdf");

  return (
    <div className="border rounded overflow-hidden h-96">
      {isPdf ? (
        <iframe
          src={doc.fileUrl}
          className="w-full h-full"
          title={doc.name}
        />
      ) : (
        <img
          src={doc.fileUrl}
          alt={doc.name}
          className="w-full h-full object-contain"
        />
      )}
    </div>
  );
}
