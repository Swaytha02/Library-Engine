import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { books as initialBooks } from '../data/books';

export default class BookStoreService extends Service {
    @tracked books = [];

    constructor() {
        super(...arguments);
        const savedBooks = localStorage.getItem('books');
        this.books = savedBooks ? JSON.parse(savedBooks) : [...initialBooks];
    }

    addBook(newBook) {
        this.books = [...this.books, newBook];
        this.saveBooks();
    }


    get availableBooks() {
        return this.books.filter(book => book.issuedCount < book.count);
    }

    get issuedBooks() {
        return this.books.filter(book => book.issuedCount > 0);
    }
    
    getBookById(id) {
        return this.books.find(book => book.id === id);
    }

    requestBook(bookId, studentId) {
        let updated = false;
        this.books = this.books.map(book => {
            if (book.id === bookId && book.issuedCount < book.count) {
                updated = true;
                return {
                    ...book,
                    issuedCount: book.issuedCount + 1
                };
            }
            return book;
        });
        return updated;
    }

    returnBook(bookId) {
        this.books = this.books.map(book => {
        if (book.id === bookId && book.issuedCount > 0) {
            return {
            ...book,
            issuedCount: book.issuedCount - 1
            };
        }
        return book;
        });
    }

    updateBook(updatedBook) {
        this.books = this.books.map(book => 
            book.id === updatedBook.id ? updatedBook : book
        );
    }

    getTotalCount(title) {
        const book = this.books.find(b => b.title === title);
        return book ? book.count : 0;
    }

    saveBooks() {
        localStorage.setItem('books', JSON.stringify(this.books));
    }

    assignBook(bookId, studentId) {
        const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        this.books = this.books.map(book => {
            if(book.id === bookId) {
                const issuedInfo = book.issuedInfo || [];
                if(!issuedInfo.some(entry => entry.studentId === studentId)) {
                    const newIssuedInfo = [...issuedInfo, { studentId, dueDate }];
                    return {
                        ...book,
                        issuedCount: book.issuedCount + 1,
                        issuedInfo: newIssuedInfo
                    };
                }
            }
            return book;
        });
        this.saveBooks();
        alert(`Book assigned to Student ID: ${studentId}`);
    }
}
