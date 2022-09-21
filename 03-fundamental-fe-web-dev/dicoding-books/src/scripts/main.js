const apiUrl = 'https://books-api.dicoding.dev';

function main() {
	const getBook = async () => {
		try {
			const response = await fetch(`${apiUrl}/list`);
			const responseJson = await response.json();
			if (responseJson.error) {
				showResponseMessage(responseJson.message);
			} else {
				renderAllBooks(responseJson.books);
			}
		} catch (error) {
			showResponseMessage();
		}
	};

	const insertBook = async (book) => {
		try {
			const response = await fetch(`${apiUrl}/add`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					'x-auth-token': '12345'
				},
				body: JSON.stringify(book)
			});
			const responseJson = await response.json();
			showResponseMessage(responseJson.message);
			getBook();
		} catch (error) {
			showResponseMessage();
		}
	};

	const updateBook = async (book) => {
		try {
			const response = await fetch(`${apiUrl}/edit/${book.id}`, {
				method: 'PUT',
				headers: {
					'content-type': 'application/json',
					'x-auth-token': '12345'
				},
				body: JSON.stringify(book)
			});
			const responseJson = await response.json();
			showResponseMessage(responseJson.message);
			getBook();
		} catch (error) {
			showResponseMessage();
		}
	};

	const removeBook = async (bookId) => {
		try {
			const response = await fetch(`${apiUrl}/delete/${bookId}`, {
				method: 'DELETE',
				headers: {
					'x-auth-token': '12345'
				}
			});
			const responseJson = await response.json();
			showResponseMessage(responseJson.message);
			getBook();
		} catch (error) {
			showResponseMessage();
		}
	};

	/* jangan ubah kode di bawah ini ya! */

	const renderAllBooks = (books) => {
		const listBookElement = document.querySelector('#listBook');
		listBookElement.innerHTML = '';

		books.forEach((book) => {
			listBookElement.innerHTML += `
				<div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
				<div class="card">
					<div class="card-body">
					<h5>(${book.id}) ${book.title}</h5>
					<p>${book.author}</p>
					<button type="button" class="btn btn-danger button-delete" id="${book.id}">Hapus</button>
					</div>
				</div>
				</div>
			`;
		});

		const buttons = document.querySelectorAll('.button-delete');
		buttons.forEach((button) => {
			button.addEventListener('click', (event) => {
				const bookId = event.target.id;

				removeBook(bookId);
			});
		});
	};

	const showResponseMessage = (message = 'Check your internet connection') => {
		alert(message);
	};

	document.addEventListener('DOMContentLoaded', () => {
		const inputBookId = document.querySelector('#inputBookId');
		const inputBookTitle = document.querySelector('#inputBookTitle');
		const inputBookAuthor = document.querySelector('#inputBookAuthor');
		const buttonSave = document.querySelector('#buttonSave');
		const buttonUpdate = document.querySelector('#buttonUpdate');

		buttonSave.addEventListener('click', function () {
			const book = {
				id: Number.parseInt(inputBookId.value),
				title: inputBookTitle.value,
				author: inputBookAuthor.value
			};

			insertBook(book);
		});

		buttonUpdate.addEventListener('click', function () {
			const book = {
				id: Number.parseInt(inputBookId.value),
				title: inputBookTitle.value,
				author: inputBookAuthor.value
			};

			updateBook(book);
		});
		getBook();
	});
}

export default main;
