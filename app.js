document.addEventListener('DOMContentLoaded', function () {

    var addBudget = document.forms['budget'];
    var totalBudget = document.querySelector('#totalBudget');
    const list = document.querySelector('#gifts-list ul');
    const total = document.querySelector('#total');

    //chart js
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'doughnut',

        // The data for our dataset
        data: {
            labels: ["Budget", "Total"],
            datasets: [{
                label: "My First dataset",
                backgroundColor: ['#006400', '#8b0000'],
                borderColor: ['#006400', '#8b0000'],
                data: [0, 10],
            }]
        },

        // Configuration options go here
        options: {}
    });


    //updating chart


    function addData() {
        var tbudget = 0;
        var tbudget = parseInt(totalBudget.textContent);
        chart.data.datasets[0].data = [tbudget, 50];
        chart.data.labels[0] = "budget";
        chart.update();
    }

    //add budget
    addBudget.addEventListener('submit', function (e) {
        e.preventDefault();
        var inputBudget = document.querySelector('input[name="budget-input"]');
        totalBudget.textContent = inputBudget.value;
        document.querySelector('input[name="budget-input"]').value = '';
        addData();
    });





    //add gift
    const addGift = document.forms['add-gift'];
    addGift.addEventListener('submit', function (e) {
        e.preventDefault();
        var value = addGift.querySelector('input[type="text"]');
        var priceValue = addGift.querySelector('input[type="number"]').value;


        //create elements
        const li = document.createElement('li');
        const giftName = document.createElement('span');
        const deleteBtn = document.createElement('span');
        const price = document.createElement('span');


        //add content
        deleteBtn.textContent = 'delete';
        giftName.textContent = value.value;
        price.textContent = priceValue;



        //add styles
        deleteBtn.classList.add('delete');
        giftName.classList.add('name');
        price.classList.add('price');
        price.classList.add('price-value');
        total.classList.add('total')

        //append to DOM 
        li.appendChild(giftName);
        li.appendChild(deleteBtn);
        li.appendChild(price);

        //append li to DOM
        list.appendChild(li);

        //calculate total
        var values = document.querySelectorAll('.price-value');
        var totalValue = 0;
        for (var i = 0; i < values.length; i++) {
            totalValue = totalValue + parseInt(values[i].textContent);
        }
        total.textContent = totalValue;
        document.querySelector('input[type="number"]').value = "";
        addGift.querySelector('input[type="text"]').value = "";

    });


    //delete gift
    list.addEventListener('click', function (e) {
        if (e.target.className == 'delete') {
            const li = e.target.parentElement;
            list.removeChild(li);
            var values = document.querySelectorAll('.price-value');
            var totalValue = 0;
            for (var i = 0; i < values.length; i++) {
                totalValue = totalValue + parseInt(values[i].textContent);
            }
            total.textContent = totalValue;
        }
    });

    //filter gifts
    const searchBar = document.forms['search-gifts'].querySelector('input');
    searchBar.addEventListener('keyup', function (e) {
        const term = e.target.value.toLowerCase();
        const gifts = list.getElementsByTagName('li');
        Array.from(gifts).forEach(function (gift) {
            const title = gift.firstElementChild.textContent;
            if (title.toLowerCase().indexOf(term) != -1) {
                gift.style.display = 'block';
            } else {
                gift.style.display = 'none';
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
    });











});
