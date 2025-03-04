import React, { useState, useEffect } from 'react';
import songsData from '../data/songs.json';

const SongList = ({ onSelectSong }) => {
return (
    <div>
        <h2>Setlist da Tour</h2>
        <ul>
            {songsData.map((song, index) => (
                <li key={index} onClick={() => onSelectSong(song)}>
                {song.title} ({song.year})
                </li>
            ))}
            </ul>
            </div>
    );
};

export default SongList; 