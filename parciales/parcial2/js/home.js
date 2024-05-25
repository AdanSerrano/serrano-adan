((Authentication) => {
    const App = {
        htmlElements: {
            form: document.getElementById('form'),
            inputMonto: document.getElementById('inputMonto'),
            inputDescripcion: document.getElementById('inputDescripcion'),
            inputFecha: document.getElementById('inputFecha'),
            inputTipo: document.getElementById('inputTipo'),
            dataTable: document.getElementById('dataTable'),
            chartCanvas: document.getElementById('chartCanvas'),
        },
        init() {
            App.bindEvents();
            App.navbar();
            App.logout();
            App.informationUser();
            App.initialValiations();
            App.renderTable();
            App.renderChart();
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
                if (!monto.value || !descripcion.value || !fecha.value || tipo.value === '0') {
                    alert('Porfavor, complete todos los campos.');
                    return false;
                }
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

            if (transactions.length === 0) {
                const noDataMessage = document.getElementById('noDataMessage');

                noDataMessage.style.display = 'block';
                return;
            }

            const noDataMessage = document.getElementById('noDataMessage');
            noDataMessage.style.display = 'none';
            transactions.forEach(transaction => {
                const row = document.createElement('tr');

                for (const key in transaction) {
                    if (Object.hasOwnProperty.call(transaction, key)) {
                        const cell = document.createElement('td');
                        cell.textContent = transaction[key];


                        if (key === 'monto') {

                            cell.classList.add('align-middle', 'pr-4');
                            cell.style.textIndent = '5px';
                            if (transaction['tipo'] === '1') {
                                cell.textContent = `+$${transaction[key]}`;
                                cell.classList.add('text-green-500');
                            } else if (transaction['tipo'] === '2') {
                                cell.textContent = `-$${transaction[key]}`;
                                cell.classList.add('text-red-500');
                            }
                        } else if (key === 'tipo') {
                            // Convertir el tipo a "Ingreso" o "Egreso"
                            cell.textContent = transaction[key] === '1' ? 'Ingreso' : 'Egreso';
                            cell.classList.add('py-4', 'text-center', 'font-medium');
                        } else if (key === 'fecha') {
                            // Convertir la fecha a un formato legible
                            cell.classList.add('text-center');
                            const date = new Date(transaction[key]);
                            cell.textContent = date.toLocaleDateString();
                        } else if (key === 'descripcion') {
                            cell.classList.add('text-right', 'pr-4');
                        } else {
                            cell.classList.add('align-middle');
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
        renderChart() {
            const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
            let totalIncome = 0;
            let totalExpense = 0;

            transactions.forEach(transaction => {
                if (transaction.tipo === '1') {
                    totalIncome += parseFloat(transaction.monto);
                } else if (transaction.tipo === '2') {
                    totalExpense += parseFloat(transaction.monto);
                }
            });

            const chartCanvas = App.htmlElements.chartCanvas;
            const ctx = chartCanvas.getContext('2d');

            const canvasWidth = chartCanvas.width;
            const canvasHeight = chartCanvas.height;
            const centerX = canvasWidth / 2;
            const centerY = canvasHeight / 2;
            const radius = Math.min(canvasWidth, canvasHeight) / 2 - 10;

            const total = totalIncome + totalExpense;
            const incomeAngle = (totalIncome / total) * Math.PI * 2;
            const expenseAngle = (totalExpense / total) * Math.PI * 2;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            ctx.fillStyle = 'green';
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, 0, incomeAngle);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, incomeAngle, incomeAngle + expenseAngle);
            ctx.closePath();
            ctx.fill();
        }
    };
    App.init();
})(window.Authentication);
