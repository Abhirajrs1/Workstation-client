import axios from 'axios';
const ressouceType = "raw"

const claudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Resume");

  try {
    const cloudName = 'dl92xeqq8';
    console.log(cloudName, "NAME");
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/${ressouceType}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log(response, "CLAUDE RES");
    return response.data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    throw error;
  }
};

export default claudinary;
