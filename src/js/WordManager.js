export default class WordManager {
  constructor() {
    this.wordsArray = [];
  }

  addWord(inputText) {
    let wordParts = inputText.split('=');
    if (wordParts.length !== 2) {
      alert(
        'Invalid input format. Please enter data in the format <name>=<value>'
      );
      return;
    }
    let name = wordParts[0].trim();
    let value = wordParts[1].trim();
    if (!name.match(/^[a-z0-9]*$/i) || !value.match(/^[a-z0-9]*$/i)) {
      alert('Name and value can only contain alphanumeric characters');
      return;
    }
    let wordObj = { name: name, value: value };
    this.wordsArray.push(wordObj);
  }

  sortByName() {
    this.wordsArray.sort((a, b) => a.name.localeCompare(b.name));
  }

  sortByValue() {
    this.wordsArray.sort((a, b) => a.value.localeCompare(b.value));
  }

  deleteSelectedText() {
    let selectedItems = document.querySelectorAll('#output li.selected');
    selectedItems.forEach(item => {
      let wordParts = item.innerText.split('=');
      let wordObj = { name: wordParts[0], value: wordParts[1] };
      let index = this.wordsArray.findIndex(
        word => word.name === wordObj.name && word.value === wordObj.value
      );
      if (index !== -1) {
        this.wordsArray.splice(index, 1);
      }
      item.remove();
    });
  }

  displayWords(outputElement) {
    // Clear outputElement
    outputElement.innerHTML = '';

    this.wordsArray.map(word => {
      // Create new element li
      let li = document.createElement('li');
      li.className = 'list-item';
      li.textContent = `${word.name}=${word.value}`;

      // Add li in outputElement(list ul)
      outputElement.insertAdjacentElement('beforeend', li);
    });
  }

  generateXML() {
    let xml = '<words>\n';
    this.wordsArray.forEach(word => {
      xml += `  <word>\n    <name>${word.name}</name>\n    <value>${word.value}</value>\n  </word>\n`;
    });
    xml += '</words>';
    return xml;
  }
}
