import { auth, db } from '../init.js'
import { AmagiLoader } from '../loader.js'

const container = document.querySelector('.container')
const signOutButton = document.querySelector('.sign-out')

export class TodoModel {
  onChange = () => {}
  constructor(onChange) {
    this.onChange = onChange
    AmagiLoader.show()
    auth.onAuthStateChanged((user) => {
      if (user) {

        db.collection(user.uid).onSnapshot((snapshot) => {
          let changes = snapshot.docChanges();
          if (snapshot.empty || !snapshot.empty) {
            container.style = 'display: flex;'
            signOutButton.style = 'display: flex;'
            AmagiLoader.hide()
          }
          changes.forEach((change) => {
            if (change.type === "added") {
              this.onChange('add', change.doc)
            } else if (change.type === "removed") {
              this.onChange('remove', change.doc)
            }
          });
        });
      } else console.log('Пользователь не авторизован')
    })
  }

  async add(id, text) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection(user.uid)
          .doc("_" + id)
          .set({
            id: "_" + id,
            text,
            completed: false,
          })
          .then(() => {
            console.log("todo added");
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  }

  remove(id) {
    auth.onAuthStateChanged((user) => {
      if (user) db.collection(user.uid).doc(id).delete();
    });
  }

  toggle(id) {
    auth.onAuthStateChanged(user => {
      let item = db.collection(`${user.uid}`).doc(id)
      item.get().then(doc => {
        item.update({completed: !doc.data().completed})
      })
    })
  }
}
