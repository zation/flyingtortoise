app.view.Chart = Backbone.View.extend({
  className: 'chart',
  render: function() {
    var labels = [];
    var dataInDataSets = [];
    _.each(this.model.get('records'), function(record) {
      labels.push(moment(record.date).format('MM-DD'));
      dataInDataSets.push(record.time);
    });
    var color = app.colors[this.model.get('order') - 1];
    var data = {
      labels: labels,
      datasets: [
        {
          fillColor: 'rgba(255,255,255,0.1)',
          strokeColor: color,
          pointColor: color,
          pointStrokeColor: '#333',
          data: dataInDataSets
        }
      ]
    };

    this._chart.Line(data, {
      pointDot: false,
      scaleOverride: true,
      scaleSteps: 5,
      scaleStepWidth: 100,
      scaleStartValue: 0
    });
  },
  onSwitch: function(model) {
    this.model = model;
    this.render();
  },
  onRotate: function(orientation) {
    if (orientation === 0) {
      this.remove();
    }
  },
  initialize: function() {
    this.template = _.template($('#chart').html());
    this.$el.html(this.template());
    this.$chartContent = this.$el.find('.chart-content');
    var context = this.$chartContent[0].getContext('2d');
    this._chart = new Chart(context);
    this.render();
    this.listenTo(app.Event, app.Event.Switch, this.onSwitch);
    this.listenTo(app.Event, app.Event.Rotate, this.onRotate);
  }
});

