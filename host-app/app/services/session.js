import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SessionService extends Service {
    @service('router') router;

    @tracked currentUser = null;

    constructor() {
        super(...arguments);

        const cookieUser = this.#getCookie('user');
        if(cookieUser) {
            try{
                this.currentUser = JSON.parse(decodeURIComponent(cookieUser));
            }
            catch(e) {
                console.error('Failed to parse cookie:', e);
            }
        }
    }

    login(user) {
        this.currentUser = user;

        const userData = {
            id: user.id,
            name: user.name,
            role: user.role,
            username: user.username
        };

        const userString = JSON.stringify(userData);
        document.cookie = `user=${encodeURIComponent(userString)};path=/;max-age=86400`;
        localStorage.setItem('loggedInUser', true);
    }

    logOut() {
        this.currentUser = null;
        document.cookie = `user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        localStorage.removeItem('loggedInUser');
    }

    #getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if(parts.length === 2) return parts.pop().split(';').shift();
    }
}
