((Authentication) => {
    const App = {
        htmlElements: {
            form: document.getElementById('form')
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
            },
        },
        methods: {},
        templates: {},
        render() { },
    };
    App.init();
})(window.Authentication);
