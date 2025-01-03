const categoryModel = require("../../models/categoryModel");
const { responseReturn } = require("../../utiles/response");
const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");
class categoryController {
  add_category = async (req, res) => {
    const form = new formidable.IncomingForm({
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return responseReturn(res, 404, {
          error: "Something went wrong during file upload",
        });
      }

      console.log("Fields: ", fields); // Log fields to verify
      console.log("Files: ", files); // Log files to verify

      try {
        let name = fields.name ? fields.name[0] : "";
        const image = files.image[0];

        if (!image || !image.filepath) {
          return responseReturn(res, 400, { error: "No image file uploaded" });
        }

        name = name.trim();
        const slug = name.split(" ").join("-");

        cloudinary.config({
          cloud_name: "dmm89lmmy",
          api_key: "523399586259964",
          api_secret: "YfZL1JT5g3gVt6WlYA4aztBpCjw",
          secure: true,
        });

        const result = await cloudinary.uploader.upload(image.filepath, {
          folder: "categorys",
        });

        if (result) {
          const category = await categoryModel.create({
            name,
            slug,
            image: result.url,
          });
          return responseReturn(res, 201, {
            category,
            message: "Category added successfully",
          });
        } else {
          return responseReturn(res, 404, { error: "Image upload failed" });
        }
      } catch (error) {
        return responseReturn(res, 500, {
          error: "Internal server error",
          details: error.message,
        });
      }
    });
  };

  get_category = async (req, res) => {
    const { page, searchValue, parPage } = req.query;
    try {
      let skipPage = "";
      if (parPage && page) {
        skipPage = parseInt(parPage) * (parseInt(page) - 1);
      }
      if (searchValue && page && parPage) {
        const categorys = await categoryModel
          .find({
            $text: { $search: searchValue },
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalCategory = await categoryModel
          .find({
            $text: { $search: searchValue },
          })
          .countDocuments();
        responseReturn(res, 200, { totalCategory, categorys });
      } else if (searchValue === "" && page && parPage) {
        const categorys = await categoryModel
          .find({})
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalCategory = await categoryModel.find({}).countDocuments();
        responseReturn(res, 200, { totalCategory, categorys });
      } else {
        const categorys = await categoryModel.find({}).sort({ createdAt: -1 });
        const totalCategory = await categoryModel.find({}).countDocuments();
        responseReturn(res, 200, { totalCategory, categorys });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
}
module.exports = new categoryController();
