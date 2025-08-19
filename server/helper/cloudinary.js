const cloudinary = require("cloudinary")
const multer = require("multer")


cloudinary.config({
    cloud_name: "dqfwj0sc2",
    api_key: "166454544731948",
    api_secret: "o58inVbVOWhKbwpW8dr4JS2-ytM"
})


const storage = new multer.memoryStorage()

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto"
    })

    return result
}


const upload = multer({ storage })

module.exports = { upload, imageUploadUtil }