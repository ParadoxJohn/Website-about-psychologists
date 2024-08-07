import React from 'react';
import './List.css';

const PsychologistCard = ({ psychologist, currentUserId, onDelete }) => {
  const { _id, fullName, contacts, description, user, photoUrl } = psychologist;

  const isCurrentUserOwner = user._id === currentUserId;

  const handleDeleteClick = () => {
    onDelete(_id);
  };

  return (
    <div className="psychologist-card">
      <img src={psychologist.photoBase64} alt={`Фотографія ${fullName}`} />
      <h3>{fullName}</h3>
      <p>Контакти: {contacts}</p>
      <p>{description}</p>

      {isCurrentUserOwner && (
        <button className="ButDelete" onClick={handleDeleteClick}>Видалити</button>
      )}
    </div>
  );
};

export default PsychologistCard;
