(() => {
    const Authentication = {
        register(name, email, password) {
            const hashedPassword = Authentication.methods.hashCode(password);
            const data = { name, email, password: hashedPassword };
            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.find(user => user.email === data.email)) {
                alert('Usuario ya registrado');
            } else {
                users.push(data);
                localStorage.setItem('users', JSON.stringify(users));
                window.location.href = 'login.html';
            }
        },

        login(email, password) {
            const hashedPassword = Authentication.methods.hashCode(password);
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === email && user.password === hashedPassword);

            if (user) {
                localStorage.setItem('authentication', 'true');
                localStorage.setItem('currentUser', JSON.stringify([user.name, user.email]));
                window.location.href = 'home.html';
            } else {
                alert('Usuario o contraseña incorrectos');
            }

        },

        configurationUser(username, password) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) {
                alert('Usuario no encontrado');
                return;
            }
            const email = currentUser[1];
            const hashedPassword = Authentication.methods.hashCode(password);

            const userIndex = users.findIndex(user => user.email === email);
            if (userIndex !== -1) {
                users[userIndex].name = username;
                if (password) {
                    users[userIndex].password = hashedPassword;
                }
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify([username, email]));
                alert('Configuración actualizada');
                // window.location.href = 'profile.html';
            } else {
                alert('Usuario no encontrado');
            }
        },

        getCurrentUserEmail() {
            return localStorage.getItem('currentUserEmail');
        },

        logoutSession() {
            const logout = document.getElementById('logout')
            logout.addEventListener('click', () => {
                localStorage.removeItem('authentication');
                localStorage.removeItem('currentUser');
                window.location.href = 'login.html';
            });
        },

        getUser() {
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                name.innerText = currentUser[0];
                email.innerText = currentUser[1];
            }
        },

        isAuthenticated() {
            if (localStorage.getItem('authentication')) {
                window.location.href = 'home.html';
            }
        },

        isNotAuthenticated() {
            if (!localStorage.getItem("authentication")) {
                window.location.href = "login.html";
            }
        },

        methods: {
            hashCode(str) {
                let hash = 0;
                for (let i = 0, len = str.length; i < len; i++) {
                    let chr = str.charCodeAt(i);
                    hash = (hash << 5) - hash + chr;
                    hash |= 0;
                }
                return hash;
            }
        },
        template: {
            navbar() {
                const navbar = document.getElementById('navbarContainer')
                navbar.innerHTML = `
                <nav class="navbar__container">
                    <ul class="navbar">
                        <div>
                            <a href="./home.html">
                                <img style="width: 100; height: 50px;" src="./image/App icon.avif" class="navbar__img" />
                            </a>
                        </div>
                        <div class="container_icons">
                            <li class="li">
                                <a href="./configuration.html"><img src="./image/Icono ajustes.svg" class="container__icons_img" /></a>
                            </li>
                            <li class="li dropdown" style="cursor: pointer;">
                                <div id="profileIcon"><img src="./image/Icono perfil.svg" class="container__icons_img" /></div>
                                <div id="profileDropdown" class="dropdown-content">
                                    <div class="container_dropdown">
                                        <h1 class="dropdown_items" id="name"></h1>
                                        <h1 class="dropdown_items" id="email"></h1>
                                    </div>
                                </div>
                            </li>
                            <li class="li" style="cursor: pointer;">
                                <div id="logout"><img src="./image/Logout icon.svg" class="container__icons_img" /></div>
                            </li>
                        </div>
                    </ul>
                </nav>
                `;
            }
        }

    };
    window.Authentication = Authentication;
})();
