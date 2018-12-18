document.addEventListener('DOMContentLoaded', function () {



    (function () {
        const quotes = [
          {
            quote:
            "Let It Snow! Let It Snow! Let It Snow!"          
        },
          {
            quote:
            "Santa baby, I want a yacht and really that's not a lot; Been an angel all year"      
            },
          {
            quote:
            "Decorations of red on a green Christmas tree; Won't be the same dear, if you're not here with me"         
        },
          {
            quote: "The price of anything is the amount of life you exchange for it.",
          },
          {
            quote:
              "Life is like a landscape. You live in the midst of it but can describe it only from the vantage point of distance. ",
          },
          {
            quote:
              "A critic is someone who never actually goes to the battle, yet who afterwards comes out shooting the wounded.",
          }
        ];
      
        const btn = document.getElementById('generate-btn');
      
        btn.addEventListener('click', function () {
          let random = Math.floor(Math.random()*quotes.length);
          // console.log(random);
      
          document.getElementById('quote').textContent = quotes[random].quote;
      
        });
      
    })();





    var addBudget = document.forms['budget'];
    var totalBudget = document.querySelector('#totalBudget');
    const list = document.querySelector('#gifts-list ul');
    const total = document.querySelector('#total');
    const leftSpend = document.querySelector('#leftSpend')
    const gifts = list.getElementsByTagName('li');
    const searchBar = document.forms['search-gifts'].querySelector('input');
    const searchGifts = document.forms['search-gifts']
    const divLeftSpend = document.querySelector('#divLeftSpend');


    //chart js
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'doughnut',
        // The data for our dataset
        data: {
            // labels: ["Budget", "Left to Spend"],
            datasets: [{
                // label: "My First dataset",
                backgroundColor: ['rgba(175, 68, 68, 1)', 'rgba(88, 158, 120, 1)'],
                borderColor: ['rgba(175, 68, 68, 1)', 'rgba(88, 158, 120, 1)'],
                data: [0, 0],
            }]
        },
        // Configuration options go here
        options: {
            responsive: true,
        }
    });

    //updating chart
    function addData() {
        var tbudget = 0;
        var tbudget = parseInt(totalBudget.textContent);
        var totalChart = tbudget - parseInt(total.textContent);
        chart.data.datasets[0].data = [tbudget, totalChart];
        chart.update();

    }

    //add budget
    addBudget.addEventListener('submit', function (e) {
        e.preventDefault();
        var inputBudget = document.querySelector('input[name="budget-input"]');
        totalBudget.textContent = inputBudget.value;
        inputBudget.value = '';
        addData();
    });



    //add gift
    const addGift = document.forms['add-gift'];
    addGift.addEventListener('submit', function (e) {

        e.preventDefault();
        var value = addGift.querySelector('input[type="text"]');
        var priceValue = addGift.querySelector('input[type="number"]');

        //create elements
        const li = document.createElement('li');
        const giftName = document.createElement('span');
        const deleteBtn = document.createElement('span');
        const price = document.createElement('span');

        //add content
        deleteBtn.textContent = 'delete';
        giftName.textContent = value.value;
        price.textContent = priceValue.value;

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
        value.value = "";
        priceValue.value = "";
        leftSpend.textContent = totalBudget.textContent - totalValue;;
        filter();

        addData();
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
            leftSpend.textContent = totalBudget.textContent - totalValue;

            addData();
            filter();
        }
    });





    //search bar
    function filter() {
        if (gifts.length > 1) {
            searchGifts.style.display = 'block';
        } else {
            searchGifts.style.display = 'none';
        }
    };

    //filter gifts  
    searchBar.addEventListener('keyup', function (e) {
        const term = e.target.value.toLowerCase();
        Array.from(gifts).forEach(function (gift) {
            const title = gift.firstElementChild.textContent;
            if (title.toLowerCase().indexOf(term) != -1) {
                gift.style.display = 'block';
            } else {
                gift.style.display = 'none';
            }
        });
    });



});