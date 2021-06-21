import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './book';
import { debounce } from 'lodash';
class Search extends Component {
	state = {
		searchBooks: [],
	};
	/**
	 * @description used to reset searchBooks to its intial value
	 */
	resetSearch = () => {
		this.setState((currentState) => ({ searchBooks: [] }));
	};
	/**
	 * @description handel Searching books from server(debounced using lodash)
	 * @param {FormEvent} eve
	 */
	searchBooks = debounce((eve) => {
		//search value from the search input
		const searchQuery = eve.target.value.trim();
		console.log(searchQuery);
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

					this.setState((currentState) => ({ searchBooks: searchResult }));
				} else {
					//if no search result or search result contain error
					this.resetSearch();
				}
			});
		} else {
			//if searchQuery is empty reset the state
			this.resetSearch();
		}
	}, 500);
	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link
						to="/"
						className="close-search"
						onClick={(eve) => {
							this.resetSearch(eve);
						}}
					>
						Close
					</Link>
					<div className="search-books-input-wrapper">
						<input
							onChange={(eve) => {
								eve.persist();
								this.searchBooks(eve);
							}}
							type="text"
							placeholder="Search by title or author"
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{this.state.searchBooks.length > 0 &&
							this.state.searchBooks.map((book) => (
								<Book
									key={book.id}
									book={book}
									bookShelfChange={this.props.bookShelfChange}
								/>
							))}
					</ol>
				</div>
			</div>
		);
	}
}

export default Search;
