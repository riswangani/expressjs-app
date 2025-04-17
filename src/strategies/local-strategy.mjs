import passport from 'passport';
import { Strategy } from 'passport-local';
import { mockUsers } from '../utils/constans.mjs';

passport.serializeUser((user, done) => {
  console.log(`Inside serialize User`);
  console.log(user);
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  console.log(`Inside Deserializer`);
  // console.log(`Deserializing User ID: ${id}`);
  try {
    const findUser = mockUsers.find((user) => user.username === username);
    if (!findUser) throw new Error('User not found');
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy((username, password, done) => {
    console.log(`Username : ${username}`);
    console.log(`Password : ${password}`);

    try {
      const findUser = mockUsers.find((user) => user.username === username);
      if (!findUser) throw new Error('User not found');
      if (findUser.password !== password) throw new Error('Invalid password');
      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);
