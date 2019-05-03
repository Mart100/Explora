async function readDir(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, filenames) => {
      if(err) return console.log(err)
      resolve(filenames)
    })
  })
}
