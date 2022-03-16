/*global swal*/

import React from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import { useState, useEffect } from 'react';

const apiToken = 'BQC14AWbyBTanoCwbfXrmrI9mWCritF4kxmupKJpurUv3DN__LPSHt8hotI0pvymttm3jYSD3Qxl-_ejErzTVUZo8F4CN0_d6z2JOfvLv4SJcXt0QcB5HN3YtFK6lNpAJ-rHjIQ55NdClm3NpOpc';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

const AlbumCover = ({ track }) => {
  const src = track.album.images[0].url;
  const alt = 'Album cover for ' + track.album.name;
  return (<img src={src} alt={alt} style={{ width: 400, height: 400 }}/>);
}

const App = () => {

  const [tracks, setTracks] = useState();
  const [songsLoaded, setSongsLoaded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    fetch(`https://api.spotify.com/v1/me/tracks`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + apiToken,
      },
    })
      .then(response => response.json())
      .then((data) => {
        setTracks(data.items);
        const randomIndex = getRandomNumber(data.items.length);
        setCurrentTrack(data.items[randomIndex].track);
        setSongsLoaded(true);
      });
  }, []);

    const checkAnswer = (id) => {
    if (currentTrack.id === id) {
      swal('Bravo !');
    } else {
      swal('Mauvaise réponse');
    }
  };

  if (!songsLoaded) {
    return (
      <div className="App">
        <img src={loading} className="App-logo" alt="logo"/>
      </div>
    );
  }

  const randomIndex1 = getRandomNumber(tracks.length);
  const randomIndex2 = getRandomNumber(tracks.length);

  const track1 = currentTrack;
  const track2 = tracks[randomIndex1].track;
  const track3 = tracks[randomIndex2].track;
  
  const propositions = shuffleArray([track1, track2, track3]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Bienvenue sur le Blindtest</h1>
      </header>
      <div className="App-images">
        <AlbumCover track={track1}/>
        <Sound url={track1.preview_url} playStatus={Sound.status.PLAYING}/>
      </div>
      <div className="App-buttons">
            {propositions.map(track =>
          <Button onClick={() => checkAnswer(track.id)}>{track.name}</Button>)}
      </div>
    </div>
  );
}

export default App;