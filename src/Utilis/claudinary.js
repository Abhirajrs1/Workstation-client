import axios from "axios"

const claudinary=async(file,uploadPreset,resourceType='auto')=>{
    const formData=new FormData()
    formData.append('file',file)
    formData.append('upload_preset',uploadPreset)
    try {
        const cloudName=import.meta.env.VITE_CLOUDNAME
        console.log(cloudName,"NAME");
        const response=await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,formData)
        return response.data.secure_url;
    } catch (error) {
        console.error('Cloudinary upload failed:', error);
    }
}
export default claudinary