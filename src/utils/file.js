export function getFileMimeType(file) {
  const map = {
    'FFD8FFE0': 'jpg',
    'FFD8FFE1': 'jpg',
    'FFD8FFE8': 'jpg',
    '89504E47': 'png',
    '47494638': 'gif',
    '52494646': 'webp',
    '424D': 'bmp'
  }

  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  return new Promise((resolve, reject) => {
    reader.onload = (event) => {
      try {
          let array = new Uint8Array(event.target.result);
          array = array.slice(0, 4);
          let arr = [...array]
          let key = arr.map(item => item.toString(16).toUpperCase().padStart(2, '0')).join('')
          resolve(map[key])

      } catch (e) {
        reject(e);
      }
    };
  });
}

export const annexFileTypes = ['.m4a', '.mp3', '.mid', '.xmf', '.ogg', '.wav', '.3gp', '.mp4', '.jpg', '.gif', '.png', '.jpeg', '.bmp', '.apk', '.ppt', '.xls', '.doc', '.pdf', '.chm', '.txt']

export const downLoadBlob = (blob, fileName) => {
  const file = new Blob([blob], { type: blob.type })
  const url = URL.createObjectURL(file)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.click()
}

export const selectFile = () => {
  return new Promise((resolve, reject) => {
    let inputSingle = document.createElement('input')
    inputSingle.type = 'file'
    // inputSingle.multiple = true
    inputSingle.onchange = () => {
      resolve(inputSingle.files)
      inputSingle = null
    }
    inputSingle.click()
  })

}
