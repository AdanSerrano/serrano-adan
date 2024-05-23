((Authentication) => {
    const App = {
        htmlElements: {
            form: document.getElementById('form')
        },
        init() {
            App.validationData();
            App.bindEvents();
        },
        validationData() {
            Authentication.isNotAuthenticated();
        },
        bindEvents() {
            App.htmlElements.form.addEventListener('submit', App.handlers.onSubmit);
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
            }
        }
    };

    App.init();
})(window.Authentication);
