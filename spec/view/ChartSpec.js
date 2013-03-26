describe('Chart View', function() {
  var chartView;
  beforeEach(function() {
    chartView = new app.view.Chart({
      model: new app.model.Task()
    });
  });

  it('should append chart content', function() {
    expect(chartView.$el).toContain('.chart-content');
  });

  it('should remove element when rotate to vertical', function() {
    app.Event.trigger(app.Event.Rotate, 0);

    expect(chartView.$el).not.toExist();
  });
});