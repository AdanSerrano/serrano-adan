((Authentication) => {
    const App = {
        htmlElements: {
            logoutButton: document.getElementById("logout"),
        },
        init() {
            App.bindEvents();
            App.initialValiations();
        },
        initialValiations() {
            Authentication.isNotAuthenticated();
        },
        bindEvents() {
            App.htmlElements.logoutButton.addEventListener(
                "click",
                App.handlers.handleLogout,
            );
        },
        handlers: {
            handleLogout() {
                Authentication.logoutSession();
            },
        },
        methods: {},
        templates: {},
        render() { },
    };
    App.init();
})(window.Authentication);