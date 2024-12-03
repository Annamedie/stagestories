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
      <CldUploadButton
        uploadPreset="stage_stories"
        onSuccess={handleUploadSuccess}
        options={{ maxFiles: 1, multiple: false }}
      />
      {imageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <Image src={imageUrl} alt="Uploaded" width={200} height={200} />
        </div>
      )}
    </>
  );
}

export default UploadBtn;
