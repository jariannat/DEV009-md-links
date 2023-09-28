#!/usr/bin/env node
const { mdLinks } = require('./index');
const { stats, statsValidate } = require('./data')
const process = require('node:process');
const path = process.argv[2];
const options = process.argv.slice(3);

if (!path) {
  console.log(('You should enter a path. You can enter a path to a file or a folder.\n\nFor example: mdlinks pathtofile.md or pathtofolder\n\nYou can also include the options --stats or --validate for further information.\n\n**Remember: mdlinks only reads markdown files.**'))
} else if (path && options.length === 0) {
  mdLinks(path)
    .then((links) => {
      console.log(('The following links were found:'), links)
    })
    .catch((error) => {
      console.error(error);
    });
} else {
  mdLinks(path, true)
    .then((links) => {
      if (options.includes('--stats') && options.includes('--validate')){
        console.log(('Validation statistics::'),statsValidate(links))
      } else if (options.includes('--stats')) {
        console.log(('Number of links found:'), stats(links))
      } else if (options.includes('--validate')) {
        console.log(('The following links were found and validated:'), links)
      } else {
        console.log((`${options} is an invalid option. Please use --stats or --validate.`))
      }
    })
    .catch((error) => {
      console.error(error);
    });
}