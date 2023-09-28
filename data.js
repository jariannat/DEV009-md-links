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
  
  // funcion que verifica si la rutra existe
  function pathExists(filePath) {
    return fs.existsSync(filePath)
  }

  function fileExtension(filePath) {
    return path.extname(filePath)
  }

  //funcion que obtiene los links
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
  //funcion que valida los links
  
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
//para leer los archivos
  function readFiles(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (fileExtension(filePath) === '.md') {
          resolve(getLinks(data, filePath));
          } else {
          reject('Not Markdown. Please, enter a markdown file (.md).');
        }
      });
    });
  }

  //hito 3 

  function readPath(filePath){
  
    const arrayAllPaths = [];
    const files = fs.readdirSync(filePath);
    
    files.forEach(file => {
      const fullPath = path.join(filePath, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()){
        const sub = readPath(fullPath); //recursividad
        arrayAllPaths.push(...sub);
      } else if (fileExtension(fullPath) === '.md') {
        arrayAllPaths.push(fullPath);
      }
  
    });
    return arrayAllPaths
  }
  
  function getContent(filePath) {
    const isDirectory = fs.statSync(filePath).isDirectory();
    if (isDirectory) { 
      const files = readPath(filePath); 
      const allFiles = files.map(file => readFiles(file)); 
     
    return Promise.all(allFiles) //devuelve una promesa que se resuelve en array de todos los resultados de llamar a readFiles en cada archivo
      .then((links) =>{
      return links.flat()});
    } 
    return readFiles(filePath);
  }

  function stats(arr) {
    return {
        'Total': arr.length,
        'Unique': new Set(arr.map((links) => links.href)).size
    }
  }
  
  function statsValidate(arr) {
    return {
        'Total': arr.length,
        'Unique': new Set(arr.map((link) => link.href)).size,
        'OK': arr.filter((link) => link.statusText === 'OK').length,
        'Broken': arr.filter((link) => link.statusText === 'Fail').length
    }
  }


  module.exports = { checkAbsolute, pathExists , readFiles, validateLinks,  readPath,  getContent, stats, statsValidate}