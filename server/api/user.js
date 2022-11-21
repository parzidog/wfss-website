const router = require('express').Router();
const Sequelize = require('sequelize');
const { User } = require('../db');
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');

//USER ACCOUNT ROUTES
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userData = { username: username, password: password };
    let user = await User.authenticate(userData);
    res.send({ token: await user.generateToken() });
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const { firstName, lastName, gender, phoneNum, username, password, email } =
      req.body;
    const user = await User.create({
      firstName,
      lastName,
      gender,
      phoneNum,
      username,
      password,
      email,
    });
    res.send({ token: await user.generateToken() });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(error);
    }
  }
});

//user can view their own profile
router.get('/me', requireToken, async (req, res, next) => {
  try {
    const {
      id,
      firstName,
      lastName,
      gender,
      phoneNum,
      username,
      email,
      isAdmin,
    } = req.user;
    const userInfo = {
      id,
      firstName,
      lastName,
      gender,
      phoneNum,
      username,
      email,
      isAdmin,
    };
    res.send(userInfo);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//user can edit their own profile
router.put('/editMe', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    const { firstName, lastName, gender, phoneNum, username, password, email } =
      req.body;
    const updatedUser = await user.update({
      firstName,
      lastName,
      gender,
      phoneNum,
      username,
      password,
      email,
    });
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});

//checks to see if whatever input is passed into req.params exists
//req.body.value will be sent from the front end
router.post('/userExists/:input', async (req, res, next) => {
  try {
    const field = req.params.input;

    const user = await User.findOne({
      where: { [field]: req.body.value },
    });
    if (user) {
      res.send({ field, isAvailable: false });
    } else {
      res.send({ field, isAvailable: true });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//USER SHOPPINGLIST QUERIES
//gets back the shopping list of a user that is currently set to isComplete : false
router.get('/me/currentList', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    const currentList = await user.getCurrentList();
    res.send(currentList);
  } catch (error) {
    next(error);
  }
});

//gets back a certain list of a user based on the params passed in (not sure if the implementation here is right)
router.get('/me/singleList', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    const singleList = await user.getSingleList(req.body.id);
    res.send(singleList);
  } catch (error) {
    next(error);
  }
});

//gets back every list a user has had, completed or active
router.get('/me/allLists', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    const allLists = await user.getAllLists();
    res.send(allLists);
  } catch (error) {
    next(error);
  }
});

//set the logged in user's shoppingList to complete based on what's passed through as req.body
//makes a new active shoppingList for the user
router.put('/me/setCompleted', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    const listToComplete = await user.setCompleted(req.body.id);
    await user.createNewList();
    res.send(listToComplete);
  } catch (error) {
    next(error);
  }
});

//sets a shopping list to active, not sure if this is a necessary route, maybe if a user wants to reuse a shopping list they've used in the past?
router.put('/me/setActive', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    const listToSetActive = await user.setActive(req.body.id);
    res.send(listToSetActive);
  } catch (error) {
    next(error);
  }
});

//USER RECIPE QUERIES

//adds recipe to user's shopping cart, depending on the id of the recipe passed in as req.body
router.put('/me/addRecipe', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    //sends back a the record in the join table of the two associated instances
    const result = await user.addRecipeToList(req.body.id);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

//same as above, but removes recipe (will send back the new shopping list)
router.put('/me/removeRecipe', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    await user.removeRecipeFromList(req.body.id);
    const newList = await user.getCurrentList();
    res.send(newList);
  } catch (error) {
    next(error);
  }
});

// get favorited recipes
router.get('/me/favoritedrecipes', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    const favorites = await user.getFavorites();
    res.send(favorites);
  } catch (err) {
    next(err);
  }
});

// get disliked recipes
router.get('/me/dislikedrecipes', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    const dislikes = await user.getDislikes();
    res.send(dislikes);
  } catch (err) {
    next(err);
  }
});

//USER INGREDIENT QUERIES
// get owned ingredients
router.get('/me/ownedingredients', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    const ingredients = await user.getOwnedIngredients();
    res.send(ingredients);
  } catch (err) {
    next(err);
  }
});

// update favorites, dislikes, and owned ingredients
// req.body.action either 'add' or 'remove', req.body.id the recipe or ingredient
router.put('/me/updatefavorites', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (req.body.action === 'add') {
      await user.addRecipeToFavorites(req.body.id);
    } else if (req.body.action === 'remove') {
      await user.removeRecipeFromFavorites(req.body.id);
    }
    const updatedFavorites = await user.getFavorites();
    res.send(updatedFavorites);
  } catch (err) {
    next(err);
  }
});

router.put('/me/updatedislikes', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (req.body.action === 'add') {
      await user.addRecipeToDislikes(req.body.id);
    } else if (req.body.action === 'remove') {
      await user.removeRecipeFromDislikes(req.body.id);
    }
    const updatedDislikes = await user.getDislikes();
    res.send(updatedDislikes);
  } catch (err) {
    next(err);
  }
});

router.put(
  '/me/updateownedingredients',
  requireToken,
  async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.id);
      if (req.body.action === 'add') {
        await user.addIngredientToOwned(req.body.id);
      } else if (req.body.action === 'remove') {
        await user.removeIngredientFromOwned(req.body.id);
      }
      const updatedDislikes = await user.getOwnedIngredients();
      res.send(updatedDislikes);
    } catch (err) {
      next(err);
    }
  }
);

//ADMIN ROUTES for users
//admin view all user accounts
router.get('/all', requireToken, isAdmin, async (req, res, next) => {
  try {
    if (req.query.page) {
      const orderArr =
        req.query.sort === 'true'
          ? [Sequelize.fn('lower', Sequelize.col('lastName')), 'asc']
          : ['id', 'asc'];
      const { rows, count } = await User.findAndCountAll({
        order: [orderArr],
        offset: (req.query.page - 1) * 25,
        limit: 25,
        attributes: [
          'id',
          'firstName',
          'lastName',
          'gender',
          'phoneNum',
          'username',
          'password',
          'email',
          'isAdmin',
        ],
      });
      res.send({ rows, count });
    } else {
      const { rows, count } = await User.findAndCountAll({
        attributes: [
          'id',
          'firstName',
          'lastName',
          'gender',
          'phoneNum',
          'username',
          'password',
          'email',
          'isAdmin',
        ],
      });
      res.send({ rows, count });
    }
  } catch (error) {
    next(error);
  }
});

//admin view a single user account
router.get('/all/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

//admin can create new user accounts
router.post('/all', requireToken, isAdmin, async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      phoneNum,
      username,
      password,
      email,
      isAdmin,
    } = req.body;
    const user = await User.create({
      firstName,
      lastName,
      gender,
      phoneNum,
      username,
      password,
      email,
      isAdmin,
    });
    res.send(user);
  } catch (error) {
    //general check to see if username/email already exists
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(error);
    }
  }
});

//admin can edit existing user accounts
router.put('/all/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    //gave admins the ability to set other admins
    const {
      firstName,
      lastName,
      gender,
      phoneNum,
      username,
      password,
      email,
      isAdmin,
    } = req.body;
    const userToUpdate = await User.findByPk(req.params.id);
    const editedUser = await userToUpdate.update({
      firstName,
      lastName,
      gender,
      phoneNum,
      username,
      password,
      email,
      isAdmin,
    });
    res.send(editedUser);
  } catch (error) {
    next(error);
  }
});

//admin can remove user accounts
router.delete('/all/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const userToDelete = await User.findByPk(req.params.id);
    await userToDelete.destroy();
    res.send(userToDelete);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
