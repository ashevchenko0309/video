import path from 'path';
import fs from 'fs';
import util from 'util';

import { VIDEO_PATH, THUMB_PATH } from './multer';

const unlink = util.promisify(fs.unlink);

const deleteVideoFiles = (files: any) => {
  const deleteFiles = [];
  
  if (files.video) {
    deleteFiles.push(path.join(VIDEO_PATH, files.video[0].filename));
  }

  if (files.thumb) {
    deleteFiles.push(path.join(THUMB_PATH, files.thumb[0].filename));
  }

  return Promise.all(deleteFiles.map(((file) => unlink(file))));
};

export default deleteVideoFiles;
