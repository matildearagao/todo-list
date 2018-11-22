document.addEventListener('DOMContentLoaded', function () {

    const list = document.querySelector('#book-list ul');
    const totalDiv = document.querySelector('#total');

    //delete book
    list.addEventListener('click', function (e) {
        if (e.target.className == 'delete') {
            const li = e.target.parentElement;
            list.removeChild(li);
        }
    });




    //add book
    const addBook = document.forms['add-book'];
    addBook.addEventListener('submit', function (e) {
        e.preventDefault();
        const value = addBook.querySelector('input[type="text"]').value;
        const priceValue = document.querySelector('input[type="number"]').value;

        function totalValue() {
            var itemCount = document.getElementsByClassName('price').length;
            var totalValue = 0;
            for(var i = 0; i < itemCount; i++)
            {
                totalValue = totalValue + priceValue;
            }
        };
        totalValue();


        //create elements
        const li = document.createElement('li');
        const bookName = document.createElement('span');
        const deleteBtn = document.createElement('span');
        const price = document.createElement('span');
        const totalBudget = document.createElement('p');


        //add content
        deleteBtn.textContent = 'delete';
        bookName.textContent = value;
        price.textContent = priceValue;
        totalBudget.textContent = totalValue;


        //add styles
        deleteBtn.classList.add('delete');
        bookName.classList.add('name');
        price.classList.add('price');
        totalBudget.classList.add('price');

        //append to DOM 
        li.appendChild(bookName);
        li.appendChild(deleteBtn);
        li.appendChild(price);

        //append li to DOM
        list.appendChild(li);


        totalDiv.appendChild(totalBudget);

    });



    //hide books
    const hideBox = document.querySelector('#hide');
    hideBox.addEventListener('change', function (e) {
        if (hideBox.checked) {
            list.style.display = 'none';
        } else {
            list.style.display = 'initial';
        }
    });

    //filter books
    const searchBar = document.forms['search-books'].querySelector('input');
    searchBar.addEventListener('keyup', function (e) {
        const term = e.target.value.toLowerCase();
        const books = list.getElementsByTagName('li');
        Array.from(books).forEach(function (book) {
            const title = book.firstElementChild.textContent;
            if (title.toLowerCase().indexOf(term) != -1) {
                book.style.display = 'block';
            } else {
                book.style.display = 'none';
            }
        });
    });

    //tabbed content
    const tabs = document.querySelector('.tabs');
    const panels = document.querySelectorAll('.panel');
    tabs.addEventListener('click', function (e) {
        if (e.target.tagName == 'LI') {
            const targetPanel = document.querySelector(e.target.dataset.target);
            panels.forEach(function (panel) {
                if (panel == targetPanel) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            })
        }
    })

})
