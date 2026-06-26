import fs from 'fs';
import path from 'path';

async function generate() {
  console.log('Starting prerender...');
  const serverModule = await import('./dist/server/server.js');
  const server = serverModule.default;
  
  const req = new Request('http://localhost:3000/');
  const res = await server.fetch(req, {}, {});
  
  if (res.status !== 200) {
    console.error('Failed to render:', res.status);
    console.error(await res.text());
    process.exit(1);
  }
  
  const html = await res.text();
  fs.writeFileSync('./dist/client/index.html', html);
  console.log('Successfully pre-rendered index.html!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
