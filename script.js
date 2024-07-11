const sizeInput = document.getElementById('size');
const changeSizeButton = document.getElementById('change-size');
const buttonResetGrid = document.getElementById('reset-grid');
const DEFAULT_SIZE_VALUE = 16;
const MIN_SIZE_VALUE = 1;
const MAX_SIZE_VALUE = 100;
const COLOR_DARK_BLUE = '#00008B';
const COLOR_WHITESMOKE = '#F5F5F5';
const COLOR_BLACK = '#000000'
const container = document.getElementById('container');
sizeInput.value = DEFAULT_SIZE_VALUE;
let size = sizeInput.value;
createGrid();

function changeBackgroundColor(element, hexCode)
{
  element.style.backgroundColor = hexCode;
}
const darkenButton = () => changeBackgroundColor(changeSizeButton, COLOR_DARK_BLUE);
const lightenButton = () => changeBackgroundColor(changeSizeButton, COLOR_WHITESMOKE);

function refocus()
{
  sizeInput.value = '';
  sizeInput.focus();
}

function isEmpty(stringValue)
{
  if (stringValue == '')
  {
    window.alert('Please enter something.');
    refocus();
    return true;
  }
  return false;
}

function isString(stringValue)
{
  if (Number.isInteger(parseInt(stringValue)))
  {
    return false;
  }
  window.alert('Error: Size value must be an integer.');
  refocus();
  return true;
}

function isFloat(stringValue)
{
  const afterInt = parseInt(stringValue);
  const stringLength = stringValue.length;
  const afterStringLength = afterInt.toString().length;
  if (stringLength == afterStringLength)
  {
    return false;
  }
  window.alert('Error: Size value must not have a decimal point.');
  refocus();
  return true;
}

function isOff(stringValue)
{
  const afterInt = parseInt(stringValue);
  if (afterInt > MAX_SIZE_VALUE)
  {
    window.alert(`Error: Size must not exceed max value of ${MAX_SIZE_VALUE}.`);
    refocus();
    return true;
  }
  if (afterInt < MIN_SIZE_VALUE)
  {
    window.alert(`Error: Size must not be lesser than minimum value of ${MIN_SIZE_VALUE}.`);
    refocus();
    return true;
  }
  return false;
}

function createGrid()
{
  container.innerHTML = '';
  // Create a square group each to make rows of squares
  // Symbolizing the height
  for (let i = 0; i < size; i++)
  {
    const squareGroup = document.createElement('div');
    squareGroup.classList = 'flex-row square-group no-pad no-margin';
    // Create a square and add them to the square group each time
    // Symbolizing the width
    for (let j = 0; j < size; j++)
    {
      const square = document.createElement('div');
      square.classList = 'squares white-bg no-pad no-margin';
      // Change color of a square to black when hovered
      square.addEventListener('mouseover', function (event) {
        target = event.target;
        target.style.backgroundColor = COLOR_BLACK;
      });
      squareGroup.appendChild(square);
    }
    container.appendChild(squareGroup);
  }
}

function changeSize()
{
  let currentSizeValue = sizeInput.value;
  if (isEmpty(currentSizeValue))
  {
    return;
  }
  if (isString(currentSizeValue))
  {
    return;
  }
  if (isFloat(currentSizeValue))
  {
    return;
  }
  if (isOff(currentSizeValue))
  {
    return;
  }
  size = parseInt(currentSizeValue);
  createGrid();
}
changeSizeButton.addEventListener('mousedown', darkenButton);
changeSizeButton.addEventListener('mouseup', lightenButton);
changeSizeButton.addEventListener('click', changeSize);

buttonResetGrid.addEventListener('mousedown', () => changeBackgroundColor(buttonResetGrid, COLOR_DARK_BLUE));
buttonResetGrid.addEventListener('mouseup', () => changeBackgroundColor(buttonResetGrid, COLOR_WHITESMOKE));
buttonResetGrid.addEventListener('click', createGrid);