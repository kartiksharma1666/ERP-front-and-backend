const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: "dqjrnxjio", 
    api_key: "649931468594726", 
    api_secret: "_iJUC3VJ1GeEIwq1Xns495fK_lU"
  });

  module.exports= cloudinary;