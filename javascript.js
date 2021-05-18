var searchBtn = document.querySelector('#user-form');

$(searchBtn).on('onclick', function () {
    var txt = ($(this).text());
    alert("Your Favourite Sports is " + txt);
});

var formSubmitHandler = function (event) {
    event.preventDefault();

    alert('City was not found');
};

var buttonClickHandler = function (event) {
    // What is `event.target` referencing?
    // TODO: Write your answer here
    var previousSearch = event.target.getAttribute('data-previousSearch');

    // Why is this `if` block in place?
    // TODO: Write your answer here
    if (previousSearch) {
        getpreviousSearch(previousSearch);

        repoContainerEl.textContent = '';
    }
};


var getWeatherData = function (City) {
    var apiUrl = '' + City + '';

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    displayWeather(data, city);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to One Call');
        });
};

var getpreviousSearch = function (previousSearch) {

    var apiUrl = '' + previousSearch + '';

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayWeather(data.items, previousSearch);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
};



var displayWeather = function (repos, searchTerm) {
    if (repos.length === 0) {
        repoContainerEl.textContent = 'No repositories found.';
        // What would happen if there was no `return;` here?
        // TODO: Write your answer here
        return;
    }

    repoSearchTerm.textContent = searchTerm;

    for (var i = 0; i < repos.length; i++) {
        // What is the result of this string concatenation?
        // TODO: Write your answer here
        var repoName = repos[i].owner.login + '/' + repos[i].name;

        var repoEl = document.createElement('div');
        repoEl.classList = 'list-item flex-row justify-space-between align-center';

        var titleEl = document.createElement('span');
        titleEl.textContent = repoName;

        repoEl.appendChild(titleEl);

        var statusEl = document.createElement('span');
        statusEl.classList = 'flex-row align-center';

        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        repoEl.appendChild(statusEl);

        repoContainerEl.appendChild(repoEl);
    }
};

searchBtn.addEventListener('submit', formSubmitHandler);
