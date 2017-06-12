var setSong = function(songNumber) {
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentlySongFromAlbum = currentAlbum.songs[songNumber - 1];
};

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
};

var createSongRow = function (songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     var $row = $(template);
 };
     var clickHandler = function() {
         var songNumber =$(this).attr('data-song-number');
         if (currentlyPlayingSong !== null) {
             var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber)
             currentlyPlayingCell.html(currentlyPlayingSongNumber);
         }
         if (currentlyPlayingSong !== songNumber) {
             $(this).html(pauseButtonTemplate);
             setSong(songNumber);
             updatePlayerBarSong();
         } else if (currentlyPlayingSong === songNumber) {
             $(this).html(playButtonTemplate);
             $('.main-controls .play-pause').html(playerBarPlayButton);
             currentlyPlayingSong = null;
         }
     };
     
     
     var onHover = function(event) {
         var songNumberCell = $(this).find('.song-item-number');
         var songNumber = songNumberCell.attr('data-song-number');
         
         if (songNumber != currentlyPlayingSong) {
             songNumberCell.html(playButtonTemplate);
         }
     };
     
     var offHover = function(event) {
         var songNumberCell = $(this).find('.song-item-number');
         var songNumber = songNumberCell.attr('data-song-number');
         
         if (songNumber != currentlyPlayingSong) {
             songNumberCell.html(songNumber);
             
             console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);

         }
     };
     
     $row.find('.song-item-number').click(clickHandler);
     $row.hover(onHover, offHover);
     return $row;
 };

var songNumber = parseInt($(this).attr('data-song-number'));


var setCurrentAlbum = function(album) {
    currentAlbum = album;
    
    var $albumTitle = $('album-view-title');
    var $albumArtist = $('album-view-artist');
    var $albumReleaseInfo = $('album-view-release-info');
    var $albumImage = $('album-cover-art');
    var $albumSongList = $('album-view-song-list');

     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     $albumSongList.empty();

     for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title,album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var nextSong = function () {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _incrementing_ the song here
    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // Set a new current song
    setSong(currentSongIndex + 1);
    

    // Update the Player Bar information
    updatePlayerBarSong();

    var $nextSongNumberCell = getSongNumberCell;
    var $lastSongNumberCell = getSongNumberCell;

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
}; 

var previousSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // Set a new current song
    setSong(currentSongIndex + 1);
    

    // Update the Player Bar information
    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);

    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
};
 
window.onload = function() {
     setCurrentAlbum(albumPicasso);
     
     var albums = [albumPicasso, albumMarconi, albumNew];
     var index = 1;
     
     albumImage.addEventListener("click", function(event){
         setCurrentAlbum(albums[index]);
         index++;
         if (index == albums.length) {
             index = 0;
         }
     });
 };


var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';


var currentAlbum = null;
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;


$(document).ready(function() {
        setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
     $nextButton.click(nextSong);
 });

    
    





