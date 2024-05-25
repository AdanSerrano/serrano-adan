// login.js
((Authentication) => {
    const App = {
        htmlElements: {
            form: document.getElementById('form'),
            inputEmail: document.getElementById('inputEmail'),
            inputPassword: document.getElementById('inputPassword')
        },
        init() {
            App.bindEvents();
            App.validationData();
        },
        validationData() {
            Authentication.isAuthenticated();
        },
        bindEvents() {
            App.htmlElements.form.addEventListener('submit', App.handlers.onSubmit);
        },
        handlers: {
            onSubmit(event) {
                event.preventDefault();
                const { email, password } = event.target.elements;
                Authentication.login(email.value, password.value);
                // App.methods.clearForm();
            },
            handleLogout() {
                Authentication.logoutSession();
            },
        },
        methods: {
            clearForm() {
                App.htmlElements.inputEmail.value = '';
                App.htmlElements.inputPassword.value = '';
            }
        },
        templates: {},
        render() { },
    };
    App.init();
})(window.Authentication);
