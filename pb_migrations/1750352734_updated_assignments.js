/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ixqk3opwma4xms9")

  collection.listRule = "course.lecturer.id = @request.auth.id || course.enrollments.student.id ?= @request.auth.id"
  collection.viewRule = "course.lecturer.id = @request.auth.id || course.enrollments.student.id ?= @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ixqk3opwma4xms9")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
})
