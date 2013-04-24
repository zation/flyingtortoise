describe('Chart View', function() {
  var chartView;
  beforeEach(function() {
    chartView = new app.view.Chart({
      model: new app.model.Task({
        records: [{
          date: '2008-04-12',
          time: 10
        }]
      })
    });
  });

  it('should append bar chart when record is one', function() {
    var actualData;
    spyOn(chartView._chart, 'Bar').andCallFake(function(data) {
      actualData = data;
    });

    chartView.render();
    expect(chartView.$el).toContain('.chart-content');
    expect(actualData.labels[0]).toBe('04-12');
    expect(actualData.datasets[0].data[0]).toBe(10);
  });

  it('should append line chart when records are more than one', function() {
    chartView = new app.view.Chart({
      model: new app.model.Task({
        records: [{
          date: '2008-04-12',
          time: 10
        }, {
          date: '2008-04-13',
          time: 20
        }]
      })
    });
    var actualData;
    spyOn(chartView._chart, 'Line').andCallFake(function(data) {
      actualData = data;
    });

    chartView.render();
    expect(chartView.$el).toContain('.chart-content');
    expect(actualData.labels[0]).toBe('04-12');
    expect(actualData.datasets[0].data[0]).toBe(10);
    expect(actualData.labels[1]).toBe('04-13');
    expect(actualData.datasets[0].data[1]).toBe(20);
  });

  it('should remove element when rotate to vertical', function() {
    appendSetFixtures(chartView.$el);
    app.Event.trigger(app.Event.Rotate, 0);

    expect(chartView.$el).not.toExist();
  });

  it('should not remove element when rotate to to horizontal', function() {
    appendSetFixtures(chartView.$el);
    app.Event.trigger(app.Event.Rotate, 90);

    expect(chartView.$el).toExist();
  });
});