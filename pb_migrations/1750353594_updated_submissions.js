/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0oyz6kj9w8hibhm")

  collection.listRule = "student.id = @request.auth.id || assignment.course.lecturer.id = @request.auth.id"
  collection.viewRule = "student.id = @request.auth.id || assignment.course.lecturer.id = @request.auth.id"
  collection.createRule = "@request.auth.id = student.id && assignment.course.enrollments.student.id ?= @request.auth.id"
  collection.updateRule = "student.id = @request.auth.id"
  collection.deleteRule = "assignment.course.lecturer.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0oyz6kj9w8hibhm")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
