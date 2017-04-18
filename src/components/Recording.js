import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';


class Recording extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      audio: new Audio(this.props.url)
    }
  }

  componentWillUnmount() {
    this.state.audio.pause();
  }

  handlePlayClick() {
    if (this.state.playing) {
      this.state.audio.pause();
      this.setState({ playing: false });
    }
    else {
      this.state.audio.play();
      this.setState({ playing: true });
    }
  }

  renderStars() {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= this.props.rating) {
        stars.push(<Star key={`star${i}`}/>);
      }
      else {
        stars.push(<StarBorder key={`star${i}`} />);
      }
    }

    return stars;
  }

  renderDuration() {
    let mins = Math.floor(this.props.duration / 60);
    let sec = this.props.duration % 60;
    return `${mins}m${sec}s`;
  }

  renderDate() {
    let date = new Date(this.props.created);
    return date.toLocaleString();
  }

  render() {
    return (
      <Card className="recording-card">
        <CardTitle>{this.renderStars()}</CardTitle>
        <CardText className="recording-content">
          <p><em>{this.renderDate()}</em></p>
          <p className="wordwrap">{this.props.final_script}</p>
          <p><strong>Duration: </strong>{this.renderDuration()}</p>
        </CardText>
        <CardActions>
          <FlatButton 
            primary
            onTouchTap={this.handlePlayClick.bind(this)} 
            icon={this.state.playing ? <Pause /> : <PlayArrow />}
          />
        </CardActions>
      </Card>
    );
  }
}

export default Recording;