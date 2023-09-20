const { checkAbsolute, pathExists, readFiles, validateLinks} = require('./data');

const mdLinks = (path, validate = false) =>{

  return new Promise ((resolve, reject) =>{
    const absolutePath = checkAbsolute(path);
    if(pathExists(absolutePath) ){
      readFiles(absolutePath)
      .then((result)=>{
        resolve(validate ? result: validateLinks(result))
      })
      .catch((err)=>{
          console.log('err reading file', err);
      })
     
    }else{
    reject("not found path")
    }
  })
}


//C:/Users/JARI/OneDrive/Escritorio/md-links/DEV009-md-links/archivesMd/links.md
//./archivesMd/links.md
mdLinks("C:/Users/JARI/OneDrive/Escritorio/md-links/DEV009-md-links/archivesMd/links.md")

  .then(links => {
    // => [{ href, text, file }, ...]
    console.log('links', links);
  })
  .catch( error =>{
    console.log(error);

  }) 

  module.exports = { mdLinks };