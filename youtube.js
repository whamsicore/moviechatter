<div id="player"></div>

<script src="http://www.youtube.com/player_api"></script>

<script>
    
    // create youtube player
    var player;
    function onYouTubePlayerAPIReady() {
        player = new YT.Player('player', {
          height: '500',
          width: '640',
          playerVars: { 'controls': 1, 'start': 10 },
          videoId: '0Bmhjf0rKe8',
          time: '10s',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        }); //player
    } //onYoutubePlayer

    // autoplay video
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    // when video ends
    function onPlayerStateChange(event) {        
        if(event.data === 0) {            
            alert('done');
        }
    }
    
</script>
