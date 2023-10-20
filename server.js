const express = require('express');
const multer = require('multer');
const { S3 } = require('@aws-sdk/client-s3');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuration AWS
const s3 = new S3({
    credentials: {
        accessKeyId: 'AKIA56TVH3Q6SEDGJF7V',
        secretAccessKey: '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'
    },
    region: 'eu-west-3'
});

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // Limite à 5MB
    }
});

app.use(express.static('public'));
app.use(cors());


app.post('/upload', upload.single('image'), (req, res) => {
    const params = {
        Bucket: 'tvuj',
        Key: Date.now() + '-' + req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        ACL: 'public-read'
    };

    s3.upload(params, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(data.Location);
    });
});

app.get('/images', (req, res) => {
    const params = {
        Bucket: 'tvuj',
        Prefix: '' // Vous pouvez utiliser un préfixe si nécessaire
    };

    s3.listObjectsV2(params, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        const imageUrls = data.Contents.map(item => `https://${params.Bucket}.s3.amazonaws.com/${item.Key}`);
        res.status(200).send(imageUrls);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
