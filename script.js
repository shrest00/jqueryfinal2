// Define playlist data
const playlists = {
  rock: [
    { title: "Livin' On A Prayer", artist: "Bon Jovi", mp3: "music/Bon.mp3", cover: "images/jon.png" },
    { title: "We Will Rock You", artist: "Queen", mp3: "music/Queen.mp3", cover: "images/fred.png" }
  ],
  pop: [
    { title: "Espresso", artist: "Sabrina Carpenter", mp3: "music/EXPRESSO.mp3", cover: "images/Sabrina.png" },
    { title: "Birds of a Feather", artist: "Billie Eilish", mp3: "music/Billie.mp3", cover: "images/billie.png" }
  ],
  jazz: [
    { title: "L'Amour, Les Baguettes, Paris", artist: "Stella Jang", mp3: "music/Lamour.mp3", cover: "images/stella.png" },
    { title: "C'est Si Bon", artist: "Aoi Teshima", mp3: "music/Cestsibon.mp3", cover: "images/aoi.png" }
  ]
};

let currentPlaylist = []; // To store the selected playlist
let currentSongIndex = 0; // To keep track of the currently playing song

// Function to play a song
function playSong(song) {
  $('#audio-player').attr('src', song.mp3).get(0).play();
  $('#album-cover').html(`<img src="${song.cover}" alt="Album Cover">`);
  $('#artist-name').text(`Artist: ${song.artist}`);
  $('#song-title').text(`Song: ${song.title}`);
}

$(document).ready(() => {
  // Handle genre selection
  $('.genre-button').on('click', function () {
    const genre = $(this).data('genre');
    currentPlaylist = playlists[genre]; // Update the current playlist
    currentSongIndex = 0; // Reset index when a new playlist is selected

    const $playlist = $('#playlist ul');
    $playlist.empty();

    currentPlaylist.forEach((song, index) => {
      const listItem = `
        <li data-index="${index}" data-mp3="${song.mp3}" data-cover="${song.cover}" data-artist="${song.artist}">
          <img src="${song.cover}" alt="${song.title} Cover">
          <p>${song.title}</p>
        </li>`;
      $playlist.append(listItem);
    });

    $('.genre-button').removeClass('active');
    $(this).addClass('active');
  });

  // Play selected song
  $('#playlist').on('click', 'li', function () {
    currentSongIndex = $(this).data('index'); // Set current song index
    playSong(currentPlaylist[currentSongIndex]); // Play the selected song
  });

  // Play button
  $('#play-button').on('click', () => $('#audio-player').get(0).play());

  // Pause button
  $('#pause-button').on('click', () => $('#audio-player').get(0).pause());

  // Next button
  $('#next-button').on('click', function() {
    if (currentPlaylist.length > 0) {
      // Update the song index to play the next song
      currentSongIndex = (currentSongIndex + 1) % currentPlaylist.length;
      playSong(currentPlaylist[currentSongIndex]);

      // Change the background color of the next button when clicked
      $(this).css('background-color', '#17a84b');
      $(this).css('font-size', 'scale(1.2)em');
      $(this).css('padding', '1em 2em');
      $(this).css('transform', 'scale(1.05)');

      // Add a small transform effect when the next button is clicked
      $(this).css('transform', 'scale(1.05)');

      // Optional: Reset the background color after a short delay (to mimic hover effect)
      setTimeout(() => {
        $(this).css('background-color', '#1DB954');
        $(this).css('transform', 'scale(1)');
      }, 300);
    }
  });
});
