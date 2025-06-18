let outPut = document.getElementById('calculation-output');
let ctx = document.getElementById('entitlement-chart').getContext('2d');
let entitlementChart = null;


function calculator() {
    let income1 = parseInt(document.getElementById('income-1').value);
    let income2 = parseInt(document.getElementById('income-2').value);
    const entitlement = 1763.72
    const allowance = 411
    let totalIncome =  income1 + income2;
    let total = totalIncome - allowance;
    let deduction = 0.55 * total;

    let payment = Math.round(entitlement - deduction) 


    if(payment > entitlement) {
        payment = entitlement
    }
    if(payment < 0) {
        payment = 0
    }


    outPut.innerHTML = `With a total household income of £${totalIncome} you are entitled to £${payment} `


 // Calculate lost amount
    let lostAmount = entitlement - payment;
    if(lostAmount < 0) lostAmount = 0;

    // Destroy existing chart instance if it exists (to update)
    if (entitlementChart) {
      entitlementChart.destroy();
    }

    // Create new chart showing percentage received vs lost
   entitlementChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Received', 'Lost'],
        datasets: [{
            label: '£ Amount',
            data: [payment, lostAmount],
            backgroundColor: [
                'rgba(75, 192, 192, 0.7)',   // Received - green
                'rgba(255, 99, 132, 0.7)'    // Lost - red
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        indexAxis: 'y',  // horizontal bar
        scales: {
            x: {
                beginAtZero: true,
                max: entitlement
            }
        },
        animation: {
            duration: 800,          // smooth 0.8 second animation
            easing: 'easeOutQuart'  // smooth easing
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let val = context.parsed.x;
                        let percent = ((val / entitlement) * 100).toFixed(1);
                        return `${val} (£) — ${percent}% of entitlement`;
                    }
                }
            }
        }
    }
});

}
