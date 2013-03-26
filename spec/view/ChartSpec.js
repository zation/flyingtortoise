describe('Chart View', function() {
  it('should append chart content', function() {
    var chartView = new app.view.Chart({
      model: new app.model.Task()
    });

    expect(chartView.$el).toContain('.chart-content');
  });
});