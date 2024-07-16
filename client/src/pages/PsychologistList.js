import React, { useState, useEffect } from 'react';
import PsychologistCard from './PsychologistCard';
import './List.css';

const PsychologistList = () => {
  const [psychologistsData, setPsychologistsData] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchPsychologists = async () => {
      try {
        const response = await fetch('https://website-about-psychologists.onrender.com/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch psychologists');
        }

        const data = await response.json();
        setPsychologistsData(data);
      } catch (error) {
        console.error('Fetch psychologists error:', error);
      }
    };

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUserId(user._id);
    }

    fetchPsychologists();
  }, []);

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`https://website-about-psychologists.onrender.com/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete psychologist');
      }

      const updatedPsychologists = psychologistsData.filter(psychologist => psychologist._id !== postId);
      setPsychologistsData(updatedPsychologists);
    } catch (error) {
      console.error('Delete psychologist error:', error);
    }
  };

  return (
    <div>
      <h2>Список Психологів</h2>
      <div className="psychologist-list">
        {psychologistsData.map(psychologist => (
          <PsychologistCard
            key={psychologist._id}
            psychologist={psychologist}
            currentUserId={currentUserId}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default PsychologistList;
