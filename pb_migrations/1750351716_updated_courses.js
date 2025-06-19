/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z1kp5e736hlz8fz")

  collection.listRule = "@request.auth.id != \"\""
  collection.viewRule = "@request.auth.id != \"\""
  collection.createRule = "@request.auth.role = \"lecturer\" || @request.auth.role = \"staff\""
  collection.updateRule = "@request.auth.id = lecturer.id || @request.auth.role = \"staff\""
  collection.deleteRule = "@request.auth.role = \"staff\" || @request.auth.role = \"admin\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z1kp5e736hlz8fz")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
