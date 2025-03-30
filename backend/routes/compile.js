import express from 'express';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post('/compile', async (req, res) => {
  const { language, code } = req.body;

  if (!language || !code) {
    return res.status(400).json({ error: 'Language and code are required' });
  }

  const fileExtensions = {
    java: 'Main.java',
    python: 'script.py',
    cpp: 'program.cpp',
    c: 'program.c',
  };

  const commands = {
    java: 'javac Main.java && java Main',
    python: 'python script.py', // Adjusted for compatibility
    cpp: 'g++ program.cpp -o program && ./program',
    c: 'gcc program.c -o program && ./program',
  };

  if (!fileExtensions[language] || !commands[language]) {
    return res.status(400).json({ error: 'Unsupported language' });
  }

  const tempDir = path.join(__dirname, '../temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const fileName = fileExtensions[language];
  const filePath = path.join(tempDir, fileName);

  fs.writeFile(filePath, code, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to write code to file' });
    }

    const command = commands[language];
    exec(command, { cwd: tempDir }, (error, stdout, stderr) => {
      // Clean up the temporary files
      fs.unlinkSync(filePath);
      if (language !== 'python') {
        const compiledFile = path.join(tempDir, language === 'java' ? 'Main.class' : 'program');
        if (fs.existsSync(compiledFile)) {
          fs.unlinkSync(compiledFile);
        }
      }

      if (error) {
        return res.status(400).json({ error: stderr || error.message });
      }

      res.json({ output: stdout });
    });
  });
});

// export default router;


// 
// 



export default router;


