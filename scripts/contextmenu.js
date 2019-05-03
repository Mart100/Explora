function createContextMenu(event) {
  $('body').append(`
  <div id="contextmenu">
    <div id="background"></div>
    <div id="menu"></div
  </div>
  `)

  $('#contextmenu #menu').css('left', event.clientX+'px')
  $('#contextmenu #menu').css('top', event.clientY+'px')

  // on click
  $('#contextmenu').off().on('click', () => { $('#contextmenu').remove() })
}

$(() => {

})

function addFileOptionsToCM(fileDir) {
  $('#contextmenu #menu').html(`
  <div id="rename">Rename</div>
  <div id="delete">Delete</div>
  `)

  // Rename
  $('#contextmenu #menu #rename').on('click', () => {
    let filePathArray = fileDir.split('/')
    let fileName = filePathArray.pop()
    let fileNameID = '#content-'+fileName.replace(/\./g, '\\.')
    let inFolder = filePathArray.join('/')+'/'
    console.log(fileName)
    $(`${fileNameID} span`).replaceWith(`<input type="text" value="${fileName}" />`)

    $(`${fileNameID} input`).off().on('keyup', (event) => {
      if(event.keyCode != 13) return
      let newFileName = $(`${fileNameID} input`).val()
      console.log(fileDir, inFolder+newFileName)
      fs.rename(fileDir, inFolder+newFileName, (err) => {
        if (err) throw err
        console.log(`Renamed ${fileDir} to ${newFileName}`)
        refreshDir()
      })
    })
  })

  // Delete
  $('#contextmenu #menu #delete').on('click', () => {
    fse.remove(fileDir, (err) => { 
      if(err) throw err
      refreshDir()
      console.log('Deleted File: ', `${fileDir}`)
    })
  })
}

function addBackgroundOptionsToCM() {
  $('#contextmenu #menu').html(`
  <div id="new_folder">New Folder</div>
  <div id="new_file">New File</div>
  <div id="refresh">Refresh</div>
  `)

  // new folder
  $('#contextmenu #menu #new_folder').on('click', () => {
    // get filename
    let notfound = true
    let i = 0
    while(notfound) {
      if(fs.existsSync(`${currentDir}/new_folder_${i}`)) {
        i++
        continue
      }
      notfound = false
    }
    fs.mkdir(`${currentDir}/new_folder_${i}`, {}, () => {
      refreshDir()
      console.log('created new folder: ', `${currentDir}/new_folder_${i}`)
    })
  })

  // new File
  $('#contextmenu #menu #new_file').on('click', () => {
    // get filename
    let notfound = true
    let i = 0
    while(notfound) {
      if(fs.existsSync(`${currentDir}/new_file_${i}.txt`)) {
        i++
        continue
      }
      notfound = false
    }
    fs.writeFile(`${currentDir}/new_folder_${i}.txt`, '', () => {
      refreshDir()
      console.log('created new folder: ', `${currentDir}/new_folder_${i}`)
    })
  })

  // refresh
  $('#contextmenu #menu #refresh').on('click', () => {
    refreshDir()
    console.log('Refreshed Dir')
  })
}