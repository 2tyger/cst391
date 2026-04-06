import React from 'react';
import ReactDOM from 'react-dom/client';
import Counter from './Counter';

const App = () => {
    return (
        <div>
            This is the first page of the app!

        <Counter title="Counter 1" />
        <Counter title="Counter 2" />
        <Counter title="Counter 3" />

        </div>
    );
}

export default App;