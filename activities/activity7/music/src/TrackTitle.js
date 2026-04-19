import React from 'react';

const TrackTitle = (props) => {
  const buttonClassName = props.isSelected
    ? 'list-group-item list-group-item-action active'
    : 'list-group-item list-group-item-action';

  return (
    <button
      type='button'
      className={buttonClassName}
      onClick={() => props.onSelect(props.track.id)}
    >
      {props.track.title}
    </button>
  );
};

export default TrackTitle;