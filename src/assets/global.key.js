let bindToGlobal = (obj, key = '_const') => {
  if (typeof window[key] === 'undefined') {
    window[key] = {}
  }

  for (let i in obj) {
    window[key][i] = obj[i]
  }
}

let WRITE_NODE = 1
bindToGlobal(WRITE_NODE)
