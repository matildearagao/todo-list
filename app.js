document.addEventListener('DOMContentLoaded', function () {
    (function () {
        var countDownDate = new Date("Dec 25, 2018 00:00:00").getTime();

        // Update the count down every 1 second
        var x = setInterval(function () {

            // Get todays date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"
            document.getElementById("timer").innerHTML = days + "d " + hours + "h "
                + minutes + "m " + seconds + "s ";

            // If the count down is finished, write some text 
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("timer").innerHTML = "EXPIRED";
            }
        }, 1000);
    })();


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
                quote: "Dancin' and prancin' in jingle bell square. In the frosty air.",
            },
            {
                quote:
                    "What a bright time, it's the right time. To rock the night away ",
            },
            {
                quote:
                    "Jingle bell time is a swell time. To go ridin' in a one-horse sleigh",
            }
        ];

        const btn = document.getElementById('generate-btn');

        btn.addEventListener('click', function () {
            let random = Math.floor(Math.random() * quotes.length);
            // console.log(random);

            document.getElementById('quote').textContent = quotes[random].quote;

        });

    })();



    var addBudget = document.forms['budget'];
    const list = document.querySelector('#gifts-list ul');
    const total = document.querySelector('#total');
    const gifts = list.getElementsByTagName('li');
    const searchBar = document.forms['search-gifts'].querySelector('input');
    const searchGifts = document.forms['search-gifts']
    var inputBudget = document.querySelector('input[name="budget-input"]');


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
    function addData(totalBudget) {
        var tbudget = 0;
        var tbudget = parseInt(totalBudget.textContent);
        var totalChart = tbudget - parseInt(total.textContent);
        chart.data.datasets[0].data = [tbudget, totalChart];
        chart.update();
    }

    function render() {
        var values = document.querySelectorAll('.price-value');
        var total = document.querySelector('#total');
        var leftSpend = document.querySelector('#leftSpend')
        var totalBudget = document.querySelector('#totalBudget');
        var totalValue = 0;

        for (var i = 0; i < values.length; i++) {
            totalValue = totalValue + parseInt(values[i].textContent);
        }
        total.textContent = totalValue;
        leftSpend.textContent = totalBudget.textContent - totalValue;

        addData(totalBudget);
    }


    //add budget
    addBudget.addEventListener('submit', function (e) {
        e.preventDefault();
        var totalBudget = document.querySelector('#totalBudget');
        totalBudget.textContent = inputBudget.value;
        render();
    });


    //add gift
    const addGift = document.forms['add-gift'];
    addGift.addEventListener('submit', function (e) {

        e.preventDefault();
        var value = addGift.querySelector('input[type="text"]');
        var priceValue = addGift.querySelector('input[type="number"]');

        //create elements
        list.insertAdjacentHTML('beforeend', `
            <li>
                <span class="name">${value.value}</span>
                <span class="delete">delete</span>
                <span class="price price-value">${priceValue.value}</span>
            </li>
        `)

        render();
        filter();
    });

    //delete gift
    list.addEventListener('click', function (e) {
        if (e.target.className == 'delete') {
            const li = e.target.parentElement;
            list.removeChild(li);

            render();
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