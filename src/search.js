import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './book';

class Search extends Component {
	state = {
		searchBooks: [],
	};
	/**
	 * @description used to reset searchBooks to its intial value
	 */
	resetSearch = () => {
		this.setState({ searchBooks: [] });
	};
	/**
	 * @description handel Searching books from server
	 * @param {FormEvent} e
	 */
	searchBooks = (e) => {
		//search value from the search input
		const searchQuery = e.target.value;

		if (searchQuery && searchQuery.length > 0) {
			BooksAPI.search(searchQuery).then((searchResult) => {
				if (searchResult && !searchResult.error) {
					/**
					 * @type{Array} books which contain shelf poroperty
					 */
					const shelvedBooks = this.props.books;
					shelvedBooks.forEach((shelvedBook) => {
						searchResult.forEach((result) => {
							if (result.id === shelvedBook.id) {
								result.shelf = shelvedBook.shelf;
							}
						});
					});
					this.setState({ searchBooks: searchResult });
				}
			});
		} else {
			//if searchQuery is empty reset the state
			this.resetSearch();
		}
	};
	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/" className="close-search">
						Close
					</Link>
					<div className="search-books-input-wrapper">
						{/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
						<input
							onChange={this.searchBooks}
							type="text"
							placeholder="Search by title or author"
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{(this.state.searchBooks.length > 0 &&
							this.state.searchBooks.map((book) => (
								<Book
									key={book.id}
									book={book}
									bookShelfChange={this.props.bookShelfChange}
								/>
							))) ||
							console.log(this.state.searchBooks.length)}
					</ol>
				</div>
			</div>
		);
	}
}

export default Search;
