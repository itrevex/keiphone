const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
    if (user) {
        //toggle ui elements
        loggedInLinks.forEach(item => item.style.display = 'block')
        loggedOutLinks.forEach(item => item.style.display = 'none')
    }else {
        loggedInLinks.forEach(item => item.style.display = 'none')
        loggedOutLinks.forEach(item => item.style.display = 'block')
    }
}

//set up shopping lists
const shoppingLists = document.querySelector('.shoppingLists')

const setupShoppingLists = (data) => {
    if (data.length !== 0) {
        let html = ''
        data.forEach(doc => {
            const shoppingList = doc.data();
            const li = `
            <li class="caret down">
                <div class="collapsible-header grey lighten-4">${shoppingList.title}</div>
                <div class="collapsible-body white">${shoppingList.content}</div>
            </li>
            `
            html += li
        });
        shoppingLists.innerHTML = html
    }else {
        shoppingLists.innerHTML = '<h5 class="center-align">Login to view shopping lists</h5>'
    }
    
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});