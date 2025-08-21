import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ProfileIcon extends Component {
    @service session;
    @service router;
    @tracked showProfileMenu = false;

    @action
    toggleProfileMenu() {
        this.showProfileMenu = !this.showProfileMenu;
    }

    @action 
    changeToSetting() {
        this.router.transitionTo('profile.settings'); 
    }

    @action
    closeMenu() {
        this.showProfileMenu = false;
    }

    get currentUser() {
        return this.session.currentUser;
    }

    @action
    logOut() {
        this.session.logOut();
        this.router.transitionTo('/login');
    }
}