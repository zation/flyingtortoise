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
        date: '2013-04-05',
        time: 20
      },
      {
        date: '2013-04-06',
        time: 50
      },
      {
        date: '2013-04-07',
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
        date: '2013-04-06',
        time: 50
      },
      {
        date: '2013-04-07',
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
        date: '2013-04-03',
        time: 20
      },
      {
        date: '2013-04-04',
        time: 50
      },
      {
        date: '2013-04-05',
        time: 99
      },
      {
        date: '2013-04-06',
        time: 127
      },
      {
        date: '2013-04-07',
        time: 400
      }
    ]
  });
}

function clearData() {
  localStorage.clear();
}