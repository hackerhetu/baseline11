// import React, { useState } from 'react';
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Alert, AlertDescription } from '@/components/ui/alert';

// const FileUpload: React.FC = () => {
//     const [error, setError] = useState<string | null>(null);
//     const [message, setMessage] = useState<string | null>(null);
//     const [fileName, setFileName] = useState<string | null>(null);

//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         setError(null);
//         setMessage(null);

//         const formData = new FormData();
//         const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

//         if (fileInput.files && fileInput.files.length > 0) {
//             const file = fileInput.files[0];
//             formData.append('jsonFile', file);

//             try {
//                 const response = await fetch('/api/convert', {
//                     method: 'POST',
//                     body: formData,
//                 });

//                 if (response.ok) {
//                     const blob = await response.blob();
//                     const url = window.URL.createObjectURL(blob);
//                     const a = document.createElement('a');
//                     a.style.display = 'none';
//                     a.href = url;
//                     a.download = 'output.jmx';
//                     document.body.appendChild(a);
//                     a.click();
//                     window.URL.revokeObjectURL(url);
//                     setMessage('JMX file generated and downloaded successfully');
//                 } else {
//                     const data = await response.json();
//                     setError(`Upload failed: ${data.error}${data.details ? ` - ${data.details}` : ''}`);
//                 }
//             } catch (error) {
//                 setError('An unexpected error occurred');
//             }
//         } else {
//             setError('Please select a file to upload');
//         }
//     };

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         setFileName(file ? file.name : null);
//     };

//     return (
//         <div className="min-h-screen flex flex-col items-center bg-white">
//             <header className="w-full py-4 px-4 sm:px-6 lg:px-8">
//                 <img src="/images/PrimeQA.svg" alt="PrimeQA Logo" className="h-8" />

//             </header>

//             <main className="flex-grow flex flex-col items-center justify-center w-full max-w-3xl px-4">
//                 {/* <h1 className="text-2xl font-semibold text-gray-800 mb-1">JMX Converter</h1>
//                 <p className="text-sm text-gray-600 mb-8">by BaseLine13</p> */}

//                 <h2 className="text-center text-lg font-medium mb-6">
//                     Convert JSON to JMX format
//                 </h2>

//                 <form onSubmit={handleSubmit} className="w-full mb-4">
//                     <div className="flex items-center space-x-2">
//                         <div className="relative flex-grow">
//                             <Input
//                                 id="file-upload"
//                                 type="file"
//                                 accept=".har,.xml,.json,.pcap,.selenium"
//                                 onChange={handleFileChange}
//                                 className="w-full pr-24 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//                             />
//                             <span className="absolute inset-y-0 left-3 flex items-center text-sm text-gray-500">

//                             </span>
//                         </div>
//                         <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">
//                             Convert
//                         </Button>
//                     </div>
//                     {fileName && (
//                         <p className="mt-2 text-sm text-gray-600">
//                             Selected file: {fileName}
//                         </p>
//                     )}
//                 </form>

//                 {error && (
//                     <Alert variant="destructive" className="w-full max-w-md mb-2">
//                         <AlertDescription>{error}</AlertDescription>
//                     </Alert>
//                 )}
//                 {message && (
//                     <Alert variant="success" className="w-full max-w-md">
//                         <AlertDescription>{message}</AlertDescription>
//                     </Alert>
//                 )}
//             </main>

//             <footer className="w-full py-4 px-4 sm:px-6 lg:px-8 text-center">
//                 <p className="text-sm text-gray-600">
//                     Brought to you by <a href="https://primeqasolutions.com/" className="text-blue-600 hover:underline">PrimeQA</a>
//                 </p>
//             </footer>
//         </div>
//     );
// };

// export default FileUpload;

// import React, { useState } from 'react';
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Alert, AlertDescription } from '@/components/ui/alert';

// const FileUpload: React.FC = () => {
//     const [error, setError] = useState<string | null>(null);
//     const [message, setMessage] = useState<string | null>(null);
//     const [fileName, setFileName] = useState<string | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(false);

//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         setError(null);
//         setMessage(null);
//         setIsLoading(true);

//         const formData = new FormData();
//         const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

//         if (fileInput.files && fileInput.files.length > 0) {
//             const file = fileInput.files[0];
//             formData.append('file', file);

//             try {
//                 const response = await fetch('/api/convert', {
//                     method: 'POST',
//                     body: formData,
//                 });

//                 if (response.ok) {
//                     const blob = await response.blob();
//                     const url = window.URL.createObjectURL(blob);
//                     const a = document.createElement('a');
//                     a.style.display = 'none';
//                     a.href = url;
//                     a.download = 'output.jmx';
//                     document.body.appendChild(a);
//                     a.click();
//                     window.URL.revokeObjectURL(url);
//                     setMessage('JMX file generated and downloaded successfully');
//                 } else {
//                     const data = await response.json();
//                     setError(`Conversion failed: ${data.error}${data.details ? ` - ${data.details}` : ''}`);
//                 }
//             } catch (error) {
//                 setError('An unexpected error occurred');
//             } finally {
//                 setIsLoading(false);
//             }
//         } else {
//             setError('Please select a file to upload');
//             setIsLoading(false);
//         }
//     };

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         setFileName(file ? file.name : null);
//     };

//     return (
//         <div className="min-h-screen flex flex-col items-center bg-white">
//             <header className="w-full py-4 px-4 sm:px-6 lg:px-8">
//                 <img src="/images/PrimeQA.svg" alt="PrimeQA Logo" className="h-8" />
//             </header>

//             <main className="flex-grow flex flex-col items-center justify-center w-full max-w-3xl px-4">
//                 <h2 className="text-center text-lg font-medium mb-6">
//                     Convert JSON to JMX format
//                 </h2>

//                 <form onSubmit={handleSubmit} className="w-full mb-4">
//                     <div className="flex items-center space-x-2">
//                         <div className="relative flex-grow">
//                             <Input
//                                 id="file-upload"
//                                 type="file"
//                                 accept=".har,.xml,.json,.pcap,.selenium"
//                                 onChange={handleFileChange}
//                                 className="w-full pr-24 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//                             />
//                             <span className="absolute inset-y-0 left-3 flex items-center text-sm text-gray-500">
//                                 {fileName}
//                             </span>
//                         </div>
//                         <Button
//                             type="submit"
//                             className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
//                             disabled={isLoading}
//                         >
//                             {isLoading ? 'Converting...' : 'Convert'}
//                         </Button>
//                     </div>
//                 </form>

//                 {error && (
//                     <Alert variant="destructive" className="w-full max-w-md mb-2">
//                         <AlertDescription>{error}</AlertDescription>
//                     </Alert>
//                 )}
//                 {message && (
//                     <Alert variant="success" className="w-full max-w-md">
//                         <AlertDescription>{message}</AlertDescription>
//                     </Alert>
//                 )}
//             </main>

//             <footer className="w-full py-4 px-4 sm:px-6 lg:px-8 text-center">
//                 <p className="text-sm text-gray-600">
//                     Brought to you by <a href="https://primeqasolutions.com/" className="text-blue-600 hover:underline">PrimeQA</a>
//                 </p>
//             </footer>
//         </div>
//     );
// };
// export default FileUpload
// import React, { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Alert, AlertDescription } from '@/components/ui/alert';

// const FileUpload: React.FC = () => {
//     const [error, setError] = useState<string | null>(null);
//     const [message, setMessage] = useState<string | null>(null);
//     const [fileName, setFileName] = useState<string | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(false);

//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         setError(null);
//         setMessage(null);
//         setIsLoading(true);

//         const formData = new FormData();
//         const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

//         if (fileInput.files && fileInput.files.length > 0) {
//             const file = fileInput.files[0];
//             formData.append('file', file);

//             try {
//                 const response = await fetch('/api/convert', {
//                     method: 'POST',
//                     body: formData,
//                 });

//                 if (response.ok) {
//                     const blob = await response.blob();
//                     const url = window.URL.createObjectURL(blob);
//                     const a = document.createElement('a');
//                     a.style.display = 'none';
//                     a.href = url;
//                     a.download = 'output.jmx';
//                     document.body.appendChild(a);
//                     a.click();
//                     window.URL.revokeObjectURL(url);
//                     setMessage('JMX file generated and downloaded successfully');
//                 } else {
//                     const data = await response.json();
//                     setError(`Conversion failed: ${data.error}${data.details ? ` - ${data.details}` : ''}`);
//                 }
//             } catch (error) {
//                 setError('An unexpected error occurred');
//             } finally {
//                 setIsLoading(false);
//             }
//         } else {
//             setError('Please select a file to upload');
//             setIsLoading(false);
//         }
//     };

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         setFileName(file ? file.name : null);
//     };

//     return (
//         <div className="min-h-screen flex flex-col items-center bg-white">
//             <header className="w-full py-4 px-4 sm:px-6 lg:px-8">
//                 <img src="/images/logo_baseline11.png" alt="PrimeQA Logo" className="h-20" />
//             </header>

//             <main className="flex-grow flex flex-col items-center justify-center w-full max-w-3xl px-4">
//                 <h2 className="text-center text-lg font-medium mb-6">
//                     Convert JSON to JMX format
//                 </h2>

//                 <form onSubmit={handleSubmit} className="w-full mb-4">
//                     <div className="flex items-center space-x-2">
//                         <div className="relative flex-grow">
//                             <Input
//                                 id="file-upload"
//                                 type="file"
//                                 accept=".har,.xml,.json,.pcap,.selenium"
//                                 onChange={handleFileChange}
//                                 className="w-full pr-24 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//                             />
//                             <span className="absolute inset-y-0 left-3 flex items-center text-sm text-gray-500">
//                                 {fileName}
//                             </span>
//                         </div>
//                         <Button
//                             type="submit"
//                             className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
//                             disabled={isLoading}
//                         >
//                             {isLoading ? 'Converting...' : 'Convert'}
//                         </Button>
//                     </div>
//                 </form>

//                 {error && (
//                     <Alert variant="destructive" className="w-full max-w-md mb-2">
//                         <AlertDescription>{error}</AlertDescription>
//                     </Alert>
//                 )}
//                 {message && (
//                     <Alert variant="success" className="w-full max-w-md">
//                         <AlertDescription>{message}</AlertDescription>
//                     </Alert>
//                 )}
//             </main>

//             <footer className="w-full py-4 px-4 sm:px-6 lg:px-8 text-center">
//                 <p className="text-sm text-gray-600">
//                     Brought to you by <a href="https://primeqasolutions.com/" className="text-blue-600 hover:underline">PrimeQA</a>
//                 </p>
//             </footer>
//         </div>
//     );
// };

// export default FileUpload;
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from '@/components/ui/alert';

const FileUpload: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setMessage(null);
        setIsLoading(true);

        const formData = new FormData();
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

        if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            formData.append('jsonFile', file);

            try {
                const response = await fetch('/api/convert', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = 'output.jmx';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    setMessage('JMX file generated and downloaded successfully');
                } else {
                    const data = await response.json();
                    setError(`Conversion failed: ${data.error}${data.details ? ` - ${data.details}` : ''}`);
                }
            } catch (error) {
                setError('An unexpected error occurred');
            } finally {
                setIsLoading(false);
            }
        } else {
            setError('Please select a file to upload');
            setIsLoading(false);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setFileName(file ? file.name : null);
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-white">
            <header className="w-full py-4 px-4 sm:px-6 lg:px-8">
                <img src="/images/logo_baseline11.png" alt="PrimeQA Logo" className="h-20" />
            </header>

            <main className="flex-grow flex flex-col items-center justify-center w-full max-w-3xl px-4">
                <h2 className="text-center text-lg font-medium mb-6">
                    Convert JSON to JMX format
                </h2>

                <form onSubmit={handleSubmit} className="w-full mb-4">
                    <div className="flex items-center space-x-2">
                        <div className="relative flex-grow">
                            <Input
                                id="file-upload"
                                type="file"
                                accept=".json"
                                onChange={handleFileChange}
                                className="w-full pr-24 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                            <span className="absolute inset-y-0 left-3 flex items-center text-sm text-gray-500">
                                {/* {fileName} */}
                            </span>
                        </div>
                        <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Converting...' : 'Convert'}
                        </Button>
                    </div>
                </form>

                {error && (
                    <Alert variant="destructive" className="w-full max-w-md mb-2">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {message && (
                    <Alert variant="success" className="w-full max-w-md">
                        <AlertDescription>{message}</AlertDescription>
                    </Alert>
                )}
            </main>

            <footer className="w-full py-4 px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-sm text-gray-600">
                    Brought to you by <a href="https://primeqasolutions.com/" className="text-blue-600 hover:underline">PrimeQA</a>
                </p>
            </footer>
        </div>
    );
};

export default FileUpload;

