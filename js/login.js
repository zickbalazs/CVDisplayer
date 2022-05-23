let schoolsN = 1,
    languagesN = 1;
async function load(){
    document.querySelector('main').innerHTML="";
    document.querySelector('main').innerHTML = await (await fetch('/admin/dashboard.html')).text();
    document.querySelector('#SchoolBtn').addEventListener('click', AddSchool);
    document.querySelector('#LanguageBtn').addEventListener('click', AddLanguage);
    document.querySelector('#SchoolRMBtn').addEventListener('click', RemoveSchool);
    document.querySelector('#LanguageRMBtn').addEventListener('click', RemoveLanguage);
    document.querySelector('#done').addEventListener('click', ()=>{
        if (confirm("Biztosan kész van?")){
            if (FullyFilled()){
                StoreData();
                window.location.href="/";
            }
            else{
                alert('Nincs minden adat kitöltve!');
            }
        }
    })
    LoadData();
}
function FullyFilled(){
    return document.querySelector('#name').value!=""&&document.querySelector('#born').value!=""
        &&document.querySelector('#address').value!=""&&document.querySelector('#phone').value!=""
        &&document.querySelector('#email').value!=""&&document.querySelector('#aboutme').value!=""
        &&document.querySelector('#school1').value!=""&&document.querySelector('#language1').value!=""
        &&document.querySelector('#school1DateB').value!=""&&document.querySelector('#school1DateE').value!=""
        &&document.querySelector('#language1Cert').value!="";
}
function LoadData(){
    if (localStorage.getItem('CVCreator')!=null){
        let data = JSON.parse(localStorage.getItem('CVCreator'));
        document.querySelector('#name').value=data.name;
        document.querySelector('#born').value=data.birth;
        document.querySelector('#address').value=data.address;
        document.querySelector('#phone').value=data.tel;
        document.querySelector('#email').value=data.email;
        document.querySelector('#aboutme').value=data.skills;
    }
}
function RemoveSchool(){
    if (schoolsN>1){
        document.querySelector('#schools').removeChild(document.querySelector(`#_S${schoolsN}`));
        schoolsN--;
    }
}
function RemoveLanguage(){
    if (languagesN>1){
        document.querySelector('#languages').removeChild(document.querySelector('#_L'+languagesN));
        languagesN--;
    }
}
function AddSchool(){
    schoolsN++;
    let div = document.createElement('div');
    div.id="_S"+schoolsN;
    let html = `
        <label for="school${schoolsN}" class="form-label">Iskola neve:</label>
        <input type="text" name="school${schoolsN}" id="school${schoolsN}" class="form-control">
        <label class="form-label" for="school${schoolsN}DateB">Kezdés</label>
        <input type="date" name="school${schoolsN}DateB" id="school${schoolsN}DateB" class="form-control">
        <label class="form-label" for="school${schoolsN}DateE">Végzés</label>
        <input type="date" name="school${schoolsN}DateE" id="school${schoolsN}DateE" class="form-control">
        <br>
    `;
    div.innerHTML=html;
    document.querySelector('#schools').appendChild(div  );
}
function AddLanguage(){
    languagesN++;
    let div = document.createElement('div');
    div.id="_L"+schoolsN;
    let html = `
    <label for="language${languagesN}" class="form-label">Nyelvkészség:</label>
    <input type="text" class="form-control" name="language${languagesN}" id="language${languagesN}"> 
    <label for="language${languagesN}Cert" class="form-label">Nyelvkészség szintje:</label>
    <input type="text" class="form-control" name="language${languagesN}Cert" id="language${languagesN}Cert"> 
    <br>
    `;
    document.querySelector('#languages').innerHTML+=html;
}
function GetSchools(){
    let schools = [];
    for (let i = 1; i <= schoolsN; i++){
        let school = {
            "name": document.querySelector(`#school${i}`).value,
            "from": document.querySelector(`#school${i}DateB`).value,
            "to": document.querySelector(`#school${i}DateE`).value
        }
        console.log(school);
        schools.push(school);
    }
    return schools;
}
function GetLanguages(){
    let languages = [];
    for (let i = 1; i <= languagesN; i++){
        console.log(i);
        let lang = {
            "language": document.querySelector(`#language${i}`).value,
            "cert": document.querySelector(`#language${i}Cert`).value
        }
        console.log(lang);
        languages.push(lang);
    }
    return languages;
}
function StoreData(){
    let data = {
        "name":document.querySelector('#name').value,
        "birth":document.querySelector('#born').value,
        "address":document.querySelector('#address').value,
        "tel":document.querySelector('#phone').value,
        "email":document.querySelector('#email').value,
        "schools":GetSchools(),
        "languages":GetLanguages(),
        "skills":document.querySelector('#aboutme').value
    }
    localStorage.setItem('CVCreator', JSON.stringify(data));
}
load();