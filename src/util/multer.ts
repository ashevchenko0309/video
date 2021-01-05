import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const VIDEO_PATH = path.join('./uploads', 'videos');
export const THUMB_PATH = path.join('./uploads', 'thumbs');

function getFilename(file: Express.Multer.File) {
  const type = file.mimetype.split('/')[1];
  return `${uuidv4()}.${type}`
}

function fileMaster(type: 'destination' | 'filename', file: Express.Multer.File | null, callback: Function) {

  if(file === null){
    return callback(null, '');
  }

  if (file.fieldname === 'video') {
    if (type === 'destination') {
      callback(null, VIDEO_PATH);
    } else {
      const filename = getFilename(file);
      callback(null, filename);
    }
  } else if (file.fieldname === 'thumb') {
    if (type === 'destination') {
      callback(null, THUMB_PATH);
    } else {
      const filename = getFilename(file);
      callback(null, filename);
    }
  } else {
    callback(new Error('no file'), '');
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    fileMaster('destination', file, callback);
  },
  filename: function (req, file, callback) {
    fileMaster('filename', file, callback);
  }
});

const uploadFile = multer({ storage: storage }).fields([{ name: 'video', maxCount: 1 }, { name: 'thumb', maxCount: 1 }]);

export default uploadFile

