# M1

### Routes of this application

> Base URL `  http://localhost:5173/  `

- Routes "/register","/home","/BookDetail","LoanPage","PopularPage"

### Where application state lives

Use the Pinia auth store (`src/stores/authStore.ts`) for authentication state that multiple pages or components may need:

- `currentUser`: the signed-in user's `id`, `username`, and `email`.
- `isLoading`: whether a login or registration request is in progress.
- `error`: the latest authentication error.
- `login`, `register`, and `logout`: actions that update the shared auth state.

Keep temporary, page-specific state inside its component. For example, `LogIn.vue` owns its email and password inputs and validation messages; `RegiSter.vue` owns its username, email, and password inputs and validation messages. These values are only needed while the user is filling out that form, so putting them in Pinia would unnecessarily share them across the app. Passwords are sent to the auth service but are not included in `currentUser`.
