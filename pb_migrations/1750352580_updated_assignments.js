/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ixqk3opwma4xms9")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = "course.lecturer.id = @request.auth.id"
  collection.updateRule = "course.lecturer.id = @request.auth.id"
  collection.deleteRule = "course.lecturer.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ixqk3opwma4xms9")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
