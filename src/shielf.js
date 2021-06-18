import React, { Component } from 'react';
import Book from './book';

class Shielf extends Component {
	render() {
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.shielf.title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						<Book />
					</ol>
				</div>
			</div>
		);
	}
}

export default Shielf;
