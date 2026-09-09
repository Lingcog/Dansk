import fs from 'fs';
import { packagesData } from './src/data/talemaaderPackages.js';

const strings = new Set();

Object.values(packagesData).forEach(pkg => {
  strings.add(pkg.title);
  strings.add(pkg.desc);
  
  if (pkg.modules) {
    Object.values(pkg.modules).forEach(mod => {
      strings.add(mod.title);
      strings.add(mod.desc);
      if (mod.overemne) strings.add(mod.overemne);
      
      if (mod.items) {
        mod.items.forEach(item => {
          strings.add(item.name);
          if (item.options) {
            item.options.forEach(opt => strings.add(opt));
          }
        });
      }
    });
  }
  
  if (pkg.finale && pkg.finale.nodes) {
    pkg.finale.nodes.forEach(node => {
      strings.add(node.title);
      if (node.correctEmne) strings.add(node.correctEmne);
      if (node.correctIdiom) strings.add(node.correctIdiom);
      if (node.emneOptions) node.emneOptions.forEach(o => strings.add(o));
      if (node.idiomOptions) node.idiomOptions.forEach(o => strings.add(o));
    });
  }
});

const stringsArray = Array.from(strings);
fs.writeFileSync('strings_to_translate.json', JSON.stringify(stringsArray, null, 2));
console.log(`Extracted ${stringsArray.length} unique strings to strings_to_translate.json`);
