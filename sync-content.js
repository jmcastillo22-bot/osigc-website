#!/usr/bin/env node

/**
 * Sync Content Script - OSI Global Consulting
 * Sincroniza el contenido JSON del CMS con los archivos HTML
 */

const fs = require('fs');
const path = require('path');

// Configuración
const CONTENT_DIR = path.join(__dirname, 'content', 'pages');
const HTML_DIR = path.join(__dirname, 'saveweb2zip-com-wxqxuwvoaerrvrnv-manus-preview-space');

// Función para leer contenido JSON
function readContentFile(filename) {
  try {
    const filePath = path.join(CONTENT_DIR, filename);
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error.message);
    return null;
  }
}

// Función para actualizar el HTML con el contenido
function updateHTML(htmlPath, data) {
  try {
    let html = fs.readFileSync(htmlPath, 'utf8');
    
    // Actualizar título
    if (data.title) {
      html = html.replace(
        /<title>.*?<\/title>/,
        `<title>${data.title}</title>`
      );
    }
    
    // Actualizar descripción meta
    if (data.description) {
      html = html.replace(
        /<meta name="description" content=".*?"/,
        `<meta name="description" content="${data.description}"`
      );
    }
    
    // Escribir el HTML actualizado
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log(`✓ HTML actualizado: ${path.basename(htmlPath)}`);
    return true;
  } catch (error) {
    console.error(`Error updating HTML:`, error.message);
    return false;
  }
}

// Función principal
function syncContent() {
  console.log('🔄 Sincronizando contenido del CMS con HTML...\n');
  
  // Leer el contenido de home.json
  const homeContent = readContentFile('home.json');
  
  if (homeContent) {
    const htmlPath = path.join(HTML_DIR, 'index.html');
    const success = updateHTML(htmlPath, homeContent);
    
    if (success) {
      console.log('\n✅ Sincronización completada exitosamente!');
      console.log('\nContenido actualizado:');
      console.log(`  - Título: ${homeContent.title}`);
      console.log(`  - Descripción: ${homeContent.description}`);
    } else {
      console.log('\n❌ Error en la sincronización');
      process.exit(1);
    }
  } else {
    console.log('\n❌ No se pudo leer el contenido JSON');
    process.exit(1);
  }
}

// Ejecutar
if (require.main === module) {
  syncContent();
}

module.exports = { syncContent, readContentFile, updateHTML };
