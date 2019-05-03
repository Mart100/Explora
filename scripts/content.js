$(() => {

  // on content double click
  $('#content').on('dblclick', (event) => {
    let fileName = event.target.children[0].innerHTML

    if(event.target.id == 'content') return
    // is file
    if(fileName.includes('.')) {
      cp.exec(`${currentDir}/${fileName}`, (err) => { if(err) console.log(err); })
    }

    // is folder
    else {
      currentDir += '/'+fileName
      viewDir(currentDir)
    }
  })

  // on content select click
  $('#content').on('click', (event) => {

    let target = event.target

    // clicked on file
    if(target.id.includes('-')) {
      if(!keys[17]) $('#content div').removeClass('selected')
      $(target).addClass('selected')
    }

    // clicked on background
    else {
    }
  })

  // on content right click
  $('#content').on('contextmenu', () => {
    let target = event.target

    // on background
    if(target.id == 'content') {
      createContextMenu(event)
      addBackgroundOptionsToCM()
    }
    
    // on file 
    else {
      let fileName = target.children[0].innerHTML
      
      createContextMenu(event)
      addFileOptionsToCM(currentDir+'/'+fileName)
    }
  })

  // back button
  $('#backbtn').on('click', () => {
    let split = currentDir.split('/')
    split.pop()
    split = split.join('/')
    currentDir = split
    if(currentDir.endsWith(':')) currentDir += '/'
    viewDir(currentDir)
  })
})