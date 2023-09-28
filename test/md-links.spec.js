const {mdLinks} = require('../index.js');
const {validateLinks} = require('../data.js')
const path = 'C:/Users/JARI/OneDrive/Escritorio/md-links/DEV009-md-links/archivesMd/links.md';
const noLinksParam = 'C:/Users/JARI/OneDrive/Escritorio/md-links/DEV009-md-links/archivesMd/notFiles';
const notFileMdParam = 'C:/Users/JARI/OneDrive/Escritorio/md-links/DEV009-md-links/archivesMd/othersFiles/text.txt'

const validateLinksParam = [
  {
    href: 'https://www.google.com/',
    text: 'Enlace a Google',
    file: 'C:\\Users\\JARI\\OneDrive\\Escritorio\\md-links\\DEV009-md-links\\archivesMd\\links.md'
  },
  {
    href: 'https://www.openai.com/',
    text: 'Enlace a OpenAI',
    file: 'C:\\Users\\JARI\\OneDrive\\Escritorio\\md-links\\DEV009-md-links\\archivesMd\\links.md'
  }
]

const validateLinksResult =[
  {
  text: 'Enlace a Google',
  href: 'https://www.google.com/',
  file: 'C:\\Users\\JARI\\OneDrive\\Escritorio\\md-links\\DEV009-md-links\\archivesMd\\links.md',
  status: 200,
  statusText: 'OK'
},
{
  text: 'Enlace a OpenAI',
  href: 'https://www.openai.com/',
  file: 'C:\\Users\\JARI\\OneDrive\\Escritorio\\md-links\\DEV009-md-links\\archivesMd\\links.md',
  status: 200,
  statusText: 'OK'
}]

describe('mdLinks', () => {

  it('deberia retornar un error si no el existe el path', () => {
    return mdLinks('notPath.md').catch(error => {
      expect(error).toBe('not found path');
    });
  })

  it('debería devolver un array con los enlaces en un archivo md', () => {
    return expect(mdLinks(path)).resolves.toEqual(expect.arrayContaining([
      expect.objectContaining({
        href: expect.any(String),
        text: expect.any(String),
        file: expect.any(String),
        status: expect.anything(),
        statusText: expect.any(String)
      }),
    ]))
   })

   it('debería devolver un mesaje que indique que no se encontraron links o archivos validos ', () =>{
    return mdLinks(noLinksParam)
    .catch((results) => {
      expect(results).toEqual('file empty or no links to validate.')
    })
  })

  it('debería devolver un mensaje que indique que no es un archivo md', ()=>{
    return mdLinks(notFileMdParam)
    .catch((results) => {
      expect(results).toEqual('Not Markdown. Please, enter a markdown file (.md).')
    })
  })

});

describe('validateLinks', () => {
  it('should validate links', () => {
    return validateLinks(validateLinksParam)
    .then((results) => {
      expect(results).toEqual(validateLinksResult)
    })
  });

})



