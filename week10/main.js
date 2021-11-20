let inputArray = {};

function inputs(formId) {
    let form = document.querySelector(`${ formId }`);
    storyVariables = new FormData(form);
    storyVariables.forEach(function(value,key){
      inputArray[key] = value;
    })
    console.log(inputArray);
    return storyVariables;
}

let e;
let storyVariables;
let test;
let errors = 0;

document.getElementById("story1btn").addEventListener('click', (e) => {
    e.preventDefault();
    inputs('#story1form');
    checkError(inputArray)
    if(errors === 0) {
    story1(inputs("#story1form"));
    document.getElementById('story1form').reset();
    document.querySelectorAll('.error').forEach(item => {
      item.classList.remove('active');
      item.textContent = '';
    }
)}
    else {
      document.getElementById("story1view").innerHTML = "";
      document.querySelector(".active, .error").scrollIntoView();
    }});

function story1(storyVariables) {
    let story1 = `<h2>Dinner Party</h2>
        <p>One of the favorite activities of the Holiday Season is the family dinner party. Ever since <span class="userInput">${ storyVariables.get('year1') }</span> the family has been getting together. If you're between the ages of <span class="userInput">${ storyVariables.get('age1') }</span>
        and <span class="userInput">${ storyVariables.get('age2') }</span> you have to sit at the kids table at the great meal. 
        It is always a <span class="userInput">${ storyVariables.get('adj1').toLowerCase() }</span> event, with a special gift of a <span class="userInput">${ storyVariables.get('noun1').toLowerCase() }</span> and <span class="userInput">${ storyVariables.get('num1') }</span>
        <span class="userInput">${ storyVariables.get('pnoun2').toLowerCase() }</span> for each guest. The night opens with the host <span class="userInput">${ storyVariables.get('gerund1').toLowerCase() }</span> happily with an arm full of <span class="userInput">${ storyVariables.get('pnoun1').toLowerCase() }</span>.
        After this traditional greeting, everyone knows it's time for <span class="userInput">${ storyVariables.get('person1') }</span> to give their <span class="userInput">${ storyVariables.get('adj2').toLowerCase() }</span>
        speech.</p>
        <p>Then everyone sits to a delicious meal of <span class="userInput">${ storyVariables.get('food1').toLowerCase() }</span> and before you know it each and every <span class="userInput">${ storyVariables.get('noun2').toLowerCase() }</span>
        has been <span class="userInput">${ storyVariables.get('verb2').toLowerCase() }</span>. Everyone heads home with new memories of a(n) <span class="userInput">${ storyVariables.get('adj3').toLowerCase() }</span> time &mdash; see you next year!</p>
        ` 

    document.getElementById("story1view").innerHTML = story1;
    document.getElementById("story1view").scrollIntoView();
}


//****FORM VALIDATION******** */

//
const form  = document.getElementById('story1form')[0];
let error;
let event;

function checkError(inputArray) {
  errors = 0;

  let inputs = Array.from(inputArray);
  let emptyFields = Object.values(inputs).every(x => x === null || x === '');
  if(emptyFields === true) {
    document.getElementById('emptyerror').className = 'error active';
    document.getElementById('emptyerror').textContent = "Ahh looks like you missed something...";
    error++;
  }

  var keys = Object.keys(inputArray); //get keys from object as an array

  console.log(keys);
  console.log(inputArray);

  let simple = keys.filter(element => {
    // 👇️ using OR (||) operator
    return element.startsWith('noun') || element.startsWith('pnoun') || element.startsWith('verb') || element.startsWith('adj') ||
    element.startsWith('person') || element.startsWith('food')
  })

  console.log(simple);

  simple.forEach(item => {
    let value = document.getElementById(item).value;
    let error = document.getElementById(`${item}error`);
    if(value === "") {
      error.textContent = 'Oh here it is!'
      error.className = 'error active';
      errors++;;
    }
    else if(value.length > 20) {
      error.textContent = "Whoa! Let's try fewer than 20 characters, please!";
      error.className = 'error active';
      errors++;}
  });

  if(document.getElementById('gerund1').value === "") {
    let error = document.getElementById(`gerund1error`);
    error.textContent = 'Oh here it is!'
    error.className = 'error active';
    errors++;;
  }
  else if(!(document.getElementById('gerund1').value.endsWith('ing'))) {
    let error = document.getElementById(`gerund1error`);
    error.textContent = 'Remember, a gerund or present participle has to end in ing - try again!'
    error.className = 'error active';
    errors++;;};

  let age = keys.filter(element => {
    return (element.startsWith('age'))});

  age.forEach(item => {
    let value = parseInt(document.getElementById(item).value);
    let error = document.getElementById(`${ item }error`);
    if(value === "") {
      error.textContent = 'Oh here it is!'
      error.className = 'error active';
      errors++;;
    }
    else if(!(value > 0 && value < 120) || value === 'NaN') {
    error.textContent = `I get it, but let's try a more realistic age between 0 and 120, and a number please.`;
    error.className = 'error active';
    errors++;;}
  });
  
  let year = keys.filter(element => {
    return (element.startsWith('year'))
  });

  year.forEach(item => {
    let value = document.getElementById(item).value;
    if(value === "") {
      error.textContent = 'Oh here it is!'
      error.className = 'error active';
      errors++;;
    }
    else if(!/^[1-9]\d*$/.test(value)) {
      let error = document.getElementById(`${item}error`);
      error.textContent = `Maybe sometime this millennium? Try between 0 and 2021.`;
      error.className = 'error active';
      errors++;}
    else {
      let error = document.getElementById(`${item}error`);
      error.textContent = '';
      error.classList.remove('active');}
  })

  // Set the styling appropriately
  if(errors > 0) {
  return errors;}
}
