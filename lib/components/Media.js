import React from 'react'

export default class Media extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      renderVideo: false,
      audio: <audio 
        autoPlay={true} 
        controls={true}
      />,
      video: <video 
        autoPlay={true} 
        style={{
          width: '500px',
          height: '375px',
          backgroundColor: '#666'
        }} 
      />
    }
  }

  componentWillMount () {
    this.defineUserMedia()
  }

  handleMediaError (e) {
    // do something with error
  }

  handleVideo (video) {
    return (stream) => {
      video.setState({
        video: <video 
          src={window.URL.createObjectURL(stream)}
          autoPlay={true} 
          style={{
            width: '500px',
            height: '375px',
            backgroundColor: '#666'
          }} 
        />
      })
    }
  }

  handleAudio (audio) {
    return (stream) => {
      audio.setState({
        audio: <audio 
          src={window.URL.createObjectURL(stream)}
          autoPlay={true} 
        />
      })    
    }
  }

  defineUserMedia () {
    navigator.getUserMedia = navigator.getUserMedia || 
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia ||
      navigator.oGetUserMedia

    if (navigator.getUserMedia && this.state.renderVideo) {
      navigator.getUserMedia(
        {video: true}, 
        this.handleVideo(this), 
        this.handleMediaError
      )
    } else {
      navigator
        .mediaDevices
        .getUserMedia({audio: true, video: false})
        .then(this.handleAudio(this))
        .catch(this.handleMediaError);
    }
  }

  render () {
    const styles = {
      container: {
        margin: '0px auto',
        width: '500px',
        height: '375px',
        border: '2px #333 solid'
      }
    }

    return (
      <div id="container" style={styles.container}>
        {this.state.audio}
      </div>
    )
  }
} 