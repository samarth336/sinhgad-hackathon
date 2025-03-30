import React, { useState, useCallback } from 'react';
import { Client, Storage, ID } from 'appwrite';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Initialize Appwrite
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('6786b37a000e1a5e8c68'); // Replace with your Project ID

const storage = new Storage(client);

const Transcript = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const uploadFile = async (file) => {
    try {
      setIsUploading(true);
      setError(null);

      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Upload the file to Appwrite
      const response = await storage.createFile(
        '6786b6e90012a9d714fd', // Replace with your Bucket ID
        uuidv4(),
        file
      );

      // Generate public URL for the uploaded file
      const fileViewUrl = await storage.getFileView(
        '6786b6e90012a9d714fd',
        response.$id
      );
      setFileUrl(fileViewUrl);
      console.log('File uploaded successfully:', fileViewUrl);

      // Send the file URL to the transcription API
      const apiResponse = await axios.post(
        'https://transcript-yuhg.onrender.com/transcribe',
        {
          videoUrl: fileViewUrl,
        }
      );

      // Send the transcript to the fake news detection API
      const atres = await axios.post(
        'https://fake-news-detection-fjr4.onrender.com/verify-news',
        {
          news_query: apiResponse.data.transcript,
        }
      );

      // Set the status based on the response
      setStatus(atres.data.llama_response);
    } catch (err) {
      setError(err.message);
      console.error('Upload failed:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      await uploadFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv'],
    },
    multiple: false,
  });

  return (
    <div className="bg-gradient-to-r   text-white min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">AI Video Transcript Analyzer</h1>
        <p className="text-xl mb-6">Detect deepfake videos and manipulated content in just a few seconds.</p>
      </div>

      {/* Drag-and-Drop Section */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 ${
          isDragActive ? 'bg-gradient-to-r from-[#0f7de6] to-[#c80f75] bg-orange-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <button
            type="button"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-[#0f7de6] to-[#c80f75] hover:bg-blue"
          >
            Upload Video
          </button>
          <p className="mt-2 text-sm">or drop a video file</p>
        </div>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-gradient-to-r from-[#0f7de6] to-[#c80f75]">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Uploading...
          </div>
        </div>
      )}

      {/* Uploaded Video Section */}
      {fileUrl && (
        <div className="mt-8 border border-gray-200 rounded-lg p-4 text-center bg-gray-800">
          <h3 className="text-lg font-semibold mb-4">Uploaded Video:</h3>
          <video src={fileUrl} controls className="w-full max-w-xs mx-auto rounded-lg shadow-lg" />
        </div>
      )}


      {/* Result Section */}
{status && (
  <div className="mt-8 border border-gray-200 rounded-lg p-4 bg-gray-800">
    <h3 className="text-lg font-semibold mb-2">Analysis Result:</h3>
    <p className="text-xl text-center ">
      {status.split(" ").map((word, index) => (
        <span
          key={index}
          className={word === "Fake" ? "text-red-500 font-bold" : ""}
        >
          {word}{" "}
        </span>
      ))}
    </p>
  </div>
)}

    </div>
  );
};

export default Transcript;
