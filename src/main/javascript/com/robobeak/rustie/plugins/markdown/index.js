import {Plugin} from 'rustie';
import marked   from './marked';

/* TODO utilities are also plugins.
 Like, utilities.strings.{toUint8, fromUint8} etc
 utilities can serve as a dependency for plugins
 utilities can depend on other utilities
*/

function uint8ToString(u8a) {
  const CHUNK_SIZE = 0x8000;
  let c = [];
  for (let i = 0, j = u8a.length; i < j; i += CHUNK_SIZE) {
    c.push(String.fromCharCode.apply(null, u8a.subarray(i, i + CHUNK_SIZE)));
  }
  return c.join('');
}

function stringToUint8(str) {
  let result = new Uint8Array(str.length);
  for (let i = 0, j = str.length; i < j; ++i) {
    result[i] = str.charCodeAt(i);
  }
  return result;
}

export class Markdown extends Plugin {
  async process(files) {
    Object.keys(files).forEach(path => {
      let file = files[path];
      let contentString = uint8ToString(file.content);
      file.content = stringToUint8(marked(contentString));
    });
    return files;
  }
}