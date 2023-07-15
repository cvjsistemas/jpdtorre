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

/***/ "./src/js/skills.js":
/*!**************************!*\
  !*** ./src/js/skills.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function(seleccionadas = []){\r\n\r\n    const listado = document.querySelector('.lista-conocimientos');\r\n    const habilidades = document.querySelector('.habilidades').textContent.split(',');\r\n\r\n    if(habilidades.length){\r\n        habilidades.forEach(habilidad =>{\r\n            seleccionadas.push(habilidad);\r\n        })\r\n    }\r\n\r\n    const skills = ['HTML5', 'CSS3', 'CSSGrid', 'Flexbox', 'JavaScript', 'jQuery', 'Node', 'Angular', 'VueJS', 'ReactJS', 'React Hooks', 'Redux', 'Apollo', 'GraphQL', 'TypeScript', 'PHP', 'Laravel', 'Symfony', 'Python', 'Django', 'ORM', 'Sequelize', 'Mongoose', 'SQL', 'MVC', 'SASS', 'WordPress'];\r\n\r\n    let html = '';\r\n    skills.forEach(skill => {\r\n        html += `\r\n            <li ${seleccionadas.includes(skill) ? ' class=\"activo\"' : ''}>${skill}</li>\r\n        `;\r\n    });\r\n\r\n    // console.log(html);\r\n    // return;\r\n\r\n\r\n    return listado.innerHTML=html;\r\n\r\n\r\n\r\n})()\r\n\r\n\r\n\n\n//# sourceURL=webpack://devjobs/./src/js/skills.js?");

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
/******/ 	__webpack_modules__["./src/js/skills.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;