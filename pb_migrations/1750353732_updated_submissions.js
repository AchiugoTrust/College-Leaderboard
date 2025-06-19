/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0oyz6kj9w8hibhm")

  collection.updateRule = "student.id = @request.auth.id || assignment.course.lecturer.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0oyz6kj9w8hibhm")

  collection.updateRule = "assignment.course.lecturer.id = @request.auth.id"

  return dao.saveCollection(collection)
})
