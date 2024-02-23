import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'не вдалося отримати записи',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Запис не знайдено' });
    }

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Помилка при отриманні запису',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const removedPost = await PostModel.findByIdAndRemove(postId);
    if (!removedPost) {
      return res.status(404).json({
        message: 'Запис не знайдено',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'не вдалося видалити запис',
    });
  }
};


export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      photoUrl: req.body.photoUrl,
      fullName: req.body.name,
      contacts: req.body.contacts,
      description: req.body.description,
      user: req.userId,
    });

    const post = await doc.save();
    res.json({ ...post._doc, photoUrl: req.body.photoUrl });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалося створити запис',
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.findByIdAndUpdate(postId, {
      fullName: req.body.fullName,
      Contact: req.body.Contact,
      Description: req.body.Description,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалося оновити запис',
    });
  }
};