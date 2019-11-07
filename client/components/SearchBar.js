import React from 'react'
import history from '../history'

export class SearchBar extends React.Component {
  constructor() {
    super()
    this.state = {
      input: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({input: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    history.push(`/search/${this.state.input}`)
  }

  render() {
    return (
      <div>
        <div className="full-search">
          <form>
            <input
              id="search-bar"
              onChange={this.handleChange}
              type="text"
              placeholder="Search for items"
            />
            <button
              id="search-button"
              onClick={this.handleSubmit}
              type="submit"
            >
              <img src="https://icon-library.net/images/search-button-icon/search-button-icon-5.jpg" />
            </button>
          </form>
        </div>
      </div>
    )
  }
}
