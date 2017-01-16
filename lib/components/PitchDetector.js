import React from 'react'
import DebuggerCanvas from './DebuggerCanvas'

export default class PitchDetector extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      audioContext: null,
      isPlaying: false,
      sourceNode: null,
      analyser: null,
      theBuffer: null,
      debug: false,
      debuggerCanvasElem: <canvas width={512} height={256}/>,
      mediaStreamSource: null,
      detuneAmount: null,
      drop: false,
      dragEnter: false,
      dragLeave: false,
      rafID: null,
      tracks: null,
      buf: new Float32Array(1024),
      noteStrings: [
        "C", "C#", "D", "D#", "E", "F", 
        "F#", "G", "G#", "A", "A#", "B"
      ],
    }
  }

  componentWillMount () {
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    this.setState({ audioContext: new AudioContext() })
  }

  getUserMedia (obj, cb) {
    const error = () => {
      alert('Stream generation failed.')
    }

    try {
      navigator.getUserMedia = navigator.getUserMedia || 
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia ||
      navigator.oGetUserMedia

      navigator.getUserMedia(obj, cb, error)
    } catch (e) {
      alert(`getUserMedia threw exception: ${e}`)
    }
  }

  gotStream (stream) {
    // create audio node from the stream 
    const mediaStreamSource = this.state.audioContext.createMediaStreamSource(stream)
    const analyser = this.state.audioContext.createAnalyser()
    
    analyser.fftSize = 2048
    mediaStreamSource.connect(analyser)

    this.setState({
      analyser,
      mediaStreamSource
    })

    this.updatePitch()
  }

  updatePitch (time) {
    const cycles = []
    this.state.analyser.getFloatTimeDomainData(this.state.buf)
    
  }

  toggleDebug () {
    this.setState({
      debug: !this.state.debug
    })
  }

  handleOnDragEnter () {
    this.setState({
      dragEnter: true
    })
  }

  handleOnDragLeave (e) {
    this.setState({
      dragEnter: false,
      dragLeave: true
    })
  }

  handleOnDrop (e) {
    this.setState({
      dragEnter: false,
      dragLeave: false
    })

    e.preventDefault();
    const reader = new FileReader()

    render.onload = (event) => {
      this.state.audioContext.decodeAudioData(
        event.target.result, 
        (buffer) => {
          this.setState({theBuffer: buffer})
        },
        () => {
          alert('error loading!')
        }
      )
    }
  }

  handleLiveInput () {
    if (this.state.isPlaying) {
      this.setState({
        sourceNode: this.state.sourceNode.stop(0),
        analyser: null,
        isPlaying: false
      })
    }

    if (!window.canelAnimationFrame) {
      window.cancelAnimationFrame = window.cancelAnimationFrame
      window.cancelAnimationFrame(this.state.rafID)
    }

    this.getUserMedia({
      "audio": {
        "mandatory": {
          "googEchoCancellation": "false",
          "googAutoGainControl": "false",
          "googNoiseSuppression": "false",
          "googHighpassFilter": "false"
        },
        "optional": []
      }
    }, this.gotStream.bind(this))
  }

  render () {
    console.log(this.state)
   
    return (
      <div>
        <p>
          <button onClick={() => this.handleLiveInput()}>LIVE INPUT</button>
         {/* <button onClick={() => this.handleOscillator}>OSCILLATOR</button> */}
          <button onClick={() => this.toggleDebug()}>DEBUG</button>
        </p>
        <div 
          id='detector' 
          className={`vague ${this.state.dragEnter ? "droptarget" : ""}`}
          onDrop={() => this.handleOnDrop()}
          onDragEnter={() => this.handleOnDragEnter()}
          onDragLeave={(e) => this.handleOnDragLeave(e)}
        >
          <div className='pitch'><span id='pitch'>--</span>Hz</div>
          <div className='note'><span id='note'>--</span></div>   
          <canvas id="output" width={300} height={42} />

          <div id='detune'>
            <span id='detune_amt'>--</span>
            <span id='flat'>cents &#9837;</span>
            <span id='sharp'>cents &#9839;</span>
          </div>
        </div>

        { this.state.debug ? <DebuggerCanvas buffer={this.state.buf} /> : null }
      </div>
    )
  }
}