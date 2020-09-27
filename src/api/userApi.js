import firebase from 'firebase';

const userApi = {
  getMe: () => {
    // TODO: Call API to get current user
    return new Promise((resolve, reject) => {
      const currentUser = firebase.auth().currentUser;

      resolve({
        id: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email,
        photoUrl: currentUser.photoURL,
      })
    })
  }
}

export default userApi;