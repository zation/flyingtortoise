app.view.Time = Backbone.View.extend({
  _isActive: false,
  _recorderTimer: null,
  className: 'time',
  events: {
    'click .stop': 'stopTask'
  },
  stopTask: function() {
    if (!this._isActive) return;
    this._isActive = false;
    this.model.stop(moment());
    this.model.save();
    this.$el.removeClass('task-order-' + this.model.get('order'));
    this.$el.hide();
    clearInterval(this._recorderTimer);
    app.Event.trigger(app.Event.TaskStop);
  },
  startTask: function(model) {
    if (this._isActive) return;
    this._isActive = true;
    this.$el.html(this.template(model.attributes));
    this.$el.addClass('task-order-' + model.get('order'));
    this.$el.show();
    var startTime = moment();
    var second = 0;
    var minute = 0;
    var secondDisplay;
    var minuteDisplay;
    var color = app.colors[model.get('order') - 1];
    var $canvas = this.$el.find('.time-circle');
    var context = $canvas[0].getContext('2d');
    var centerX = $canvas.width() / 2;
    var centerY = $canvas.height() / 2;
    var lineWidth = 10;
    var radius = $canvas.width() === 0 ? 0 : $canvas.width() / 2 - lineWidth;
    displayTime();

    this._recorderTimer = setInterval(displayTime, 1000);
    this.model = model;
    this.model.start(startTime);

    function displayTime() {
      if (second > 59) {
        minute++;
        second = 0;
      }
      secondDisplay = second.toString();
      minuteDisplay = minute.toString();
      if (second < 10) {
        secondDisplay = '0' + secondDisplay;
      }
      if (minute < 10) {
        minuteDisplay = '0' + minuteDisplay;
      }

      context.clearRect(0, 0, $canvas.width(), $canvas.height());
      context.font = '85px Arial';
      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(minuteDisplay + ':' + secondDisplay, centerX, centerY);
      $canvas.text(minuteDisplay + ':' + secondDisplay);
      context.beginPath();
      context.arc(centerX, centerY, radius, -0.5 * Math.PI, 2 * Math.PI * (second + 1) / 60 - 0.5 * Math.PI, false);
      context.lineWidth = lineWidth;
      context.strokeStyle = color;
      context.stroke();
      second++;
    }
  },
  onRotate: function(orientation) {
    if (Math.abs(orientation) === 90 && this.$el.is(':visible')) {
      this.$el.hide();
    }
    else if (orientation === 0 && this._isActive) {
      this.$el.show();
    }
  },
  initialize: function() {
    this.template = _.template($('#time').html());
    this.$el.hide();
    this.listenTo(app.Event, app.Event.TaskStart, this.startTask);
    this.listenTo(app.Event, app.Event.Rotate, this.onRotate);
    var timeView = this;
    this.listenTo(app.router, 'route:home', function() {
      timeView.stopTask();
    });
  }
});