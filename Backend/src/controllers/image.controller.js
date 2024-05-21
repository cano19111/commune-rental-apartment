const { default: to } = require('await-to-js');
const mongoose = require('mongoose');

const conn = mongoose.createConnection(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let gfsPromise = new Promise((resolve, reject) => {
    conn.once('open', () => {
        const gfs = new mongoose.mongo.GridFSBucket(conn.db, {
            bucketName: 'images',
        });
        resolve(gfs);
    });

    conn.on('error', (error) => {
        reject(error);
    });
});

const uploadImage = async (req, res, next) => {
    try {
        if (req.file.filename) {
            return res.status(200).json({
                success: true,
                data: {
                    link: `${process.env.SERVER_URI}/api/image/${req.file.filename}`,
                },
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Error upload image',
            });
        }
    } catch (error) {
        next(error);
    }
};

const openImageBrowser = async (req, res, next) => {
    try {
        const gfs = await gfsPromise;

        const [err, files] = await to(gfs.find({ filename: req.params.filename }).toArray());

        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error preview image',
            });
        }

        if (!files || files.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No image exist',
            });
        }

        gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    } catch (error) {
        next(error);
    }
};
const uploadMultipleFiles = (req, res, next) => {
    const filenames = req.files.map((file) => file?.filename);

    res.status(200).json({
        success: true,
        message: `${filenames.length} files uploaded successfully`,
        data: {
            filenames: filenames,
        },
    });
};
const getRecentFile = (req, res, next) => {
    try {
        gfs.find()
            .sort({ uploadDate: -1 })
            .limit(1)
            .toArray((err, files) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Error fetching recent file',
                    });
                }

                if (!files || files.length === 0) {
                    return res.status(404).json({
                        success: false,
                        message: 'No files available',
                    });
                }

                const recentFile = files[0];
                res.status(200).json({
                    success: true,
                    data: {
                        file: recentFile,
                    },
                });
            });
    } catch (error) {
        next(error);
    }
};

const getAllFiles = (req, res, next) => {
    try {
        gfs.find().toArray((err, files) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error fetching files',
                });
            }

            if (!files || files.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No files available',
                });
            }

            files.map((file) => {
                file.isImage =
                    file.contentType === 'image/jpeg' ||
                    file.contentType === 'image/png' ||
                    file.contentType === 'image/svg+xml';
            });

            res.status(200).json({
                success: true,
                files,
            });
        });
    } catch (error) {
        next(error);
    }
};

const getFileByFilename = (req, res, next) => {
    try {
        gfs.find({ filename: req.params.filename }).toArray((err, files) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error fetching file',
                });
            }

            if (!files[0] || files.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'File not found',
                });
            }

            const file = files[0];
            res.status(200).json({
                success: true,
                file,
            });
        });
    } catch (error) {
        next(error);
    }
};
const deleteFileByFileName = async (req, res, next) => {
    try {
        const gfs = await gfsPromise;
        const [err, result] = await to(gfs.delete(new mongoose.Types.ObjectId(req.params.id)));

        if (err) {
            return res.status(404).json({
                success: false,
                error: err.message,
            });
        }

        res.status(200).json({
            success: true,
            message: `File with ID ${req.params.id} is deleted`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadImage,
    openImageBrowser,
    getRecentFile,
    uploadMultipleFiles,
    getAllFiles,
    getFileByFilename,
    deleteFileByFileName,
};
