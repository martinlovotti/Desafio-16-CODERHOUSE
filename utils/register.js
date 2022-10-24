require('../connection/connection'); 
const User = require('../models/User'); 
const bcrypt = require('bcrypt'); 

const save = async (user) => {
  
  const newUser = new User(user); 
  try {
    const userExist = await User.findOne({email: user.email}); //si email existe en la DB, no se puede registrar
    if (userExist) { 
      return false; 
    } else { 
      const hashPass = await bcrypt.hash(newUser.password, 8) //encripto la contraseña
      newUser.password = hashPass; 
      await newUser.save(); //se guarda el usuario en la DB
      console.log('Usuario creado');
      return newUser; 
    } 
  } catch (error) {
    console.log(error);
  }

}


module.exports = { save };