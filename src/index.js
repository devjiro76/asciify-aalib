import aalib from 'aalib.js'

export default class {
  constructor(src, option) {
    this.imgSrc = src
    this.imgWidth = 0
    this.imgHeight = 0
    this.asciiWidth = 0
    this.asciiHeight = 0

    this.asciified = null

    if (option) {
      this.option = option
      this.asciified = this.init(this.option)
    }
  }

  init(option) {
    return new Promise((resolve, reject) => {
      this.loadImage()
        .then(tempImage => {
          this.imgWidth = tempImage.naturalWidth
          this.imgHeight = tempImage.naturalHeight

          const ratio = this.getRatio(this.imgWidth, option)
          const asciiWidth = Math.round(this.imgWidth * ratio)
          const asciiHeight = Math.round(this.imgHeight / 2 * ratio)

          tempImage.remove()

          return this.createAsciiElement(asciiWidth, asciiHeight)
        })
        .then(pre => {
          console.log('inited')
          this.asciified = pre
          resolve(pre)
        })
        .catch(e => reject(e))
    })
  }

  ascii() {
    return new Promise((resolve, reject) => {
      Promise.resolve()
        .then(() => {
          return this.asciified || this.init(this.option)
        })
        .then(() => resolve(this.asciified))
    })
  }

  svg() {
    return new Promise((resolve, reject) => {
      Promise.resolve()
        .then(() => {
          return this.asciified || this.init(this.option)
        })
        .then(pre => {
          const workspace = document.createElement('div')
          workspace.classList.add('workspace')
          workspace.style.cssText = "position: absolute; height: 1px; overflow: hidden; left: -999999px; bottom: -1px"

          pre.style.cssText = 'display: inline-block'

          workspace.appendChild(pre)
          document.body.appendChild(workspace)

          this.asciiWidth = pre.clientWidth
          this.asciiHeight = pre.clientHeight

          const svg = '<svg xmlns="http://www.w3.org/2000/svg" ' +
            'width="' + this.asciiWidth + '" height="' + this.asciiHeight + '">' +
            '<foreignObject width="100%" height="100%">' +
            '<div xmlns="http://www.w3.org/1999/xhtml">' +
            pre.outerHTML +
            '</div>' +
            '</foreignObject>' +
            '</svg>'

          workspace.remove()
          
          resolve('data:image/svg+xml,' + encodeURIComponent(svg))
        })
        .catch(e => reject(e))
    })
  }

  loadImage() {
    return new Promise(resolve => {
      const tempImage = document.createElement('img')
      tempImage.src = this.imgSrc
      tempImage.onload = () => resolve(tempImage)
    })
  }

  getRatio(imageWidth, _option) {
    const option = Object.assign({
      ratio: null,
      targetWidth: 60,
    }, _option)
    let ratio = 1

    if (option.ratio) {
      ratio = option.ratio
    } else if (option.targetWidth) {
      ratio = (option.targetWidth / imageWidth).toFixed(2)
    }
    return ratio
  }

  createAsciiElement(asciiWidth, asciiHeight) {
    const tempWrapper = document.createElement('pre')

    return new Promise(resolve =>
      aalib.read.image.fromURL(this.imgSrc)
        .map(aalib.filter.contrast(1.2))
        .map(aalib.aa({
          fontSize: 12,
          width: asciiWidth,
          height: asciiHeight,
          colored: true
        }))
        .map(aalib.filter.brightness(0))
        .map(aalib.render.html({
          el: tempWrapper
        }))
        .subscribe(res => resolve(res))
    )
  }
}
