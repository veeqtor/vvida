(function() {
  'use strict';

  var images = require('../models/images'),
    cloudinary = require('cloudinary'),
    cloudinaryUpload = function(req, path, cb) {
      cloudinary.uploader.upload(path, function(result) {
        console.log(req.body.id, result.public_id);
        if (result && !result.error) {
          return images.create({
            item_id: req.body.id,
            public_id: result.public_id,
            img_url: result.url
          }).then(function(image) {
            cb(null, image);
          }).catch(function(err) {
            cb(err, null);
          });
        } else {
          cb(result.error, null);
        }
      });
    };

  module.exports = {
    image: function(req, res) {
      if (req.files) {
        var path = req.files[0].path;
        cloudinaryUpload(req, path, function(err, image) {
          if (image) {
            res.json(image);
          }
          res.status(400).send({
            error: 'Upload'
          });
        });
      }
    },
    delete: function(req, res, next) {
      cloudinary.uploader.destroy(req.params.id, function(result) {
        if (result) {
          req.info = result;
          console.log(req.info);
          next();
        } else {
          res.status(400).send(err);
        }
      });
    },
    deleteImage: function(req, res) {

      return images.destroy({
        where: {
          public_id: req.params.id
        }
      }).then(function(ok) {
        if (!ok) {
          req.info.db = {
            error: 'Delete failed'
          };

          res.status(500).send(req.info);
        } else {
          req.info.db = {
            message: 'Delete succesful'
          };
          res.status(200).send(req.info);
        }
      }).catch(function(err) {
        res.status(500).send({
          error: err.message || err.errors[0].message
        });
      });
    }
  };
})();
