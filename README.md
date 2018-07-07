# asciify-aalib

## install
```
yarn add https://github.com/devjiro76/asciify-aalib
(or)
npm install --save https://github.com/devjiro76/asciify-aalib
```

## usage
```
const myAsc = new asciiConverter(url, option)

// <pre> element which includes <span> tags
myAsc.ascii()
  .then(res => {
    document.body.appendChild(res)
  })
  
// svg() method return "svg image tags" (start with <svg xmlns="....)
// Below example is show creating a canvas with svg
myAsc.svg()
  .then(svg => {
    const img = new Image()
    img.src = svg

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const canvasWidth = myAsc.asciiWidth * 0.75
      const canvasHeight = myAsc.asciiHeight * 0.75
      
      canvas.width = canvasWidth
      canvas.height = canvasHeight

      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight)
    }
  })
  ```
