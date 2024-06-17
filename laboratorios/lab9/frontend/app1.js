// frontend/app.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const number = document.getElementById('number').value;

        try {
            const response = await axios.get(`http://localhost:4000/api/fibonacci/${number}`);
            const fibonacciString = response.data.SERIE_FIBONACCI;

            if (fibonacciString) {
                resultDiv.innerHTML = `<p>Fibonacci series: ${fibonacciString}</p>`;
            } else {
                resultDiv.innerHTML = `<p style="color: red;">Error: Unexpected response format</p>`;
            }
        } catch (error) {
            console.error('Error fetching the Fibonacci series', error);

            if (error.response && error.response.data && error.response.data.error) {
                resultDiv.innerHTML = `<p style="color: red;">Error: ${error.response.data.error}</p>`;
            } else {
                resultDiv.innerHTML = `<p style="color: red;">Error: Unable to fetch data from server</p>`;
            }
        }
    });
});
