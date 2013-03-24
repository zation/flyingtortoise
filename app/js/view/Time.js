(function() {
  var recorderTimer;
  var isActive = false;

  app.view.Time = Backbone.View.extend({
    className: 'time',
    events: {
      'click .stop': 'stopTask'
    },
    stopTask: function() {
      isActive = false;
      this.model.stop(moment());
      this.model.save();
      this.$el.removeClass('task-order-' + this.model.get('order'));
      this.$el.hide();
      app.Event.trigger(app.Event.TaskStop);
    },
    startTask: function(model) {
      isActive = true;
      this.$el.html(this.template(model.attributes));
      this.$el.addClass('task-order-' + model.get('order'));
      this.$el.show();
      var startTime = moment();
      var $timeElement = this.$el.find('time');
      var second = 0;
      var minute = 0;
      var secondDisplay;
      var minuteDisplay;
      recorderTimer = setInterval(displayTime, 1000);
      this.model = model;
      this.model.start(startTime);

      function displayTime() {
        second++;
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
        $timeElement.text(minuteDisplay + ':' + secondDisplay);
      }
    },
    onRotate: function(orientation) {
      if (Math.abs(orientation) === 90 && this.$el.is(':visible')) {
        this.$el.hide();
      }
      else if (orientation === 0 && isActive) {
        this.$el.show();
      }
    },
    initialize: function() {
      this.template = _.template($('#time').html());
      this.$el.hide();
      app.Event.on(app.Event.TaskStart, this.startTask, this);
      app.Event.on(app.Event.Rotate, this.onRotate, this);
    }
  });
})();
