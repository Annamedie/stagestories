import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";

interface UploadBtnProps {
  onUpload: (url: string) => void;
  imageUrl: string; // Receive the imageUrl as a prop from parent
}

function UploadBtn({ onUpload, imageUrl }: UploadBtnProps) {
  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    const uploadedImageUrl =
      typeof result.info === "object" && result.info?.secure_url
        ? result.info.secure_url
        : undefined;
    if (uploadedImageUrl) {
      onUpload(uploadedImageUrl); // Update parent state directly
    }
  };

  const handleRemoveImage = () => {
    onUpload(""); // Clear the image URL in the parent
  };

  return (
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
          <button
            type="button"
            onClick={handleRemoveImage}
            className="text-red-500 underline text-sm"
          >
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
}

export default UploadBtn;
