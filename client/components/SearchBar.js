import React from 'react'

export class SearchBar extends React.Component {
  render() {
    return (
      <div>
        <div className="full-search">
          <form>
            <input id="search-bar" type="text" placeholder="Search for items" />
            <button id="search-button" type="submit">
              <img src="https://icon-library.net/images/search-button-icon/search-button-icon-5.jpg" />
            </button>
          </form>
        </div>
      </div>
    )
  }
}

// export default SearchBar;
