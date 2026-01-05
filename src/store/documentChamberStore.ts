import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { ChamberDocument, DocumentStatus } from "../types/document";

interface DocumentChamberState {
  documents: ChamberDocument[];
  selectedDocument: ChamberDocument | null;

  uploadDocument: (file: File) => void;
  selectDocument: (doc: ChamberDocument) => void;
  updateStatus: (id: string, status: DocumentStatus) => void;
  signDocument: (id: string, signature: string) => void;
}

export const useDocumentChamberStore = create<DocumentChamberState>(
  (set) => ({
    documents: [],
    selectedDocument: null,

    uploadDocument: (file: File) => {
      const fileUrl = URL.createObjectURL(file);

      const newDoc: ChamberDocument = {
        id: uuid(),
        name: file.name,
        fileUrl,

            type: file.type.includes("pdf") ? "PDF" : "Document",
    size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
    lastModified: new Date().toISOString().split("T")[0],

        status: "draft",
        signed: false,
      };

      set((state) => ({
        documents: [newDoc, ...state.documents],
      }));
    },

    

    selectDocument: (doc) => set({ selectedDocument: doc }),

    updateStatus: (id, status) =>
      set((state) => ({
        documents: state.documents.map((d) =>
          d.id === id ? { ...d, status } : d
        ),
        selectedDocument:
          state.selectedDocument?.id === id
            ? { ...state.selectedDocument, status }
            : state.selectedDocument,
      })),

    signDocument: (id, signature) =>
      set((state) => ({
        documents: state.documents.map((d) =>
          d.id === id
            ? {
                ...d,
                status: "signed",
                signed: true,
                signatureDataUrl: signature,
              }
            : d
        ),
        selectedDocument:
          state.selectedDocument?.id === id
            ? {
                ...state.selectedDocument,
                status: "signed",
                signed: true,
                signatureDataUrl: signature,
              }
            : state.selectedDocument,
      })),
  })
);
