import AlbumModel from '../models/album.mjs';

const Albums = class Albums {
  constructor(app, connect) {
    this.app = app;
    this.AlbumModel = connect.model('Album', AlbumModel);

    this.run();
  }

  getById() {
    this.app.get('/album/:id', (req, res) =>
      this.AlbumModel.findById(req.params.id)
        .then((album) => {
          if (!album) {
            return res.status(404).json({ code: 404, message: 'Album not found' });
          }
          return res.status(200).json(album);
        })
        .catch((err) => {
          console.error('[ERROR] GET /album/:id ->', err);
          return res.status(500).json({
            code: 500,
            message: 'Internal Server Error'
          });
        })
    );
  }

  create() {
    this.app.post('/album', (req, res) => {
      const albumModel = new this.AlbumModel(req.body);

      return albumModel.save()
        .then((album) => res.status(201).json(album))
        .catch((err) => {
          console.error('[ERROR] POST /album ->', err);
          if (err.name === 'ValidationError') {
            return res.status(400).json({ code: 400, message: err.message });
          }
          return res.status(500).json({
            code: 500,
            message: 'Internal Server Error'
          });
        });
    });
  }

  updateById() {
    this.app.put('/album/:id', (req, res) =>
      this.AlbumModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      )
        .then((album) => {
          if (!album) {
            return res.status(404).json({ code: 404, message: 'Album not found' });
          }
          return res.status(200).json(album);
        })
        .catch((err) => {
          console.error('[ERROR] PUT /album/:id ->', err);
          if (err.name === 'ValidationError') {
            return res.status(400).json({ code: 400, message: err.message });
          }
          return res.status(500).json({
            code: 500,
            message: 'Internal Server Error'
          });
        })
    );
  }

  deleteById() {
    this.app.delete('/album/:id', (req, res) =>
      this.AlbumModel.findByIdAndDelete(req.params.id)
        .then((album) => {
          if (!album) {
            return res.status(404).json({ code: 404, message: 'Album not found' });
          }
          return res.status(200).json(album);
        })
        .catch((err) => {
          console.error('[ERROR] DELETE /album/:id ->', err);
          return res.status(500).json({
            code: 500,
            message: 'Internal Server Error'
          });
        })
    );
  }

  getAll() {
    this.app.get('/albums', (req, res) => {
      const filter = req.query.name ? { name: req.query.name } : {};

      return this.AlbumModel.find(filter)
        .then((albums) => res.status(200).json(albums))
        .catch((err) => {
          console.error('[ERROR] GET /albums ->', err);
          return res.status(500).json({
            code: 500,
            message: 'Internal Server Error'
          });
        });
    });
  }

  run() {
    this.create();
    this.getById();
    this.updateById();
    this.deleteById();
    this.getAll();
  }
};

export default Albums;
