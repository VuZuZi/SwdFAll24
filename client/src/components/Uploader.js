import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Loader from "../shared/Notification/Loader";
import { FiUploadCloud } from "react-icons/fi";
import { useMutation } from "react-query";
import { uploadFile } from "../api/upload";
import Toast from "../shared/Toast";
function Uploader({ setImageUrl }) {
  //upload file
  const { mutate, isLoading } = useMutation(uploadFile, {
    onSuccess: (data) => {
      Toast("File upload success", "Success");
      setImageUrl(data);
    },
    onError: (error) => {
      Toast({ message: error.message, type: "ERROR" });
    },
  });
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = new FormData();
      file.append("file", acceptedFiles[0]);
      mutate(file);
    },
    [setImageUrl]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      multiple: false,
      onDrop,
    });
  return (
    <div className="w-full text-center flex-colo gap-6">
      {isLoading ? (
        <div className="px-6 w-full py-8 border-2 border-border border-dashed bg-dry rounded-md ">
          <Loader />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="px-6 w-full py-8 border-2 border-border border-dashed bg-main rounded-md cursor-pointer"
        >
          <input {...getInputProps()} />
          <span className="mx-auto flex-colo text-subMain text-3xl">
            <FiUploadCloud />
          </span>
          <p className="text-sm mt-2">Drag your image here</p>
          <em className="text-xs text-border">
            {isDragActive
              ? "Drop it like it's hot"
              : isDragReject
              ? "Unsupported file type ..."
              : "(only .jpg and .png files will be accepted)"}
          </em>
        </div>
      )}
    </div>
  );
}

export default Uploader;
