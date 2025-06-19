/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z1kp5e736hlz8fz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g5po4mgr",
    "name": "enrollments",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "xsc0rdjglg67xma",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z1kp5e736hlz8fz")

  // remove
  collection.schema.removeField("g5po4mgr")

  return dao.saveCollection(collection)
})
