let main = $('main');

function displaySchools(array){
    for (let i = 0; i < array.length; i++) {
        let div = document.createElement('div');
        div.id="school";
        div.innerHTML=`<h4>${array[i].name}</h4>
        <p>${array[i].from}-${array[i].to}</p>`;
        document.querySelector('#schools').appendChild(div);
    }
}
function displayLanguages(array){
    for (let i = 0; i < array.length; i++) {
        let div = document.createElement('div');
        div.id="language";
        div.innerHTML=`<h4>${array[i].language}</h4>
        <p>${array[i].cert}</p>`;
        document.querySelector('#languages').appendChild(div);
    }
}
function displayThings(data){
    $('#Name').html(data.name);
    $('#loc').html(data.address);
    $('#phone').html(data.tel);
    $('#mail').html(data.email);
    $('#born').html(data.birth);
    displaySchools(data.schools);
    displayLanguages(data.languages);
    $('#aboutme').html(data.skills);
}
if (localStorage.getItem('CVCreator')!=null){
    let items = JSON.parse(localStorage.getItem('CVCreator'));
    displayThings(items);
    
}
else{
    main.html('<p>Még nem generált önéletrajzot!</p>')
    main.fadeIn();
    alert('Még nincs önéletrajza!');
    window.location.href='/admin';
}
