const form = document.getElementById('transaction-form');
const dateInput = document.getElementById('date');
const revenuInput = document.getElementById('revenu');
const depenseInput = document.getElementById('depense');
const soldeAffiche = document.getElementById('solde');

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// ...existing code...

const ctx = document.getElementById('budgetGraphique').getContext("2d");
let budgetGraphique = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // sera mis à jour
        datasets: [
            {
                label: 'Solde cumulé',
                data: [], // sera mis à jour
                borderColor: 'green',
                backgroundColor: 'rgba(0, 255, 55, 0.2)',
                fill: true,
                tension: 0.2
            },
            {
                label: 'Dépenses cumulées',
                data: [], // sera mis à jour
                borderColor: 'red',
                backgroundColor: 'rgba(237, 6, 6, 0.2)',
                fill: false,
                tension: 0.2
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top' }
        },
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// ============================
// Mise à jour du graphique et solde
// ============================
function updateChart() {
    let solde = 0;
    let depenseCumulee = 0;
    let labels = [];
    let dataSolde = [];
    let dataDepense = [];

    transactions.forEach(t => {
        if (t.type === "revenu") solde += t.montant;
        if (t.type === "depense") {
            solde -= t.montant;
            depenseCumulee += t.montant;
        }
        labels.push(t.date);
        dataSolde.push(solde);
        dataDepense.push(depenseCumulee);
    });

    budgetGraphique.data.labels = labels;
    budgetGraphique.data.datasets[0].data = dataSolde;
    budgetGraphique.data.datasets[1].data = dataDepense;
    budgetGraphique.update();

    soldeAffiche.textContent = solde;
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// ...existing code...
// ============================
// Ajout d'une transaction
// ============================
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const date = dateInput.value;
    const revenu = parseInt(revenuInput.value) || 0;
    const depense = parseInt(depenseInput.value) || 0;

    if (!date || (revenu === 0 && depense === 0)) return;

    if (revenu > 0) {
        transactions.push({ date, montant: revenu, type: "revenu" });
    }
    if (depense > 0) {
        transactions.push({ date, montant: depense, type: "depense" });
    }

    updateChart();
    form.reset();
});

// Mise à jour au chargement
updateChart();
