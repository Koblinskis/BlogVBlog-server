var category = db.getCollection('data-dump').aggregate([{
    $group: {
        _id: "$category",
        x: {
            $sum: 1
        }
    }
}, {
    $sort: {
        x: -1
    }
}, {
    $limit: 10
}])

var c = []

for(var i = 0; i < category._batch.length; i++) {
    c.push(category._batch[i]._id)
}


for(var i = 0; i < c.length; i++) {
    var blogs = db.getCollection('data-dump').find({category: c[i]}).limit(30).forEach(function(docs){ 
    db.getCollection('blogs').insert(docs) })
}