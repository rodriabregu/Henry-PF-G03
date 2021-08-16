import { sequelize } from './src/db';
import app from './src/app';
import { addFilProducts } from './src/providers'

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('database connected!');
    return addFilProducts();
  })
  .then((message) => {
    console.log(message)
    app.listen(3001, function () {
      console.log('App is listening on port 3001!');
    });
  })
  .catch((err) => console.error(err));



