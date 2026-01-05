export type DocumentStatus = "draft" | "review" | "signed";

export interface ChamberDocument {
  id: string;
  name: string;
  fileUrl: string;

  type: string;
  size: string;
  lastModified: string;

  status: DocumentStatus;
  signed: boolean;

  signatureDataUrl?: string;
}
