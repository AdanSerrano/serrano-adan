((Authentication) => {
    const App = {
        htmlElements: {
            form: document.getElementById('form'),
            inputname: document.getElementById('inputname'),
            inputPassword: document.getElementById('inputPassword'),
            inputConfirmPassword: document.getElementById('inputConfirmPassword'),
        },
        init() {
            App.methods.validationData();
            App.setDefaultValues();
            App.bindEvents();
            App.navbar();
            App.logout();
            App.informationUser();

        },
        bindEvents() {
            App.htmlElements.form.addEventListener('submit', App.handlers.onSubmit);
        },
        navbar() {
            Authentication.template.navbar();
        },
        logout() {
            Authentication.logoutSession();
        },
        informationUser() {
            Authentication.getUser();
        },
        setDefaultValues() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                App.htmlElements.inputname.value = currentUser[0];
            }
        },
        handlers: {
            onSubmit(event) {
                event.preventDefault();
                const { username, password, confirmpassword } = event.target.elements;
                if (password.value !== confirmpassword.value) {
                    alert('Las contraseñas no coinciden');
                    return;
                }
                Authentication.configurationUser(username.value, password.value);
                App.methods.clearForm();
            },
        },
        methods: {
            clearForm() {
                App.htmlElements.inputPassword.value = '';
                App.htmlElements.inputConfirmPassword.value = '';
            },
            validationData() {
                Authentication.isNotAuthenticated();
            },
        }
    };

    App.init();
})(window.Authentication);
