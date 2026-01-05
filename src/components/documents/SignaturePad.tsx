import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";
import { Button } from "../ui/Button";

interface Props {
  onSign: (signature: string) => void;
}

export function SignaturePad({ onSign }: Props) {
  const sigRef = useRef<SignatureCanvas | null>(null);

  return (
    <div className="border rounded p-4">
      <SignatureCanvas
        ref={sigRef}
        penColor="black"
        canvasProps={{
          width: 400,
          height: 150,
          className: "border w-full",
        }}
      />

      <div className="flex gap-2 mt-3">
        <Button
          variant="outline"
          onClick={() => sigRef.current?.clear()}
        >
          Clear
        </Button>

        <Button
          onClick={() => {
            const data = sigRef.current?.toDataURL();
            if (data) onSign(data);
          }}
        >
          Sign Document
        </Button>
      </div>
    </div>
  );
}
