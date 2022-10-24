require('../connection/connection'); 
const Item = require('../models/Products');  

const save = async (product) => { 

  try {
    const newProduct = new Item(product); 
    const data = await newProduct.save();
    console.log(data);
    return data; 
  } catch (error) {
    console.log(error);
  }

}

const list = async () => {
  try {
    const productos = await Item.find();
    return productos;
  } catch (error) {
    console.log(error);
  }
}


module.exports = { save, list };