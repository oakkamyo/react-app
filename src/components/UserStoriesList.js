// libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// component files
import Pagination from './Pagination';

// common functions
import { Highlighted } from './common/CommonFunctions'; 

const UserStoriesList = (props) => {

    const [userStoriesData, setUserStoriesData] = useState([]);

    const url = "https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json";

    useEffect(() => {

        let isRendered = true;

        // call user stories api
        const getUserStoriesList = async() => {
            await axios
                .get(url)
                .then(response => {

                    if (isRendered) {
                        if(response.status === 200) {
                            setUserStoriesData(response.data);
                        } else {
                            throw new Error("Server can't be reached!");
                        }
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
        
        getUserStoriesList();

        return () => isRendered = false;

    }, [setUserStoriesData]);

    console.log("--- Search filter value ---");
    console.log(props.searchInputText);

    const filteredUserStoriesList = !props.searchInputText
        ? userStoriesData.ResultItems
        : userStoriesData.ResultItems.filter((item) =>
            item.DocumentTitle.Text.toLowerCase().includes(props.searchInputText.toLowerCase()) ||
            item.DocumentExcerpt.Text.toLowerCase().includes(props.searchInputText.toLowerCase())
        );

    console.log("--- Before filtered User Stories List ---");
    console.log(userStoriesData.ResultItems);

    console.log("--- After filtered User Stories List ---");
    console.log(filteredUserStoriesList);

    return(
        <div>
            <div className="row">
                <Pagination 
                    totalNumberOfResults={userStoriesData.TotalNumberOfResults}
                    page={userStoriesData.Page}
                    pageSize={userStoriesData.PageSize}
                />
            </div>

            {filteredUserStoriesList && filteredUserStoriesList.map((item, i) => {
                return (
                    <div className="col-md-8 offset-md-2 top30 dotted-line" key={i}>
                        <h5 key={item.DocumentId} className="text-primary">
                            {item.DocumentTitle.Text}
                        </h5>
                        <p>
                            <Highlighted text={item.DocumentExcerpt.Text} highlight={props.searchInputText} />
                        </p>
                        <p>
                            <a className="text-secondary text-decoration-none" href={item.DocumentURI}>{item.DocumentURI}</a>
                        </p>
                    </div>
                )
            })}
        </div>
    )
}

export default UserStoriesList;