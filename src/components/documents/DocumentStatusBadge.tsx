import { DocumentStatus } from "../../types/document";

export function DocumentStatusBadge({ status }: { status: DocumentStatus }) {
  const colors = {
    draft: "bg-gray-200 text-gray-700",
    review: "bg-yellow-200 text-yellow-800",
    signed: "bg-green-200 text-green-800",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs ${colors[status]}`}>
      {status.toUpperCase()}
    </span>
  );
}
