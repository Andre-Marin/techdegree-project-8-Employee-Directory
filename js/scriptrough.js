const peopleUrl = 'https://randomuser.me/api/?results=12&nat=us';
const employeeDirectory = document.getElementById('people');


function fetchData(url) {
  return fetch(url)
    .then(res => res.json());
}

displayUsers(peopleUrl);

function displayUsers(url) {
  fetchData(url)
    // .then(data=>console.log(data))
    .then(data=>employeeCard(data));

}




function employeeCard(data) {
  let html;
  for (let i = 0; i<data.results.length; i++) {
    const employee = data.results[i];
    const employeeImg = employee.picture.medium;
    const employeeName = employee.name.first + ' ' + employee.name.last;
    const employeeEmail = employee.email;
    const employeeLocation = employee.location.city + ', ' + employee.location.state;

    html = `
      <div class = 'card ${employee.name.first + employee.name.last}'>
        <img src="${employeeImg}">
        <div class = 'info ${employee.name.first + employee.name.last}'>
          <h3>${employeeName}</h3>
          <p>${employeeEmail}</p>
          <p>${employeeLocation}</p>
        </div>
      </div>
      `;

      document.querySelector('#people').insertAdjacentHTML('beforeend', html);
  }
}

employeeDirectory.addEventListener('click', e =>{
  const click = e.target.parentNode.classList;
  const cards = document.getElementsByClassName('card');
  console.log(click);

});



// cards.addEventListener('click', e => {
//   const click = e.target.parentNode.textContent;
//   console.log(click);
// });
// function employeeOverlay(name, data) {
//   const employee = data.results[0];
//   const employeeImg = employee.picture.medium;
//   const employeeName = employee.name.first + ' ' + employee.name.last;
//   const employeeEmail = employee.email;
//   const phone = employee.phone;
//   const fullAddress = (employee.location.street + ', ' +
//   employee.location.city + ', ' +
//   employee.location.state + ', ' +
//   employee.location.postcode);
//   const dob = employee.dob;
//
//   fetchData(``);
//
//   html = `
//     <div id='overlay'>
//       <img src='${employeeImg}'>
//       <h3>${employeeName}</h3>
//       <p>${employeeEmail}</p>
//       <p>${employee.location.city}</p>
//       <p>${phone}</p>
//       <p>${fullAddress}</p>
//       <p>Birthday: ${dob}</p>
//     </div>
//   `;
//
// }
//
//
// const cards = document.getElementsByClassName('card');
// employeeDirectory.addEventListener('click', e => {
//   let click = e.target.parentNode;
//   let employee = click.className;
//   if (click.className) {
//     employeeOverlay();
//   }
// });
