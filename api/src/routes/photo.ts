import { Request, Response } from 'express';
import Router from 'express';
import config from '../lib/config' 
const router=Router();

const multer  = require('multer')
const mimeTypes=require('mime-types')

const storage = multer.diskStorage({
  destination:`./public/`,
  filename:function(req:Request,file:any,cb:any){
    cb('',Date.now()+'.'+mimeTypes.extension(file.mimetype));
  }
})

const upload = multer({ storage: storage })

router.post('/',/*upload.single('files')*/upload.array('files',5),(req:any,res:any)=>{

  /*
  console.log('foto: ',req.file)
  const path=`http://${config.host}:${config.port}/${req.file.filename}`
  res.json(path);
  */

  const rutas=req.files.map((f:any)=>`http://${config.host}:${config.port}/${f.filename}`)
  console.log(rutas)
  return res.json(rutas)

})

export default router;