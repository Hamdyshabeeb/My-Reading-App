import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shielf from './shielf';

class Shelves extends Component {
	constructor(props) {
		super(props);
		this.shelves = [
			{ title: 'Currently Reading', id: 'currentlyReading' },
			{ title: 'Want to Read', id: 'wantToRead' },
			{ title: 'Read', id: 'read' },
		];
	}
	render() {
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					{this.shelves.map((shielf) => (
						<Shielf
							key={shielf.id}
							shielf={shielf}
							books={this.props.books}
							bookShelfChange={this.props.bookShelfChange}
						/>
					))}
					<div />
				</div>
				<div className="open-search">
					<Link to="./search">Add a book</Link>
				</div>
			</div>
		);
	}
}

export default Shelves;
