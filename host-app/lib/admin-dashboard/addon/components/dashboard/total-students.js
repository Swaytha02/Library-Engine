import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DashboardTotalStudent extends Component {
    @service studentStore;

    @tracked selectedStudent = null;
    @tracked editStudent = null;
    @tracked isEditing = false;
    @tracked issuedBooks = [];
    @tracked requests = [];
    @tracked returnRequests = [];
    @tracked booksSummary = { total: 0, issued: 0, available: 0, books: [] };

    constructor() {
        super(...arguments);
        this.loadRequests();
        this.updateBooksSummary();
    }

    loadRequests() {
        const stored = localStorage.getItem('requests');
        this.requests = stored ? JSON.parse(stored) : [];

        const returnStored = localStorage.getItem('returns');
        this.returnRequests = returnStored ? JSON.parse(returnStored) : [];
    }

    get allStudents() {
        return this.studentStore.students || [];
    }

    @action
    selectStudent(student) {
        this.selectedStudent = student;
        this.editStudent = {...student};

        this.requests = this.requests.map((r) => {
            if(r.studentId === student.id && r.status === 'pending') {
                return { ...r, status: 'seen'}
            }
            return r;
        });

        this.getIssuedBooks(student.id);
        this.updateStorage();
    }

    @action
    hasPendingRequest(studentId) {
        return this.requests.some((r) => r.studentId === studentId && (r.status === 'pending' || r.status === 'seen'));
    }

    @action
    hasReturnRequest(studentId) {
        return this.returnRequests.some((r) => r.studentId === studentId);
    }

    @action
    getStudentRequest(studentId) {
        return this.requests.find((r) => r.studentId === studentId && (r.status === 'pending' || r.status === 'seen'));
    }

    @action
    updateStorage() {
        localStorage.setItem('requests', JSON.stringify(this.requests));
    }

    @action
    approveRequest(request) {

        request.status = 'approved';
        this.requests = this.requests.filter(r => r !== request);
        this.updateStorage();

        const books = JSON.parse(localStorage.getItem('books')) || [];
        const updatedBooks = books.map(book => {
            if (book.id === request.bookId) {
                const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                // const issuedInfo = book.issuedInfo || [];
                // issuedInfo.push({
                //     studentId: request.studentId,
                //     dueDate
                // });
                return {
                    ...book,
                    issuedCount: (book.issuedCount || 0) + 1,
                    issuedInfo: [
                        ...(book.issuedInfo || []),
                        {studentId: request.studentId, dueDate}
                    ]
                };
            }
            return book;
        });

        this.issuedBooks = this.getIssuedBooks(this.selectedStudent.id);
        localStorage.setItem('books', JSON.stringify(updatedBooks));
        if(this.studentStore.updateBooks) {
            this.studentStore.updateBooks(updatedBooks);
        }
        this.updateBooksSummary();
        this.getIssuedBooks(this.selectedStudent.id);
        this.booksSummary = { ...this.booksSummary };
        alert(`Book approved for ${this.selectedStudent?.name}`);
    }

    @action
    denyRequest(request) {
        this.requests = this.requests.filter(r => r !== request);
        this.updateStorage();

        const books = JSON.parse(localStorage.getItem('books')) || [];
        const updatedBooks = books.map(book => {
            if (book.id === request.bookId) {
                return {
                    ...book,
                    isRequested: false,
                    requestedBy: null
                };
            }
            return book;
        });

        localStorage.setItem('books', JSON.stringify(updatedBooks));
        alert(`Request denied for ${this.selectedStudent?.name}`);
    }

    @action
    getIssuedBooks(studentId) {
        const books = JSON.parse(localStorage.getItem('books')) || [];
        this.issuedBooks = books.filter(book =>
            book.issuedInfo?.some(info => info.studentId === studentId)
        );
    }

    updateBooksSummary() {
        const books = JSON.parse(localStorage.getItem('books')) || [];

        const total = books.reduce((acc, book) => book.count + acc, 0);
        const issued = books.reduce((acc,book) => book.issuedCount + acc,0);
        const available =  total - issued;

        this.booksSummary = { total, issued, available, books }
    }

    @action
    approveReturn(request) {
        const books = JSON.parse(localStorage.getItem('books')) || [];

        const updatedBooks = books.map(book => {
            if(book.id === request.bookId) {
                const issuedInfo = (book.issuedInfo || []).filter(
                    info => info.studentId !== request.studentId
                );
                return {
                    ...book,
                    issuedCount: Math.max((book.issuedCount || 1) - 1, 0),
                    issuedInfo,
                    isRequested: false,
                    requestedBy: null
                };
            }
            return book;
        });

        if(this.studentStore.updateBooks) {
            this.studentStore.updateBooks(updatedBooks);
        }
        this.updateBooksSummary();
        this.getIssuedBooks(this.selectedStudent.id);
        this.booksSummary = { ...this.booksSummary };
        this.returnRequests = this.returnRequests.filter(r => r != request);
        localStorage.setItem('returns', JSON.stringify(this.returnRequests));

        alert(`Book "${request.bookTitle}" returned by ${this.selectedStudent?.name}`);
    }

    @action
    denyReturn(request) {
        this.returnRequests = this.returnRequests.filter(r => r !== request);
        localStorage.setItem('returns', JSON.stringify(this.returnRequests));
    }

    @action 
    saveUpdatedName() {
        this.selectedStudent = { ...this.selectedStudent, name: this.editStudent.name};

        this.studentStore.students = this.studentStore.students.map(student => {
            if (student.id === this.selectedStudent.id) {
                return { ...student, name: this.editStudent.name };
            }
                return student;
        });

        this.studentStore.saveStudents();
        this.isEditing = false;
    }

    @action
    cancelEdit() {
        this.editStudent = {...this.selectedStudent};
        this.isEditing = false;
    }
}
