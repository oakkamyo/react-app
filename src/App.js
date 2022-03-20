// libraries
import React, { useState } from 'react';

// component files
import SearchBox from './components/SearchBox';
import UserStoriesList from '../src/components/UserStoriesList';
import SuggestionsList from '../src/components/SuggestionsList';

// css files
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Custom.css';

function App() {

    const [text, setText] = useState([]);
    const [searchInputText, setSearchInputText] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleClick = value => {
        console.log("Search Input value: " + value);
        setSearchInputText(value);
    }

    // update set suggestions value
    const updateSetSuggestions = value => {
        console.log("Update Set Suggestion: " + value);
        setSuggestions(value);
    };

    // update set text value
    const updateSetText = value => setText(value);

    const handleChange = (suggestions, text) => {

        console.log("suggestions: " + suggestions);
        console.log("text: " + text);

        updateSetSuggestions(suggestions);
        updateSetText(text);
    }

    // reset input type value
    const handleResetClick = () => setText('');

    return (
        <div className="container top30 main">

            <div className="row">
                <SearchBox
                    text={text}
                    handleChange={handleChange}
                    handleClick={handleClick}
                    handleResetClick={handleResetClick}
                />
            </div>

            <div className="suggestion-wrapper">
                <SuggestionsList 
                    suggestions={suggestions} 
                    updateSetText={setText}
                    updateSetSuggestion={setSuggestions}
                />
            </div>
            
            <div className="row">
                <UserStoriesList searchInputText={searchInputText} />
            </div>
        </div>
    );
}

export default App;