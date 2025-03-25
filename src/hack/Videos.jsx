import React, { useState, useCallback } from "react";
import { Client, Storage, ID } from "appwrite";
import { useDropzone } from "react-dropzone";

// Initialize Appwrite
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
  .setProject("6786b37a000e1a5e8c68"); // Replace with your project ID

const storage = new Storage(client);

function VideoUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [urlInput, setUrlInput] = useState("");

  const uploadFile = async (file) => {
    try {
      setIsUploading(true);
      setError(null);

      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Upload the file to Appwrite
      const response = await storage.createFile(
        "6786b6e90012a9d714fd", // Replace with your bucket ID
        ID.unique(),
        file
      );

      // Generate public URL for the uploaded file
      const fileUrl = storage.getFileView("videos", response.$id); // Replace with your bucket ID
      setVideoUrl(fileUrl);
      console.log("File uploaded successfully:", fileUrl);
    } catch (err) {
      setError(err.message);
      console.error("Upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const uploadFromUrl = async (url) => {
    try {
      setIsUploading(true);
      setError(null);

      // Download the file from the URL and create a File object
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], "video.mp4", { type: blob.type });

      await uploadFile(file);
    } catch (err) {
      setError(err.message);
      console.error("Failed to upload from URL:", err);
    } finally {
      setIsUploading(false);
      setUrlInput(""); // Clear the URL input
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        await uploadFile(acceptedFiles[0]);
      }
    },
    [uploadFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".mkv"],
    },
    multiple: false,
  });

  return (
    <div className="min-h-screen bg-gradient-to-r flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Upload a video to detect</h1>
        <h2 className="text-4xl font-bold">
          <span className="text-red-500">Fake</span> or <span className="text-green-500">Real</span>
        </h2>
      </div>

      <div className="mt-12 w-full max-w-2xl">
        {/* Drag-and-Drop Section */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-12 text-white text-center cursor-pointer ${
            isDragActive ? "border-orange-500 bg-orange-100" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <button className="px-6 py-3 rounded-md text-white bg-orange-500 hover:bg-orange-600">
            Upload Video
          </button>
          <p className="mt-2 text-sm">or drop a video file</p>
        </div>

        {/* URL Input Section */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (urlInput) uploadFromUrl(urlInput);
          }}
          className="mt-8"
        >
          <label className="block text-lg font-medium text-white">Upload via URL</label>
          <div className="flex gap-2 mt-2">
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Enter video URL"
              className="flex-1 pl-2 rounded-md border-2 border-gray-400 focus:border-orange-500 focus:ring-orange-500"
            />
            <button
              type="submit"
              onClick={()=>{}}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              disabled={!videoUrl || isUploading}
            >
              Submit
            </button>
          </div>
        </form>

        {/* Upload Progress */}
        {isUploading && (
          <div className="mt-4 text-center text-white">
            Uploading...
          </div>
        )}

        {/* Error Message */}
        {error && <div className="mt-4 text-center text-red-500">{error}</div>}

        {/* Preview Section */}
        {preview && (
          <div className="mt-8">
            <video
              src={preview}
              controls
              className="w-3xs h-auto mx-auto rounded-lg shadow-lg"
            ></video>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Videos() {
  return (
    <div className="min-h-screen bg-gradient-to-r flex flex-col">
      <main className="flex-1">
        <VideoUpload />
      </main>
    </div>
  );
}