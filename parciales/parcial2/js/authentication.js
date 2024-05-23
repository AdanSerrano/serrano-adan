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
            }
        },

        login(email, password) {
            const hashedPassword = Authentication.methods.hashCode(password);
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === email && user.password === hashedPassword);

            if (user) {
                localStorage.setItem('authentication', 'true');
                localStorage.setItem('currentUserEmail', email);
                window.location.href = 'home.html';
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        },

        configurationUser(username, password) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const email = Authentication.getCurrentUserEmail();
            const hashedPassword = Authentication.methods.hashCode(password);

            const userIndex = users.findIndex(user => user.email === email);
            if (userIndex !== -1) {
                users[userIndex].name = username;
                users[userIndex].password = hashedPassword;
                localStorage.setItem('users', JSON.stringify(users));
                alert('Configuración actualizada');
            } else {
                alert('Usuario no encontrado');
            }
        },

        getCurrentUserEmail() {
            return localStorage.getItem('currentUserEmail');
        },

        logoutSession() {
            localStorage.removeItem("authentication");
            localStorage.removeItem("currentUserEmail");
            window.location.href = 'login.html';
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
        }
    };
    window.Authentication = Authentication;
})();
