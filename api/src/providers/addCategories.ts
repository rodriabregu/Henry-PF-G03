import { Category } from "../db";
import { CategoryType } from "../db";

const addCategories = async () => {
    //Tipos
    await CategoryType.create({ name: 'Gender' });
    await CategoryType.create({ name: 'Garmen' });
    await CategoryType.create({ name: 'Sport' });

    /*---------------------------Categorias--------------------------------- */

    //Gender
    await Category.create({ name: 'Women', categoryTypeId: 1 })
    await Category.create({ name: 'Men', categoryTypeId: 1 })
    await Category.create({ name: 'Kids', categoryTypeId: 1 })

    //Garment
    await Category.create({ name: 'T-shirt', categoryTypeId: 2 })
    await Category.create({ name: 'Short', categoryTypeId: 2 })
    await Category.create({ name: 'Trousers', categoryTypeId: 2 })
    await Category.create({ name: 'Hoody', categoryTypeId: 2 })
    await Category.create({ name: 'Accesories', categoryTypeId: 2 })

    //Sport
    await Category.create({ name: 'Soccer', categoryTypeId: 3 })
    await Category.create({ name: 'Hockey', categoryTypeId: 3 })
    await Category.create({ name: 'Basketball', categoryTypeId: 3 })
    await Category.create({ name: 'Tennis', categoryTypeId: 3 })
    await Category.create({ name: 'Rugby', categoryTypeId: 3 })
    await Category.create({ name: 'Running', categoryTypeId: 3 })
    await Category.create({ name: 'Other', categoryTypeId: 3 })

    console.log('categorias creadas en BD')
}


export default addCategories;