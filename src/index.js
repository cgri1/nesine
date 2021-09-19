import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from './components/Home';
import Provider from './provider';



ReactDOM.render(
    <Provider>
        <Home
            scroll={{
                y: document.body.offsetHeight - 55
            }}
        />
    </Provider>
    , document.getElementById('root'));
