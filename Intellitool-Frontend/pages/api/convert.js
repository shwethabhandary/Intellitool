import CloudConvert from 'cloudconvert';
import formidable from 'formidable-serverless';

export const config = {
    api: {
        bodyParser: false
    }
};

const cloudConvert = new CloudConvert(process.env.CLOUDCONVERT_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const form = new formidable.IncomingForm();
    
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: 'File upload error' });
        }
        
        try {
            const file = files.file;
            const readStream = fs.createReadStream(file.path);

            const job = await cloudConvert.jobs.create({
                tasks: {
                    'upload-my-file': {
                        operation: 'import/upload'
                    },
                    'convert-my-file': {
                        operation: 'convert',
                        input: 'upload-my-file',
                        output_format: 'jpg',
                        engine: 'office'
                    },
                    'export-my-file': {
                        operation: 'export/url',
                        input: 'convert-my-file'
                    }
                }
            });

            const uploadTask = job.tasks.filter(task => task.name === 'upload-my-file')[0];
            await cloudConvert.tasks.upload(uploadTask, readStream, file.name);

            const jobCompleted = await cloudConvert.jobs.wait(job.id);

            const exportTask = jobCompleted.tasks.filter(task => task.name === 'export-my-file')[0];
            const files = exportTask.result.files;

            res.status(200).json({ files: files.map(file => file.url) });
        } catch (error) {
            console.error('Error during the conversion process:', error);
            res.status(500).json({ error: 'Conversion failed', details: error.message });
        }
    });
}
