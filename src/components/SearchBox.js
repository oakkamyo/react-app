// libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// icon files
import * as Icon from 'react-bootstrap-icons';

function SearchBox(props) {

    const [hasSearchValue, setHasSearchValue] = useState(false);
    const [suggestionsData, setSuggestionsData] = useState([]);

    const url = 'https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json';

    useEffect(() => {

        let isRendered = true;

        // call suggestion api
        const getSuggestionList = async() => {
             await axios
                .get(url)
                .then(function(response) {

                    if (isRendered) {
                        if(response.status === 200) {
                            setSuggestionsData(response.data.suggestions);
                        }
                        else {
                            throw new Error("Server can't be reached!");
                        }
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        };

        getSuggestionList();

        return () => isRendered = false;
        
    }, [setSuggestionsData]);

    const onHandleChange = (event) => {

        console.log('handle change called');
        console.log("Input Value: " + event.target.value);
        
        let matches = [];

        if(event.target.value.length > 2) {
            matches = suggestionsData.filter(item => {
                const regex = new RegExp(`${event.target.value}`, "gi");
                return item.match(regex);
            });
        }

        if(event.target.value.length >= 1) {
            setHasSearchValue(true);
        } else {
            setHasSearchValue(false);
        }

        console.log("matches", matches);
        
        props.handleChange(matches, event.target.value);
    }

    // click event of suggestions list
    const onHandleClick = () => {
        console.log("Input Text: " + textInput.current.value);
        props.handleClick(textInput.current.value);
    }

    const onHandleResetClick = () => {
        props.handleResetClick();
        setHasSearchValue(false);
    }

    let textInput = React.createRef();

    return (
        <div className="col-md-8 offset-md-2">
                    
            <div className="input-group col-md-6">
                
                <input ref={textInput} type="text" className="form-control search-box"
                    onChange={onHandleChange}
                    placeholder="Search keyword"
                    value={props.text}
                />

                {hasSearchValue ? <span className="input-group-text close-btn" id="basic-addon1" onClick={onHandleResetClick}><Icon.X /></span> : ''}
                
                <button className="btn btn-primary bi bi-search" 
                        type="button"
                        onClick={onHandleClick}>
                    <Icon.Search /> Search
                </button>
            </div>
        </div>
    )
}

export default SearchBox;