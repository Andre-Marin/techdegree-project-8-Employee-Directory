const peopleUrl = 'https://randomuser.me/api/?results=12&nat=us';
const employeeDirectory = document.getElementById('people');

function fetchData(url) {
  return fetch(url)
    .then(response => response.json());
}

fetchData(peopleUrl)
  .then(data => getEmployee(data));


//Generate HTML
function getEmployee(data) {
  const employees = data.results;
  const employeeInfo = employees.map(employee => {
    const birthDay = employee.dob.date.slice(5,7);
    const birthMonth = employee.dob.date.slice(8,10);
    const birthYear = employee.dob.date.slice(0,4);
    let html = `
    <div class = employeeCard>
      <button class ='exitBtn' type=button>&times;</button>
      <img src='${employee.picture.large}'>
      <div class = basicInfo>
        <h3>${employee.name.first} ${employee.name.last}</h3>
        <p>${employee.email}</p>
        <p>${employee.location.city}</p>
      </div>
      <div class = moreInfo hidden>
        <p>${employee.cell.replace('-', ' ')}</p>
        <p>${employee.location.street.number}
        ${employee.location.street.name}. ${employee.location.city}
        ${employee.location.state}
        ${employee.location.postcode}</p>
        <p>Birthday: ${birthMonth}/${birthDay}/${birthYear}</p>
      </div>
    </div>
    `;
    employeeDirectory.insertAdjacentHTML('beforeend', html);
    return html;
  });
}



employeeDirectory.addEventListener('click', e => {
  let click = e.target;
  const moreInfo = click.lastElementChild;
  const button = document.querySelector('.exitBtn');
  if (click.className !== 'employeeCard') {
    click = click.parentNode;
    if (click.className === 'basicInfo') {
      click = click.parentNode;
    }
  }

  if (click.className === 'employeeCard') {
    overlayOn();
  }

  function overlayOn() {
    const overlay = document.getElementById('overlay');
    let employeeOverlay = click.cloneNode(true);
    overlay.style.display = 'flex';
    employeeOverlay.lastElementChild.style.display = 'block';
    employeeOverlay.firstElementChild.style.display = 'block';
    overlay.appendChild(employeeOverlay);
  }
});

const modalView = document.getElementById('overlay');
modalView.addEventListener('click', e => {
  if (e.target.type === 'button') {
    modalView.removeChild(modalView.firstElementChild);
    overlay.style.display = 'none';
  }

});
