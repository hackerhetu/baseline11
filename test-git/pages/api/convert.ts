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
import { NextApiRequest, NextApiResponse } from 'next';
import { spawn } from 'child_process';
import fs from 'fs/promises';

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

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to parse form', details: err.message });
    }

    const jsonFile = (files.jsonFile && Array.isArray(files.jsonFile) ? files.jsonFile[0] : files.jsonFile) as File;

    if (!jsonFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const jsonContent = await fs.readFile(jsonFile.filepath, 'utf-8');

      const pythonProcess = spawn('python', ['-c', `
import sys
import json
import xml.etree.ElementTree as ET
from io import StringIO

def extract_url_parts(url):
    if '//' in url:
        protocol, rest = url.split('//', 1)
        domain, *path = rest.split('/', 1)
    else:
        protocol = ''
        domain, *path = url.split('/', 1)
    return protocol.rstrip(':'), domain, '/'.join(path) if path else ''

def create_http_sampler(item):
    name = item.get('name', 'Unnamed Request')
    sampler = ET.Element("HTTPSamplerProxy", guiclass="HttpTestSampleGui", testclass="HTTPSamplerProxy", testname=name, enabled="true")
    
    elementProp = ET.SubElement(sampler, "elementProp", name="HTTPsampler.Arguments", elementType="Arguments", guiclass="HTTPArgumentsPanel", testclass="Arguments", testname="User Defined Variables", enabled="true")
    ET.SubElement(elementProp, "collectionProp", name="Arguments.arguments")
    
    request = item.get('request', {})
    if isinstance(request, str):
        url = request
        method = 'GET'
    else:
        url = request.get('url', '')
        if isinstance(url, dict):
            url = url.get('raw', '')
        method = request.get('method', 'GET')
    
    protocol, domain, path = extract_url_parts(url)
    
    ET.SubElement(sampler, "stringProp", name="HTTPSampler.domain").text = domain
    ET.SubElement(sampler, "stringProp", name="HTTPSampler.protocol").text = protocol
    ET.SubElement(sampler, "stringProp", name="HTTPSampler.path").text = path
    ET.SubElement(sampler, "stringProp", name="HTTPSampler.method").text = method
    
    # Add more HTTP Sampler parameters
    ET.SubElement(sampler,  "stringProp", name="HTTPSampler.contentEncoding").text = ""
    ET.SubElement(sampler,  "stringProp", name="HTTPSampler.port").text = ""
    ET.SubElement(sampler,  "boolProp", name="HTTPSampler.follow_redirects").text = "true"
    ET.SubElement(sampler,  "boolProp", name="HTTPSampler.auto_redirects").text = "false"
    ET.SubElement(sampler,  "boolProp", name="HTTPSampler.use_keepalive").text = "true"
    ET.SubElement(sampler,  "boolProp", name="HTTPSampler.DO_MULTIPART_POST").text = "false"
    ET.SubElement(sampler,  "stringProp", name="HTTPSampler.embedded_url_re").text = ""
    ET.SubElement(sampler,  "stringProp", name="HTTPSampler.connect_timeout").text = ""
    ET.SubElement(sampler,  "stringProp", name="HTTPSampler.response_timeout").text = ""
    
    if isinstance(request, dict) and 'body' in request:
        body = request['body']
        if isinstance(body, dict) and 'raw' in body:
            boolProp = ET.SubElement(sampler, "boolProp", name="HTTPSampler.postBodyRaw")
            boolProp.text = "true"
            elementProp = ET.SubElement(sampler, "elementProp", name="HTTPsampler.Arguments", elementType="Arguments")
            collectionProp = ET.SubElement(elementProp, "collectionProp", name="Arguments.arguments")
            elementProp = ET.SubElement(collectionProp, "elementProp", name="", elementType="HTTPArgument")
            ET.SubElement(elementProp, "boolProp", name="HTTPArgument.always_encode").text = "false"
            ET.SubElement(elementProp, "stringProp", name="Argument.value").text = body['raw']
            ET.SubElement(elementProp, "stringProp", name="Argument.metadata").text = "="
    
    headers = []
    if isinstance(request, dict) and 'header' in request:
        headers = request['header']
    
    if headers:
        headerManager = ET.Element("HeaderManager", guiclass="HeaderPanel", testclass="HeaderManager", testname="HTTP Header Manager", enabled="true")
        collectionProp = ET.SubElement(headerManager, "collectionProp", name="HeaderManager.headers")
        for header in headers:
            elementProp = ET.SubElement(collectionProp, "elementProp", name="", elementType="Header")
            ET.SubElement(elementProp, "stringProp", name="Header.name").text = header.get('key', '')
            ET.SubElement(elementProp, "stringProp", name="Header.value").text = header.get('value', '')
        return [sampler, headerManager]
    
    return [sampler]

def json_to_jmx(json_string):
    data = json.loads(json_string)
    
    root = ET.Element("jmeterTestPlan", version="1.2", properties="5.0", jmeter="5.4.1")
    hashTree = ET.SubElement(root, "hashTree")
    
    testPlan = ET.SubElement(hashTree, "TestPlan", guiclass="TestPlanGui", testclass="TestPlan", testname="Test Plan", enabled="true")
    ET.SubElement(testPlan, "stringProp", name="TestPlan.comments").text = ""
    ET.SubElement(testPlan, "boolProp", name="TestPlan.functional_mode").text = "false"
    ET.SubElement(testPlan, "boolProp", name="TestPlan.tearDown_on_shutdown").text = "true"
    ET.SubElement(testPlan, "boolProp", name="TestPlan.serialize_threadgroups").text = "false"
    elementProp = ET.SubElement(testPlan, "elementProp", name="TestPlan.user_defined_variables", elementType="Arguments", guiclass="ArgumentsPanel", testclass="Arguments", testname="User Defined Variables", enabled="true")
    ET.SubElement(elementProp, "collectionProp", name="Arguments.arguments")
    ET.SubElement(testPlan, "stringProp", name="TestPlan.user_define_classpath").text = ""
    
    testPlanHashTree = ET.SubElement(hashTree, "hashTree")
    
    threadGroup = ET.SubElement(testPlanHashTree, "ThreadGroup", guiclass="ThreadGroupGui", testclass="ThreadGroup", testname="Thread Group", enabled="true")
    ET.SubElement(threadGroup, "stringProp", name="ThreadGroup.on_sample_error").text = "continue"
    elementProp = ET.SubElement(threadGroup, "elementProp", name="ThreadGroup.main_controller", elementType="LoopController", guiclass="LoopControlPanel", testclass="LoopController", testname="Loop Controller", enabled="true")
    ET.SubElement(elementProp, "boolProp", name="LoopController.continue_forever").text = "false"
    ET.SubElement(elementProp, "stringProp", name="LoopController.loops").text = "1"
    ET.SubElement(threadGroup, "stringProp", name="ThreadGroup.num_threads").text = "1"
    ET.SubElement(threadGroup, "stringProp", name="ThreadGroup.ramp_time").text = "1"
    ET.SubElement(threadGroup, "boolProp", name="ThreadGroup.scheduler").text = "false"
    ET.SubElement(threadGroup, "stringProp", name="ThreadGroup.duration").text = ""
    ET.SubElement(threadGroup, "stringProp", name="ThreadGroup.delay").text = ""
    ET.SubElement(threadGroup, "boolProp", name="ThreadGroup.same_user_on_next_iteration").text = "true"
    
    threadGroupHashTree = ET.SubElement(testPlanHashTree, "hashTree")
    
    def process_items(items):
        for item in items:
            if 'item' in item:
                # This is a folder
                process_items(item['item'])
            else:
                # This is a request
                elements = create_http_sampler(item)
                for element in elements:
                    threadGroupHashTree.append(element)
                    threadGroupHashTree.append(ET.Element("hashTree"))
    
    if 'item' in data:
        process_items(data['item'])
    elif isinstance(data, list):
        process_items(data)
    
    tree = ET.ElementTree(root)
    output = StringIO()
    ET.indent(tree, space="  ", level=0)
    tree.write(output, encoding="unicode", xml_declaration=True)
    return output.getvalue()

# Main execution
if __name__ == "__main__":
    json_input = sys.stdin.read()
    jmx_output = json_to_jmx(json_input)
    sys.stdout.write(jmx_output)
`]);

      pythonProcess.stdin.write(jsonContent);
      pythonProcess.stdin.end();

      let outputData = '';
      let errorData = '';

      pythonProcess.stdout.on('data', (data) => {
        outputData += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        errorData += data.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          res.setHeader('Content-Disposition', 'attachment; filename=output.jmx');
          res.setHeader('Content-Type', 'application/xml');
          res.status(200).send(outputData);
        } else {
          res.status(500).json({
            error: 'Failed to convert JSON to JMX',
            details: errorData || 'No additional error information available'
          });
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to process file', details: error.message });
    }
  });
}
