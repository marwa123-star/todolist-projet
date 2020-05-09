//ADD new To do 
const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const popup = document.querySelector('.popup');
const gPop = document.querySelector('.popup-wrapper');
const btn = document.querySelector('.btn');
const search = document.querySelector('.search input');
gPop.style.display = "none";


/***************reusable function********************/

/* Function pour l'alert et le popup qui va etre affiché (time control)*/
function start(duree) {
    var o = document.getElementById("sp");
    if (duree > 0) {
        o.innerHTML = duree;
        gPop.style.display = "block";
        setTimeout("start(" + duree + " -1)", 1000);
    } else {
        alert("enter a valid to do");
        o.innerHTML = "Au revoir";
        gPop.style.display = "none";
        popup.style.visibility = "hidden";

    }
};


/* Function Creation dynamique du POPUP */

function create() {
    const div = document.createElement('div');
    div.classList.add('popup-close');
    div.setAttribute('id', 'closing');
    const text = document.createTextNode('X');
    div.appendChild(text);
    popup.append(div);
    const div2 = document.createElement('div');
    div2.classList.add('popup-content');
    const html = `
   <span id="sp">1</span>
   <h2>Fill the Input</h2>
   <p>Don't forget</p>
   <a href="#">Return</a>`;
    div2.innerHTML = html;
    popup.append(div2);

}

/* Function generation dynamique des TODOS */

const generateTemp = todo => {
    const html = `
   <li class="list-group-item d-flex justify-content-between align-items-center">
             <span>${todo}</span>
             <i class="fas fa-trash delete"></i>
            </li>
   `;
    list.innerHTML += html;
};


/* function pour controller l'evenement et pour ne pas etre repeté à chaque clique */
function onetime(node, type, callback) {

    node.addEventListener(type, function (e) {

        e.target.removeEventListener(e.type, arguments.callee);

        return callback(e);
    });
}

onetime(gPop, 'click', handler);

function handler(e) {

    if (e.target.id = 'closing') {

        gPop.style.display = "none";
    }
}

/***************Fin reusable function********************/




/************* Adding TO DO**************/

//Eventlistner Add TODOS
btn.addEventListener('click', e => {
    //prevent the btn from submitting the form (cancel the event) if not add => input is not shown in the table above 
    e.preventDefault(); //!important

    const todo = addForm.add.value.trim(); //const with value of the imput and trimmed by the edges to cancel space
    const res = document.querySelector('body > div.container > form > input'); //const for the empty input 

    if (todo.length) {

        //re-use the todo generation function above when we have the length of the todo input value 
        generateTemp(todo);

        //reset the form by delating the input with the reset(); function after it's add to the table  ( empty the form)
        if (todo == res.value) {
            addForm.reset();
        }
    }

    //if we click add but the input field is empty => generate the pop-up to alert using the create() above 
    else {
        create();

        // duration for the pop up generated 3s
        start(3);
    }
});

/************* Fin Adding TO DO**************/



/*************Deleting  TO DO**************/
list.addEventListener('click', e => {


    //contains() is a function to return a boolean if the child element is there
    //here we target the delate class to be the object clicked 
    if (e.target.classList.contains('delete')) {

        //remove the parent element of the i which is the list li 
        e.target.parentElement.remove();
    }

});

/************* Fin Deleting  TO DO**************/




/************************************* SEARCH ITEM********************************************/
//filtering Todos :

//we will apply a class to the Todos that dont match and the that class will

// have keyup event 



const retrieve = (term) => {

    //function pour faire un filtre i
    //Array.from() returns an Array object from any object
    //in this case we'll get an array of the Li that are the children of ul (list) 
    Array.from(list.children)

        // filter() creates an array filled with all array elements that pass a test (provided as a function).
        .filter((item) => {
            //if the text in the item is not matching the term defined bellow with the value of the search then add the class filtre witch display a none 
            return !item.textContent.includes(term)
        })
        .forEach((item) => {
            return item.classList.add('filtre');
        });

    Array.from(list.children)
        .filter((item) => {
            //in this case if the item match the term then display it with the filter class removed
            return item.textContent.includes(term)
        })
        .forEach((item) => {
            return item.classList.remove('filtre');
        })
};


//evenement de recherche des mots clés 
// 'keyup' or onkeyup ==> a function is triggered when the user releases a key in the input field
search.addEventListener('keyup', () => {
    const term = search.value.trim();

    // apply the function leave only the list containing the todo matching the term dipslayed and disable the rest of li 
    retrieve(term);
    // here the retrieve(term) function is triggered when we enter a term or kayword in the input 

})

/*************************************Fin SEARCH ITEM********************************************/