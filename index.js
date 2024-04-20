import express from 'express';
import ProductsController from './src/controllers/product.controller.js';
import UserController from './src/Controllers/user.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import validationMiddleware from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';

const app = express();

app.use(express.static('public'));
app.use(cookieParser());
app.use(
  session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const productsController =
  new ProductsController();
const usersController = new UserController();

app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set(
  'views',
  path.join(path.resolve(), 'src', 'views')
);

app.get('/register', usersController.getRegister);
app.get('/login', usersController.getLogin);
app.post('/login', usersController.postLogin);
app.get('/logout', usersController.logout);
app.post(
  '/register',
  usersController.postRegister
);
app.get(
  '/',
  setLastVisit,
  auth,
  productsController.getProducts
);
app.get(
  '/add-product',
  auth,
  productsController.getAddProduct
);

app.get(
  '/update-product/:id',
  auth,
  productsController.getUpdateProductView
);

app.post(
  '/delete-product/:id',
  auth,
  productsController.deleteProduct
);

app.post(
  '/',
  auth,
  uploadFile.single('imageUrl'),
  validationMiddleware,
  productsController.postAddProduct
);

app.post(
  '/update-product',
  auth,
  productsController.postUpdateProduct
);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


//clipboeard
// export interface User {
//   id: number;
//   name: string;
//   activatedOn: Date;
//   deactivatedOn: Date | null;
//   customerId: number;
// }

// export interface Subscription {
//   id: number;
//   customerId: number;
//   monthlyPriceInCents: number;
// }

/**
 * 
 * Computes the monthly charge for a given subscription.
 *
 * @returns The total monthly bill for the customer in cents, rounded
 * to the nearest cent. For example, a bill of $20.00 should return 2000.
 * If there are no active users or the subscription is null, returns 0.
 *
 * @param month - Always present
 *   Has the following structure:
 *   "2022-04"  // April 2022 in YYYY-MM format
 *
 * @param subscription - May be null
 *   If present, has the following structure (see Subscription interface):
 *   {
 *     'id': 763,
 *     'customerId': 328,
 *     'monthlyPriceInCents': 359  // price per active user per month
 *   }
 *
 * @param users - May be empty, but not null
 *   Has the following structure (see User interface):
 *   [
 *     {
 *       id: 1,
 *       name: "Employee #1",
 *       customerId: 1,
 *   
 *       // when this user started
 *       activatedOn: new Date("2021-11-04"),
 *   
 *       // last day to bill for user
 *       // should bill up to and including this date
 *       // since user had some access on this date
 *       deactivatedOn: new Date("2022-04-10")
 *     },
 *     {
 *       id: 2,
 *       name: "Employee #2",
 *       customerId: 1,
 *   
 *       // when this user started
 *       activatedOn: new Date("2021-12-04"),
 *   
 *       // hasn't been deactivated yet
 *       deactivatedOn: null
 *     },
 *   ]
 */
// export function monthlyCharge(yearMonth: string, subscription: Subscription | null, users: User[]): number {
//   // Parse the year and month from the input string
//   const [year, month] = yearMonth.split('-').map(Number);
  
//   // Determine the billing period
//   const firstDay = firstDayOfMonth(new Date(year, month - 1));
//   const lastDay = lastDayOfMonth(new Date(year, month - 1));

//   // Filter active users within the billing period
//   const activeUsers = users.filter(user => {
//     return user.activatedOn <= lastDay && (user.deactivatedOn === null || user.deactivatedOn >= firstDay);
//   });

//   // Calculate the total monthly charge based on the number of active users and the subscription price
//   const monthlyPricePerUser = subscription ? subscription.monthlyPriceInCents : 0;
//   const totalMonthlyCharge = activeUsers.length * monthlyPricePerUser;

//   // Round the total monthly charge to the nearest cent
//   return Math.round(totalMonthlyCharge);
// }


/*******************
* Helper functions *
*******************/

/**
  Takes a Date instance and returns a Date which is the first day
  of that month. For example:

  firstDayOfMonth(new Date(2022, 3, 17)) // => new Date(2022, 3, 1)

  Input type: Date
  Output type: Date
**/
// function firstDayOfMonth(date: Date): Date {
//   return new Date(date.getFullYear(), date.getMonth(), 1)
// }

/**
  Takes a Date object and returns a Date which is the last day
  of that month. For example:

  lastDayOfMonth(new Date(2022, 3, 17)) // => new Date(2022, 3, 31)

  Input type: Date
  Output type: Date
**/
// function lastDayOfMonth(date: Date): Date {
//   return new Date(date.getFullYear(), date.getMonth() + 1, 0)
// }

/**
  Takes a Date object and returns a Date which is the next day.
  For example:

  nextDay(new Date(2022, 3, 17)) // => new Date(2022, 3, 18)
  nextDay(new Date(2022, 3, 31)) // => new Date(2022, 4, 1)

  Input type: Date
  Output type: Date
**/
// function nextDay(date: Date): Date {
//   return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
// }

//2nd task 
// Prorating Subscriptions
// Background
// Our company has started selling to larger customers, so we are creating subscription tiers with different feature sets to cater to our customers’ unique needs. We previously charged every customer a flat fee per month, but now we plan on charging for the number of users active on the customer's subscription plan. As a result, we're changing our billing system.

// Instructions
// You’ve picked up the work item to implement the logic to compute the monthly charge:

// Prorating Subscriptions (#8675309)
// We'd like you to implement a monthlyCharge function to calculate the total monthly bill for a customer.

// Customers are billed based on their subscription tier. We charge them a prorated amount for the portion of the month each user’s subscription was active. For example, if a user was activated or deactivated part way through the month, then we charge them only for the days their subscription was active.

// We want to bill customers for all days users were active in the month (including any activation and deactivation dates, since the user had some access on those days).

// We do need to support historical calculations (previous dates)
// We only charge whole cents
// Notes
// Here’s an idea of how we might go about this:

// Calculate a daily rate for the subscription tier
// For each day of the month, identify which users had an active subscription on that day
// Multiply the number of active users for the day by the daily rate to calculate the total for the day
// Return the running total for the month at the end
// Testing
// The provided unit tests only cover a few cases that one of your colleagues shared, so you should plan to add your own tests to ensure that your solution handles any edge cases.

// Notes
// It’s more important for the return value to be correct than it is for the algorithm to be highly optimized.
// You should not change function names or return types of the provided functions since our test cases depend on those not changing.

// export interface User {
//   id: number;
//   name: string;
//   activatedOn: Date;
//   deactivatedOn: Date | null;
//   customerId: number;
// }

// export interface Subscription {
//   id: number;
//   customerId: number;
//   monthlyPriceInCents: number;
// }

// /**
//  * Computes the monthly charge for a given subscription.
//  *
//  * @returns The total monthly bill for the customer in cents, rounded
//  * to the nearest cent. For example, a bill of $20.00 should return 2000.
//  * If there are no active users or the subscription is null, returns 0.
//  *
//  * @param month - Always present
//  *   Has the following structure:
//  *   "2022-04"  // April 2022 in YYYY-MM format
//  *
//  * @param subscription - May be null
//  *   If present, has the following structure (see Subscription interface):
//  *   {
//  *     'id': 763,
//  *     'customerId': 328,
//  *     'monthlyPriceInCents': 359  // price per active user per month
//  *   }
//  *
//  * @param users - May be empty, but not null
//  *   Has the following structure (see User interface):
//  *   [
//  *     {
//  *       id: 1,
//  *       name: "Employee #1",
//  *       customerId: 1,
//  *   
//  *       // when this user started
//  *       activatedOn: new Date("2021-11-04"),
//  *   
//  *       // last day to bill for user
//  *       // should bill up to and including this date
//  *       // since user had some access on this date
//  *       deactivatedOn: new Date("2022-04-10")
//  *     },
//  *     {
//  *       id: 2,
//  *       name: "Employee #2",
//  *       customerId: 1,
//  *   
//  *       // when this user started
//  *       activatedOn: new Date("2021-12-04"),
//  *   
//  *       // hasn't been deactivated yet
//  *       deactivatedOn: null
//  *     },
//  *   ]
//  */
// export function monthlyCharge(yearMonth: string, subscription: Subscription | null, users: User[]): number {
//   //here we are parsing moth and year from the inputs 
//   const [years, months] = yearMonth.split('-').map(Number);
  
//   //here we are finding billing period
//   const first_Day = firstDayOfMonth(new Date(years, months - 1));
//   const last_Day = lastDayOfMonth(new Date(years, months - 1));
  
//   //here is filter based on user
//   const active_Users = users.filter(user => {
//     return user.activatedOn <= last_Day && (user.deactivatedOn === null || user.deactivatedOn >= first_Day);
//   });
  
//   //here calculating total monthly charge with help of the number of active users and the subscription price
//   const monthlyPricePerUser = subscription ? subscription.monthlyPriceInCents : 0;
//   const totalMonthlyCharge = active_Users.length * monthlyPricePerUser;
//   //here Round was done
//   return Math.round(totalMonthlyCharge);
// }

// /*******************
// * Helper functions *
// *******************/

// /**
//   Takes a Date instance and returns a Date which is the first day
//   of that month. For example:

//   firstDayOfMonth(new Date(2022, 3, 17)) // => new Date(2022, 3, 1)

//   Input type: Date
//   Output type: Date
// **/
// function firstDayOfMonth(date: Date): Date {
//   return new Date(date.getFullYear(), date.getMonth(), 1)
// }

// /**
//   Takes a Date object and returns a Date which is the last day
//   of that month. For example:

//   lastDayOfMonth(new Date(2022, 3, 17)) // => new Date(2022, 3, 31)

//   Input type: Date
//   Output type: Date
// **/
// function lastDayOfMonth(date: Date): Date {
//   return new Date(date.getFullYear(), date.getMonth() + 1, 0)
// }

// /**
//   Takes a Date object and returns a Date which is the next day.
//   For example:

//   nextDay(new Date(2022, 3, 17)) // => new Date(2022, 3, 18)
//   nextDay(new Date(2022, 3, 31)) // => new Date(2022, 4, 1)

//   Input type: Date
//   Output type: Date
// **/
// function nextDay(date: Date): Date {
//   return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
// }