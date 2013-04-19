describe('Router', function() {
  var router;

  beforeEach(function() {
    spyOn(app.Manager.prototype, 'loadTemplates');
    router = new app.Router();
  });

  it('should trigger task start when enter time router', function() {
    spyOn(app.Event, 'trigger');
    var model = router.manager.mainCollection.create();
    router.time(model.get('id'));

    expect(app.Event.trigger).toHaveBeenCalledWith(app.Event.TaskStart, model);
  });

  it('should go to root path when task stop', function() {
    app.Event.trigger(app.Event.TaskStop);

    expect(router.goTo).toHaveBeenCalledWith('#');
  });

  it('should trigger task stop when enter home router', function() {
    spyOn(app.Event, 'trigger');
    router.home();

    expect(app.Event.trigger).toHaveBeenCalledWith(app.Event.TaskStop);
  });
});