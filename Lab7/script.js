const form = document.querySelector('.top-banner form');
const input = document.querySelector('.top-banner input');
const msg = document.querySelector('.top-banner .msg');
const list = document.querySelector('.ajax-section .cities');

const apiKey = 'ea80e54a295e0bad500ea7f67f49b255';
let id = localStorage.getItem('currentId') || 0;
let numberOfCity = 0;

form.addEventListener('submit', (e) => {
	e.preventDefault();
	if (numberOfCity >= 10) {
		alert('za dużo miast!');
	} else {
		addcity();
	}
});

function remove(cityId) {
	const city = document.getElementById(cityId);
	city.parentNode.removeChild(city);
	numberOfCity--;
}

function increaseId() {
	id++;
	localStorage.setItem('currentId', id);
}

function addcity() {
	let inputVal = input.value;

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			const { main, name, sys, weather } = data;
			const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]['icon']}.svg`;

			const li = document.createElement('li');
			li.classList.add('city');
			li.setAttribute('id', id);
			const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
		  <button onclick="remove(${id})">Delete</button>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${
				weather[0]['description']
			}">
          <figcaption>${weather[0]['description']}</figcaption>
        </figure>
      `;
			li.innerHTML = markup;
			list.appendChild(li);
			increaseId();
			numberOfCity++;
		})
		.catch(() => {
			msg.textContent = 'Wpisz poprawną nazwę miasta';
		});

	msg.textContent = '';
	form.reset();
	input.focus();
}
