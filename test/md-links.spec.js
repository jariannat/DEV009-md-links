const {mdLinks} = require('../index.js');
const {validateLinks} = require('../data.js')
const path = 'C:/Users/JARI/OneDrive/Escritorio/md-links/DEV009-md-links/archivesMd/links.md';
//const noLinks = 'C:/Users/JARI/OneDriv/Escritorio/md-links/DEV009-md-links/archivesMd/noLinks.md';
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

});

describe('validateLinks', () => {

  it('should validate links', () => {
    const links = [
      { href: 'valid-example', text: 'Valid Link', file: 'valid.md' },
      { href: 'invalid-example', text: 'Invalid Link', file: 'invalid.md' },
    ];
  
    return validateLinks(links)
    .then((results) => {
      expect(results).toEqual([
        {
          text: 'Valid Link',
          href: 'valid-example',
          file: 'valid.md',
          status: 200,
          statusText: 'OK',
        },
        {
          text: 'Invalid Link',
          href: 'invalid-example',
          file: 'invalid.md',
          status: 404,
          statusText: 'Fail',
        },
      ])
    })
  });
});




