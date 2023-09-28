const { checkAbsolute, pathExists,validateLinks, getContent} = require('./data');
const mdLinks = (path, validate = false) =>{

  return new Promise ((resolve, reject) =>{
    const absolutePath = checkAbsolute(path);
    if(pathExists(absolutePath) ){
      getContent(absolutePath)
      .then((links) => {
        if (links.length > 0) {
          resolve(validate ? validateLinks(links) : links);
        } else {
            reject('file empty or no links to validate.');
          }
          return;
        })
    }else{
    reject("not found path")
    }
  })
  
}

  module.exports = { mdLinks };