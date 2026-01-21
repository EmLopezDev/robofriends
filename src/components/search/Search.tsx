import "./search.css";

type SearchType = {
    searchChange: React.ChangeEventHandler<HTMLInputElement>;
};

function Search({ searchChange }: SearchType) {
    return (
        <div className="searchContainer">
            <input
                id="search"
                className="searchInput"
                type="search"
                placeholder="search robots"
                onChange={searchChange}
            />
        </div>
    );
}

export default Search;
