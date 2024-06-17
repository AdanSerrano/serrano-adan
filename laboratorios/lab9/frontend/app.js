const VotingApp = (() => {
    const App = {
        htmlElements: {
            form: document.getElementById('form'),
            result: document.getElementById('result'),
        },
        initialize() {
            App.bindEvents();
        },
        bindEvents() {
            App.htmlElements.form.addEventListener('submit', App.handlers.onFormSubmit);
        },
        handlers: {
            async onFormSubmit(e) {
                e.preventDefault();
                const number = e.target.elements.number.value;
                try {
                    const response = await axios.get(`http://localhost:4000/api/fibonacci/${number}`);
                    const fibonacciString = response.data.SERIE_FIBONACCI;

                    if (fibonacciString) {
                        App.htmlElements.result.innerHTML = `<p class="font-bold text-lg flex items-center justify-center p-16 text-justify">${fibonacciString}</p>`;
                    } else {
                        App.htmlElements.result.innerHTML = `<p style="color: red;">Error: Unexpected response format</p>`;
                    }
                } catch (error) {
                    console.error('Error fetching the Fibonacci series', error);

                    if (error.response && error.response.data && error.response.data.error) {
                        App.htmlElements.result.innerHTML = `<p style="color: red;">Error: ${error.response.data.error}</p>`;
                    } else {
                        App.htmlElements.result.innerHTML = `<p style="color: red;">Error: Unable to fetch data from server</p>`;
                    }
                }
            }
        },
    };

    App.initialize();
    return App;
})();
