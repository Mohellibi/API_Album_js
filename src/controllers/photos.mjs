import PhotoModel from '../models/photo.mjs';
import auth from '../middlewares/auth.mjs';

const Photos = class Photos {
  constructor(app, connect) {
    this.app = app;
    this.PhotoModel = connect.model('photo', PhotoModel);

    this.run();
  }

  getAll() {
    this.app.get('/photo', (req, res) => {
      this.PhotoModel.find()
        .then((photos) => {
          res.status(200).json(photos || []);
        })
        .catch((err) => {
          console.error(`[ERROR] GET /photo -> ${err}`);
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
    });
  }

  showById() {
    this.app.get('/photo/:id', (req, res) => {
      this.PhotoModel.findById(req.params.id)
        .then((photo) => {
          res.status(200).json(photo || {});
        })
        .catch((err) => {
          console.error(`[ERROR] GET /photo/:id -> ${err}`);
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
    });
  }

  create() {
    this.app.post('/photo', (req, res) => {
      const photoModel = new this.PhotoModel(req.body);

      photoModel.save()
        .then((photo) => {
          res.status(201).json(photo || {});
        })
        .catch((err) => {
          console.error(`[ERROR] POST /photo -> ${err}`);
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
    });
  }

  updateById() {
    this.app.put('/photo/:id', (req, res) => {
      this.PhotoModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((photo) => {
          res.status(200).json(photo || {});
        })
        .catch((err) => {
          console.error(`[ERROR] PUT /photo/:id -> ${err}`);
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
    });
  }

  deleteById() {
    this.app.delete('/photo/:id', (req, res) => {
      this.PhotoModel.findByIdAndDelete(req.params.id)
        .then((photo) => {
          res.status(200).json(photo || {});
        })
        .catch((err) => {
          console.error(`[ERROR] DELETE /photo/:id -> ${err}`);
          res.status(500).json({
            code: 500,
            message: 'Internal Server error'
          });
        });
    });
  }

  run() {
    this.getAll();
    this.showById();
    this.create();
    this.updateById();
    this.deleteById();
  }
};

export default Photos;
