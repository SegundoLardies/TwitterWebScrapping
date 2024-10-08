import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Building the React app...');
const build = spawn('npm', ['run', 'build'], { stdio: 'inherit' });

build.on('close', (code) => {
  if (code !== 0) {
    console.error('Build process exited with code', code);
    process.exit(code);
  }

  console.log('Build completed. Starting the server...');
  const server = spawn('node', ['server.js'], { stdio: 'inherit' });

  process.on('SIGINT', () => {
    server.kill('SIGINT');
  });

  server.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
    process.exit(code);
  });
});