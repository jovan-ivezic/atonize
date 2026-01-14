AmCharts.makeChart("candle-chart",
    {
        "type": "serial",
        "categoryField": "date",
        "autoMarginOffset": 30,
        "marginBottom": 30,
        "marginRight": 30,
        "marginLeft": 20,
        "marginTop": 30,
        "panEventsEnabled": false,
        "colors": [
            "#67b7dc",
            "#fdd400",
            "#84b761",
            "#cc4748",
            "#cd82ad",
            "#2f4074",
            "#448e4d",
            "#b7b83f",
            "#b9783f",
            "#b93e3d",
            "#913167"
        ],
        "fontSize": 13,
        "theme": "light",
        "categoryAxis": {
            "parseDates": true,
            "titleRotation": 2,
            "labelFrequency": 2
        },
        "chartCursor": {
            "enabled": true
        },
        "trendLines": [],
        "graphs": [
            {
                "balloonText": "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>",
                "bulletSize": 6,
                "closeField": "close",
                "fillAlphas": 0.9,
                "fillColors": "#7CAFE7",
                "highField": "high",
                "id": "g1",
                "lineColor": "#7CAFE7",
                "lowField": "low",
                "negativeFillColors": "#A5B2BD",
                "negativeLineColor": "#A5B2BD",
                "openField": "open",
                "title": "Price:",
                "type": "candlestick",
                "valueField": "close"
            }
        ],
        "guides": [
            {
                "id": "Guide-1"
            },
            {
                "id": "Guide-2"
            }
        ],
        "valueAxes": [
            {
                "id": "ValueAxis-1",
                "autoGridCount": false,
                "labelFrequency": 1
            }
        ],
        "allLabels": [],
        "balloon": {},
        "titles": [],
        "dataProvider": [
            {
                "date": "2011-08-02",
                "open": "135.26",
                "high": "135.95",
                "low": "131.50",
                "close": "131.85"
            },
            {
                "date": "2011-08-03",
                "open": "138.26",
                "high": "139.95",
                "low": "120.50",
                "close": "120.85"
            },
            {
                "date": "2011-08-05",
                "open": "132.90",
                "high": "135.27",
                "low": "128.30",
                "close": "135.25"
            },
            {
                "date": "2011-08-06",
                "open": "134.94",
                "high": "137.24",
                "low": "132.63",
                "close": "135.03"
            },
            {
                "date": "2011-08-07",
                "open": "136.76",
                "high": "136.86",
                "low": "132.00",
                "close": "134.01"
            },
            {
                "date": "2011-08-08",
                "open": "131.11",
                "high": "133.00",
                "low": "125.09",
                "close": "126.39"
            },
            {
                "date": "2011-08-09",
                "open": "123.12",
                "high": "127.75",
                "low": "120.30",
                "close": "125.00"
            },
            {
                "date": "2011-08-12",
                "open": "128.32",
                "high": "129.35",
                "low": "126.50",
                "close": "127.79"
            },
            {
                "date": "2011-08-13",
                "open": "128.29",
                "high": "128.30",
                "low": "123.71",
                "close": "124.03"
            }
        ]
    }
);

AmCharts.makeChart("bar-chart", {
    "type": "serial",
     "theme": "light",
     "autoMarginOffset": 30,
    "marginBottom": 30,
    "marginRight": 30,
    "marginLeft": 20,
    "marginTop": 30,
    "categoryField": "year",
    "rotate": true,
    "startDuration": 1,
    "panEventsEnabled": false,
    "categoryAxis": {
        "gridPosition": "start",
        "position": "left"
    },
    "trendLines": [],
    "graphs": [
        {
            "balloonText": "Income:[[value]]",
            "fillAlphas": 0.8,
            "id": "AmGraph-1",
            "lineAlpha": 0.2,
            "title": "Income",
            "type": "column",
            "valueField": "income",
            "fillColors": "#5B9BE1"

        },
        {
            "balloonText": "Expenses:[[value]]",
            "fillAlphas": 0.8,
            "id": "AmGraph-2",
            "lineAlpha": 0.2,
            "title": "Expenses",
            "type": "column",
            "valueField": "expenses",
            "fillColors": "#A5B2BD"
        }
    ],

    "guides": [],
    "valueAxes": [
        {
            "id": "ValueAxis-1",
            "position": "bottom",
            "axisAlpha": 0
        }
    ],
    "allLabels": [],
    "balloon": {},
    "titles": [],
    "dataProvider": [
    
        {
            "year": 2006,
            "income": 26.2,
            "expenses": 22.8
        },
        {
            "year": 2007,
            "income": 30.1,
            "expenses": 23.9
        },
        {
            "year": 2008,
            "income": 29.5,
            "expenses": 25.1
        },
        {
            "year": 2009,
            "income": 24.6,
            "expenses": 25
        }
    ],
    "export": {
        "enabled": true
     }
});

AmCharts.makeChart("bar-chart-float",
   {
    "type": "serial",
    "categoryField": "category",
    "rotate": true,
    "startDuration": 1,
    "autoMarginOffset": 30,
    "marginBottom": 30,
    "marginRight": 30,
    "marginLeft": 20,
    "marginTop": 30,
    "theme": "light",
    "panEventsEnabled": false,
    "categoryAxis": {
        "gridPosition": "start"
    },
    "trendLines": [],
    "graphs": [
        {
            "balloonText": "open:[[open]] close:[[close]]",
            "closeField": "close",
            "fillAlphas": 1,
            "id": "AmGraph-1",
            "openField": "open",
            "title": "graph 1",
            "type": "column",
            "fillColors": "#5B9BE1",
            "lineColor": "#7CAFE7",
            "valueField": "Not set"
        }
    ],
    "guides": [],
    "valueAxes": [
        {
            "id": "ValueAxis-1",
            "stackType": "regular",
            "title": ""
        }
    ],
    "allLabels": [],
    "balloon": {},
    "titles": [],
    "dataProvider": [
        {
            "category": "John",
            "open": 2,
            "close": 5
        },
        {
            "category": "Joe",
            "open": 4,
            "close": 7
        },
        {
            "category": "Susan",
            "open": 3,
            "close": 6
        },
        {
            "category": "Alex",
            "open": 1,
            "close": 7
        },
    ]
}
);