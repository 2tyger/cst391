import React, { useState } from 'react';

const AddPost = (props) => {
  const [text, setText] = useState('');

  const updateText = (event) => {
    setText(event.target.value);
  };

  const handleAddClick = () => {
    if (!text.trim()) {
      return;
    }

    props.onAdd(text);
    setText('');
  };

  return (
    <div className='post-container'>
      <textarea onChange={updateText} value={text} />
      <br />
      <button onClick={handleAddClick}>Add</button>
    </div>
  );
};

export default AddPost;