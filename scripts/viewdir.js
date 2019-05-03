async function viewDir(dir) {
  let files = await readDir(dir)
  console.log('Viewing dir: ', dir)
  $('#content').html('')
  for(let fileName of files) {
    $('#content').append(`<div id="content-${fileName}"><span class="fileName">${fileName}</span></div>`)
  }
  $('#currentDir').html(currentDir)
}
