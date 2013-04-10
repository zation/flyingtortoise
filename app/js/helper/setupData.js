function setupData() {
  localStorage.clear();
  var collection = new app.collection.Tasks();
  collection.fetch();
  collection.create({
    name: 'test1',
    order: 1,
    total: 100,
    records: [
      {
        date: '2013-4-5',
        time: 20
      },
      {
        date: '2013-4-6',
        time: 50
      },
      {
        date: '2013-4-7',
        time: 100
      }
    ]
  });
  collection.create({
    name: 'test2',
    order: 2,
    total: 200,
    records: [
      {
        date: '2013-4-6',
        time: 50
      },
      {
        date: '2013-4-7',
        time: 200
      }
    ]
  });
  collection.create({
    name: 'test3',
    order: 3,
    total: 400,
    records: [
      {
        date: '2013-4-3',
        time: 20
      },
      {
        date: '2013-4-4',
        time: 50
      },
      {
        date: '2013-4-5',
        time: 99
      },
      {
        date: '2013-4-6',
        time: 127
      },
      {
        date: '2013-4-7',
        time: 400
      }
    ]
  });
}
