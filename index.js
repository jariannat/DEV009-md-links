const { checkAbsolute, pathExists, readFiles} = require('./data');

const mdLinks = (path) =>{
 const absolutePath = checkAbsolute(path);

  return new Promise ((resolve, reject) =>{
    console.log('is path',absolutePath,pathExists(absolutePath))
    if(pathExists(absolutePath) ){
     resolve(readFiles("C:\Users\JARI\OneDrive\Escritorio\md-links\DEV009-md-links\docs\01-milestone.md"))
    }else{
    reject("not found path")
    }

  })
}



mdLinks("docs\01-milestone.md")

  .then(links => {
    // => [{ href, text, file }, ...]
    console.log('links', links);
  })
  .catch( error =>{
    console.log(error);
    console.log('acaaaaa')
  })