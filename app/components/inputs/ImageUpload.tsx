"use client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

type ImageUploadProps = {
  value: string;
  onChange: (value: string) => void;
};
declare global {
  var cloudinary: any;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="ius9bpgh"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative flex flex-col gap-4 items-center justify-center border-2 border-dashed border-neutral-500 text-neutral-800 hover:opacity-70 transition cursor-pointer p-20"
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to Upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                  alt="upload"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
