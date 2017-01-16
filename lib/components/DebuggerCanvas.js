import React from 'react'

export default class DebuggerCanvas extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
    this.updateCanvas()
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d')

    ctx.clearRect(0,0,512,256);
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,256);
    ctx.moveTo(128,0);
    ctx.lineTo(128,256);
    ctx.moveTo(256,0);
    ctx.lineTo(256,256);
    ctx.moveTo(384,0);
    ctx.lineTo(384,256);
    ctx.moveTo(512,0);
    ctx.lineTo(512,256);
    ctx.stroke();
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0,this.props.buffer[0]);

    for (var i=1;i<512;i++) {
      ctx.lineTo(i,128+(this.props.buffer[i]*128));
    }

    ctx.stroke();
  }

  render() {
    return (
      <canvas ref="canvas" width={300} height={300}/>
    )
  }
}