import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

interface UploadBtnProps {
  onUpload: (url: string) => void;
}

function UploadBtn({ onUpload }: UploadBtnProps) {
  const [imageUrl, setImgUrl] = useState("");

  const handleUploadSuccess = (result: any) => {
    const uploadedImageUrl = result?.info?.secure_url;

    if (uploadedImageUrl) {
      setImgUrl(uploadedImageUrl);
      onUpload(uploadedImageUrl);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center space-y-4">
        <CldUploadButton
          uploadPreset="stage_stories"
          onSuccess={handleUploadSuccess}
          options={{ maxFiles: 1, multiple: false }}
          className="px-6 py-2 bg-footerHeader text-white font-medium rounded-md shadow hover:bg-[#1872B4] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Upload Image
        </CldUploadButton>

        {imageUrl && (
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-gray-700">Uploaded Image:</p>
            <Image
              src={imageUrl}
              alt="Uploaded"
              width={200}
              height={200}
              className="rounded-md shadow-md"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default UploadBtn;
