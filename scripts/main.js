let currentDir = 'H:/'
const cp = require("child_process")
const fse = require('fs-extra')
let $ = require('jquery')
let fs = require('fs')

let keys = {}


// on html load
$(() => {

  // view dir
  viewDir(currentDir)


  $(document).on('keydown', (event) => { keys[event.keyCode] = true })
  $(document).on('keyup', (event) => { keys[event.keyCode] = false })
})

function refreshDir() {
  viewDir(currentDir)
}