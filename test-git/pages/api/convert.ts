// import { IncomingForm } from 'formidable';
// import fs from 'fs';
// import path from 'path';
// import { spawn } from 'child_process';
// import { NextApiRequest, NextApiResponse } from 'next';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     const form = new IncomingForm({
//       keepExtensions: true,
//       // Uncomment if you need to allow empty files
//       // allowEmptyFiles: true,
//     });

//     form.uploadDir = path.join(process.cwd(), 'uploads');
//     if (!fs.existsSync(form.uploadDir)) {
//       fs.mkdirSync(form.uploadDir, { recursive: true });
//     }

//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         console.error('Error parsing form:', err);
//         res.status(500).json({ error: 'Failed to parse form' });
//         return;
//       }

//       console.log('Fields:', fields);
//       console.log('Files:', files);

//       if (!files.jsonFile || files.jsonFile.size === 0) {
//         res.status(400).json({ error: 'Uploaded file is empty' });
//         return;
//       }

//       const inputFilePath = (files.jsonFile as any).filepath;
//       const outputFilePath = path.join(process.cwd(), 'output.jmx');

//       const pythonProcess = spawn('python', ['scripts/convert.py', inputFilePath, outputFilePath]);

//       pythonProcess.on('close', (code) => {
//         if (code === 0) {
//           res.setHeader('Content-Disposition', 'attachment; filename=output.jmx');
//           res.setHeader('Content-Type', 'application/xml');
//           fs.createReadStream(outputFilePath).pipe(res).on('close', () => {
//             fs.unlinkSync(inputFilePath);
//             fs.unlinkSync(outputFilePath);
//           });
//         } else {
//           console.error('Python process failed with code:', code);
//           res.status(500).json({ error: 'Failed to convert JSON to JMX' });
//         }
//       });
//     });
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// };
// import { IncomingForm, File } from 'formidable';
// import fs from 'fs';
// import path from 'path';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { spawn } from 'child_process';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const uploadDir = path.join(process.cwd(), 'uploads');

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     console.log('Received POST request');

//     const form = new IncomingForm({
//       keepExtensions: true,
//       uploadDir: uploadDir,
//       multiples: false,
//     });

//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         console.error('Error parsing form:', err);
//         res.status(500).json({ error: 'Failed to parse form', details: err.message });
//         return;
//       }

//       console.log('Fields:', fields);
//       console.log('Files:', files);

//       const inputFile = files.jsonFile as unknown as File;
//       if (!inputFile) {
//         console.error('No file uploaded');
//         res.status(400).json({ error: 'No file uploaded' });
//         return;
//       }

//       const inputFilePath = inputFile.filepath;
//       const outputFilePath = path.join(uploadDir, 'output.jmx');

//       console.log('Input file path:', inputFilePath);
//       console.log('Output file path:', outputFilePath);

//       const pythonProcess = spawn('python', ['scripts/convert.py', inputFilePath, outputFilePath]);

//       pythonProcess.stdout.on('data', (data) => {
//         console.log(`Python stdout: ${data}`);
//       });

//       pythonProcess.stderr.on('data', (data) => {
//         console.error(`Python stderr: ${data}`);
//       });

//       pythonProcess.on('close', (code) => {
//         console.log(`Python process exited with code ${code}`);
//         if (code === 0) {
//           res.setHeader('Content-Disposition', 'attachment; filename=output.jmx');
//           res.setHeader('Content-Type', 'application/xml');
//           fs.createReadStream(outputFilePath).pipe(res).on('close', () => {
//             fs.unlinkSync(inputFilePath);
//             fs.unlinkSync(outputFilePath);
//           });
//         } else {
//           res.status(500).json({ error: 'Failed to convert JSON to JMX' });
//         }
//       });
//     });
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// };

// export default handler;
// import { IncomingForm, File } from 'formidable';
// import fs from 'fs';
// import path from 'path';
// import { NextApiRequest, NextApiResponse } from 'next';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const uploadDir = path.join(process.cwd(), 'uploads');

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   console.log('Received POST request');

//   const form = new IncomingForm({
//     uploadDir: uploadDir,
//     keepExtensions: true,
//     allowEmptyFiles: true,
//     minFileSize: 0,
//   });

//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       console.error('Error parsing form:', err);
//       return res.status(500).json({ error: 'Failed to parse form', details: err.message });
//     }

//     console.log('Fields:', fields);
//     console.log('Files:', files);

//     const jsonFile = Array.isArray(files.jsonFile) ? files.jsonFile[0] : files.jsonFile;
//     if (!jsonFile) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     console.log('Uploaded file:', jsonFile.filepath, 'Size:', jsonFile.size);

//     if (jsonFile.size === 0) {
//       return res.status(400).json({ error: 'Uploaded file is empty' });
//     }

//     // For now, just return a success message
//     res.status(200).json({ message: 'File uploaded successfully' });
//   });
// }
// import { IncomingForm, File } from 'formidable';
// import fs from 'fs';
// import path from 'path';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { spawn } from 'child_process';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const uploadDir = path.join(process.cwd(), 'uploads');

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   console.log('Received POST request');

//   const form = new IncomingForm({
//     uploadDir: uploadDir,
//     keepExtensions: true,
//     allowEmptyFiles: true,
//     minFileSize: 0,
//   });

//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       console.error('Error parsing form:', err);
//       return res.status(500).json({ error: 'Failed to parse form', details: err.message });
//     }

//     console.log('Fields:', fields);
//     console.log('Files:', files);

//     const jsonFile = Array.isArray(files.jsonFile) ? files.jsonFile[0] : files.jsonFile;
//     if (!jsonFile) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     console.log('Uploaded file:', jsonFile.filepath, 'Size:', jsonFile.size);

//     if (jsonFile.size === 0) {
//       return res.status(400).json({ error: 'Uploaded file is empty' });
//     }

//     const originalFilePath = jsonFile.filepath;
//     const tempInputFilePath = path.join(uploadDir, 'input.json');
//     const outputFilePath = path.join(uploadDir, 'output.jmx');

//     // Copy the uploaded file to input.json
//     fs.copyFileSync(originalFilePath, tempInputFilePath);

//     // Adjust this path to match your project structure
//     const projectRoot = path.join(process.cwd(), '..');
//     const pythonScriptDir = path.join(projectRoot,'baseline11', 'json-to-jmx', 'venv', 'Scripts');
//     const pythonScript = path.join(pythonScriptDir, 'convert.py');

//     console.log('Project root:', projectRoot);
//     console.log('Python script path:', pythonScript);
//     console.log('Temp input file path:', tempInputFilePath);
//     console.log('Output file path:', outputFilePath);

//     if (!fs.existsSync(pythonScript)) {
//       console.error('Python script not found at:', pythonScript);
//       fs.unlinkSync(tempInputFilePath); // Clean up temp file
//       fs.unlinkSync(originalFilePath); // Clean up original uploaded file
//       return res.status(500).json({ error: 'Python script not found' });
//     }
//     const pythonProcess = spawn('python', [pythonScript, tempInputFilePath, outputFilePath], {
//       cwd: pythonScriptDir // Set the working directory for the Python script
//     });

//     let stdoutData = '';
//     let stderrData = '';

//     pythonProcess.stdout.on('data', (data) => {
//       stdoutData += data;
//       console.log(`Python stdout: ${data}`);
//     });

//     pythonProcess.stderr.on('data', (data) => {
//       stderrData += data;
//       console.error(`Python stderr: ${data}`);
//     });

//     pythonProcess.on('close', (code) => {
//       console.log(`Python process exited with code ${code}`);
//       if (code === 0) {
//         res.setHeader('Content-Disposition', 'attachment; filename=output.jmx');
//         res.setHeader('Content-Type', 'application/xml');
//         const fileStream = fs.createReadStream(outputFilePath);
//         fileStream.pipe(res);
//         fileStream.on('close', () => {
//           fs.unlinkSync(tempInputFilePath); // Clean up temp input file
//           fs.unlinkSync(originalFilePath); // Clean up original uploaded file
//           fs.unlinkSync(outputFilePath); // Clean up output file
//         });
//       } else {
//         fs.unlinkSync(tempInputFilePath); // Clean up temp input file
//         fs.unlinkSync(originalFilePath); // Clean up original uploaded file
//         res.status(500).json({
//           error: 'Failed to convert JSON to JMX',
//           details: stderrData || stdoutData || 'No additional error information available'
//         });
//       }
//     });
//   });
// }
// import { IncomingForm, File } from 'formidable';
// import fs from 'fs';
// import path from 'path';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { spawn } from 'child_process';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const uploadDir = path.join(process.cwd(), 'uploads');

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const form = new IncomingForm({
//     uploadDir: uploadDir,
//     keepExtensions: true,
//     allowEmptyFiles: true,
//     minFileSize: 0,
//   });

//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to parse form', details: err.message });
//     }

//     // Ensure the files object is not an array
//     const jsonFile = (files.jsonFile && Array.isArray(files.jsonFile) ? files.jsonFile[0] : files.jsonFile) as File;

//     if (!jsonFile) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const originalFilePath = jsonFile.filepath;
//     const tempInputFilePath = path.join(uploadDir, 'input.json');
//     const outputFilePath = path.join(uploadDir, 'output.jmx');

//     fs.copyFileSync(originalFilePath, tempInputFilePath);

//     const pythonScript = path.join(process.cwd(), 'venv', 'scripts', 'convert.py');

//     if (!fs.existsSync(pythonScript)) {
//       fs.unlinkSync(tempInputFilePath);
//       fs.unlinkSync(originalFilePath);
//       return res.status(500).json({ error: 'Python script not found' });
//     }

//     const pythonProcess = spawn('python', [pythonScript, tempInputFilePath, outputFilePath]);

//     let stdoutData = '';
//     let stderrData = '';

//     pythonProcess.stdout.on('data', (data) => {
//       stdoutData += data;
//     });

//     pythonProcess.stderr.on('data', (data) => {
//       stderrData += data;
//     });

//     pythonProcess.on('close', (code) => {
//       if (code === 0) {
//         res.setHeader('Content-Disposition', 'attachment; filename=output.jmx');
//         res.setHeader('Content-Type', 'application/xml');
//         const fileStream = fs.createReadStream(outputFilePath);
//         fileStream.pipe(res);
//         fileStream.on('close', () => {
//           fs.unlinkSync(tempInputFilePath);
//           fs.unlinkSync(originalFilePath);
//           fs.unlinkSync(outputFilePath);
//         });
//       } else {
//         fs.unlinkSync(tempInputFilePath);
//         fs.unlinkSync(originalFilePath);
//         res.status(500).json({
//           error: 'Failed to convert JSON to JMX',
//           details: stderrData || stdoutData || 'No additional error information available'
//         });
//       }
//     });
//   });
// }
import { IncomingForm, File } from 'formidable';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { spawn } from 'child_process';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new IncomingForm({
    keepExtensions: true,
    allowEmptyFiles: true,
    minFileSize: 0,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to parse form', details: err.message });
    }

    const jsonFile = (files.jsonFile && Array.isArray(files.jsonFile) ? files.jsonFile[0] : files.jsonFile) as File;

    if (!jsonFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const originalFilePath = jsonFile.filepath;
    const tempInputFilePath = path.join(process.cwd(), 'input.json');
    const outputFilePath = path.join(process.cwd(), 'output.jmx');

    fs.copyFileSync(originalFilePath, tempInputFilePath);

    const pythonScript = path.join(process.cwd(), 'venv', 'scripts', 'convert.py');

    if (!fs.existsSync(pythonScript)) {
      fs.unlinkSync(tempInputFilePath);
      fs.unlinkSync(originalFilePath);
      return res.status(500).json({ error: 'Python script not found' });
    }

    const pythonProcess = spawn('python', [pythonScript, tempInputFilePath, outputFilePath]);

    let stdoutData = '';
    let stderrData = '';

    pythonProcess.stdout.on('data', (data) => {
      stdoutData += data;
    });

    pythonProcess.stderr.on('data', (data) => {
      stderrData += data;
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        res.setHeader('Content-Disposition', 'attachment; filename=output.jmx');
        res.setHeader('Content-Type', 'application/xml');
        const fileStream = fs.createReadStream(outputFilePath);
        fileStream.pipe(res);
        fileStream.on('close', () => {
          fs.unlinkSync(tempInputFilePath);
          fs.unlinkSync(originalFilePath);
          fs.unlinkSync(outputFilePath);
        });
      } else {
        fs.unlinkSync(tempInputFilePath);
        fs.unlinkSync(originalFilePath);
        res.status(500).json({
          error: 'Failed to convert JSON to JMX',
          details: stderrData || stdoutData || 'No additional error information available'
        });
      }
    });
  });
}
