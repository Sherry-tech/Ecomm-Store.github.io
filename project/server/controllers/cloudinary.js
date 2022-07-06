//install npm package that will give us config function so that we can apply the cloudinary env's

const cloudinary = require('cloudinary');


//config
cloudinary.config({

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

});



//two methods upload remove.


//(req.files.file.path) the direct data from the frontend to backend.
//(req.body.image) data from the front end in the binary form in binary format.
exports.upload= async (req,res) =>{

    let result = await cloudinary.uploader.upload(req.body.image, {
        public_id: `${Date.now()}`, 
        resorce_type: "auto" //jpeg, png
    });

    res.json({
        public_id: result.public_id,
        url: result.secure_url,
    });
};



exports.remove= (req,res) =>{

    let image_id = req.body.public_id;

    cloudinary.uploader.destroy(image_id, (err, result) => {
        if(err) return res.json({ success: false, err });
        res.send("OK")
    });

};