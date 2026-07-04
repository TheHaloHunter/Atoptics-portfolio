import { Octokit } from "@octokit/rest";
import { formidable } from "formidable";
import fs from "fs/promises";

// Disable the default body parser, as we are handling the form data ourselves.
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // NEVER expose your token to the client. Use environment variables on Vercel.
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const owner = process.env.GITHUB_OWNER; // e.g., 'your-github-username'
    const repo = process.env.GITHUB_REPO;   // e.g., 'atoptics.com'

    try {
        const form = formidable({});
        const [fields, files] = await form.parse(req);

        const folderName = fields.folderName[0];
        const markdownContent = fields.markdownContent[0];
        const imageFile = files.image[0];

        // 1. Read the uploaded image file into a buffer
        const imageBuffer = await fs.readFile(imageFile.filepath);
        const imageContentBase64 = imageBuffer.toString('base64');

        // 2. Create the markdown file on GitHub
        await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path: `Gallery/${folderName}/description.md`,
            message: `feat: Add new gallery item - ${folderName}`,
            content: Buffer.from(markdownContent).toString('base64'),
            branch: 'main'
        });

        // 3. Create the image file on GitHub
        await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path: `Gallery/${folderName}/${imageFile.originalFilename}`,
            message: `feat: Add new gallery item image - ${folderName}`,
            content: imageContentBase64,
            branch: 'main'
        });

        res.status(200).json({ message: `Successfully created gallery item: ${folderName}` });

    } catch (error) {
        console.error('Error processing upload:', error);
        res.status(500).json({ message: 'An error occurred during the upload process.' });
    }
}