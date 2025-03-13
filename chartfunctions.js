//Function for displaying Data from DB in Chart
var barChart;
function buildSQL(){
    console.log('Success');    
    var cYear = document.getElementById('selectYear').value;
    var cMonth = document.getElementById('selectMonth').value;
    var cDay = document.getElementById('selectDay').value;
    var cCategory = document.getElementById('selectCategory').value;
    var cArt = document.getElementById('selectArt').value;
    var cType = document.getElementById('selectType').value;
    var cLight = document.getElementById('selectLight').value;
    var cCondition = document.getElementById('selectCondition').value;
    var cPedestrian = document.getElementById('selectPedestrian').value;
    var cTruck = document.getElementById('selectTruck').value;
    var cBike = document.getElementById('selectBike').value;
    var cMotorcycle = document.getElementById('selectMotorcycle').value;
    var cCar = document.getElementById('selectCar').value;
    var cElse = document.getElementById('selectElse').value;
    //console.log(cYear, cMonth, cDay, cCategory, cArt, cType, cLight+cCondition, cPedestrian, cTruck, cBike, cMotorcycle, cCar,cElse);
    var sql = 'SELECT B.Bezeichnung AS Bundesland, COUNT(U.ID) AS AnzahlUnfaelle FROM bundesland B LEFT JOIN unfall U ON B.ID = U.ULAND ';
    sql = sql + cYear + cMonth + cDay + cCategory + cArt + cType + cLight + cCondition + cPedestrian + cTruck + cBike + cMotorcycle + cCar + cElse;
    sql = sql + ' GROUP BY B.ID LIMIT 16;';
    console.log(sql);
    fetchData(sql);
}

var fetchChartDataBTN = document.getElementById('fetchChartData').addEventListener('click', function(){
    buildSQL();
})

function fetchData(sqlQueryString){
    var xhr = new XMLHttpRequest();
    var url = 'fetchDataDynamic.php';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function(){
        if(xhr.status === 200){            
            var responseData = JSON.parse(xhr.responseText);
            createChart(responseData);
        }else{
            console.error('Fehler bei Anfrage: ', error);
        }
    };
    xhr.send('sqlQuery=' + encodeURIComponent(sqlQueryString));
}
function createChart(data){
    console.log(data);
    var ctx = document.getElementById('barChart').getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    var labels = data.map(entry => entry.Bundesland);
    var values = data.map(entry => entry.AnzahlUnfaelle);    

    var chartData = {
        labels: labels,
        datasets: [{
            label: 'Anzahl der Unfaelle',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.4)', 
            borderColor: 'rgba(75, 192, 192, 1)', 
            borderWidth: 1
        }]
    };
    var chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    color: 'white',
                }
            }
        },
        maintainAspectRatio: true,
        responsive: true
    };
    if(barChart) barChart.destroy();
    barChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions
    });
    
}
