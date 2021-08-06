import { sequelize } from './src/db';
import app from './src/app';
import { addAllProducts, addAllFils } from './src/providers'

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('database connected!');
    //return addAllFils(["accesories", "kids", "men", "women"]);
    return addAllProducts();
  })
  .then((message) => {
    console.log(message)
    app.listen(3001, function () {
      console.log('App is listening on port 3001!');
    });
  })
  .catch((err) => console.error(err));



