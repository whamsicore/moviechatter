var player;
  function onYouTubePlayerAPIReady() {
      player = new YT.Player('player', {
        height: '500',
        width: '640',
        playerVars: { 'controls': 0, 'start': window.timeDelay },
        videoId: '0Bmhjf0rKe8',
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      }); //player
  } //onYoutubePlayerAPIReady()

  // autoplay video
  function onPlayerReady(event) {
      event.target.playVideo();
  } // onPlayerReady()

  // when video ends
  function onPlayerStateChange(event) {        
  //     if(event.data === 0) {            
  //         alert('done');
  //     }
  } // onPlayerStateChange()
