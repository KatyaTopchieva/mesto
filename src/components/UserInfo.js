export class UserInfo {
    constructor({ profileNameSelector, profileJobSelector, profileAvatarSelector }) {
        this._nameElement = document.querySelector(profileNameSelector);
        this._jobElement = document.querySelector(profileJobSelector);
        this._avatarElement = document.querySelector(profileAvatarSelector);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent,
            avatar: this._avatarElement.src
        }
    }

    setUserInfo(title, job, avatar) {
        this._nameElement.textContent = title;
        this._jobElement.textContent = job;
        if(avatar) this._avatarElement.src = avatar;
    }
}