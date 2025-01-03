const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
const productModel = require("../../models/productModel");
const { responseReturn } = require("../../utiles/response");

class productController {
  add_product = async (req, res) => {
    const { id } = req;

    const form = new formidable.IncomingForm({
      multiples: true,
    });
    form.parse(req, async (err, field, files) => {
      let {
        name,
        category,
        description,
        stock,
        price,
        discount,
        shopName,
        brand,
      } = field;
      const { images } = files;
      name = String(name || "").trim();
      const slug = name.split(" ").join("-");
      category = String(category || "").trim();
      description = String(description || "").trim();
      brand = String(brand || "").trim();
      shopName = String(shopName || "").trim();
      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
        secure: true,
      });

      try {
        let allImageUrl = [];

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.uploader.upload(images[i].filepath, {
            folder: "products",
          });
          allImageUrl = [...allImageUrl, result.url];
        }

        await productModel.create({
          sellerId: id,
          name,
          slug,
          shopName,
          category: category.trim(),
          description: description.trim(),
          stock: parseInt(stock),
          price: parseInt(price),
          discount: parseInt(discount),
          images: allImageUrl,
          brand: brand.trim(),
        });
        responseReturn(res, 201, { message: "product add success" });
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    });
  };
  products_get = async (req, res) => {
    const { page, searchValue, parPage } = req.query;
    const { id } = req;

    const skipPage = parseInt(parPage) * (parseInt(page) - 1);

    try {
      if (searchValue) {
        const products = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalProduct = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
          })
          .countDocuments();
        responseReturn(res, 200, { totalProduct, products });
      } else {
        const products = await productModel
          .find({ sellerId: id })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalProduct = await productModel
          .find({ sellerId: id })
          .countDocuments();
        responseReturn(res, 200, { totalProduct, products });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  product_get = async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await productModel.findById(productId);
      responseReturn(res, 200, { product });
    } catch (error) {
      console.log(error.message);
    }
  };

  product_update = async (req, res) => {
    let { name, description, discount, price, brand, productId, stock } =
      req.body;
    name = name.trim();
    const slug = name.split(" ").join("-");
    try {
      await productModel.findByIdAndUpdate(productId, {
        name,
        description,
        discount,
        price,
        brand,
        productId,
        stock,
        slug,
      });
      const product = await productModel.findById(productId);
      responseReturn(res, 200, { product, message: "product update success" });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  product_image_update = async (req, res) => {
    const form = new formidable.IncomingForm({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Form parsing failed:", err.message);
        return res
          .status(400)
          .json({ error: "Form parsing failed: " + err.message });
      }

      const file = Array.isArray(files.file) ? files.file[0] : files.file;

      if (!file || !file.filepath) {
        console.error("Image file is missing or invalid");
        return res.status(400).json({ error: "Image file is required" });
      }

      const { productId, oldImage } = fields;
      if (!productId || !oldImage) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      try {
        // Configure Cloudinary
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
          secure: true,
        });

        console.log("Uploading new image...");
        const uploadResult = await cloudinary.uploader.upload(file.filepath, {
          folder: "products",
        });

        if (!uploadResult || !uploadResult.url) {
          console.error("Image upload failed:", uploadResult);
          return res.status(500).json({ error: "Image upload failed" });
        }

        // Find and update the product
        const product = await productModel.findById(productId);
        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }

        const { images = [] } = product; // Ensure `images` is always an array
        const index = images.findIndex((img) => img === oldImage);
        if (index === -1) {
          return res
            .status(404)
            .json({ error: "Old image not found in product images" });
        }

        images[index] = uploadResult.url; // Replace old image with the new one
        const updatedProduct = await productModel.findByIdAndUpdate(
          productId,
          { images },
          { new: true } // Return the updated product
        );

        console.log("Updated Product:", updatedProduct);
        return res.status(200).json({
          product: updatedProduct,
          message: "Product image updated successfully",
        });
      } catch (error) {
        console.error("Server error:", error.message);
        return res
          .status(500)
          .json({ error: "Server error: " + error.message });
      }
    });
  };
}

module.exports = new productController();
