const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const threadRoutes = require('./routes/ForumThreadRoutes');  // Adjust the path as necessary
const bookThreadRoutes = require('./routes/BookThreadRoutes');
const Commentt = require('../model/chaptercomments')
const session = require('express-session');
const axios = require('axios');
const path = require('path');
 const passport = require('../Controller/Oauth'); // Import the passport configuration
 const LinkPassport = require('../Controller/LinkingOauth');
//const passport = require('../Controller/passport');
// const Books = require('../model/BookThread');
const Review = require('../model/reviews');
const submissionRoutes = require('./routes/submissionRoutes');
const User = require('../model/user');
const Userdb = require('../model/user');
const Subscriptiondb = require('../model/subscription');
// const authRoute = require("../router/auth");
const cookieSession = require("cookie-session");
//const passportStrategy = require("../Controller/passport");
const BookThread = require('./models/BookThread'); // Ensure the path is correct
const Book = require('./models/books');
const Submission = require('./models/Submission'); // Import the Submission model
const { YooCheckout } = require('@a2seven/yoo-checkout');


/////////

/////////
dotenv.config();

const app = express();



app.use(express.static(path.join(__dirname, "/frontend/build")));

const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());

const corsOptions = {
  origin: function (origin, callback) {

    const allowedOrigins = ['https://ru-novel.ru', 'https://www.ru-novel.ru', 'http://localhost:3000'];
    if (allowedOrigins.includes(origin) || !origin) {  // Allow requests with no origin (like Postman or server-to-server requests)

      callback(null, true);  // Allow the request if the origin is in the allowedOrigins array
    } else {
      callback(new Error('Not allowed by CORS'));  // Reject the request if the origin is not allowed
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Enable this if your front-end needs to send credentials (cookies, HTTP authentication)
};

app.use(cors(corsOptions));
app.set('trust proxy', 1);



app.use(session({
  secret: process.env.SESSION_SECRET || 'Q3a1ExLoIVXYVFhk6yU7dGL84UD78DfK',  // Make sure to use a secure secret in production
  resave: false,
  saveUninitialized: false,  // Only save sessions that are initialized
  cookie: { maxAge: 24 * 60 * 60 * 1000 }  // Session expiry in 1 day
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(LinkPassport.initialize());
app.use(LinkPassport.session());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


const checkout = new YooCheckout({
  shopId: process.env.YOOMONEY_SHOP_ID,
  secretKey: process.env.YOOMONEY_SECRET_KEY,
});


 //app.use("/auth", authRoute);
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    
    // Start the server only after the database is connected
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });








// Routes
const { YOO_SHOP_ID, YOO_SECRET_KEY } = process.env;
const { v4: uuidv4 } = require('uuid');
app.post('/api/create-payment', async (req, res) => {
  const { amount, plan, email, username, userId } = req.body;
  const idempotenceKey = uuidv4();

  try {
    const base64Credentials = Buffer.from(`${YOO_SHOP_ID}:${YOO_SECRET_KEY}`).toString('base64');

    // Make the payment request to YooMoney
    const response = await axios.post(
      'https://api.yookassa.ru/v3/payments',
      {
        amount: {
          value: amount,  // The amount for the selected plan (e.g., 3.49 or 34.99)
          currency: 'RUB',  // Currency code, e.g., RUB for rubles
        },
        confirmation: {
          type: 'redirect',  // We want to redirect the user to YooMoney’s payment page
          return_url: `https://ru-novel.ru/premium?success=true`,  // Accessing payment ID after the response is received
        },
        description: `${plan} Subscription`,  // Description of the payment
        receipt: {
          customer: {
            email: email,  // User's email for the receipt
          },
          items: [
            {
              description: `${plan} Subscription`,
              quantity: 1,
              amount: {
                value: amount,
                currency: 'RUB',
              },
              vat_code: 1,
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Basic ${base64Credentials}`,  // Authentication header
          'Idempotence-Key': idempotenceKey,  // Unique idempotence key
          'Content-Type': 'application/json',
        },
      }
    );

    // Access the response object after the API call
    const { confirmation } = response.data;
    const paymentId = response.data.id; // Extract the payment ID
    let subscription = await Subscriptiondb.findOne({ username });

    if (subscription) {
      // If a subscription exists, update its details
      subscription.amount = amount;
      subscription.subscriptionType = plan.toLowerCase();
      subscription.paymentId = paymentId,  // Save the payment ID from YooMoney
      subscription.paymentUrl = confirmation.confirmation_url,
      subscription.startDate = new Date();
      subscription.status = 'pending';
      console.log(`Subscription for user ${username} found and will be updated.`);
    } else {
   
    // Save subscription with 'pending' status
     subscription = new Subscriptiondb({
      userId: userId,  
      username: username,
      subscriptionType: plan.toLowerCase(),
      amount,
      currency: 'RUB',
      paymentId: paymentId,  // Save the payment ID from YooMoney
      paymentUrl: confirmation.confirmation_url,
      status: 'pending',
      startDate: new Date(),
    });
    
  }
    await subscription.save();
    // Return payment URL to frontend for redirection
    res.json({ paymentUrl: confirmation.confirmation_url });

  } catch (error) {
    console.error('Error creating payment:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error creating payment' });
  }
});



// After successful payment, update subscription status
app.post('/api/payment-success', async (req, res) => {
  const { paymentId } = req.body;

  try {
    const subscription = await Subscriptiondb.findOne({ paymentId });

    if (subscription) {
      subscription.status = 'active';
      subscription.endDate = new Date(subscription.startDate.getFullYear() + (subscription.subscriptionType === 'yearly' ? 1 : 0), subscription.startDate.getMonth() + (subscription.subscriptionType === 'monthly' ? 1 : 0));
      
      console.log("userid in payment-success: "+subscription.userId)
      const username = subscription.username;
      // Update user's premium status
      const user = await Userdb.findOne({username});
      console.log("user email:"+user.email);
      user.premium = true;
      await subscription.save();
      await user.save();

      res.json({ message: 'Subscription activated successfully' });
    } else {
      res.status(404).json({ message: 'Subscription not found' });
    }
  } catch (error) {
    console.error('Error activating subscription:', error.message);
    res.status(500).json({ message: 'Error activating subscription' });
  }
});

// Manage Subscription (cancel, upgrade, renew)
app.post('/api/manage-subscription', async (req, res) => {
  const { action, paymentId } = req.body;
  console.log("---------");
  console.log("action = "+action);
  console.log("paymentId = "+paymentId);
  console.log("---------");

  try {
    const subscription = await Subscriptiondb.findOne({ paymentId });

    if (!subscription) {
      console.log("sub not found in manage subs")
      return res.status(404).json({ message: 'Subscription not found' });
    }

    if (action === 'cancel') {
      subscription.status = 'canceled';
      subscription.autoRenewal = false;
      // const userId = mongoose.Types.ObjectId(subscription.userId);
      console.log("userId"+subscription.userId);
      const username = subscription.username;
      // Update user premium status
      const user = await Userdb.findOne({username});

      //console.log("email == "+user);
      console.log("email == "+user.email);
      user.premium = false;
      await subscription.save();
      await user.save();
      console.log("$$$$ plan canceled successfully %%%%%");
      return res.json({ message: 'Subscription canceled' });
    }

    if (action === 'upgrade') {
      if (subscription.subscriptionType === 'monthly') {
        subscription.subscriptionType = 'yearly';
        subscription.amount = 34.99; // Yearly plan amount
        await subscription.save();
        return res.json({ message: 'Subscription upgraded to yearly' });
      }
      return res.status(400).json({ message: 'Cannot upgrade, already on yearly plan' });
    }

    if (action === 'renew') {
      const currentDate = new Date();
      if (subscription.endDate < currentDate && currentDate <= new Date(subscription.endDate.getTime() + 7 * 24 * 60 * 60 * 1000)) {
        subscription.status = 'active';
        subscription.endDate = new Date(currentDate.getFullYear() + (subscription.subscriptionType === 'yearly' ? 1 : 0), currentDate.getMonth() + (subscription.subscriptionType === 'monthly' ? 1 : 0));
        await subscription.save();
        return res.json({ message: 'Subscription renewed' });
      }
      return res.status(400).json({ message: 'Subscription cannot be renewed' });
    }
    
  } catch (error) {
    console.error('Error managing subscription:', error.message);
    res.status(500).json({ message: 'Error managing subscription' });
  }
});

app.post('/api/subscriptionn', async (req, res) => {

  try {
    console.log("entered fetch subsss");
    const { username } = req.body; // Assume the user is authenticated
    console.log("username"+username);
    const subscription = await Subscriptiondb.findOne({ username });
    // console.log("payment id = "+subscription.paymentId);
    if (!subscription) {
      console.log("no subs found");
      return res.status(404).json({ message: 'No active subscription found.' });
    }
    console.log("subs found and send from backend");
    return res.json(subscription);
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({ message: 'Server error.' });
  }



});


app.get('/api/hello', (req, res) => {
  res.send('Hello World from the backend!');
});

//maaz

app.get('/api/books', async (req, res) => {
  try {
    const books = await BookThread.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/books/:id', async (req, res) => {
  try {
    // console.log(`Fetching book with ID: ${req.params.id}`);
    const book = await BookThread.findById(req.params.id);
    if (!book) {
      console.log(`Book with ID ${req.params.id} not found.`);
      return res.status(404).json({ message: 'Book not found' });
    }
    // console.log("Book fetched successfully:", book);
    res.json(book);
  } catch (err) {
    console.error('Error occurred while fetching book:', err);
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/booksss/:id', async (req, res) => {
  try {
    // console.log(`Fetching book with ID: ${req.params.id}`);
    const book = await Submission.findById(req.params.id);
    if (!book) {
      console.log(`Book with ID ${req.params.id} not found.`);
      return res.status(404).json({ message: 'Book not found' });
    }
    // console.log("Book fetched successfully:", book);
    res.json(book);
  } catch (err) {
    console.error('Error occurred while fetching book:', err);
    res.status(500).json({ message: err.message });
  }
});


app.get('/api/reviews', async (req, res) => {
  const { bookName } = req.query;

  try {
    const query = bookName ? { bookName: bookName } : {};
    const reviews = await Review.find(query);
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: err.message });
  }
});


app.post('/api/reviews', async (req, res) => {
  const { title, text, rating, datetime, user, profilepic, bookName } = req.body;

  try {
    const newReview = new Review({
      title,
      text,
      rating: {
        overall: rating.overall,
        style: rating.style,
        story: rating.story,
        grammar: rating.grammar,
        character: rating.character
      },
      datetime: datetime || new Date(),
      user,
      profilepic,
      bookName // Store bookName
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    console.error('Error saving review:', err);
    res.status(500).json({ message: err.message });
  }
});
app.get('/api/books/:fictionId/chapters/:chapterId', async (req, res) => {
  const { fictionId, chapterId } = req.params;

  try {
    // Fetch the book thread document by fictionId
    const book = await BookThread.findById(fictionId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Find the specific chapter within the book's chapters array
    const chapter = book.chapters.find(ch => ch._id.toString() === chapterId);

    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    // Return the chapter along with some additional book information
    res.json({
      ...chapter.toObject(),
      fictionTitle: book.title,
      authorName: book.author,
      authorId: book.authorId,  // Assuming this field exists in your BookThread schema
      fictionId: book._id,
      bannerImage: book.image // Assuming the banner image is the same as the book's image
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/booksss/:fictionId/chapters/:chapterId', async (req, res) => {
  const { fictionId, chapterId } = req.params;

  try {
    // Fetch the book thread document by fictionId
    const book = await Submission.findById(fictionId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Find the specific chapter within the book's chapters array
    const chapter = book.chapters.find(ch => ch._id.toString() === chapterId);

    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    // Return the chapter along with some additional book information
    res.json({
      ...chapter.toObject(),
      fictionTitle: book.title,
      authorName: book.author,
      authorId: book.authorId,  // Assuming this field exists in your BookThread schema
      fictionId: book._id,
      bannerImage: book.image // Assuming the banner image is the same as the book's image
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



app.get('/api/current-user', (req, res) => {
  console.log('Session:', req.session); // Log session data
  console.log('Authenticated user:', req.user); // Log the user data
  
  if (req.isAuthenticated()) {
    const user = {
      username: req.user.username,
      profilePicture: req.user.profilePicture,
      email: req.user.email
    };
    res.json(user);
  } else {
    res.status(401).json({ message: 'User not authenticated' });
  }
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    console.log('req.user:', req.user);
    const userEmail = req.user.email;
    console.log('userEmail at calback ===:' +userEmail);
    if (req.user.isNewUser) {
      res.redirect(`https://ru-novel.ru/google/account?email=${encodeURIComponent(userEmail)}`);
    } else  {
      res.redirect(`https://ru-novel.ru?email=${encodeURIComponent(userEmail)}`);
      
    }
    
  }
);

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email','profile'] })
);

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: 'https://ru-novel.ru/error' // Redirects if authentication fails
  }),
  (req, res) => {
    const userEmail = req.user.email; // Extract the email from req.user
    console.log('facebook userEmail at calback ===:' +userEmail);
    if (!userEmail) {
      // Redirect to an error page if the email is missing
      return res.redirect('https://ru-novel.ru/error');
    }

    // Handle redirection based on whether the user is new or returning
    if (req.user.isNewUser) {
      res.redirect(`https://ru-novel.ru/facebook/account?email=${encodeURIComponent(userEmail)}`);
    } else {
      res.redirect(`https://ru-novel.ru?email=${encodeURIComponent(userEmail)}`);
    }
  }
);



app.get('/auth/google/callback/link', 
  LinkPassport.authenticate('google-link', { failureRedirect: '/account/externallogins' }),
  (req, res) => {
    res.redirect('https://ru-novel.ru/account/externallogins?status=success&provider=google');
  }
);


app.get('/auth/facebook/callback/link',
  LinkPassport.authenticate('facebook-link', { failureRedirect: '/account/externallogins' }),
  (req, res) => {
    res.redirect('https://ru-novel.ru/account/externallogins?status=success&provider=facebook');
  }
);



// Google linking route with userId in state
app.get('/auth/google/link', (req, res, next) => {
  const userId = req.query.userId;  // Extract userId from query parameter
  req.session.userId = userId;      // Save it in the session
  req.session.save(() => {
    LinkPassport.authenticate('google-link', {
      scope: ['profile', 'email'],
      state: JSON.stringify({ userId })
    })(req, res, next);
  });
});

// Facebook linking route with userId in state
app.get('/auth/facebook/link', (req, res, next) => {
  const userId = req.query.userId;  // Extract userId from query parameter
  req.session.userId = userId;      // Save it in the session
  req.session.save(() => {
    LinkPassport.authenticate('facebook-link', {
      scope: ['email'],
      state: JSON.stringify({ userId })
    })(req, res, next);
  });
});



const Comment = require('../model/chaptercomments'); // Assuming the model is in the 'models' directory

app.get('/api/load/comment', async (req, res) => {
  try {
    const comments = await Comment.find(); // This will fetch all comments
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
});

app.use('/api', threadRoutes);
app.use('/api', bookThreadRoutes);
app.use('/api', submissionRoutes);
app.use('/', require('../router/routes'));




// maaz 
app.get('/api/books', async (req, res) => {
  try {
    const books = await BookThread.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/books/:id', async (req, res) => {
  try {
    // console.log(`Fetching book with ID: ${req.params.id}`);
    const book = await BookThread.findById(req.params.id);
    if (!book) {
      console.log(`Book with ID ${req.params.id} not found.`);
      return res.status(404).json({ message: 'Book not found' });
    }
    // console.log("Book fetched successfully:", book);
    res.json(book);
  } catch (err) {
    console.error('Error occurred while fetching book:', err);
    res.status(500).json({ message: err.message });
  }
});


app.get('/api/reviews', async (req, res) => {
  const { bookName } = req.query;

  try {
    const query = bookName ? { bookName: bookName } : {};
    const reviews = await Review.find(query);
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/reviews', async (req, res) => {
  const { title, text, rating, datetime, user, profilepic, bookName } = req.body;

  try {
    const newReview = new Review({
      title,
      text,
      rating: {
        overall: rating.overall,
        style: rating.style,
        story: rating.story,
        grammar: rating.grammar,
        character: rating.character
      },
      datetime: datetime || new Date(),
      user,
      profilepic,
      bookName // Store bookName
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    console.error('Error saving review:', err);
    res.status(500).json({ message: err.message });
  }
});
app.get('/api/books/:fictionId/chapters/:chapterId', async (req, res) => {
  const { fictionId, chapterId } = req.params;

  try {
    // Fetch the book thread document by fictionId
    const book = await BookThread.findById(fictionId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Find the specific chapter within the book's chapters array
    const chapter = book.chapters.find(ch => ch._id.toString() === chapterId);

    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    // Return the chapter along with some additional book information
    res.json({
      ...chapter.toObject(),
      fictionTitle: book.title,
      authorName: book.author,
      authorId: book.author,  // Assuming this field exists in your BookThread schema
      fictionId: book._id,
      bannerImage: book.image // Assuming the banner image is the same as the book's image
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/current-user', (req, res) => {
  console.log('Session:', req.session); // Log session data
  console.log('Authenticated user:', req.user); // Log the user data
  
  if (req.isAuthenticated()) {
    const user = {
      username: req.user.username,
      profilePicture: req.user.profilePicture,
      email: req.user.email
    };
    res.json(user);
  } else {
    res.status(401).json({ message: 'User not authenticated' });
  }
});


app.get('/api/userssssss/:authorName', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.authorName });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/api/book/:bookName/update-ratings', async (req, res) => {
  try {
    const { bookName } = req.params;
    const { overall, style, story, grammar, character } = req.query; // Retrieve ratings from query parameters

    if (!overall || !style || !story || !grammar || !character) {
      return res.status(400).json({ message: 'Missing rating parameters' });
    }

    const book = await BookThread.findOne({ title: bookName });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const currentRatings = book.stats.rating;
    const currentRatingCount = book.stats.ratingCount || 0;

    // Calculate new ratings
    const newRatingCount = currentRatingCount + 1;
    const newRatings = {
      overall: ((currentRatings.overall * currentRatingCount) + Number(overall)) / newRatingCount,
      style: ((currentRatings.style * currentRatingCount) + Number(style)) / newRatingCount,
      story: ((currentRatings.story * currentRatingCount) + Number(story)) / newRatingCount,
      grammar: ((currentRatings.grammar * currentRatingCount) + Number(grammar)) / newRatingCount,
      character: ((currentRatings.character * currentRatingCount) + Number(character)) / newRatingCount,
    };

    // Update book ratings and rating count
    book.stats.rating = newRatings;
    book.stats.ratingCount = newRatingCount;

    await book.save();

    res.json({ message: 'Ratings updated successfully', newRatings });
  } catch (error) {
    console.error('Error updating book ratings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/book/:bookName/rate', async (req, res) => {
  const { bookName } = req.params;
  const { rating, email } = req.body;

  try {
    const user = await User.findOne({ email });
    const book = await BookThread.findOne({ title: bookName });

    if (!user || !book) {
      return res.status(404).json({ message: 'Book or user not found' });
    }

    // Check if the user has already rated the book
    const existingRating = book.ratings.find((r) => r.user.equals(user._id));

    if (existingRating) {
      // Update the existing rating
      existingRating.rating = rating;
    } else {
      // Add a new rating
      book.ratings.push({ user: user._id, rating });
    }

    await book.save();
    res.status(200).json({ message: 'Rating updated successfully' });
  } catch (error) {
    console.error('Error rating the book:', error);
    res.status(500).json({ message: 'Error rating the book' });
  }
});

app.get('/api/book/:bookName/getrate', async (req, res) => {
  const { bookName } = req.params;
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });
    const book = await BookThread.findOne({ title: bookName });

    if (!user || !book) {
      return res.status(404).json({ message: 'Book or user not found' });
    }

    const userRating = book.ratings.find((r) => r.user.equals(user._id));
    if (userRating) {
      return res.status(200).json({ rating: userRating.rating });
    } else {
      return res.status(200).json({ rating: null });
    }
  } catch (error) {
    console.error('Error fetching user rating:', error);
    res.status(500).json({ message: 'Error fetching user rating' });
  }
});


app.post('/api/reviews/:reviewId/upvotes', async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findByIdAndUpdate(reviewId, { $inc: { upvotes: 1 } }, { new: true });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update upvote' });
  }
});

app.post('/api/reviews/:reviewId/downvotes', async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findByIdAndUpdate(reviewId, { $inc: { downvotes: 1 } }, { new: true });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update downvote' });
  }
});

app.post('/api/user/favorite', async (req, res) => {
  try {
    const { bookName, email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const book = await BookThread.findOne({ title: bookName });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const isFavorite = user.favorites.includes(bookName);
    if (isFavorite) {
      // Remove from favorites and decrement followers
      user.favorites = user.favorites.filter(favorite => favorite !== bookName);
      book.stats.followers = Math.max(0, (book.stats.followers || 0) - 1);
    } else {
      // Add to favorites and increment followers
      user.favorites.push(bookName);
      book.stats.followers = (book.stats.followers || 0) + 1;
    }

    await user.save();
    await book.save();

    return res.json({ message: `Book ${isFavorite ? 'removed from' : 'added to'} favorites successfully` });
  } catch (error) {
    console.error('Error updating favorites and followers:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/user/follow', async (req, res) => {
  try {
    const { authorName, email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isFollowing = user.follows.includes(authorName);
    if (isFollowing) {
      // Unfollow the author
      user.follows = user.follows.filter(follow => follow !== authorName);
    } else {
      // Follow the author
      user.follows.push(authorName);
    }

    await user.save();

    return res.json({ message: `Author ${isFollowing ? 'unfollowed' : 'followed'} successfully` });
  } catch (error) {
    console.error('Error updating follow status:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/user/readlater', async (req, res) => {
  try {
    const { bookName, email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isReadLater = user.readLater.includes(bookName);
    if (isReadLater) {
      // Remove from read later
      user.readLater = user.readLater.filter(item => item !== bookName);
    } else {
      // Add to read later
      user.readLater.push(bookName);
    }

    await user.save();

    return res.json({ message: `Book ${isReadLater ? 'removed from' : 'added to'} Read Later successfully` });
  } catch (error) {
    console.error('Error updating Read Later:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/user/notinterested', async (req, res) => {
  try {
    const { bookName, email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isNotInterested = user.notInterested.includes(bookName);
    if (isNotInterested) {
      // Remove from not interested
      user.notInterested = user.notInterested.filter(item => item !== bookName);
    } else {
      // Mark as not interested
      user.notInterested.push(bookName);
    }

    await user.save();

    return res.json({ message: `Book ${isNotInterested ? 'removed from' : 'marked as'} Not Interested successfully` });
  } catch (error) {
    console.error('Error updating Not Interested:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});


app.post('/api/user/reading', async (req, res) => {
  const { email, bookName } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      if (!user.reading.includes(bookName)) {
        user.reading.push(bookName);
        await user.save();
      }
      res.status(200).send({ message: 'Book added to reading list' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error adding book to reading list:', error);
    res.status(500).send({ message: 'Server error' });
  }
});


// Assuming you're using Express.js
app.get('/api/userssss/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email }); // Adjust 'Userdb' to match your user model
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch a book thread by title
app.get('/api/bookthreads/:title', async (req, res) => {
  try {
    const title = decodeURIComponent(req.params.title); // Decode the title if it contains any special characters
    const bookThread = await BookThread.findOne({ title: title });

    if (!bookThread) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(bookThread);
  } catch (error) {
    console.error('Error fetching book thread:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/users/:email/unfavorite', async (req, res) => {
  const { email } = req.params;
  const { bookTitle } = req.body;

  try {
      const user = await User.findOne({ email });
      if (user) {
          user.favorites = user.favorites.filter(title => title !== bookTitle);
          await user.save();
          res.status(200).json({ message: 'Book removed from favorites successfully.' });
      } else {
          res.status(404).json({ message: 'User not found.' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error removing book from favorites.', error });
  }
});

app.post('/api/users/:email/remove', async (req, res) => {
  const { email } = req.params;
  const { bookTitle } = req.body;

  try {
      const user = await User.findOne({ email });
      if (user) {
          user.readLater = user.readLater.filter(title => title !== bookTitle);
          await user.save();
          res.status(200).json({ message: 'Book removed from favorites successfully.' });
      } else {
          res.status(404).json({ message: 'User not found.' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error removing book from favorites.', error });
  }
});

app.post('/api/users/:email/stopReading', async (req, res) => {
  const { email } = req.params;
  const { bookTitle } = req.body;

  try {
      const user = await User.findOne({ email });
      if (user) {
          user.reading = user.reading.filter(title => title !== bookTitle);
          await user.save();
          res.status(200).json({ message: 'Book removed from favorites successfully.' });
      } else {
          res.status(404).json({ message: 'User not found.' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error removing book from favorites.', error });
  }
});

app.post('/api/users/:email/unfollow', async (req, res) => {
  const { email } = req.params;
  const { authorName } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
        user.follows = user.follows.filter(author => author !== authorName);
        await user.save();
        res.status(200).json({ message: 'Author unfollowed successfully.' });
    } else {
        res.status(404).json({ message: 'User not found.' });
    }
} catch (error) {
    res.status(500).json({ message: 'Error removing Author from following.', error });
}
});

app.post('/api/user/removefavorite', async (req, res) => {
  try {
    const { email, bookName } = req.body;

    // Find the user and update their favorites array
    const user = await User.findOneAndUpdate(
      { email },
      { $pull: { favorites: bookName } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Decrease the book's followers count
    await BookThread.findOneAndUpdate(
      { title: bookName },
      { $inc: { 'stats.followers': -1 } }
    );

    res.json({ message: 'Book removed from favorites successfully' });
  } catch (error) {
    console.error('Error removing book from favorites:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/user/unfollow', async (req, res) => {
  try {
    const { email, authorName } = req.body;

    // Find the user and update their follows array
    const user = await User.findOneAndUpdate(
      { email },
      { $pull: { follows: authorName } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Author unfollowed successfully' });
  } catch (error) {
    console.error('Error unfollowing author:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/user/removereader', async (req, res) => {
  try {
    const { email, bookName } = req.body;

    // Find the user and update their readLater array
    const user = await User.findOneAndUpdate(
      { email },
      { $pull: { readLater: bookName } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Book removed from Read Later successfully' });
  } catch (error) {
    console.error('Error removing book from Read Later:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/user/removeNotInterested', async (req, res) => {
  try {
    const { email, bookName } = req.body;

    // Find the user and update their notInterested array
    const user = await User.findOneAndUpdate(
      { email },
      { $pull: { notInterested: bookName } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Book removed from Not Interested successfully' });
  } catch (error) {
    console.error('Error removing book from Not Interested:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/reviews/usersss/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // Find reviews where the user field matches the provided username
    const userReviews = await Review.find({ user: username });

    if (userReviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this user' });
    }

    return res.status(200).json(userReviews);
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/reviewss/:reviewId', async (req, res) => {
  const { reviewId } = req.params;

  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Assuming you're using Express.js and Mongoose

app.post('/api/book/:title/increment-views', async (req, res) => {
  const { title } = req.params;

  try {
    const book = await BookThread.findOne({ title });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.stats.views = (book.stats.views || 0) + 1;
    await book.save();

    res.status(200).json({ message: 'Book views incremented successfully' });
  } catch (error) {
    console.error('Error incrementing book views:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/commentsss', async (req, res) => {
  const { author, pfp, text, book, chapter, datetime, repcount, replies } = req.body;

  try {
      const newComment = new Comment({
          author,
          pfp,
          text,
          book,
          chapter,
          datetime,
          repcount,
          replies,
      });

      await newComment.save();
      res.status(201).json(newComment);
  } catch (error) {
      console.error('Error saving comment:', error);
      res.status(500).json({ message: 'Failed to save comment' });
  }
});

app.get('/api/commentssss', async (req, res) => {
  const { book, chapter } = req.query;

  try {
    const comments = await Commentt.find({ book, chapter });
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/comments/:commentId/reply', async (req, res) => {
  const { commentId } = req.params;
  const { author, pfp, text, datetime, repcount } = req.body;

  try {
    const comment = await Commentt.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const newReply = { author, pfp, text, datetime, repcount };

    comment.replies.push(newReply);
    await comment.save();

    res.status(201).json(newReply);
  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/comments/:commentId/rep', async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req.body; // Assuming you're passing the userId from the frontend

  try {
    const comment = await Commentt.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user has already repped the comment
    const userReppedIndex = comment.reppedBy.indexOf(userId);
    if (userReppedIndex === -1) {
      // User has not repped yet, increase the rep count and add userId to reppedBy array
      comment.repcount += 1;
      comment.reppedBy.push(userId);
    } else {
      // User has already repped, decrease the rep count and remove userId from reppedBy array
      comment.repcount -= 1;
      comment.reppedBy.splice(userReppedIndex, 1);
    }

    await comment.save();

    res.status(200).json({ repcount: comment.repcount });
  } catch (error) {
    console.error('Error toggling reputation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/comments/:commentId/reply/:replyId/rep', async (req, res) => {
  const { commentId, replyId } = req.params;
  const { userId } = req.body; // Assuming you're passing the userId from the frontend

  try {
    const comment = await Commentt.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const reply = comment.replies.id(replyId);
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    // Check if user has already repped the reply
    const userReppedIndex = reply.reppedBy.indexOf(userId);
    if (userReppedIndex === -1) {
      // User has not repped yet, increase the rep count and add userId to reppedBy array
      reply.repcount += 1;
      reply.reppedBy.push(userId);
    } else {
      // User has already repped, decrease the rep count and remove userId from reppedBy array
      reply.repcount -= 1;
      reply.reppedBy.splice(userReppedIndex, 1);
    }

    await comment.save();

    res.status(200).json({ repcount: reply.repcount });
  } catch (error) {
    console.error('Error toggling reputation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/commentss/usersss/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // Find reviews where the user field matches the provided username
    const userReviews = await Commentt.find({ author: username });

    if (userReviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this user' });
    }

    return res.status(200).json(userReviews);
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});