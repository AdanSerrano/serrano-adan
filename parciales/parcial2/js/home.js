((Authentication) => {
    const App = {
        htmlElements: {
            inputname: document.getElementById('inputname'),
        },
        init() {
            App.bindEvents();
            App.initialValiations();
            App.setDefaultValues()
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
        initialValiations() {
            Authentication.isNotAuthenticated();
        },
        bindEvents() {
        },
        handlers: {
        },
        methods: {},
        templates: {},
        render() { },
    };
    App.init();
})(window.Authentication);