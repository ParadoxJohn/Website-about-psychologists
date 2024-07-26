import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user', '-passwordHash').exec();

    res.json(posts.map(post => ({
      ...post._doc,
      photoBase64: post.photoBase64
    })));
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

    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: 'Пост не знайдено',
      });
    }

    if (post.user.toString() !== req.userId) {
      return res.status(403).json({
        message: 'У вас немає прав для видалення цього поста',
      });
    }

    await PostModel.findByIdAndDelete(postId);

    res.json({
      success: true,
      message: 'Пост успішно видалено',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалося видалити пост',
    });
  }
};

export const create = async (req, res) => {
  try {
    const { photoBase64, name, contacts, description } = req.body;

    const post = new PostModel({
      photoBase64,
      fullName: name,
      contacts,
      description,
      user: req.userId,
    });

    const savedPost = await post.save();

    res.json(savedPost);
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
    const { fullName, contacts, description, photoBase64 } = req.body;

    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: 'Пост не знайдено',
      });
    }

    if (post.user.toString() !== req.userId) {
      return res.status(403).json({
        message: 'У вас немає прав для редагування цього поста',
      });
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      {
        fullName,
        contacts,
        description,
        photoBase64,
      },
      { new: true }
    );

    res.json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалося оновити пост',
    });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({ user: req.userId }).populate('user', '-passwordHash');
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалося отримати пости користувача',
    });
  }
};