import { sequelize } from './src/db';
import app from './src/app';
import { addFilProducts } from './src/providers'
import addCategories from './src/providers/addCategories'

sequelize
  .sync({ force: false })
  .then(async() => {
    console.log('database connected!');
    await addCategories();
    return addFilProducts();     
  })
  .then((message) => {
    console.log(message)
    app.listen(3001, function () {
      console.log('App is listening on port 3001!');
    });
  })
  .catch((err) => console.error(err));



