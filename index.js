const { checkAbsolute, pathExists, readFiles, validateLinks, getContent} = require('./data');

const mdLinks = (path, validate = false) =>{

  return new Promise ((resolve, reject) =>{
    const absolutePath = checkAbsolute(path);
    if(pathExists(absolutePath) ){
      readFiles(absolutePath)
      .then((result)=>{
        resolve(validate ? result: validateLinks(result))
      })
      .catch((err)=>{
        reject(err);
      })
     
    }else{
    reject("not found path")
    }

    getContent(absolutePath)
    .then((links) => {
      if (links.length > 0) {
        resolve(validate ? validateLinks(links) : links);
      } else {
          reject('file empty or no links to validate.');
        }
        return;
      })
      .catch((error) => {
        console.error(error);
      });
  })
  
}


//C:/Users/JARI/OneDrive/Escritorio/md-links/DEV009-md-links/archivesMd/links.md
//./archivesMd/links.md
mdLinks("C:/Users/JARI/OneDrive/Escritorio/md-links/DEV009-md-links/archivesMd/othersFiles/text.txt", true)

  .then(links => {
    // => [{ href, text, file }, ...]
    console.log('links', links);
  })
  .catch( error =>{
    console.log(error);

  }) 

  module.exports = { mdLinks };