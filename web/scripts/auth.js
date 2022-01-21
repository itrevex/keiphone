import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-auth.js";
import { 
    getFirestore, 
    collection, 
    getDocs, 
    setDoc, 
    doc, 
    onSnapshot 
} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();
const listsRef = collection(db, "shopping_lists");

onSnapshot(listsRef, (snapshot) => {
    setupShoppingLists(snapshot)
});

function loadItems() {
    getDocs(listsRef).then(snapshot => {
        setupShoppingLists(snapshot)
    }).catch(e => {
        console.error("db error", e)
    })
}
//listen for auth status changes
onAuthStateChanged(auth, (user) => {
    if (!!user) {
        setupUI(user)
        //get shopping lists 
        loadItems()
        
    } else {
        setupUI()
        setupShoppingLists([])
    }
});


// sign up 
const signupForm = document.querySelector('#signup-form')

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm["signup-email"].value;
    const password = signupForm["signup-password"].value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signupForm.reset()
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            console.error(error)
        });

})

//log out user

const logout = document.querySelector("#logout")

logout.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth)
        .then(() => console.log("user logged out"))
        .catch(error => console.log(error))
})

// login

const loginForm = document.querySelector("#login-form")

loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = loginForm["login-email"].value
    const password = loginForm["login-password"].value

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log("user logged in")
            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            loginForm.reset()
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            console.error(error)
        });
})

// create new shopping list
const shoppingListForm = document.querySelector('#create-form')

shoppingListForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const title = shoppingListForm['title'].value
    const content = shoppingListForm['content'].value

    await setDoc(doc(listsRef), {
        title, content
    })
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    shoppingListForm.reset()
})