let state = {
    data: []
};

const render = (state) => {
  tbody.innerHTML = '';
  state.data.forEach((objData) => {
    const tr = document.createElement('tr');
    tr.dataset.id = objData.id;
    const id = document.createElement('td');
    id.textContent = objData.id;
    const fio = document.createElement('td');
    fio.textContent = objData.fio;
    const email = document.createElement('td');
    email.textContent = objData.email;
    const birthday = document.createElement('td');
    birthday.textContent = objData.birthday.split('-').reverse().join('.');
    const gender = document.createElement('td');
    gender.textContent = objData.exampleRadios === 'option1' ? 'Мужской' : 'Женский';

    const buttons = document.createElement('td');
    buttons.innerHTML = `
        <button class="btn btn-light" name="edit" data-id="${objData.id}">редактировать</button>
        <button class="btn btn-light" name="delete" data-id="${objData.id}">удалить</button>
    `;

    tr.appendChild(id);
    tr.appendChild(fio);
    tr.appendChild(email);
    tr.appendChild(birthday);
    tr.appendChild(gender);
    tr.appendChild(buttons);
    tbody.appendChild(tr);
  });
};

const form = document.querySelector('#userForm');
const tbody = document.querySelector('tbody');
const modal = document.querySelector('#addProfile');

let count = 0;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const objData = Object.fromEntries(formData);
    objData.id = objData.id ? parseInt(objData.id) : ++count;
    if (!state.data.some(user => user.id === objData.id)) {
        state.data.push(objData);
    } else {
        const index = state.data.findIndex(item => item.id === objData.id);
        state.data[index] = objData;
    }
    render(state);
    form.reset();
    form.elements['id'].value = '';
    bootstrap.Modal.getInstance(modal).hide();
});

tbody.addEventListener('click', (e) => {
    if (e.target.name === 'delete') {
        const id = parseInt(e.target.closest('tr').dataset.id);
        state.data = state.data.filter((objData) => objData.id !== id);
        render(state);

        count = state.data.length ? Math.max(...state.data.map(user => user.id)) : 0;
    } else if (e.target.name === 'edit') {
        const id = parseInt(e.target.closest('tr').dataset.id);
        const objData = state.data.find((objData) => objData.id === id);
        for (let key in objData) {
            if (form.elements[key]) {
                form.elements[key].value = objData[key];
            }
        }
        bootstrap.Modal.getOrCreateInstance(modal).show();
    }
});

document.getElementById('addUserBtn').addEventListener('click', () => {
    form.reset();
    form.elements['id'].value = '';
});

render(state);