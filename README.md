# asciify-aalib
This lib is created for private purpose.
I recommend use the original libray (https://github.com/mir3z/aalib.js)

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

## option
Only 2 option  
1. ratio (original size is 1)
2. targetWidth (target width compared with original image width)

## API
1. constructor  
`new asciify-aalib(imageUrl, option)`

2. ascii()  
return pre element

3. svg()  
return svg+image tag

4. asciified  
return pre element or Promise.  
If asiified process already happened, this will return exist <pre> tag, or it returns promise.
so uou can use this API like below.

```
Promise.resolve()
  .then(() => {
    return myAsc.asciified
  })
  .then((pre) => resolve(this.asciified))
```
5. asciiWidth / asciiHeight  
This returns asciified pre element's size.
