const {mdLinks} = require('../index.js');
const {validateLinks, stats, statsValidate, readFiles} = require('../data.js')
const path = 'C:/Users/JARI/OneDrive/Escritorio/md-links/DEV009-md-links/archivesMd/links.md';
const noLinksParam = 'C:/Users/JARI/OneDrive/Escritorio/md-links/DEV009-md-links/archivesMd/notFiles';
const notFileMdParam = 'C:/Users/JARI/OneDrive/Escritorio/md-links/DEV009-md-links/archivesMd/othersFiles/text.txt'
const directoryOfDirectoryParam = 'C:/Users/JARI/OneDrive/Escritorio/md-links/DEV009-md-links/archivesMd'

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

 const directoryOfDirectoryResult =[
  {
    href: 'https://www.google.com/',
    text: 'Enlace a Google',
    file: 'C:\\Users\\JARI\\OneDrive\\Escritorio\\md-links\\DEV009-md-links\\archivesMd\\links.md'
  },
  {
    href: 'https://www.openai.com/',
    text: 'Enlace a OpenAI',
    file: 'C:\\Users\\JARI\\OneDrive\\Escritorio\\md-links\\DEV009-md-links\\archivesMd\\links.md'
  },
  {
    href: 'https://github.com/',
    text: 'Enlace a GitHub',
    file: 'C:\\Users\\JARI\\OneDrive\\Escritorio\\md-links\\DEV009-md-links\\archivesMd\\links.md'
  },
  {
    href: 'http://example.com/error400',
    text: 'Enlace a fake',
    file: 'C:\\Users\\JARI\\OneDrive\\Escritorio\\md-links\\DEV009-md-links\\archivesMd\\links.md'
  },
  {
    href: 'https://www.facebook.com/',
    text: 'Enlace a facebook',
    file: 'C:\\Users\\JARI\\OneDrive\\Escritorio\\md-links\\DEV009-md-links\\archivesMd\\othersFiles\\social.md' 
  },
  {
    href: 'https://www.pinterest2001.com/',
    text: 'Enlace a pinterest',
    file: 'C:\\Users\\JARI\\OneDrive\\Escritorio\\md-links\\DEV009-md-links\\archivesMd\\othersFiles\\social.md' 
  },
  {
    href: 'https://www.instagram.com/',
    text: 'Enlace a Instagram',
    file: 'C:\\Users\\JARI\\OneDrive\\Escritorio\\md-links\\DEV009-md-links\\archivesMd\\othersFiles\\social.md' 
  }
] 

describe('mdLinks', () => {

  it('deberia retornar un error si no el existe el path', () => {
    return mdLinks('notPath.md').catch(error => {
      expect(error).toBe('not found path');
    });
  })

  it('debería devolver un array con los enlaces en un archivo md', () => {
    return expect(mdLinks(path)).resolves.toEqual([{"file": "C:/Users/JARI/OneDrive/Escritorio/md-links/DEV009-md-links/archivesMd/links.md", "href": "https://www.google.com/", "text": "Enlace a Google"}, {"file": "C:/Users/JARI/OneDrive/Escritorio/md-links/DEV009-md-links/archivesMd/links.md", "href": "https://www.openai.com/", "text": "Enlace a OpenAI"}, {"file": "C:/Users/JARI/OneDrive/Escritorio/md-links/DEV009-md-links/archivesMd/links.md", "href": "https://github.com/", "text": "Enlace a GitHub"}, {"file": "C:/Users/JARI/OneDrive/Escritorio/md-links/DEV009-md-links/archivesMd/links.md", "href": "http://example.com/error400", "text": "Enlace a fake"}])})

   it('debería devolver un mesaje que indique que no se encontraron links o archivos validos ', () =>{
    return mdLinks(noLinksParam)
    .catch((results) => {
      expect(results).toEqual('file empty or no links to validate.')
    })
  })
  
  it('debería devolver un array con  todos los links que encuentre en todos los archivos md ubicados en diferentes directorios', ()=>{
    return mdLinks(directoryOfDirectoryParam)
    .then((results) => {
      expect(results).toEqual(directoryOfDirectoryResult)
    })
  })

});

describe('validateLinks', () => {
  it('deberia validar los link', () => {
    return validateLinks(validateLinksParam)
    .then((results) => {
      expect(results).toEqual(validateLinksResult)
    })
  });

})

describe('readFiles',() =>{
  it('deberia validar los link', () => {
    return readFiles(notFileMdParam)
    .catch((results) => {
      expect(results).toEqual('Not Markdown. Please, enter a markdown file (.md).')
    })
  });
})

describe('stats and statsValidate', () => {
  const linksArray = [
    { href: 'link1', statusText: 'OK' },
    { href: 'link1', statusText: 'OK' },
    { href: 'link2', statusText: 'OK' },
    { href: 'link3', statusText: 'Fail' },
    { href: 'link4', statusText: 'Fail' }
  ];

  it('devuelve el número total de links y el número únicos', () => {
    expect(stats(linksArray)).toEqual({ Total: 5, Unique: 4 });
  });

  it('devuelve el número total de links buenos y rotos ', () => {
    expect(statsValidate(linksArray)).toEqual({ Total: 5, Unique: 4, OK: 3, Broken: 2 });
  });

});

