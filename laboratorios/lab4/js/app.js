const AppRender = (() => {
    const App = {
        htmlElements: {
            form: document.getElementById('form_fibonassi'),
            resp: document.getElementById('result'),
        },
        initialize() {
            App.bindEvents();
        },
        bindEvents() {
            App.htmlElements.form.addEventListener('submit', App.handlers.onFormSubmit);
        },
        handlers: {
            onFormSubmit(e) {
                e.preventDefault();
                const num = parseInt(e.target.num.value);
                const sequence = App.methods.fibonacci(num);
                const result = sequence.map((e, index) => `
                        <div class="container__result__span">
                            ${e}
                             <img src="./image/Delete icon.svg" alt="Delete" class="container__result__image" data-index="${index})">
                        </div>`).join('');
                App.render(result);

                const deleteIcons = App.htmlElements.resp.querySelectorAll('.container__result__image');
                deleteIcons.forEach(icon => {
                    icon.addEventListener('click', App.handlers.onDeleteClick);
                });
            },
            onDeleteClick(event) {
                const index = event.target.dataset.index;
                const container = event.target.closest('.container__result__span');
                container.remove();
            }
        },
        methods: {
            fibonacci(n) {
                const sequence = [];
                for (let i = 0; i < n; i++) {
                    sequence.push(App.methods.calculateFibonacci(i));
                }
                return sequence;
            },
            calculateFibonacci(n) {
                const memo = {};
                return App.methods.memoizedFibonacci(n, memo);
            },
            memoizedFibonacci(n, memo) {
                if (n <= 1) {
                    return 1;
                }
                if (memo[n]) {
                    return memo[n];
                }
                memo[n] = App.methods.memoizedFibonacci(n - 1, memo) + App.methods.memoizedFibonacci(n - 2, memo);
                return memo[n];
            }
        },
        render(result) {
            App.htmlElements.resp.innerHTML = result;
        },
    };
    App.initialize();
    return App;
})();