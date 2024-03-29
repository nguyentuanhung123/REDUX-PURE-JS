console.log(window.Redux);

const { createStore } = window.Redux;

// SETUP REDUX STORE
// state
// reducer
// store

// const initialState = [
//     'Listen to music'
// ]

const initialState = JSON.parse(localStorage.getItem('hobby_list')) || [];

const hobbyReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_HOBBY': {
            const newList = [...state];
            newList.push(action.payload);
            return newList;
        }
        default:
            return state;
    }
}

const store = createStore(hobbyReducer);

// ----------------

// RENDER REDUX HOBBY LIST
const renderHobbyList = (hobbyList) => {
    if(!Array.isArray(hobbyList) || hobbyList.length === 0){
        return;
    }

    const ulElement = document.querySelector('#hobbyListId');
    if(!ulElement) return;

    // reset previous content of ul
    ulElement.innerHTML = '';

    for (const hobby of hobbyList) {
        const liElement = document.createElement('li');
        liElement.textContent = hobby;

        ulElement.appendChild(liElement);
    }
    
}

// RENDER INITIAL HOBBY LIST
const initialHobbyList = store.getState(); // Lấy giá trị hiện tại của store
console.log('InitialHobbyList: ', initialHobbyList);
renderHobbyList(initialHobbyList);

// HANDLE FORM SUBMIT
const hobbyFormElement = document.querySelector("#hobbyFormId");
if(hobbyFormElement){
    const handleFormSubmit = (e) => {
        //PREVENT BROWSER FROM RELOADING
        e.preventDefault();

        const hobbyTextElement = hobbyFormElement.querySelector("#hobbyTextId");
        if(!hobbyTextElement) return;

        console.log('SUBMIT', hobbyTextElement.value);
        const action = {
            type: 'ADD_HOBBY',
            payload: hobbyTextElement.value
        };
        store.dispatch(action);

        //reset form
        hobbyFormElement.reset();
    }

    hobbyFormElement.addEventListener('submit', handleFormSubmit);
    
}

/**
 * Mỗi lần state thay đổi thì sẽ làm gì đấy
 * store.getState() : Lấy giá trị state mới nhất sau khi thay đổi đang được lưu trữ trong store
 */
store.subscribe(() => {
    console.log('STATE UPDATE: ', store.getState());
    const newHobbyList = store.getState();
    renderHobbyList(newHobbyList);
    
    /**
     * Gõ trong tab console như bên dưới để hiện kết quả
     * localStorage.getItem('hobby_list')
     */
    localStorage.setItem('hobby_list', JSON.stringify(newHobbyList)) 
})
