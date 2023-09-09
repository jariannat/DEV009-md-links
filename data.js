const path = require('path');
const fs = require('fs');
const axios = require('axios');

function checkAbsolute(filePath) {
    // aca verificamos si la ruta es absolut y si es absoluta, no hacemos nada y la devolvemos tal cual
    if (path.isAbsolute(filePath)) {
      return filePath;
    } else {
      // Si no es absoluta, la convertimos en una ruta absoluta
      const absolutePath = path.resolve(filePath);
      return absolutePath;
    }
  }
  
  
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
          resolve(getLinks(data, filePath));
          } else {
            console.log('error en read Files')
          reject(('Not Markdown. Please, enter a markdown file (.md).', err))
        }
        
      });
    });
  }

  function validateLinks(links) {
    const validatePromises = links.map(link =>{
      return axios.get(link.href)
      .then((response)=> {
        return {
          text: link.text,
          href: link.href,
          file: link.file,
          status: response.status,
          statusText: response.statusText
        }
      }).catch((error) => {
        return {
          text: link.text,
          href: link.href,
          file: link.file,
          status: error.response ? error.response.status :  error.response,
          statusText: 'Fail'
        }
      })
    })
  
    return Promise.all(validatePromises)
  }

  module.exports = { checkAbsolute, pathExists , readFiles, validateLinks}