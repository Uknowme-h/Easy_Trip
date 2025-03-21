import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadFiles = async (file) => {
    try {
        const upload = await cloudinary.uploader.upload(file, {
            resource_type: 'video'
        });

        return upload;
    } catch (error) {
        throw new Error(error.message);
    }
};