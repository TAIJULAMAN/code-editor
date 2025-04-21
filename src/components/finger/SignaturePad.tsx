import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignaturePad: React.FC = () => {
  const sigPadRef = useRef<SignatureCanvas>(null);

  const clear = () => {
    sigPadRef.current?.clear();
  };

  const save = () => {
    if (sigPadRef.current?.isEmpty()) {
      alert("Please provide a signature first.");
      return;
    }

    const dataURL = sigPadRef.current
      .getTrimmedCanvas()
      .toDataURL("image/png");

    console.log("Saved Signature (Base64):", dataURL);

    // You can now:
    // - Display it
    // - Send to backend
    // - Store in localStorage
  };

  return (
    <div className="p-4 w-full max-w-lg mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Sign Below</h2>

      <SignatureCanvas
        ref={sigPadRef}
        penColor="black"
        canvasProps={{
          width: 400,
          height: 200,
          className: "border rounded bg-gray-100",
        }}
      />

      <div className="mt-4 flex justify-between">
        <button
          onClick={clear}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear
        </button>
        <button
          onClick={save}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;
