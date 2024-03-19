import { v2 as cloudinary } from 'cloudinary';

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const cldUpload = async imagePath => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.secure_url;
  } catch (error) {
    console.error(error);
  }
};

export const addImage = async (req, res, next) => {
  try {
    const { data, mimetype } = req.files.image;
    const base64String = Buffer.from(data).toString('base64');
    const withPrefix = `data:${mimetype};base64,${base64String}`;
    const imageUrl = await cldUpload(withPrefix);
    return res.status(200).json({ status: 'ok', imageUrl });
  } catch (error) {
    next({ status: 500, error });
  }
};
