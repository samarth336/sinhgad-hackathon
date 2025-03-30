import React, { useState, useCallback } from "react";
import { Client, Storage, ID } from "appwrite";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Practice from "./Practice";

// Initialize Appwrite
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
  .setProject("6786b37a000e1a5e8c68"); // Replace with your project ID

const storage = new Storage(client);

function ImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [urlInput, setUrlInput] = useState("");
  const [status, setStatus] = useState(null);

  const uploadImage = async (file) => {
    try {
      setIsUploading(true);
      setError(null);

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      const response = await storage.createFile(
        "6786b6e90012a9d714fd",
        ID.unique(),
        file
      );

      const fileUrl = storage.getFileView("6786b6e90012a9d714fd", response.$id);
      setFileUrl(fileUrl);

      const apiResponse = await axios.post("http://192.168.231.171:8000/api/detect/", {
        image_url: fileUrl,
      });

      setStatus(apiResponse.data.is_deepfake == "fake" ? "Fake" : "Real");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles?.length) {
        await uploadImage(acceptedFiles[0]);
      }
    },
    [uploadImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    multiple: false,
  });

  return (
    <div className="min-h-screen bg-gradient-to-r  flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Upload an image to detect</h1>
        <h2 className="text-4xl font-bold text-white">
          <span className="text-red-400">Fake</span> or <span className="text-green-400">Real</span>
        </h2>
      </div>

      <div className="mt-12 w-full max-w-2xl">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-12 ${
            isDragActive ? "border-orange-500 bg-orange-100" : "border-white"
          } text-white text-center`}
        >
          <input {...getInputProps()} />
          <button
            type="button"
            className="px-6 py-3 rounded-md bg-gradient-to-r from-[#0f7de6] to-[#c80f75] text-white hover:bg-orange-700"
          >
            Upload Image
          </button>
          <p className="mt-2 text-white">or drop a file, or paste an image.</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (urlInput) uploadImage(urlInput);
          }}
          className="mt-8"
        >
          <label htmlFor="urlInput" className="block text-lg font-medium text-white">
            Upload via URL
          </label>
          <div className="flex gap-2 mt-2">
            <input
              id="urlInput"
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Enter image URL"
              className="flex-1 pl-2 rounded-md border-2 border-gray-400 focus:border-orange-500 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-[#0f7de6] to-[#c80f75] text-white rounded-md hover:bg-orange-700"
              disabled={!urlInput || isUploading}
            >
              Submit
            </button>
          </div>
        </form>

        {preview && (
          <div className="mt-8 text-center">
            <img src={preview} alt="Preview" className="w-60 h-auto mx-auto rounded-lg shadow-lg" />
          </div>
        )}

        {status && (
          <div className="mt-4 text-center text-xl font-semibold text-white">
            {status === "Fake" ? (
              <span>This image is: <span className="text-red-400">Fake</span></span>
            ) : (
              <span>This image is: <span className="text-green-400">Real</span></span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Photos() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <ImageUpload />
      </main>
    </div>
  );
}
