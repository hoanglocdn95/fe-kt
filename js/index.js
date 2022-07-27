// const nameUser = prompt('Xin chào bạn, mình là Quang, bạn tên gì?');
// const isMale = confirm('Chào bạn ' + nameUser + '. Bạn là trai hay gái?');

const taskList = [];
const ITEM_LIMIT_PAGE = 4;
let currentPage = 1;
let indexEditingTask = null;

document.getElementById('getData').onclick = () => {
  const valueInput = document.getElementById('valueTask').value;
  taskList.push({
    value: valueInput,
    isTicked: false,
  });
  displayTask(currentPage);
  document.getElementById('valueTask').value = '';
};

// function
// function với parameter
// built-in function: alert, prompt, confirm
// input tag
// document.getElementById
// document.getElementsByClassName
// lấy dữ liệu để sử dụng in ra màn hình

const deleteTask = (index) => {
  taskList.splice(index, 1);
  displayTask(currentPage);
};

const editTask = (indexInPage, indexInList) => {
  displayTask(currentPage);
  indexEditingTask = indexInList;
  document
    .getElementById('valueTask')
    .setAttribute('placeholder', taskList[indexInList].value);
  document.querySelector(
    `#value > div:nth-child(${indexInPage + 1})`
  ).innerHTML += 'Editing...';

  document.getElementById('saveChange').style.display = 'inline-block';
  document.getElementById('getData').style.display = 'none';
  [...document.getElementsByClassName('paginationItem')].forEach(
    (item) => (item.disabled = true)
  );
};

const displayTick = (indexInPage, indexInList) => {
  document.getElementsByClassName('tick')[indexInPage].innerHTML = 'X';
  taskList[indexInList].isTicked = true;
  document.querySelectorAll('#value > div')[indexInPage].style.color = 'red';
};

const saveChange = () => {
  document.getElementById('saveChange').style.display = 'none';
  document.getElementById('getData').style.display = 'inline-block';
  [...document.getElementsByClassName('paginationItem')].forEach(
    (item) => (item.disabled = false)
  );
  const valueInput = document.getElementById('valueTask').value;
  if (valueInput) {
    taskList.splice(indexEditingTask, 1, {
      ...taskList[indexEditingTask],
      value: valueInput,
    });
  }
  displayTask(currentPage);
  document.getElementById('valueTask').value = '';
  document
    .getElementById('valueTask')
    .setAttribute('placeholder', 'please type task');
};

const displayTask = (pageIndex = 1) => {
  let listValue = '';
  const startIndex = (pageIndex - 1) * ITEM_LIMIT_PAGE;
  const endIndex = pageIndex * ITEM_LIMIT_PAGE;

  const numberOfPage = Math.ceil(taskList.length / ITEM_LIMIT_PAGE);
  let buttonList = '';

  for (let i = 0; i < numberOfPage; i++) {
    buttonList =
      buttonList + `<button class='paginationItem'>${i + 1}</button>`;
  }

  document.querySelector('#pagination').innerHTML =
    numberOfPage === 1 ? '' : buttonList;

  [...document.getElementsByClassName('paginationItem')].forEach(
    (item, index) => {
      item.onclick = () => handlePagination(index + 1, currentPage);
      if (index + 1 === currentPage) {
        item.style.backgroundColor = 'black';
        item.style.color = 'white';
      }
    }
  );

  taskList.slice(startIndex, endIndex).forEach((item) => {
    let markX = '';
    if (item.isTicked === true) {
      markX = 'X';
    }
    listValue += `<div style='color: ${
      item.isTicked ? 'red' : 'initial'
    }'><span class='tick'>${markX}</span>${
      item.value
    }<button class='editButton'>Edit</button>
    <button class='deleteButton'>Delete</button></div>`;
  });

  document.getElementById('value').innerHTML = listValue;
  [...document.getElementsByClassName('deleteButton')].forEach(
    (item, index) =>
      (item.onclick = () =>
        deleteTask((currentPage - 1) * ITEM_LIMIT_PAGE + index))
  );
  [...document.getElementsByClassName('tick')].forEach(
    (item, index) =>
      (item.onclick = () =>
        displayTick(index, (currentPage - 1) * ITEM_LIMIT_PAGE + index))
  );

  [...document.getElementsByClassName('editButton')].forEach(
    (item, index) =>
      (item.onclick = () =>
        editTask(index, (currentPage - 1) * ITEM_LIMIT_PAGE + index))
  );
};

const handlePagination = (pageNumber, previousPage) => {
  displayTask(pageNumber);
  currentPage = pageNumber;
  const currentItem = document.querySelector(
    `#pagination > button:nth-child(${pageNumber})`
  ).style;
  currentItem.backgroundColor = 'black';
  currentItem.color = 'white';

  const previousItem = document.querySelector(
    `#pagination > button:nth-child(${previousPage})`
  ).style;
  previousItem.backgroundColor = '';
  previousItem.color = '';
};

// chức năng xóa task
// xử lý list bằng data
// câu lệnh điều kiện if, toán tử 3 ngôi ternary operator
// thay đổi style bằng js
// làm phân trang và highlight trang được chọn
// Sửa task

document.getElementById('saveChange').onclick = saveChange;
