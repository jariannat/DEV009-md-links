const { checkAbsolute, pathExists, readFiles} = require('./data');

const mdLinks = (path) =>{

  return new Promise ((resolve, reject) =>{
    const absolutePath = checkAbsolute(path);
    console.log('deberia ser el absolute path',absolutePath);
    console.log('si el path existe', pathExists(absolutePath));
    if(pathExists(absolutePath) ){
     resolve(readFiles(path))
     if (!pathExists(absolutePath)) {
      reject(('no existing path'));
      return;
    } 
    }else{
    reject("not found path")
    }

  })
}



mdLinks("./archivesMd/links.md")

  .then(links => {
    // => [{ href, text, file }, ...]
    console.log('links', links);
  })
  .catch( error =>{
    console.log(error);

  })