import React from 'react';

const Recording = (props) => {
  console.log(props);
  return (
    <div key={props.url}>
      <audio controls>
        <source src={props.url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
    );
}

export default Recording;