((Authentication) => {
    const App = {
        htmlElements: {
            form: document.getElementById('form'),
            inputMonto: document.getElementById('inputMonto'),
            inputDescripcion: document.getElementById('inputDescripcion'),
            inputFecha: document.getElementById('inputFecha'),
            inputTipo: document.getElementById('inputTipo'),
            dataTable: document.getElementById('dataTable'),
        },
        init() {
            App.bindEvents();
            App.navbar();
            App.logout();
            App.informationUser();
            App.initialValiations();
            App.renderTable();
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
        initialValiations() {
            Authentication.isNotAuthenticated();
        },
        handlers: {
            onSubmit(e) {
                e.preventDefault();
                const { monto, tipo, fecha, descripcion } = e.target.elements;
                // if (!monto.value || !descripcion.value || !fecha.value || tipo.value === '0') {
                //     alert('Please fill in all fields');
                //     return false;
                // }
                Authentication.registerTransaction(monto.value, tipo.value, fecha.value, descripcion.value);
            }
        },
        methods: {
            resetForm() {
                App.htmlElements.inputMonto.value = '';
                App.htmlElements.inputDescripcion.value = '';
                App.htmlElements.inputFecha.value = '';
                App.htmlElements.inputTipo.value = '';
            }
        },
        templates: {},
        renderTable() {
            const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
            const tableBody = document.createElement('tbody');

            transactions.forEach(transaction => {
                const row = document.createElement('tr');

                for (const key in transaction) {
                    if (Object.hasOwnProperty.call(transaction, key)) {
                        const cell = document.createElement('td');
                        cell.textContent = transaction[key];

                        if (key === 'monto' || key === 'tipo' || key === 'fecha' || key === 'descripcion') {
                            cell.classList.add('align-middle');
                            cell.style.textIndent = '5px';
                            if (key === 'tipo') {
                                cell.textContent = transaction[key] === '1' ? 'Ingreso' : 'Egreso';
                                cell.classList.add('py-4', 'text-center', 'font-medium');
                                cell.classList.add(transaction[key] === '1' ? 'text-green-500' : 'text-red-500');
                            }
                            if (key === 'fecha') {
                                cell.classList.add('text-center');
                                const date = new Date(transaction[key]);
                                cell.textContent = date.toLocaleDateString();
                            }
                            if (key === 'descripcion') {
                                cell.classList.add('text-right', 'pr-4');
                            }
                        }

                        row.appendChild(cell);
                    }
                }

                row.classList.add('border-b', 'transition-colors', 'hover-bg-muted-50', 'data-state-selected-bg-muted');
                row.setAttribute('data-state', 'selected');

                tableBody.appendChild(row);
            });

            App.htmlElements.dataTable.appendChild(tableBody);
        },
    };
    App.init();
})(window.Authentication);
