import { v2 as cloudinary } from 'cloudinary';
import { log } from 'console';
import fs from "fs";

 // Configuration
 cloudinary.config({ 
    cloud_name: 'diy2wvogf', 
    api_key: '524493342467521', 
    api_secret: 'TZKrNEeJON25V55nFd9FnZCcEGU' // Click 'View API Keys' above to copy your API secret
});

// ----------------------------------------------------------------------for uploading image on cloudinary


const ImageuploadonCloudinary=async(filepath,foldername)=>{
    // for uploading image on cloudinary
    try {
        const result =await cloudinary.uploader.upload(filepath,{

            folder: foldername,
        });
         // for deleating image from server
        try {
           await fs.unlinkSync(filepath);
        } catch (error) {
            console.log(`Failed to delete image from server: ${error}`)
            
        }
       console.log(result);
        return {
           secure_url : result.secure_url,
           public_id  : result.public_id,
        } ;
      
       

    } catch (error) {
        throw new Error(error.message || 'Cloudinary upload failed');
        
    }


}

// -----------------------------------------------------------------------for deleting image from cloudinary

const deleteImagefromCloudinary=async(public_id)=>{
    try {
        
      const result=  await cloudinary.uploader.destroy(public_id);
        return result;
    } catch (error) {
        throw new Error(error.message || 'Cloudinary delete failed');
        
    }

}

export {ImageuploadonCloudinary,deleteImagefromCloudinary};