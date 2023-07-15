/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/agregarImagen.js":
/*!*********************************!*\
  !*** ./src/js/agregarImagen.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\r\n\r\n// const token = document.querySelector('meta[name=\"csrf-token\"]').getAttribute('content');\r\nconst url = document.querySelector('#imagen').getAttribute('action');\r\n\r\nconst formulario = document.querySelector('#imagen');\r\nconst btnPublicar = document.querySelector('#publicar');\r\n\r\n\r\n    btnPublicar.addEventListener('click', function(e) {\r\n        e.preventDefault();\r\n\r\n        const formData = new FormData(formulario);\r\n        // get the file from a <input type=\"file\"> element\r\n        const fileInput = document.querySelector('input[type=\"file\"]'); \r\n        const file = fileInput.files[0]; \r\n        // console.log(file);\r\n        formData.append('imagen',file,file.name);\r\n        const data=formData.get('imagen');\r\n        console.log(data);\r\n\r\n        // append the file directly to a FormData\r\n\r\n        fetch(url, {\r\n        method: 'POST',\r\n        body: data\r\n        })\r\n        .then((res) => console.log(res))\r\n        .catch((err) => (\"Error occured\", err));\r\n\r\n\r\n    });\r\n\r\n\n\n//# sourceURL=webpack://bienesraices/./src/js/agregarImagen.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/agregarImagen.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;