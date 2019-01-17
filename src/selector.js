/**
 * @param {String} selector 
 * @returns {HTMLElement}
 */
const $$ = (selector) => document.querySelector(selector);
/**
 * @param {String} selector 
 * @returns {HTMLElement[]}
 */
const $ = (selector) => document.querySelectorAll(selector);

module.exports = { $$, $ };