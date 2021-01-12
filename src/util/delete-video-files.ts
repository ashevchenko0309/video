import path from 'path';
import fs from 'fs';
import util from 'util';

import { VIDEO_PATH, THUMB_PATH } from '../util/multer';
const unlink = util.promisify(fs.unlink);

const deleteVideoFiles = (files: any) => {
  const _files = [];
  if (files['video']) {
    _files.push(path.join(VIDEO_PATH, files['video'][0]["filename"]));
  }

  if (files['thumb']) {
    _files.push(path.join(THUMB_PATH, files['thumb'][0]["filename"]));
  }

  return Promise.all(_files.map((file => unlink(file))));
}

export default deleteVideoFiles;