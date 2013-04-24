function setupData() {
  function generateRecords(name, order, times) {
    var records = [];
    var now = moment();
    _.each(times, function(time, index) {
      records.push({
        date: now.add('days', -records.length + index).format('YYYY-MM-DD'),
        time: time
      });
    });
    return {
      name: name,
      order: order,
      total: times[times.length - 1],
      records: records
    };
  }

  localStorage.clear();
  var collection = new app.collection.Tasks();
  collection.fetch();
  collection.create(generateRecords('Painting', 1, [20, 50, 100, 300, 400]));
  collection.create(generateRecords('Guitar', 2, [50, 200, 210, 220, 230, 300]));
  collection.create(generateRecords('Writing', 3, [100, 150, 200, 250, 300]));
}

function clearData() {
  localStorage.clear();
}