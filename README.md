# frontend-app
Summary
-------
This is my firts commit on this repository. It originally belongs to https://github.com/MarkdaleMGMT/frontend-app

Notes & Issues: 
----
1) Backend server only allows default credentials for login which are,
   Username: admin
   Password: admin 
2) I didnt develope jwt(Json web token) approach for session creation because backend server doesnt returns any jwt token except (ref_code). 
3) I used 'user-date API' to access the ref-code but it only returns ref-code when username is admin so i will have to make some changes when it gets fixed.
4) On sign up page you have to use ref-code of admin which is : 21232 otherwise it wont let you sign up (backend functionlity)
  Although, it returns a new ref-code when user successfully signs up but again in login process it only allows default credentials. 

Functionality Added
-------------------
1) Validation on Signup, Signin and Forgotpassword pages.
2) Added login and logout functionality.
3) Mitigated back paging bug.(Issue: When any user clicks on back button after logout it was letting user signed in automatically.) 

config.json file
----------------
==> I added config.json file which contains all the API Urls so it is now easy to change API urls, an admin just have to change that url at one place (ex. singleton approach) 

validate.js file
----------------
==> I added validate.js file which contains validation functions and its exported in all the pages. It prevents rewriting the same code in all pages.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
