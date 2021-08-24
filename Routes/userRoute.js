const express = require('express')
const router = express.Router()
const mongo = require('mongodb')

router.get('/', (req, res) => {
  console.log(mongo)
  console.log('dddddddddddddd')
})

module.exports = router
