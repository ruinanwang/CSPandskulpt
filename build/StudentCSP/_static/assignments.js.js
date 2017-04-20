// Generated by CoffeeScript 1.12.4
(function() {
  var hashWasGrades;

  if (window.location.hash === '#grades') {
    hashWasGrades = true;
  }

  $(function() {
    var loadCharts, options;
    options = {
      theme: 'markdown default',
      mode: {
        name: "markdown"
      },
      lineWrapping: true,
      indentUnit: 2,
      tabSize: 2,
      tabMode: "shift"
    };
    if ($('#assignment_description').length) {
      CodeMirror.fromTextArea($('#assignment_description')[0], options);
    }
    if ($('#assignment_brief_summary').length) {
      CodeMirror.fromTextArea($('#assignment_brief_summary')[0], options);
    }
    loadCharts = function(childrenOf) {
      return $('.chart.grade-histogram', childrenOf).each(function() {
        var $chart, offering;
        $chart = $(this);
        if ($chart.attr('data-highcharts-chart')) {
          return;
        }
        offering = $chart.data('assignment-offering');
        return $.getJSON("/assignment_offerings/" + offering + ".json", function(data, status, xhr) {
          var $summary, allScores, bucket, categories, histogramData, i, j, len, ref, repo, score, stats;
          categories = (function() {
            var j, results;
            results = [];
            for (i = j = 0; j <= 8; i = ++j) {
              results.push((i * 10) + "\u2013" + (i * 10 + 9) + "%");
            }
            return results;
          })();
          categories.push('90\u2013100%');
          histogramData = (function() {
            var j, results;
            results = [];
            for (i = j = 0; j <= 9; i = ++j) {
              results.push(0);
            }
            return results;
          })();
          allScores = [];
          ref = data.assignment_repositories;
          for (j = 0, len = ref.length; j < len; j++) {
            repo = ref[j];
            score = parseFloat(repo.score);
            allScores.push(score);
            bucket = Math.min(score / 10, 9);
            histogramData[bucket]++;
          }
          stats = new pythy.Statistics(allScores);
          $chart.highcharts({
            chart: {
              type: 'column'
            },
            title: {
              text: 'Score Distribution'
            },
            xAxis: {
              categories: categories,
              labels: {
                align: 'right',
                rotation: -60
              }
            },
            yAxis: {
              title: {
                text: '# of Students'
              },
              tickInterval: 1
            },
            legend: {
              enabled: false
            },
            plotOptions: {
              column: {
                pointPadding: 0,
                borderWidth: 1,
                groupPadding: 0,
                shadow: false
              }
            },
            series: [
              {
                name: '# of Students',
                data: histogramData
              }
            ]
          });
          $summary = $chart.next('table.grade-summary');
          $('.started', $summary).text(allScores.length);
          $('.highest', $summary).text(pythy.percentage(stats.maximum()));
          $('.lowest', $summary).text(pythy.percentage(stats.minimum()));
          $('.mean', $summary).text(pythy.percentage(stats.mean()));
          return $('.median', $summary).text(pythy.percentage(stats.median()));
        });
      });
    };
    $('a[href="#grades"]').on('shown', function(e) {
      return loadCharts('#grades');
    });
    if (hashWasGrades) {
      return loadCharts('#grades');
    }
  });

}).call(this);
