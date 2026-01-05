import React, { useRef } from "react";
import { FileText, Upload, Download, Share2, Eye, Trash2 } from "lucide-react";
import { Card, CardHeader, CardBody } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { useDocumentChamberStore } from "../../store/documentChamberStore";
import { ChamberDocument } from "../../types/document";
import { SignaturePad } from "../../components/documents/SignaturePad";
import SignatureCanvas from "react-signature-canvas";

export const DocumentsPage: React.FC = () => {
  const {
    documents,
    uploadDocument,
    updateStatus,
    selectedDocument,
    signDocument,
    selectDocument,
  } = useDocumentChamberStore();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    console.log("Uploading:", e.target.files[0]);
    uploadDocument(e.target.files[0]);
  };

  const statusColor = (status: ChamberDocument["status"]) => {
    if (status === "signed") return "success";
    if (status === "review") return "warning";
    return "secondary";
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const sigRef = useRef<SignatureCanvas>(null);
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">Manage your startup's important files</p>
        </div>
        <Button
          leftIcon={<Upload size={18} />}
          type="button"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Document
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.png,.jpg"
          onChange={handleUpload}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Storage info */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">Storage</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Used</span>
                <span className="font-medium text-gray-900">12.5 GB</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-primary-600 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Available</span>
                <span className="font-medium text-gray-900">7.5 GB</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Quick Access
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  Recent Files
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  Shared with Me
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  Starred
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  Trash
                </button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Document list */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                All Documents
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Sort by
                </Button>
                <Button variant="outline" size="sm">
                  Filter
                </Button>
              </div>
            </CardHeader>

            <CardBody>
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => selectDocument(doc)}
                    className="flex items-center p-4 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="p-2 bg-primary-50 rounded-lg mr-4">
                      <FileText size={24} className="text-primary-600" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium truncate">
                          {doc.name}
                        </h3>

                        <Badge variant={statusColor(doc.status)} size="sm">
                          {doc.status.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="text-sm text-gray-500 flex gap-4 mt-1">
                        <span>{doc.type}</span>
                        <span>{doc.size}</span>
                        <span>Modified {doc.lastModified}</span>
                      </div>
                    </div>

                    {/* Status change */}
                    <select
                      value={doc.status}
                      onChange={(e) =>
                        updateStatus(doc.id, e.target.value as any)
                      }
                      className="border rounded p-1 text-sm mr-3"
                    >
                      <option value="draft">Draft</option>
                      <option value="review">In Review</option>
                      <option value="signed">Signed</option>
                    </select>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {/* Preview */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(doc.fileUrl, "_blank")}
                      >
                        <Eye size={18} />
                      </Button>
                      {/* {selectedDocument && (
                        <div className="grid grid-cols-2 gap-6 mt-8">
                       
                          <div className="border rounded h-96">
                            <iframe
                              src={selectedDocument.fileUrl}
                              className="w-full h-full"
                            />
                          </div>

                          
                          <div className="space-y-4">
                            <select
                              value={selectedDocument.status}
                              onChange={(e) =>
                                updateStatus(
                                  selectedDocument.id,
                                  e.target.value as any
                                )
                              }
                              className="border p-2 rounded w-full"
                            >
                              <option value="draft">Draft</option>
                              <option value="review">In Review</option>
                              <option value="signed">Signed</option>
                            </select>

                            {selectedDocument.status !== "signed" && (
                              <SignaturePad
                                onSign={(signature) =>
                                  signDocument(selectedDocument.id, signature)
                                }
                              />
                            )}

                            {selectedDocument.signatureDataUrl && (
                              <div>
                                <p className="text-sm text-gray-600 mb-1">
                                  Signed Signature
                                </p>
                                <img
                                  src={selectedDocument.signatureDataUrl}
                                  className="border rounded h-24"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )} */}

                      {/* Download */}
                      <a href={doc.fileUrl} download>
                        <Button variant="ghost" size="sm">
                          <Download size={18} />
                        </Button>
                      </a>

                      <Button variant="ghost" size="sm">
                        <Share2 size={18} />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 text-error-600 hover:text-error-700"
                        aria-label="Delete"
                      >
                        {" "}
                        <Trash2 size={18} />{" "}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      {selectedDocument && (
  <Card className="mt-8">
    <CardHeader>
      <h2 className="text-lg font-medium">
        Document Preview & Signing
      </h2>
    </CardHeader>

    <CardBody className="space-y-6">
      {/* Preview */}
      <div className="h-[500px] border rounded overflow-hidden">
        {selectedDocument.fileUrl.endsWith(".pdf") ? (
          <iframe
            src={selectedDocument.fileUrl}
            className="w-full h-full"
          />
        ) : (
          <img
            src={selectedDocument.fileUrl}
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {/* Status */}
      <div>
        <label className="text-sm font-medium mb-1 block">
          Document Status
        </label>

        <select
          value={selectedDocument.status}
          onChange={(e) =>
            updateStatus(
              selectedDocument.id,
              e.target.value as any
            )
          }
          className="border p-2 rounded w-60"
        >
          <option value="draft">Draft</option>
          <option value="review">In Review</option>
          <option value="signed">Signed</option>
        </select>
      </div>

      {/* Signature */}
      {selectedDocument.status !== "signed" && (
        <div>
          <h3 className="text-sm font-medium mb-2">
            E-Signature
          </h3>

          <SignaturePad
            onSign={(signature) =>
              signDocument(selectedDocument.id, signature)
            }
          />
        </div>
      )}

      {/* Signed Preview */}
      {selectedDocument.signatureDataUrl && (
        <div>
          <p className="text-sm text-gray-600 mb-1">
            Signed Signature
          </p>
          <img
            src={selectedDocument.signatureDataUrl}
            className="border rounded w-64"
          />
        </div>
      )}
    </CardBody>
  </Card>
)}

    </div>
  );
};
