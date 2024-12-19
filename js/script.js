//* Завдання 1
// Напиши функцію delay(ms), яка повертає проміс, що переходить в стан "resolved" через ms мілісекунд. Значенням промісу, яке виповнилося має бути та кількість мілісекунд, яку передали під час виклику функції delay.

const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(ms), ms);
  });
};

const logger1 = (time) => console.log(`Resolved after ${time}ms`);

// Виклич функції для перевірки
delay(2000).then(logger1); // Resolved after 2000ms
delay(1000).then(logger1); // Resolved after 1000ms
delay(1500).then(logger1); // Resolved after 1500ms

//! Завдання 2
// Перепиши функцію toggleUserState() так, щоб вона не використовувала callback-функцію callback, а приймала всього два параметри allUsers і userName і повертала проміс.

const users = [
  { name: "Mango", active: true },
  { name: "Poly", active: false },
  { name: "Ajax", active: true },
  { name: "Lux", active: false },
];

const toggleUserState = (allUsers, userName, callback) => {
  const updatedUsers = allUsers.map((user) =>
    user.name === userName ? { ...user, active: !user.active } : user
  );

  callback(updatedUsers);
};

const logger2 = (updatedUsers) => console.table(updatedUsers);

/*
 * Зараз працює так
 */
toggleUserState(users, "Mango", logger2);
toggleUserState(users, "Lux", logger2);

/*
 * Повинно працювати так
 */
toggleUserState(users, "Mango").then(logger2);
toggleUserState(users, "Lux").then(logger2);



const users2 = [
    { name: "Mango", active: true },
    { name: "Poly", active: false },
    { name: "Ajax", active: true },
    { name: "Lux", active: false },
  ];
  
  const toggleUserState2 = (allUsers, userName) => {
    return new Promise((resolve) => {
      const updatedUsers = allUsers.map((user) =>
        user.name === userName ? { ...user, active: !user.active } : user
      );
      resolve(updatedUsers);
    })
  }

  const logger3 = (updatedUsers) => console.table(updatedUsers);

  toggleUserState2(users2, "Mango").then(logger3);
toggleUserState2(users2, "Lux").then(logger3);


//*   Завдання 3
//   Перепиши функцію makeTransaction() так, щоб вона не використовувала callback-функції onSuccess і onError, а приймала всього один параметр transaction і повертала проміс.

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = (transaction, onSuccess, onError) => {
  const delay = randomIntegerFromInterval(200, 500);

  setTimeout(() => {
    const canProcess = Math.random() > 0.3;

    if (canProcess) {
      onSuccess(transaction.id, delay);
    } else {
      onError(transaction.id);
    }
  }, delay);
};

const logSuccess = (id, time) => {
  console.log(`Transaction ${id} processed in ${time}ms`);
};

const logError = (id) => {
  console.warn(`Error processing transaction ${id}. Please try again later.`);
};

/*
 * Працює так
 */
// makeTransaction({ id: 70, amount: 150 }, logSuccess, logError);
// makeTransaction({ id: 71, amount: 230 }, logSuccess, logError);
// makeTransaction({ id: 72, amount: 75 }, logSuccess, logError);
// makeTransaction({ id: 73, amount: 100 }, logSuccess, logError);
/*
 * Повинно працювати так
 */
makeTransaction({ id: 70, amount: 150 }).then(logSuccess).catch(logError);

makeTransaction({ id: 71, amount: 230 }).then(logSuccess).catch(logError);

makeTransaction({ id: 72, amount: 75 }).then(logSuccess).catch(logError);

makeTransaction({ id: 73, amount: 100 }).then(logSuccess).catch(logError);




const randomIntegerFromInterval2 = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const makeTransaction2 = (transaction) => {


  return new Promise((resolve, reject) => {
      const delay2 = randomIntegerFromInterval2(200, 500);
      console.log('', delay2);
      setTimeout(() => {
          const canProcess2 = Math.random() > 0.3;
          console.log(canProcess2);


          if (canProcess2) {
              console.log('delay on if', delay2);
              resolve({ id: transaction.id, time: delay2 });
          } else {
              reject(transaction.id);
          }
      }, delay2);
  });
};
const logSuccess2 = ({ id, time }) => {
  console.log(time);

  console.log(`Transaction ${id} processed in ${time}ms`);
};

const logError2 = ({id}) => {
  console.warn(`Error processing transaction ${id}. Please try again later.`);
};

makeTransaction2({ id: 70, amount: 150 }).then(logSuccess2).catch(logError2);

makeTransaction2({ id: 71, amount: 230 }).then(logSuccess2).catch(logError2);

makeTransaction2({ id: 72, amount: 75 }).then(logSuccess2).catch(logError2);

makeTransaction2({ id: 73, amount: 100 }).then(logSuccess2).catch(logError2);

// makeTransaction2()
// .then((id, time) => {
//     console.log(`Transaction ${id} processed in ${time}ms`);
// })
// .catch((id) => {
//     console.warn(`Error processing transaction ${id}. Please try again later.`);
// })
