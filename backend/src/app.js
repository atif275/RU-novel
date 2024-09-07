const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const threadRoutes = require('./routes/ForumThreadRoutes');  // Adjust the path as necessary
const bookThreadRoutes = require('./routes/BookThreadRoutes');

const session = require('express-session');
const path = require('path');
const passport = require('../Controller/Oauth'); // Import the passport configuration
// const Books = require('../model/BookThread');
const Review = require('../model/reviews');
const submissionRoutes = require('./routes/submissionRoutes');
const User = require('../model/user');


// FOR DATA INSERTION INTO THE TABLES:
// const PopularThread = require('./models/PopularThread'); // Adjust path as necessary
// const CommunityThread = require('./models/CommunityThread'); // Adjust path as necessary
// const FictionThread = require('./models/FictionThread'); 
// const DiscussionThread = require('./models/DiscussionThread'); 
// const ForumThread = require('./models/ForumThread'); 
// const RecentThread = require('./models/RecentThreads'); 
// const MembersThread = require('./models/MembersThread'); 
const BookThread = require('./models/BookThread'); // Ensure the path is correct
const Book = require('./models/books');
const Submission = require('./models/Submission'); // Import the Submission model

/////////
dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, "/frontend/build")));

const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
//const corsOptions = {
//  origin: 'https://ru-novel.ru',
//  methods: ['GET', 'POST', 'PUT', 'DELETE'],
 // allowedHeaders: ['Content-Type', 'Authorization'],
 // credentials: true,  // If you want to allow cookies, otherwise you can remove this
//};
const corsOptions = {
  origin: function (origin, callback) {

    const allowedOrigins = ['https://ru-novel.ru', 'https://www.ru-novel.ru', 'http://localhost:5001'];
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


app.use(session({
  secret: '1234asas',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

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



// const insertDummyData = async () => {
//     const dummyData = [
//         { username: "author1", title: "Fiction One", status: "Pending", submittedDate: new Date("2023-08-01") },
//         { username: "author2", title: "Fiction Two", status: "Pending", submittedDate: new Date("2023-07-22") },
//         { username: "author3", title: "Fiction Three", status: "Rejected", submittedDate: new Date("2023-06-15"), note: "Grammar issues in the first few chapters." },
//         { username: "author4", title: "Fiction four", status: "Pending", submittedDate: new Date("2023-08-01") },
//         { username: "author5", title: "Fiction five", status: "Pending", submittedDate: new Date("2023-07-22") },
//     ];

//     try {
//         await Submission.insertMany(dummyData);
//         console.log('Dummy data inserted successfully');
//     } catch (error) {
//         console.error('Error inserting dummy data:', error);
//     }
// };

// // Uncomment to insert dummy data
//  insertDummyData();



// Routes



app.get('/api/hello', (req, res) => {
  res.send('Hello World from the backend!');
});

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
    const userEmail = req.user.user.email;
    if (req.user.isNewUser) {
      res.redirect(`http://localhost:3000/google/account?email=${encodeURIComponent(userEmail)}`);
    } else  {
      res.redirect(`http://localhost:3000?email=${encodeURIComponent(userEmail)}`);
      
    }
    
  }
);

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email','profile'] })
);

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: 'http://localhost:3000/error' // Redirects if authentication fails
  }),
  (req, res) => {
    const userEmail = req.user.user.email; // Extract the email from req.user

    if (!userEmail) {
      // Redirect to an error page if the email is missing
      return res.redirect('http://localhost:3000/error');
    }

    // Handle redirection based on whether the user is new or returning
    if (req.user.isNewUser) {
      res.redirect(`http://localhost:3000/facebook/account?email=${encodeURIComponent(userEmail)}`);
    } else {
      res.redirect(`http://localhost:3000?name=${encodeURIComponent(userEmail)}`);
    }
  }
);
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
  const { rating } = req.body;

  try {
    // Find the book by name
    const book = await BookThread.findOne({ title: bookName });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Update the overall rating
    const totalRatings = book.stats.ratingCount || 0;
    const currentOverallRating = book.stats.rating.overall || 0;

    const newOverallRating = ((currentOverallRating * totalRatings) + rating) / (totalRatings + 1);

    book.stats.rating.overall = newOverallRating;
    book.stats.ratingCount = totalRatings + 1;

    await book.save();

    res.json({ message: 'Rating updated successfully', book });
  } catch (error) {
    console.error('Error updating rating:', error);
    res.status(500).json({ message: 'Server error' });
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

// const insertData = async () => {
//   try {
//     // Define book data
//     const bookData = {
//       title: "Super Supportive",
//       url: "/fiction/63759/super-supportive",
//       coverImage: "https://www.royalroadcdn.com/public/covers-large/63759-super-supportive.jpg?time=1691780497",
//       tags: ["Original", "LitRPG", "Progression", "Super Heroes", "Psychological", "Male Lead", "Adventure", "Fantasy", "Sci-fi", "First Contact", "Low Fantasy", "Magic", "School Life", "Slice of Life"],
//       stats: {
//           followers: "25,939",
//           rating: 3.84,
//           pages: "3,097",
//           views: "13,998,913",
//           chapters: "163",
//           updatedDate: "August 11, 2024"
//       },
//       description: "Readers can expect: slice of life, darkness, slice of life, comedy, slice of life, action, character focus, and tons of world building on multiple worlds. I like danger and also alien beverage etiquette. This story is about: a teenager named Alden growing up and finding his place in a universe with Systems, superheroes, and alien wizards. Super Supportive will be very, very long. The burn will be slow, and, I hope, better for it. Everyone wants superpowers, including Alden Thorn. But even if he's lucky enough to be one of the few humans granted magical abilities by the extraterrestrial System that's been running things on Earth for decades, his goal of being a battlefield support hero is still a long way off. He's got determination on his side and maybe a murderous alien desk clerk, too. The universe is a complicated place. Alden's about to meet it. I started writing this because I wanted to read a character-oriented superhero origin story every step of the way from the very beginning. And I also wanted to write as thoughtfully as I could about a System and aliens. It's grown from my initial vision, and it continues to grow. But the core remains the same. If you decide to come along for the ride, thank you!  I'm having a lot of fun here. I hope you will, too. ** This story has stats, but they don't appear in the early chapters. **Violence and darkness are present. Updates: Usually on Sundays and Wednesdays (Pacific Time Zone). I'm currently taking a couple of posting days off/month to give me more writing time per chapter and maintain quality."
//   };
  
//     // Create a new BookThread instance with the defined data
//     const bookThread = new BookThread(bookData);

//     // Save the new book thread to the database
//     await bookThread.save();

//     console.log('Book data inserted successfully');
//   } catch (error) {
//     console.error('Error inserting book data:', error);
//   }
// };

// // Call the function to execute insertion
// insertData();
// const insertData = async () => {
//   try {
//     // Define avatar URLs for random assignment
//     const avatarURLs = [
//       'https://www.royalroadcdn.com/public/avatars/avatar-2-AADAeQUxBBU.png?time=1712665249',
//       'https://www.royalroadcdn.com/public/avatars/avatar-1057-AACAroJMTRM.png?time=1683211664',
//       'https://www.royalroadcdn.com/public/avatars/avatar-261647-AACAPYxZNRQ.png?time=1698784338',
//       'https://www.royalroadcdn.com/public/avatars/avatar-19990.jpg',
//       'https://www.royalroad.com/dist/img/anon.jpg'
//     ];

//     // Array to hold dummy member data
//     const data = Array.from({ length: 20 }, (_, index) => ({
//       username: `User${index}`,
//       role: index % 3 === 0 ? 'staff' : 'member',
//       avatarURL: avatarURLs[Math.floor(Math.random() * avatarURLs.length)],
//       joined: new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toLocaleString(),
//       lastVisit: `${Math.floor(Math.random() * 24)} hours ago`,
//       fictions: Math.floor(Math.random() * 10),
//       posts: Math.floor(Math.random() * 5000),
//       level: Math.floor(Math.random() * 30) + 1
//     }));

//     for (const item of data) {
//       const membersThread = new MembersThread(item);
//       await membersThread.save();
//     }

//     console.log('Data inserted successfully');
//   } catch (error) {
//     console.error('Error inserting data:', error);
//   }
// };

// insertData();


// const insertData = async () => {
//   try {
//     const data = [
      
//       {
//         title: "The weight of 10k views",
//         author: "FauxPraetor",
//         profileUrl: "https://www.google.com",
//         novelName: "Celebration",
//         createdAt: new Date(),
//       },
//       {
//         title: "Help remembering a book",
//         author: "Bigsexyman84",
//         profileUrl: "https://www.google.com",
//         novelName: "I forgot the title...",
//         createdAt: new Date(),
//       },
//       {
//         title: "Ever Wonder What Happened To John Brown? Well, this is it. *NOT MY STORY*",
//         author: "The Commentator",
//         profileUrl: "https://www.google.com",
//         novelName: "Marketing",
//         createdAt: new Date(),
//       },
//       {
//         title: "5 favorites on TCBS",
//         author: "Firniel",
//         profileUrl: "https://www.google.com",
//         novelName: "Celebration",
//         createdAt: new Date(),
//       },
//       {
//         title: "100 Favourites",
//         author: "Shocker",
//         profileUrl: "https://www.google.com",
//         novelName: "Celebration",
//         createdAt: new Date(),
//       },
//       {
//         title: "Book 3 Complete, Book 1 Edit complete. Big scotch time.",
//         author: "AbnormalVAverage",
//         profileUrl: "https://www.google.com",
//         novelName: "Celebration",
//         createdAt: new Date(),
//       },
//       {
//         title: "Help Me! Heroes Are Trying To Make Me",
//         author: "PheonixOfficial",
//         profileUrl: "https://www.google.com",
//         novelName: "Promt you fiction",
//         createdAt: new Date(),
//       },
//       {
//         title: "Been gone for a few years, how's RR?",
//         author: "Kamikoto",
//         profileUrl: "https://www.google.com",
//         novelName: "General",
//         createdAt: new Date(),
//       },
//     ];

//     for (const item of data) {
//       const recentThread = new RecentThread(item);
//       await recentThread.save();
//     }

//     console.log('Data inserted successfully');
//   } catch (error) {
//     console.error('Error inserting data:', error);
//   }
// };

// insertData();


// Define routes here
// const insertData = async () => {
//   try {
//     // // Inserting into PopularThreads
//     // const popularThread = new PopularThread({
//     //   title: "Marketing: Welcome to The Tavern. All MCs welcome! Come, have a drink.",
//     //   replies: 3440,
//     //   views: 42830,
//     //   author: "Mekanip",
//     //   date: new Date("2024-01-28T21:53:00Z"),
//     //   lastPoster: "Fluffy Marshmallow",
//     //   lastPostDate: new Date("2024-08-03T21:49:00Z"),
//     //   avatarUrl: "https://www.royalroadcdn.com/public/avatars/avatar-452028-AACA-RXP1BQ.png?time=1709485459"
//     // });
//     // await popularThread.save();

//     // // Inserting into CommunityThreads
//     // const communityThread = new CommunityThread({
//     //   title: "Celebration",
//     //   description: "Something great just happened to you on Royal Road and you want to share it? do it here! YAY!",
//     //   topics: 50,
//     //   posts: 150,
//     //   note: "Thoughts on Ai novels",
//     //   lastPoster: "Mekanip",
//     //   lastActivityDate: new Date(),
//     //   avatarUrl: "https://www.royalroadcdn.com/public/avatars/avatar-452028-AACA-RXP1BQ.png?time=1709485459"
//     // });
//     // await communityThread.save();

//     // const fictionThread = new FictionThread({
//     //   title: "Art",
//     //   description: "Submit your Art; Drawings, carvings, comics, poems... as long as it is art, and you wish to show it, this is the place!",
//     //   topics: 50,
//     //   posts: 150,
//     //   note: "Thoughts on Ai novels",
//     //   lastPoster: "Mekanip",
//     //   lastActivityDate: new Date(),
//     //   avatarUrl: "https://www.royalroadcdn.com/public/avatars/avatar-452028-AACA-RXP1BQ.png?time=1709485459"
//     // });
//     // await fictionThread.save();
//     // const discussionThread = new DiscussionThread({
//     //   title: "Guides by the Community",
//     //   description: "",
//     //   topics: 50,
//     //   posts: 150,
//     //   note: "Mastering AI-Directed Writing: The Ultimate Comprehensive Guide",
//     //   lastPoster: "Mekanip",
//     //   lastActivityDate: new Date(),
//     //   avatarUrl: "https://www.royalroadcdn.com/public/avatars/avatar-452028-AACA-RXP1BQ.png?time=1709485459"
//     // });
//     // await discussionThread.save();
//     //   const forumThread = new ForumThread({
//     //   title: "Games",
//     //   description: "A special corner to talk about games or gaming!",
//     //   topics: 50,
//     //   posts: 150,
//     //   note: "Assiciations",
//     //   lastPoster: "Mekanip",
//     //   lastActivityDate: new Date(),
//     //   avatarUrl: "https://www.royalroadcdn.com/public/avatars/avatar-452028-AACA-RXP1BQ.png?time=1709485459"
//     // });
//     // await forumThread.save();
//     const recentThread = new RecentThread({
//       title: "Review Swap: 3 Chapters. [1/1]",
//       author: "Merlin Pendragon",
//       profileUrl: "https://www.royalroad.com/profile/481525",
//       novelName: "Review Swaps",
//       createdAt:new Date(),
//       });
//       await recentThread.save();

//     console.log('Data inserted successfully');
//   } catch (error) {
//     console.error('Error inserting data:', error);
//   } 
// };

// insertData();
