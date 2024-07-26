import React, { useState } from 'react';
import axios from '../axios';

const PsychologistCard = ({ psychologist, currentUserId, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    fullName: psychologist.fullName,
    contacts: psychologist.contacts,
    description: psychologist.description,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch(`/posts/${psychologist._id}`, editedData);
      onUpdate(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Update psychologist error:', error);
    }
  };

  const handleInputChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const isOwner = currentUserId && psychologist.user && currentUserId === psychologist.user._id;

  return (
    <div className="psychologist-card">
      <img src={psychologist.photoBase64} alt={`Фотографія ${psychologist.fullName}`} />
      
      {isEditing ? (
        <>
          <input
            name="fullName"
            value={editedData.fullName}
            onChange={handleInputChange}
          />
          <input
            name="contacts"
            value={editedData.contacts}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            value={editedData.description}
            onChange={handleInputChange}
          />
          <button onClick={handleSave}>Зберегти</button>
        </>
      ) : (
        <>
          <h3>{psychologist.fullName}</h3>
          <p>Контакти: {psychologist.contacts}</p>
          <p>{psychologist.description}</p>
        </>
      )}

      {isOwner && (
        <>
          <button onClick={handleEdit}>Редагувати</button>
          <button onClick={() => onDelete(psychologist._id)}>Видалити</button>
        </>
      )}
    </div>
  );
};

export default PsychologistCard;