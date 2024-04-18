import './css/styles.css';
import WordManager from './js/WordManager.js';

// Create an instance of the class
let wordManager = new WordManager();

// Get references to DOM elements
let inputText = document.getElementById('inputText');
let output = document.getElementById('output');

// Handler for the "Add" button click
document.getElementById('addButton').addEventListener('click', () => {
  let inputValue = inputText.value.trim();
  if (inputValue !== '') {
    wordManager.addWord(inputValue);
    wordManager.displayWords(output);
    inputText.value = ''; // Очищаем поле ввода
  }
});

// Handlers for the sorting buttons click
document.getElementById('sortByNameButton').addEventListener('click', () => {
  wordManager.sortByName();
  wordManager.displayWords(output);
});

document.getElementById('sortByValueButton').addEventListener('click', () => {
  wordManager.sortByValue();
  wordManager.displayWords(output);
});

document.getElementById('deleteButton').addEventListener('click', () => {
  wordManager.deleteSelectedText();
});

// Add an event handler to the parent element
output.addEventListener('click', function (event) {
  // Check  li element
  if (event.target.nodeName === 'LI') {
    event.target.classList.toggle('selected');
  }
});

//Modal
(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    xmlOutput: document.querySelector('#xmlOutput'), // new element for displaying XML
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    if (refs.modal.classList.contains('is-hidden')) {
      // If the modal window is hidden, generate XML and add it to the modal window
      let xml = wordManager.generateXML();
      refs.xmlOutput.textContent = xml;
    } else {
      // If the modal window is open, clear the XML
      refs.xmlOutput.textContent = '';
    }
    refs.modal.classList.toggle('is-hidden');
  }
})();
