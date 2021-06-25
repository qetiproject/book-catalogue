// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  bookApiBase: 'https://www.googleapis.com/books/v1/volumes',
  firebase: {
    apiKey: 'AIzaSyDrihQqSfhfL13HjdqnQDkGUxeVKPks4hw',
    authDomain: 'book-catalogue-5b145.firebaseapp.com',
    projectId: 'book-catalogue-5b145',
    storageBucket: 'book-catalogue-5b145.appspot.com',
    messagingSenderId: '924018311623',
    appId: '1:924018311623:web:f7258171e13d767975d9e2',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
