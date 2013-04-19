describe('Router', function() {
  var router;

  beforeEach(function() {
    spyOn(app.Manager.prototype, 'loadTemplates');
    router = new app.Router();
  });

  it('should trigger task start when enter time router', function() {
    var expectedId = '1';
    var taskModel = new app.model.Task({
      id: expectedId
    });
    spyOn(router, 'navigate');
    app.Event.trigger(app.Event.TaskStart, taskModel);

    expect(router.navigate).toHaveBeenCalledWith('time/' + expectedId);
  });

  it('should go to root path when task stop', function() {
    spyOn(router, 'navigate');
    app.Event.trigger(app.Event.TaskStop);

    expect(router.navigate).toHaveBeenCalledWith('/');
  });
});