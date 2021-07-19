const { Product } = require("../models");

const getAllProducts = (req, res) => {
  Product.findAll()
    .then((products) => {
      //  res.status(200).json(products);
      //res.status(200).json(productList);
      res.status(200).json({ products });
      // res.status(200).json(image);
    })
    .catch((err) => console.log(err));
};

const getProduct = (req, res) => {
  const id = req.params;
  Product.findOne({
    where: {
      id,
    },
  })
    .then((product) => res.status(200).json(product))
    .catch((err) =>
      res
        .status(500)
        .json({ error: "Something went wrong while getting the product", err })
    );
};

const addProduct = (req, res) => {
  const file = req.file;

  const product = {
    ...req.body,
    image: `http://localhost:3000/uploads/${file.filename}`,
  };
  console.log(product);
  Product.create(product)
    .then((product) => {
      res.status(201).json({ msg: "product added!", addedProduct: product });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "something went wrong while adding product" });
    });
};

module.exports = { getAllProducts, getProduct, addProduct };
