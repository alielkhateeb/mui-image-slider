
# MUI-Image-Slider - Image Slider for Material UI

[![npm version](https://badge.fury.io/js/mui-image-slider.svg)](https://badge.fury.io/js/mui-image-slider)
[![NPM Downloads](https://img.shields.io/npm/dt/mui-image-slider.svg?style=flat)](https://npmcharts.com/compare/mui-image-slider?minimal=true)
[![Coverage Status](https://coveralls.io/repos/github/alielkhateeb/mui-image-slider/badge.svg?branch=master)](https://coveralls.io/github/alielkhateeb/mui-image-slider?branch=master)
[![Build Status](https://travis-ci.org/alielkhateeb/mui-image-slider.svg?branch=master)](https://travis-ci.org/alielkhateeb/mui-image-slider)

MUI-Image-Slider is an image slider component built on [Material-UI](https://www.material-ui.com).

## Demo

You can access the live demo [here](https://alielkhateeb.github.io/mui-image-slider/demo/)

## Install

`npm install mui-image-slider --save`

## Usage

```js
import MuiImageSlider from 'mui-image-slider';

const images = [
    'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
    'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
    'https://homepages.cae.wisc.edu/~ece533/images/baboon.png',
    'https://homepages.cae.wisc.edu/~ece533/images/barbara.png',
];

<MuiImageSlider images={images}/>
```
## API

|Name|Type|Default|Description
|:--:|:-----|:-----|:-----|
|**`images`**|Array||List of images' url string.
|**`classes`**|Object||Override or extend the styles applied to the component. See [CSS API](#classes-object) below for more details.
|**`customArrow`**|Function||Render a custom arrow component.
|**`onArrowClick`**|Function||Callback to an arrow click. `function(currentImage: Number) {console.log(currentImage}` where `currentImage` is the index of the currently visible image.
|**`arrows`**|Boolean|`true`|Show/Hide navigation arrows.
|**`autoPlay`**|Boolean|`false`|Autoplay the images like a slideshow.
|**`arrowsColor`**|String|`dimgrey`|Color of the arrows.
|**`arrowsBgColor`**|String|`transparent`|Colors of the arrows wrapper (Background).
|**`arrowsBgHoverColor`**|String|`#B9B9B95E`|Colors of the wrapper on hover.
|**`alwaysShowArrows`**|Boolean|false|Arrows will always be visible.
|**`fitToImageHeight`**|Boolean|false|Component height is adaptive to the current image's height.

## Classes Object

|Rule Name|Description
|:--:|:-----|
|**`root`**|Styles applied to the `root` element.
|**`wrapper`**|Styles applied to the `wrapper` element.
|**`arrowWrapper`**|Styles applied to the `arrowWrapper` element.

## Contributing
Thanks for taking an interest in the library and the github community!

The following commands should get you started:

```sh
npm install
npm start
```
open http://localhost:3001/ in browser

## Testing
To run the tests locally just run `jest` in the root folder
```sh
jest
```

## License
The files included in this repository are licensed under the ISC license.
