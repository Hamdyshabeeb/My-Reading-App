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
	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({ books: books });
		});
	}
	render() {
		return (
			<div className="app">
				<Route path="/search" component={Search} />
				<Route
					exact
					path="/"
					render={() => <Shelves books={this.state.books} />}
				/>
			</div>
		);
	}
}

export default BooksApp;
