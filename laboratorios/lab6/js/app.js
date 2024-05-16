(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn && window.location.pathname !== '/login.html') {
        window.location.href = 'login.html';
    }


    const Login = {
        htmlElement: {
            loginForm: document.getElementById('form__auth'),
            resp: document.getElementById('result')
        },
        init() {
            this.bindEvents();
        },
        bindEvents() {
            this.htmlElement.loginForm.addEventListener('submit', this.handlers.login.bind(this));
        },
        handlers: {
            login(e) {
                e.preventDefault();
                const email = e.target.email.value;
                const password = e.target.password.value;
                const name = e.target.name.value;
                // Guardar datos del usuario en el almacenamiento local
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userName', name);
                localStorage.setItem('isLoggedIn', true);
                window.location.href = 'perfil.html';
            }
        },
        render(result) {
            this.htmlElement.resp.innerHTML = result;
        }
    };

    const Profile = {
        htmlElement: {
            profileName: document.querySelector('#profileName'),
            profileEmail: document.querySelector('#profileEmail'),
            logoutBtn: document.getElementById('logoutBtn')
        },
        init() {
            this.renderProfile();
            this.bindEvents();
        },
        bindEvents() {
            this.htmlElement.logoutBtn.addEventListener('click', this.handlers.logout.bind(this));
        },
        handlers: {
            logout() {
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userName');
                localStorage.removeItem('isLoggedIn');
                window.location.href = 'login.html';
            }
        },
        renderProfile() {
            const userName = localStorage.getItem('userName');
            const userEmail = localStorage.getItem('userEmail');
            this.htmlElement.profileName.textContent = userName;
            this.htmlElement.profileEmail.textContent = userEmail;
        }
    };

    const pageExists = (pathname) => {
        const element = document.querySelector(`#${pathname.replace('/', '')}`);
        return !!element;
    };

    if (window.location.pathname.includes('perfil.html')) {
        Profile.init();
    } else if (window.location.pathname.includes('login.html')) {
        Login.init();
    } else {
        if (!pageExists(window.location.pathname)) {
            window.location.href = 'login.html';
        }
    }
})();