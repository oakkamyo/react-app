
const Pagination = (props) => {

    const totalNumberOfResults = props.totalNumberOfResults;
    const page = props.page;
    const pageSize = props.pageSize;

    return(
        <div className="col-md-8 offset-md-2 top30">
            <h5>Showing {page}-{pageSize} to {totalNumberOfResults} results</h5>
        </div>
    )
};

export default Pagination;