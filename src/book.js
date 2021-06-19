import React, { Component } from 'react';
import noThumbnail from './icons/noThumbnail.png';

class Book extends Component {
	render() {
		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div
							className="book-cover"
							style={{
								width: 128,
								height: 193,
								backgroundImage: `url(${
									this.props.book.imageLinks
										? this.props.book.imageLinks.thumbnail
										: noThumbnail
								})`,
							}}
						/>
						<div className="book-shelf-changer">
							<select
								onChange={(e) =>
									this.props.bookShelfChange(this.props.book, e.target.value)
								}
								value={this.props.book.shelf ? this.props.book.shelf : 'none'}
							>
								<option value="move" disabled>
									Move to...
								</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{this.props.book.title}</div>
					<div className="book-authors">
						{this.props.book.authors &&
							this.props.book.authors.map((author) => (
								<div key={author}>{author}</div>
							))}
					</div>
				</div>
			</li>
		);
	}
}

export default Book;
