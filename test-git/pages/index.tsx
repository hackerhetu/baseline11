// import React, { useState } from 'react';

// const FileUpload: React.FC = () => {
//   const [error, setError] = useState<string | null>(null);
//   const [message, setMessage] = useState<string | null>(null);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setError(null);
//     setMessage(null);

//     const formData = new FormData();
//     const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

//     if (fileInput.files && fileInput.files.length > 0) {
//       const file = fileInput.files[0];
//       console.log('File being uploaded:', file.name, file.type, file.size);

//       if (file.size === 0) {
//         setError('Selected file is empty. Please choose a non-empty file.');
//         return;
//       }

//       formData.append('jsonFile', file);

//       try {
//         const response = await fetch('/api/convert', {
//           method: 'POST',
//           body: formData,
//         });

//         if (response.ok) {
//           const blob = await response.blob();
//           const url = window.URL.createObjectURL(blob);
//           const a = document.createElement('a');
//           a.style.display = 'none';
//           a.href = url;
//           a.download = 'output.jmx';
//           document.body.appendChild(a);
//           a.click();
//           window.URL.revokeObjectURL(url);
//           setMessage('JMX file generated and downloaded successfully');
//         } else {
//           const data = await response.json();
//           console.error('Upload failed:', data);
//           setError(`Upload failed: ${data.error}${data.details ? ` - ${data.details}` : ''}`);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         setError('An unexpected error occurred');
//       }
//     } else {
//       console.error('No file selected');
//       setError('Please select a file to upload');
//     }
//   };

//   return (
//     <div>
//       <h1>Upload JSON File</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="file" name="jsonFile" accept=".json" />
//         <button type="submit">Upload and Convert</button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {message && <p style={{ color: 'green' }}>{message}</p>}
//     </div>
//   );
// };

// export default FileUpload;

// import React, { useState } from 'react';

// const FileUpload: React.FC = () => {
//   const [error, setError] = useState<string | null>(null);
//   const [message, setMessage] = useState<string | null>(null);
//   const [fileName, setFileName] = useState<string | null>(null);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setError(null);
//     setMessage(null);

//     const formData = new FormData();
//     const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

//     if (fileInput.files && fileInput.files.length > 0) {
//       const file = fileInput.files[0];
//       formData.append('jsonFile', file);

//       try {
//         const response = await fetch('/api/convert', {
//           method: 'POST',
//           body: formData,
//         });

//         if (response.ok) {
//           const blob = await response.blob();
//           const url = window.URL.createObjectURL(blob);
//           const a = document.createElement('a');
//           a.style.display = 'none';
//           a.href = url;
//           a.download = 'output.jmx';
//           document.body.appendChild(a);
//           a.click();
//           window.URL.revokeObjectURL(url);
//           setMessage('JMX file generated and downloaded successfully');
//         } else {
//           const data = await response.json();
//           setError(`Upload failed: ${data.error}${data.details ? ` - ${data.details}` : ''}`);
//         }
//       } catch (error) {
//         setError('An unexpected error occurred');
//       }
//     } else {
//       setError('Please select a file to upload');
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     setFileName(file ? file.name : null);
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <header className="bg-white py-4 px-4 sm:px-6 lg:px-8">
//         <img src="/json-jmx/json-jmx/json-to-jmx/public/images/PrimeQA.svg" alt="Logo" className="h-8" />
//       </header>

//       <main className="flex-grow flex flex-col items-start px-4 sm:px-6 lg:px-8 pt-8">
//         <h1 className="text-3xl font-bold mb-4">Upload JSON File</h1>
//         <form onSubmit={handleSubmit} className="w-full max-w-md">
//           <div className="mb-4">
//             <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
//               Choose file
//             </label>
//             <input
//               id="file-upload"
//               name="file-upload"
//               type="file"
//               accept=".json"
//               onChange={handleFileChange}
//               className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//             />
//           </div>
//           {fileName && (
//             <p className="mt-2 text-sm text-gray-600">
//               Selected file: {fileName}
//             </p>
//           )}
//           <div className="mt-4">
//             <button
//               type="submit"
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Upload and Convert
//             </button>
//           </div>
//         </form>

//         {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
//         {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
//       </main>

//       <footer className="bg-white">
//         <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
//           <p className="text-center text-sm text-gray-500">
//             By PrimeQA Products
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default FileUpload;
"use client"
import React from 'react';
import FileUpload from '@/components/FileUpload';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <FileUpload />
    </div>
  );
};

export default Home;
