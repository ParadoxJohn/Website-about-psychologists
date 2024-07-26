import React, { useState, useEffect } from 'react';
import axios from '../axios';
import './MyAccount.css';

const MyAccount = () => {
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    fetchUserData();
    fetchUserPosts();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/auth/me');
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get('/posts/user');
      setUserPosts(response.data);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  const handleEdit = (postId) => {
    const postToEdit = userPosts.find(post => post._id === postId);
    setEditingPost(postToEdit);
  };

  const handleSaveEdit = async () => {
    if (!editingPost) return;

    try {
      await axios.patch(`/posts/${editingPost._id}`, {
        fullName: editingPost.fullName,
        contacts: editingPost.contacts,
        description: editingPost.description
      });
      fetchUserPosts();
      setEditingPost(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/posts/${postId}`);
      fetchUserPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="my-account">
      <div className="user-info">
        <h2>Мій акаунт</h2>
        {userData && (
          <>
            <p>Ім'я: {userData.fullName}</p>
            <p>Email: {userData.email}</p>
          </>
        )}
      </div>
      <div className="user-posts">
        <h3>Мої пости</h3>
        {userPosts.map(post => (
          <div key={post._id} className="post">
            {editingPost && editingPost._id === post._id ? (
              <>
                <input
                  name="fullName"
                  value={editingPost.fullName}
                  onChange={handleInputChange}
                />
                <input
                  name="contacts"
                  value={editingPost.contacts}
                  onChange={handleInputChange}
                />
                <textarea
                  name="description"
                  value={editingPost.description}
                  onChange={handleInputChange}
                />
                <button onClick={handleSaveEdit}>Зберегти</button>
                <button onClick={handleCancelEdit}>Скасувати</button>
              </>
            ) : (
              <>
                <h4>{post.fullName}</h4>
                <p>Контакти: {post.contacts}</p>
                <p>{post.description}</p>
                <button onClick={() => handleEdit(post._id)}>Редагувати</button>
                <button onClick={() => handleDelete(post._id)}>Видалити</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAccount;