/** @typedef {{
 * id: string | number,
 * title: string,
 * author: string,
 * year: number,
 * isComplete: boolean
 * } Book } */

const BOOKS_LS_KEY = 'book-collections';

const booksContainer = document.getElementById('content');
const bookTemplate = booksContainer.children[0];
bookTemplate.style.visibility = 'unset';

const storageSupported = typeof localStorage != 'undefined';
// show unsupport storage banner if storage is not supported by browser
if (!storageSupported) {
	const storageBanner = document.getElementById('storage-unsupported-banner');
	storageBanner.style.display = 'flex';
}

/** @type {Book[]} */
const sampleBooks = [
	{
		id: generateId(),
		title: 'Atomic Habits',
		author: 'James Clear',
		year: 2019,
		isComplete: false,
	},
	{
		id: generateId(),
		title: 'The Subtle Art of Not Giving a F*ck',
		author: 'Mark Manson',
		year: 2016,
		isComplete: true,
	},
	{
		id: generateId(),
		title: 'Sirah Nabawiyah',
		author: 'Syaikh Shafiyyurrahman Al-Mubarakfuri',
		year: 1997,
		isComplete: true,
	},
];

/** @type {Book[]} */
let books = [];

/** @type {string} */
let filterText = null;

/** @type { 'all' | 'uncompleted' | 'completed' } */
let filterType = 'all';

/**
 * Setup filter elements functionality
 */
function initFilterActions() {
	/** @type {HTMLInputElement} */
	const filterTextInput = document.getElementsByName('list-filter-text')[0];
	filterTextInput.oninput = debounce((e) => {
		filterText = e.target.value;
		renderBooks();
	}, 400);

	/** @type {HTMLInputElement[]} */
	const filterOptions = document.getElementsByName('list-filter-item');
	for (const op of filterOptions) {
		op.checked = op.value === filterType;
		op.onchange = (e) => {
			if (e.target.checked) {
				filterType = e.target.value;
				renderBooks();
			}
		};
	}
}

/**
 * Add/prepare new book
 */
function addBook() {
	// declare new Book object
	/** @type {Book} */
	const newBook = {
		id: generateId(),
		title: '',
		author: '',
		year: null,
		isComplete: false,
	};
	// add new Book object to the first of books array
	books.unshift(newBook);
	// re-render books elements
	renderBooks();
	// focus to newly added book element input
	booksContainer.children[0].getElementsByTagName('input')[0].focus();
}

/**
 * Mark book as completed
 * @param {Book} book
 */
function finishBook(book) {
	book.isComplete = !book.isComplete;
	renderBooks();
	persistBooks();
}

/**
 * Delete selected Book
 * @param {Book} book
 */
function deleteBook(book) {
	const performDelete = () => {
		books = books.filter((p) => p.id !== book.id);
		renderBooks();
		persistBooks();
	};
	if (book.title || book.author || book.year) {
		// confirm deletion before delete if title, author & year are not empty
		showConfirmDialog({
			title: 'Hapus buku',
			message:
				'Anda yakin ingin menghapus buku berjudul "' +
				book.title +
				'" dengan penulis "' +
				book.author +
				'"?',
			onPositive: performDelete,
		});
	} else {
		// delete directly
		performDelete();
	}
}

/**
 * Render book items as element based on filter stats
 */
function renderBooks() {
	booksContainer.innerHTML = '';
	if (!books.length) {
		booksContainer.innerHTML = '<p>Belum ada buku!</p>';
		return;
	}
	let skipedElCount = 0;
	for (const book of books) {
		if (
			// if filter text not falsy and contains text in book title or -
			(filterText &&
				!book.title
					.toUpperCase()
					.includes(filterText.toUpperCase().trim())) ||
			// filter type is 'completed' and book is not complete or -
			(filterType === 'completed' && !book.isComplete) ||
			// filter type is 'uncompleted' but book is complete -
			(filterType === 'uncompleted' && book.isComplete)
		) {
			// skip or do not render it.
			++skipedElCount;
			continue;
		}
		const el = createBookItemElement(book);
		booksContainer.append(el);
	}
	if (books.length === skipedElCount) {
		booksContainer.innerHTML =
			'<p>Tidak ada data buku yang cocok dengan filter!</p>';
	}
}

/**
 * Create book item element based on book item template
 * @param {Book} book
 * @returns {HTMLElement}
 */
function createBookItemElement(book) {
	/** @type {HTMLElement} */
	const container = bookTemplate.cloneNode(true);
	container.id = 'item-' + book.id;
	container.style.borderStyle = book.isComplete ? 'dashed' : 'solid';

	/** @type {HTMLInputElement[]} */
	const inputs = container.getElementsByTagName('input');
	for (const input of inputs) {
		const inputPropName = input.name.replace('book-', '');
		input.value = book[inputPropName];
		input.oninput = debounce((e) => {
			book[inputPropName] = e.target.value;
			persistBooks();
		});
	}

	/** @type {HTMLButtonElement[]} */
	const buttons = container.getElementsByTagName('button');
	for (const button of buttons) {
		if (button.classList.contains('done')) {
			button.innerText = book.isComplete
				? 'task_alt'
				: 'radio_button_unchecked';
			button.title = book.isComplete
				? 'Batalkan status selesai baca'
				: 'Tandai buku ini selesai dibaca';
			button.onclick = () => finishBook(book);
		} else if (button.classList.contains('delete')) {
			button.onclick = () => deleteBook(book);
		}
	}
	return container;
}

/**
 * Show custom confim dialog
 * @param {{
 *  title: string
 *  message: string
 *  onPositive: Function
 * }} options
 */
function showConfirmDialog(options) {
	/** @type {HTMLDivElement} */
	const dialog = document.getElementById('confirm-dialog-overlay');
	dialog.style.display = 'flex';
	/** @type {HTMLHeadingElement} */
	const h2 = dialog.getElementsByTagName('h2')[0];
	h2.innerText = options.title;
	/** @type {HTMLParagraphElement} */
	const p = dialog.getElementsByTagName('p')[0];
	p.innerText = options.message;
	/** @type {HTMLButtonElement[]} */
	const buttons = dialog.getElementsByTagName('button');
	// clear everithings on dismiss
	const dismiss = () => {
		dialog.style.display = 'none';
		h2.innerText = '';
		p.innerText = '';
		for (const button of buttons) {
			button.onclick = null;
		}
	};
	for (const button of buttons) {
		button.onclick =
			button.name === 'confirm' ? options.onPositive : dismiss;
	}
	dialog.onclick = dismiss;
}

/**
 * Persist Book items to LocalStorage
 */
function persistBooks() {
	if (!storageSupported) return;
	const lsValue = JSON.stringify(books || []);
	localStorage.setItem(BOOKS_LS_KEY, lsValue);
}

/**
 * Load book items from LocalStorage
 * @returns {Book[]}
 */
function populateBooks() {
	// load sample books data if Storage API unsupported
	if (!storageSupported) books = [...sampleBooks];
	// retrive books from local storage
	const lsValue = localStorage.getItem(BOOKS_LS_KEY);
	if (!lsValue) {
		books = [...sampleBooks];
		// persist sample value to local storage
		persistBooks();
		return;
	}
	// load from local storage
	books = JSON.parse(lsValue);
}

/**
 * Generate random string as id
 * @returns {string}
 */
function generateId() {
	// taken from: https://stackoverflow.com/a/1349426/8299065
	return Math.random().toString(36).substring(2, 10);
}

/**
 * Doubounce function to makes sure that code is only triggered once per user input
 * taken from: https://www.freecodecamp.org/news/javascript-debounce-example/
 *
 * @param {Function} func
 * @param {number} timeout
 * @returns Function
 */
function debounce(func, timeout = 800) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}

initFilterActions();
populateBooks();
renderBooks();
