describe('Router', function() {
  it('should trigger TaskStart when enter time router', function() {
    var router = new app.Router();
    spyOn(app.Event, 'trigger');
    var model = router.manager.mainCollection.create();
    router.time(model.get('id'));

    expect(app.Event.trigger).toHaveBeenCalledWith(app.Event.TaskStart, model);
  });
});