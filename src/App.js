import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Shelves from './shelves';
import Search from './search';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
	state = {
		books: [],
	};
	/**
	 * @description fetch the server for books to render
	 */
	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			//after Fetch Successful update BooksApp state
			this.setState({ books: books });
		});
	}
	/**
	 * @description function to handel book shelf change
	 * @param {Object} book
	 * @param {string} shelf the new book shelf
	 */
	bookShelfChange = (book, shelf) => {
		BooksAPI.update(book, shelf).then((resp) => {
			//change book shelf
			book.shelf = shelf;
			//exclude the book from the books
			const newBooks = this.state.books.filter(
				(oldBook) => oldBook.id !== book.id
			);
			//push the chenged book shelf to books
			newBooks.push(book);
			//change the books array to tne new books which rerender BookApp component
			this.setState({ books: newBooks });
		});
	};
	render() {
		return (
			<div className="app">
				<Route path="/search" component={Search} />
				<Route
					exact
					path="/"
					render={() => (
						<Shelves
							books={this.state.books}
							bookShelfChange={this.bookShelfChange}
						/>
					)}
				/>
			</div>
		);
	}
}

export default BooksApp;
