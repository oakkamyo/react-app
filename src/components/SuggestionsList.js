const SuggestionsList = (props) => {

    const suggestions = props.suggestions;

    console.log("---- Suggestions List ----");
    console.log(suggestions);

    const onHandleClick = (text) => {
        props.updateSetText(text);
        props.updateSetSuggestion([]);
    }

    return (
        <div>
            {suggestions && suggestions.length > 0 ?
                    <div className='col-md-8 offset-md-2 shadow-sm p-3 mb-5 bg-white rounded position-absolute'>
                        {suggestions && suggestions.map((suggestion, i) => 
                            <div key={i} 
                                onClick={() => onHandleClick(suggestion)}
                                className="suggestion">
                                    {suggestion}
                            </div>
                        )}
                    </div> : <div className='col-md-8 offset-md-2'></div>
                }
        </div>
    )
}

export default SuggestionsList;