import fs from 'fs';
import path from 'path';

export default function Page() {
  const filePath = path.join(process.cwd(), 'public', 'studio.html');
  let htmlContent = '';
  try {
    htmlContent = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    htmlContent = '<h1>Studio HTML not found</h1>';
  }

  return (
    <div 
      dangerouslySetInnerHTML={{ __html: htmlContent }} 
      style={{ width: '100%', height: '100vh', margin: 0, padding: 0, border: 'none' }} 
    />
  );
}