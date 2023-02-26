import { useState } from 'react';
import SearchApplication from './SearchApplication';

function Search() {
    const [searchTerm, setSearchTerm] = useState('')
    const [resultList, setResultList] = useState([])
    const user = JSON.parse(localStorage.getItem('user'));

    function handleSubmit(e) {
        e.preventDefault();
        fetchSearchedItems();
    }

    async function fetchSearchedItems () {
        if (searchTerm===''){return}
        if (!user){return}
        const searchedItems = await fetch(process.env.REACT_APP_FETCH_URL + `/applications/search/${user.email}/${searchTerm}`,
                                {method: 'GET',
                                headers: {'Authorization': user.token}});
        let results = await searchedItems.json();
        setResultList(results);
    }

    return (
        <div className='searchContainer'>
        <form className='searchForm'>
            <h3>Search for a key-term inside of application Notes</h3>
            <input type='text' onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}/>
            <button onClick={handleSubmit}>Search</button>
        </form>

        <div className='searchResultContainer'>
            {resultList.map(result =>
                <SearchApplication key={result._id} application={result} fetchSearchedItems={fetchSearchedItems}></SearchApplication>
            )}
        </div>
        </div>
    )
}

export default Search;