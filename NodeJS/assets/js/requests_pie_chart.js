$(function () {
    $('#container_requests').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 1,//null,
            plotShadow: false
        },
        title: {
            text: 'Total:211 requests'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y}',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Requests number',
            data: [
                ['HTML',   22],
                ['CSS',       6],
                {
                    name: 'JS',
                    y: 43,
                    sliced: true,
                    selected: true
                },
                ['IMAGE',    104],
                ['FONT',     1],
                ['Others',   18]
            ]
        }]
    });
    $('#container_bytes').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 1,//null,
            plotShadow: false
        },
        title: {
            text: 'Total:213892 bytes'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y}',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'bytes',
            data: [
                ['HTML',   10446],
                ['CSS',      47406],
                {
                    name: 'JS',
                    y: 141539,
                    sliced: true,
                    selected: true
                },
                ['IMAGE',    40872],
                ['FONT',     1],
                ['Others',   98541]
            ]
        }]
    });
});

