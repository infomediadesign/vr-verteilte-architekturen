'use strict'

const db = require('../db')

module.exports = class Post {
  constructor(title = '', text = '', id) {
    id
      ? this.id = id
      : this.id = Math.random().toString(36).substr(2, 9)         // TODO: Choose a better UUID generator

    this.title = title
    this.text = text
  }

  // Example of the findById function using a classical callback
  //
  // static findById(id, callback) {
  //   let sql = 'SELECT id, title, text FROM post WHERE id = ?'
  //   let params = [id]

  //   db.get(sql, params, (err, row) => {
  //     if (err) throw err  // NOTE: better specify an err argument in the callback

  //     row
  //       ? callback(new Post(row.title, row.text, row.id))
  //       : callback(null)
  //   })
  // }

  // Example of the findById function using a promise
  static async findById(id) {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT id, title, text FROM post WHERE id = ?'
      let params = [id]

      db.get(sql, params, (err, row) => {
        if (err) reject(err)
        if (!row) resolve(null)   // NOTE: An empty result set is a valid response of the 
                                  // database to the request, therefore resolve. The Express Route checks 
                                  // for zero and returns the HTTP status 404
        resolve(new Post(row.title, row.text, row.id))
      })
    })
  }

  async insert() {
    return new Promise((resolve, reject) => {
      let sql = 'INSERT INTO post (id, title, text) VALUES (?,?,?)'
      let params = [this.id, this.title, this.text]

      db.run(sql, params, (err, result) => {
        if (err) reject(err)
        resolve(this)
      })
    })
  }

  // Instead of the methods update and insert you could also implement a method (e.g. named 'save'), 
  // which creates a corresponding entry in the database if needed and alternatively updates the 
  // corresponding values, if it already exists.
  update() {
    return new Promise((resolve, reject) => {
      reject({ name: 'NotYetImplementedError', message: 'Too lazy to implement...' })
    })
  }

  // NOTE: An object could also delete itself. I.e. it removes its assigned entries from 
  // the database and sets itself to null. 
  static deleteById(id) {
    return new Promise((resolve, reject) => {
      reject({ name: 'NotYetImplementedError', message: 'Too lazy to implement...' })
    })
  }
}
