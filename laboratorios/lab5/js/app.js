// app.js
const VotingApp = (() => {
    const App = {
        htmlElements: {
            form: document.getElementById('form_votes'),
            candidatesList: document.getElementById('candidates'),
            chartCanvas: document.getElementById('chartCanvas')
        },
        candidates: [],
        initialize() {
            App.bindEvents();
        },
        bindEvents() {
            App.htmlElements.form.addEventListener('submit', App.handlers.onFormSubmit);
            App.htmlElements.candidatesList.addEventListener('click', App.handlers.onDeleteCandidate);
            App.htmlElements.candidatesList.addEventListener('click', App.handlers.onVoteCandidate);
        },
        handlers: {
            onFormSubmit(e) {
                e.preventDefault();
                const candidateName = e.target.candidateName.value.trim();
                const candidateColor = e.target.candidateColor.value;
                if (candidateName && candidateColor) {
                    const candidate = {
                        name: candidateName,
                        color: candidateColor,
                        votes: 0
                    };
                    App.candidates.push(candidate);
                    App.renderCandidates();
                    App.renderChart();
                    e.target.reset();
                }
            },
            onDeleteCandidate(event) {
                if (event.target.classList.contains('delete__button')) {
                    const index = parseInt(event.target.dataset.index);
                    App.candidates.splice(index, 1);
                    App.renderCandidates();
                    App.renderChart();
                }
            },
            onVoteCandidate(event) {
                if (event.target.classList.contains('vote__button')) {
                    const index = parseInt(event.target.dataset.index);
                    App.candidates[index].votes++;
                    App.renderCandidates();
                    App.renderChart();
                }
            }
        },
        renderCandidates() {
            App.htmlElements.candidatesList.innerHTML = App.candidates.map((candidate, index) => `
                <div class="container__result__span">
                    <span class="candidate__name">${candidate.name}</span>
                    <span class="candidate__votes">
                        <span class="color-circle" style="background-color: ${candidate.color}"></span>
                        <p>
                            ${candidate.votes} votos
                        </p>
                    </span>
                    <img src="./image/Like.svg" alt="like" class="vote__button" data-index="${index})">
                    <img src="./image/Delete icon.svg" alt="Delete" class="delete__button" data-index="${index})">
                </div>
            `).join('');
        },
        renderChart() {
            const chartCanvas = App.htmlElements.chartCanvas;
            const ctx = chartCanvas.getContext('2d');
            const containerWidth = chartCanvas.parentElement.offsetWidth;
            const containerHeight = chartCanvas.parentElement.offsetHeight;
            const minDimension = Math.min(containerWidth, containerHeight);

            chartCanvas.width = minDimension;
            chartCanvas.height = minDimension;

            ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);

            const totalVotes = App.candidates.reduce((total, candidate) => total + candidate.votes, 0);

            const centerX = chartCanvas.width / 2;
            const centerY = chartCanvas.height / 2;
            const radius = minDimension / 3;

            let startAngle = -0.5 * Math.PI;
            App.candidates.forEach(candidate => {
                const sliceAngle = (candidate.votes / totalVotes) * (2 * Math.PI);
                ctx.fillStyle = candidate.color;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
                ctx.closePath();
                ctx.fill();
                startAngle += sliceAngle;
            });

            // Draw a tiny slice at the end to complete the circle
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, startAngle + 0.001);
            ctx.closePath();
            ctx.fill();
        }
    };

    App.initialize();
    return App;
})();
