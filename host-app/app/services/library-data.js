import Service from '@ember/service';
import { books } from '../data/books';
import { users } from '../data/users';

export default class LibraryDataService extends Service {
  books = books;
  users = users;
}