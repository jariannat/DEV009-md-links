const path = require('path');
const fs = require('fs');

function checkAbsolute(filePath) {
    return path.resolve(filePath);
  }  //validacion con el is absolute path.  
  
  function pathExists(filePath) {
    return fs.existsSync(filePath)
  }

  function fileExtension(filePath) {
    return path.extname(filePath)
  }
  function getLinks(data, filePath) {
    const regex = /\[(.*?)\]\((https?:\/\/.*?)\)/g;
    const links = [];
    let match;
  
    while ((match = regex.exec(data)) !== null) {
      const text = match[1];
      const href = match[2];
      links.push({ href, text, file: filePath });
    }
  
    return links;
  }
  

  function readFiles(filePath) {
    return new Promise((resolve, reject) => {
  
      fs.readFile(filePath, 'utf8', (err, data) => {
  
        if (fileExtension(filePath) === '.md') {
            console.log('hola')
          resolve(getLinks(data, filePath));
      
          } else {
            console.log('error en redFiles')
          reject(('Not Markdown. Please, enter a markdown file (.md).', err))
        }
        
      });
    });
  }

  module.exports = { checkAbsolute, pathExists , readFiles}