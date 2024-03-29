console.log(window.Redux);

const { createStore } = window.Redux;

// SETUP REDUX STORE
// state
// reducer
// store

const initialState = [
    'Listen to music'
]

const hobbyReducer = (state = initialState, action) => {
    return state
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
    ulElement.inner = '';

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
