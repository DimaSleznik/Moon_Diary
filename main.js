function comleted_goal(event) {
    let elem = event.currentTarget;
    elem_text = event.currentTarget.parentNode.querySelector('div>p').innerHTML;
    let goals = JSON.parse(localStorage.getItem('goal'));
    let goal_array = [];
    let completed_goals = JSON.parse(localStorage.getItem('completed_goals')) || [];
    goals.forEach((item) => {
        if (item.goal != elem_text) {
            goal_array.push(item);
        }
        else {
            completed_goals.push(item);

        }
    });
    console.log(completed_goals);

    localStorage.setItem('completed_goals', JSON.stringify(completed_goals));
    localStorage.setItem('goal', JSON.stringify(goal_array))
    elem.parentNode.remove();


}
function add_goal() {
    let text_area = document.querySelector('.text_area');
    let date = document.querySelector('.date_time');
    console.log(date.value);
    if (text_area.value != null) {
        let goal = new_goal(text_area.value, date.value);
        date.value = '';
        text_area.value = '';
        console.log(goal);
        goals_list.push(goal);
        localStorage.removeItem('goal');
        localStorage.setItem('goal', JSON.stringify(goals_list))
        console.log(goals_list);
    }

}


function display_goal_list(elements, delete_elem, class_name) {


    document.querySelector('.' + delete_elem).style.display = 'none';
    let new_elem = document.createElement('div');
    new_elem.className = class_name;
    new_elem.innerHTML = '';
    if (elements.length == 0) new_elem.innerHTML = '<p class = "no_goals">Еще нет целей</p>'
    elements.forEach((elem) => {
        new_elem.innerHTML += elem.innerHTML;


    });
    document.querySelector('.main_block').append(new_elem);



}

function formateDate(first_date, second_date) {
    let diff = new Date(first_date) - new Date(second_date.split('.').reverse().join('-'));
    let day = diff / (1000 * 60 * 60 * 24)
    let days = day <= 31 ? day : day % 31;
    let months = day / 31 <= 12 ? Math.trunc((day / 31)) : 0;
    let years = (Math.trunc(day / 31 / 12))
    if (diff) {
        return `Осталось: ${days} дней ${months} месяцев ${years > 0 ? years + 'лет' : ' '}  `;
    }
    else {
        return 'Без даты';
    }




}
function get_completed_goals() {
    let elem_array = [];
    let goals = JSON.parse(localStorage.getItem('completed_goals'));
    if (goals) {
        goals.forEach(element => {
            let new_elem = document.createElement('div');
            new_elem.innerHTML =
                `<div class = 'goal'>
        <div><p>${element.goal}</p></div>
        </div>`;
            elem_array.push(new_elem);



        });
    }

    else { console.log('error'); }
    return elem_array;


}


function get_goals() {
    let elem_array = [];
    let goals = JSON.parse(localStorage.getItem('goal'));
    if (goals) {
        goals.forEach(element => {
            let new_elem = document.createElement('div');
            new_elem.innerHTML =
                `<div class = 'goal'>
        <div><p>${element.goal}</p></div><h5>${formateDate(element.to_date, element.from_date)}</h5>
        <button onclick = "comleted_goal(event)" goalText =  ${element.goal} >Выполненно</button>
        </div>`;
            elem_array.push(new_elem);



        });
    }

    else { console.log('error'); }
    return elem_array;


}


function new_goal(text, date) {
    return goal = {
        goal: text,
        to_date: date,
        from_date: new Date().toLocaleDateString(),


    }
}

document.querySelector('.display_goals').onclick = () => {
    if (document.querySelector('.all_goals')) {
        document.querySelector('.all_goals').remove();

    }
    if (document.querySelector('.all_completed_goals')) { document.querySelector('.all_completed_goals').remove() }
    display_goal_list(get_goals(), 'add_block', 'all_goals')

}
document.querySelector('.completed_goals').onclick = () => {
    if (document.querySelector('.all_completed_goals')) { document.querySelector('.all_completed_goals').remove() }
    if (document.querySelector('.all_goals') !== null) document.querySelector('.all_goals').remove();
    document.querySelector('.add_block').style.display = 'none';
    let elem_array = get_completed_goals();
    let main_elem = document.querySelector('.main_block');
    let container = document.createElement('div');
    container.className = 'all_completed_goals';
    main_elem.append(container);
    elem_array.reverse();
    elem_array.forEach((item) => {
        item.innerHTML = '<div class = "completed_goals_block"><p>Выполненная цель:<p>' + item.innerHTML + '</div>';
        container.append(item);


    })


}
document.getElementById('add_button').onclick = add_goal;
let goals_list = JSON.parse(localStorage.getItem('goal')) || [];
document.querySelector('.add_button').onclick = () => {
    if (document.querySelector('.all_completed_goals')) { document.querySelector('.all_completed_goals').remove() }
    if (document.querySelector('.all_goals')) {
        document.querySelector('.all_goals').remove();

    }
    document.querySelector('.add_block').style.display = 'block';
    let elem = document.querySelector('.all_goals');
    if (elem) { elem.style.display = 'none'; }

}
if (goals_list.length == 0) {
    let input_elem = document.querySelector('.get_goal');
    input_elem.style.display = 'none';
    document.querySelector('.plus_img>button').onclick = (event) => {
        input_elem.style.display = 'flex';
        document.querySelector('.plus_img').style.display = 'none';
    }

}
else {

    document.querySelector('.plus_img').style.display = 'none';

}