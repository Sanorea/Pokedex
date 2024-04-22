function renderChart(i) {
let labels = [];
let datas = [];

for (let p = 0; p < pokemon[i]['stats'].length; p++) {
    let label = pokemon[i]['stats'][p]['stat']['name'];
    labels.push(label);
    console.log(labels);
}

for (let b = 0; b < pokemon[i]['stats'].length; b++) {
    let data = pokemon[i]['stats'][b]['base_stat'];
    datas.push(data);
    console.log(data);
}


const ctx = document.getElementById('myChart');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{


            label: 'Fähigkeiten',
            data: datas,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
            borderWidth: 1
        }]
    },
    options: {
        indexAxis: 'y',
        plugins: {
            legend: {
              display: false,
            },
          },
        scales: {
            x: {
                beginAtZero: true,
                max: 200,
                grid: {
                  display: false,
                  drawBorder: false,
                },
              },
        }
    }
});    
    
}
