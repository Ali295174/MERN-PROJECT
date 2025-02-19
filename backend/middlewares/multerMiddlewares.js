import multer from "multer";
import {v4 as uuidv4} from "uuid";
import path from "path";

const storage = multer.diskStorage({
  // this is the file destination where we will save the picture
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    // uuid used for genreating unique name for picture
    filename: function (req, file, cb) {
     const filename =uuidv4() + path.extname(file.originalname);
      cb(null, filename)
    }
  })
  
 export const upload = multer({ storage: storage })