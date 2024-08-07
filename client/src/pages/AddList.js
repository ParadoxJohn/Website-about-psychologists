import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios.js';
import './Add.css';

const AddPsychologist = () => {
  const [name, setName] = useState('');
  const [contacts, setContacts] = useState('');
  const [description, setDescription] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const navigate = useNavigate();
  const inputFileRef = useRef(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
    
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onClickRemoveImage = () => {
    setImageBase64('');
  };

  const handleAddPsychologist = async () => {
    try {
      const response = await axios.post('/posts', {
        photoBase64: imageBase64,
        name,
        contacts,
        description,
      });
  
      console.log('Psychologist added successfully', response.data);
      navigate('/List');
    } catch (error) {
      console.error('Add psychologist error:', error.response?.data?.message || error.message);
      alert('Помилка при додаванні психолога: ' + (error.response?.data?.message || error.message));
    }
  };
  
  return (
    <div className="add-psychologist-container">
      <h2>Додати психолога</h2>
      <div className="form-group">
        <label>Фотографія:</label>
        <input ref={inputFileRef} type="file" accept="image/*" onChange={handlePhotoChange} />

        {imageBase64 && (
          <>
            <button variant="contained" color="error" onClick={onClickRemoveImage}>
              Видалити
            </button>
            <img className="newImg" src={imageBase64} alt="Uploaded" />
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
      <button onClick={() => navigate('/List')}>Перейти до списку</button>
    </div>
  );
};

export default AddPsychologist;
