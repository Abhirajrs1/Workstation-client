// import axios from "axios";

// const claudinary = async (file, uploadPreset, resourceType = 'auto') => {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', uploadPreset);
//   console.log(file,uploadPreset,resourceType)

//   try {
//     const cloudName = import.meta.env.VITE_CLOUDNAME;
//     console.log(cloudName, "NAME");

//     const response = await axios.post(
//       `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
//       formData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         // Remove withCredentials
//         withCredentials: true,
//       }
//     );

//     console.log(response, "CLAUDE RES");
//     return response.data.secure_url;
//   } catch (error) {
//     console.error('Cloudinary upload failed:', error);
//     throw error; // rethrow the error after logging it
//   }
// };

// export default claudinary;


import axios from "axios";

const claudinary = async (file, uploadPreset, resourceType = 'auto') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  console.log(file,uploadPreset,resourceType)

  try {
    const cloudName = import.meta.env.VITE_CLOUDNAME;
    console.log(cloudName, "NAME");

    const response = await axios.post(
      `http://localhost:5173/https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
      formData);

    console.log(response, "CLAUDE RES");
    return response.data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    throw error; // rethrow the error after logging it
  }
};

export default claudinary;
