import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios.js';
import './Add.css';

const AddPsychologist = () => {
  const [name, setName] = useState('');
  const [contacts, setContacts] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const inputFileRef = React.useRef(null);
  const [imageUrl, setImageURL] = React.useState('');

  const handlePhotoChange = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);

      const token = localStorage.getItem('token');
      const { data } = await axios.post('/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setImageURL(data.url);
    } catch (err) {
      console.warn(err);
      alert('Помилка при загрузці файла');
    }
  };

  const onClickRemoveImage = () => {
    setImageURL('');
  };

  const handleAddPsychologist = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post('/posts', {
        photo: imageUrl,
        name,
        contacts,
        description,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Psychologist added successfully', response.data);
      // Перейти на сторінку List після успішного додавання
      navigate('/List');
    } catch (error) {
      console.error('Add psychologist error:', error.message);
    }
  };

  return (
    <div className="add-psychologist-container">
      <h2>Додати психолога</h2>
      <div className="form-group">
        <label>Фотографія:</label>
        <input ref={inputFileRef} type="file" accept="image/*" onChange={handlePhotoChange} />

        {imageUrl && (
          <>
            <button variant="contained" color="error" onClick={onClickRemoveImage}>
              Видалити
            </button>
            <img src={`http://localhost:8000${imageUrl}`} alt="Uploaded" />
          </>
        )}
      </div>
      <div className="form-group">
        <label>Ім'я:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Контакти:</label>
        <input
          type="text"
          value={contacts}
          onChange={(e) => setContacts(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Опис:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="button" onClick={handleAddPsychologist}>
        Додати психолога
      </button>

      {/* Додана кнопка "Перейти до списку" */}
      <button onClick={() => navigate('/List')}>Перейти до списку</button>
    </div>
  );
};

export default AddPsychologist;
