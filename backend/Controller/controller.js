const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Userdb = require('../model/user'); // Update the path as needed
const Orderdb = require('../model/order')
const Commentdb=require('../model/Comments')
const CommentBoxdb=require('../model/CommentsBox')
const ticketsDB=require('../model/Tckets')
const Subscriptiondb = require('../model/subscription');
const addDB = require('../model/Advrtisment');
const BookThread = require('../src/models/BookThread')
const Submission = require('../src/models/Submission')
const UtmTag = require('../model/UtmTag');
const Message = require('../model/Message');
const Border = require('../model/Border');
const { v4: uuidv4 } = require('uuid');
const QIWI_SECRET_KEY = 'your_qiwi_secret_key';
const QIWI_PUBLIC_KEY = 'your_qiwi_public_key'; // Used for client-side interactions if needed


const jwtSecret='MynameisAhsan#'
const sendResetEmail = require('./nodemailer'); 
  const bookDatabase = mongoose.connection.useDb('test');





exports.forgotPassword = async (req, res) => {
  const  email  = req.body.email;
  try {
    
    const user = await Userdb.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No user found with this email address.' });
    }

    // const token = crypto.randomBytes(32).toString('hex');
    // const resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour

    // user.resetPasswordToken = token;
    // user.resetPasswordExpires = resetTokenExpiry;
    // await user.save();

    // const resetURL = https://ru-novel.ru/reset-password/${token};
    // await sendResetEmail(email, resetURL);
   if(!user.password){
    return res.status(404).json({ message: 'No user found with this email address.' });
  }
  res.status(200).json({ message: 'Password reset email sent.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error.' });
  } 
};


exports.resetPassword = async (req, res) => {
              const { email, password } = req.body;
  try {

    // Find user by email
    const user = await Userdb.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'No user found with this email address.' });
    }

    // Hash the new password before saving it
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(password, salt);
    user.password = password;

    // Save the updated user document
    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successful.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};




exports.create = async (req, res) => {
  try {
    // Check if the email already exists
    const existingUser = await Userdb.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Generate salt and hash the password
    // const salt = await bcrypt.genSalt(10);
    // const secPassword = await bcrypt.hash(req.body.password, salt);
    const secPassword = req.body.password;


    // Create a new User instance with the role set to "author" by default
    const user = new Userdb({
      username: req.body.username,
      email: req.body.email,
      password: secPassword,
      gender: req.body.gender,
      birthday: req.body.birthday,
      referrer: req.body.referrer,
      role: "author",
    });

    // Save the User instance to MongoDB
    const savedUser = await user.save();
    res.json({ success: true, message: 'User registered successfully' });

    console.log("Data saved:", savedUser);
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).send(error);
  }
};


  exports.findOne=async(req,res)=>{

    let email=req.body.email

    try{
         let userData=  await Userdb.findOne({email})
         if(!userData.email){
          return res.status(400).json({error:"Try logging with valid Credentials"})
         }
         const pwd =await bcrypt.compare(req.body.password,userData.password)
         if(!pwd){
          return res.status(400).json({error:"Try logging with valid Credentials"})
         }


         return res.json({success:true }) 
    }
    catch(error){
      console.error("Error saving data:", error);
      res.status(500).send(error);
    }
  }
  exports.find = async (req, res) => {
    try {
        const fetched_data = await mongoose.connection.db.collection("gofood");
        const dataArray = await fetched_data.find({}).toArray();
        res.json({success:true ,dataArray: dataArray})
        console.log(dataArray)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.order1 = async (req, res) => {
  let data = req.body.order_data;
  let email = req.body.email;
  
  // Add order_date to the beginning of the data array
  data.unshift({ order_date: req.body.order_date });

  try {
      // Use findOneAndUpdate directly to either create or update the order
      await Orderdb.findOneAndUpdate(
          { email },
          { $push: { order_data: { $each: data } } }, // Use $each to push multiple elements
          { upsert: true } // Creates the document if it doesn't exist
      );
      
      res.json({ success: true });
      console.log("Order saved/updated successfully.");
  } catch (err) {
      console.error("Error in order function:", err);
      res.status(500).json({ error: err.message });
  }
};

exports.changingData = async (req, res) => {
  try {
    // Extract the file and form data
    const { username, email , avatar} = req.body;
    // const avatar = req.file.filename // Get the uploaded file path if available

    // Find the user by email and update the details
    const user = await Userdb.findOneAndUpdate(
      { email: email },
      { username: username, profilePicture: avatar },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).send('User not found');
    }
    const data={
      user:{
     id:user._id
      }
     }
     const authToken= jwt.sign(data,jwtSecret)

    // Send back the updated user data
    res.status(200).json({
      message: 'User details updated successfully',
      user: {
        authToken:authToken,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.addSubmission = async (req, res) => {
  try {
      const { title, genres, tags, warnings, ownershipProof, manualRelease, chapters, description, author, synopsis, image } = req.body;

      // Check if the fiction title already exists
      const existingTitle = await Submission.findOne({ title });
      if (existingTitle) {
        return res.status(409).json({ message: "This fiction title already exists, please choose a different title." });
      }
  
      // Parse JSON fields safely
      let parsedGenres, parsedTags, parsedWarnings, parsedChapters;
      try {
        parsedGenres = JSON.parse(genres);
        parsedTags = JSON.parse(tags);
        parsedWarnings = JSON.parse(warnings);
        parsedChapters = JSON.parse(chapters);
      } catch (error) {
        return res.status(400).json({ error: "Invalid JSON format in one or more fields." });
      }

      const newSubmission = new Submission({
          title,
      url: title.toLowerCase().replace(/\s+/g, '-'),
      image, // Save the image path exactly as sent
      genres: parsedGenres,
      tags: parsedTags,
      warnings: parsedWarnings,
      ownershipProof: ownershipProof ,
      manualRelease: manualRelease ,
      chapters: parsedChapters,
      description,
      author,
      synopsis
      });

      await newSubmission.save();
      res.status(201).send('Fiction submitted successfully!');
  } catch (error) {
      console.error('Error submitting fiction:', error);
      res.status(500).send('Failed to submit fiction. Please try again.');
  }
};

exports.SignUpData=async(req,res)=>{
   
   // Extract the file and form data
   try {
   const { username, email } = req.body;
   const avatar = req.file.filename // Get the uploaded file path if available

   // Find the user by email and update the details
   const user = await Userdb.findOneAndUpdate(
     { email: email },
     { username: username, profilePicture: avatar },
     { new: true, runValidators: true }
   );

   if (!user) {
     return res.status(404).send('User not found');
   }

   // Send back the updated user data
   res.status(200).json({
     message: 'User details updated successfully',
     user: {
       username: user.username,
       email: user.email,
       profilePicture: user.profilePicture
     }
   });
 } catch (error) {
   console.error('Error updating user:', error);
   res.status(500).send('Internal Server Error');
 }

}

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Userdb.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare hashed password
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({ error: "Invalid credentials" });
    // }
    // const isMatch = await bcrypt.compare(password, user.password);
    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
   
    const data={
      user:{
     id:user._id
      }
     }
     const authToken= jwt.sign(data,jwtSecret)

   
    res.json({
      authToken:authToken,
      id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      status:user.status,
      role:user.role,
      message: 'User data fetched successfully'
    });
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.findBooks=async(req,res)=>{




  // Define the Book model
  const Book = bookDatabase.collection('bookthreads'); 

const { title } = req.body; // Get title from request body

try {
  // Create a regex pattern to search for the title that contains any part of the query
  const regex = new RegExp(title, 'i'); // Case-insensitive regex

  // Fetch books where title matches the regex pattern
  const books = await Book.find({ title: { $regex: regex } }).toArray();

  res.json(books);
} catch (error) {
  console.error('Error fetching books:', error);
  res.status(500).json({ message: 'Server error' });
}
}

exports.idea=async(req,res)=>{
  
  const { email } = req.body;
  try {
    const user = await Userdb.findOne({ email }) // Fetch one user by email
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Error fetching user data');
  }
}
  



exports.addOrUpdateComment = async (req, res) => {
  const { title, content, username, email, profilePicture, category } = req.body;

  if (!username || !email) {
    return res.status(400).json({ message: 'Username and email are required' });
  }

  try {
    const filter = { email }; // Adjust filter based on your requirements
    const update = {
      title,
      content,
      username,
      email,
      profilePicture,
      category,
      updatedAt: Date.now()
    };
    const options = { new: true, upsert: true, setDefaultsOnInsert: true };

    const updatedComment = await Commentdb.findOneAndUpdate(filter, update, options);
    
    res.status(200).json({ message: 'Comment added/updated successfully', comment: updatedComment });
  } catch (error) {
    console.error('Error adding or updating comment:', error);
    res.status(500).json({ message: 'Error adding or updating comment' });
  }
};

exports.loadCommments=async(req,res)=>{
  try {
    const comments = await Commentdb.find().sort({ createdAt: -1 }); // Sort by createdAt descending
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
}
exports.loadComments2 = async (req, res) => {
  try {
    const { title } = req.body; // Extract the title from the request body

    if (!title || typeof title !== 'string') {
      return res.status(400).json({ message: 'Invalid input, please provide a title.' });
    }

    // Construct a regex pattern to match any word in the title from the request body
    const regexPattern = title.split(/\s+/).map(word => `\\b${word}\\b`).join('|');
    const regex = new RegExp(regexPattern, 'i'); // 'i' for case-insensitive

    // Query to match any of the words in the title
    const comments = await Commentdb.find({ title: { $regex: regex } })
      .sort({ createdAt: -1 }); // Sort by createdAt in descending order

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
};

exports.commentBox=async(req,res)=>{
    const {id}=req.body
  try {
    const comments = await CommentBoxdb.find({ id });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
}

exports.comBox=async(req,res)=>{
  const { id, profilePicture, username, content } = req.body;
  
  try {
   

    // Create a new comment document
    const newComment = new CommentBoxdb({
      id,
      profilePicture,
      username,
      content,
    });

    // Save the comment to the database
    const savedComment = await newComment.save();

    // Respond with the saved comment data
    res.status(201).json(savedComment);
  } catch (error) {
    console.error('Error saving comment:', error);
    res.status(500).json({ error: 'Failed to save comment' });
  }
 


}

exports.replyComment=async(req,res)=>{
  try {
    const { id, reply } = req.body;
    const result = await CommentBoxdb.findOneAndUpdate(
      { _id: id }, // Find the comment by ID
      { $push: { replies: reply } }, // Append the new reply to the replies array
      { new: true } // Return the updated document
    );

    if (result) {
      res.status(200).json(result); // Send back the updated comment
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    console.error('Error saving reply:', error);
    res.status(500).json({ message: 'Server error' });
  }
} 
exports.findBookById = async (req, res) => {
  const Book = bookDatabase.collection('bookthreads'); // Define the Book model

  const  {title}  = req.body; // Get book ID from request body

  try {
    // Convert the ID string to an ObjectId
  

    // Fetch the book by its ID
    const book = await Book.findOne({title});

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.tickets=async(req,res)=>{

  try {
    const { email, ticket } = req.body;

    // Find the user by email and update their tickets array
    const updatedUser = await ticketsDB.findOneAndUpdate(
      { email: email },
      { $push: { ticket: ticket } }, // Push the new ticket into the array
      { new: true, upsert: true } // Create a new user document if it doesn't exist
    );

    if (updatedUser) {
      res.status(200).json({ comment: 'Ticket submitted successfully!' });
    } else {
      res.status(400).json({ error: 'Failed to submit the ticket' });
    }
  } catch (error) {
    console.error("Error saving ticket:", error);
    res.status(500).json({ error: 'Internal server error' });
  }

}

exports.findTickets=async(req,res)=>{
  const { email } = req.body;
  try {
    

    // Find the user by email and return their tickets
    const userTickets = await ticketsDB.findOne({ email });

    if (userTickets) {
      res.status(200).json(userTickets.ticket); // Send back the tickets array
    } else {
      res.status(404).json({ error: 'No tickets found for this user' });
    }
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: 'Internal server error' });
  }  

}
exports.token=async(req,res)=>{
  const { email } = req.body;
    
  try {
      const user = await Userdb.findOne({ email });

      if (user) {
          return res.json({  user });
      } else {
          return res.status(404).json({ success: false, message: 'User not found' });
      }
  } catch (error) {
      return res.status(500).json({ success: false, message: 'Server error', error });
  }
}

// Count suggestions
exports.countSuggestions = async (req, res) => {
  try {
    const count = await Commentdb.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error counting suggestions:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Count tickets
exports.countTickets = async (req, res) => {
  try {
    const count = await ticketsDB.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error counting tickets:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Count fictions
exports.countFictions = async (req, res) => {
  try {
    const count = await BookThread.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error counting fictions:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Count users
exports.countUsers = async (req, res) => {
  try {
    const count = await Userdb.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error counting users:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Method to fetch recent suggestions and tickets
exports.getRecentSuggestions = async (req, res) => {
  try {
    const recentSuggestions = await Commentdb.find().sort({ createdAt: -1 }).limit(5);
    res.json(recentSuggestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRecentTickets = async (req, res) => {
  try {
    const recentTickets = await ticketsDB.find().sort({ createdAt: -1 }).limit(5);
    res.json(recentTickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Function to delete tickets
exports.deleteTickets = async (req, res) => {
  const { ticketIds } = req.body; // Array of ticket IDs to delete

  if (!ticketIds || ticketIds.length === 0) {
      return res.status(400).json({ message: 'No tickets specified for deletion' });
  }

  try {
      await ticketsDB.deleteMany({
          '_id': { $in: ticketIds }
      });
      res.status(200).json({ message: 'Tickets deleted successfully' });
  } catch (error) {
      console.error("Error deleting tickets:", error);
      res.status(500).json({ message: 'Failed to delete tickets', error });
  }
};

// Function to delete suggestions
exports.deleteSuggestions = async (req, res) => {
  const { suggestionIds } = req.body; // Array of suggestion IDs to delete

  if (!suggestionIds || suggestionIds.length === 0) {
      return res.status(400).json({ message: 'No suggestions specified for deletion' });
  }

  try {
      await Commentdb.deleteMany({
          '_id': { $in: suggestionIds }
      });
      res.status(200).json({ message: 'Suggestions deleted successfully' });
  } catch (error) {
      console.error("Error deleting suggestions:", error);
      res.status(500).json({ message: 'Failed to delete suggestions', error });
  }
};
exports.deleteUsers = async (req, res) => {
  const { userIds } = req.body;
  
  if (!userIds || userIds.length === 0) {
    return res.status(400).json({ message: 'No users specified for deletion' });
  }

  try {
    await Userdb.deleteMany({
      '_id': { $in: userIds }
    });
    res.status(200).json({ message: 'Users deleted successfully' });
  } catch (error) {
    console.error('Error deleting users:', error);
    res.status(500).json({ message: 'Failed to delete users', error });
  }
};


exports.getUsersByRole = async (req, res) => {
  const { role } = req.query;
  try {
      const users = await Userdb.find({ role: role });
      res.json(users);
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Server error' });
  }
};

exports.blockUser = async (req, res) => {
  const { email } = req.body;
  try {
      const user = await Userdb.findOneAndUpdate({ email }, { status: 'blocked' }, { new: true });
      if (user) {
        console.log("userss"+user);
          res.json({ message: 'User blocked successfully', user });
      } else {
        console.log("erorrrrrrrr");
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      console.error('Error blocking user:', error);
      res.status(500).json({ error: 'Server error' });
  }
};

exports.unblockUser = async (req, res) => {
  const { email } = req.body;
  try {
      const user = await Userdb.findOneAndUpdate({ email }, { status: 'active' }, { new: true });
      if (user) {
          console.log("userss"+user);
          res.json({ message: 'User unblocked successfully', user });
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      console.error('Error unblocking user:', error);
      res.status(500).json({ error: 'Server error' });
  }
};


exports.addUser = async (req, res) => {
  try {
    const { username, password ,email, gender, role, profilePicture } = req.body;

    // Check if user already exists
    const existingUser = await Userdb.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new Userdb({
      username,
      password,
      email,
      gender,
      role,
      profilePicture,
    });

    await newUser.save();
    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    console.error('Error adding user:', error);
     res.status(500).json({ message: 'Failed to add user', error });
  }
};
exports.updateUser = async (req, res) => {
  const { id } = req.params;  // Extract id from URL parameters
  const { username, email, password, role, status } = req.body;

  try {
      const user = await Userdb.findByIdAndUpdate(id, {
          username,
          email,
          password,
          role,
          status,
      }, { new: true });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Failed to update user', error });
  }
};
const generateUTMLink = (tag) => {
  const baseUrl = "https://ru-novel.ru"; // Replace with your actual base URL
  let link = `${baseUrl}?utm_source=${tag.utm_source}&utm_medium=${tag.utm_medium}`;

  if (tag.utm_campaign) link += `&utm_campaign=${tag.utm_campaign}`;
  if (tag.utm_term) link += `&utm_term=${tag.utm_term}`;
  if (tag.utm_content) link += `&utm_content=${tag.utm_content}`;

  return link;
};



// Get all UTM tags
exports.getAllUtmTags = async (req, res) => {
  try {
      const utmTags = await UtmTag.find().sort({ createdAt: -1 });
      res.status(200).json(utmTags);
  } catch (error) {
      console.error('Error fetching UTM tags:', error);
      res.status(500).json({ message: 'Failed to fetch UTM tags', error });
  }
};

// Create a new UTM tag
exports.createUtmTag = async (req, res) => {
  const { utm_source, utm_medium, utm_campaign, utm_term, utm_content } = req.body;
  

  try {
    const tagData = req.body;
    const utm_link = generateUTMLink(tagData); // Generate the UTM link
      const newUtmTag = new UtmTag({
          utm_source,
          utm_medium,
          utm_campaign,
          utm_term,
          utm_content,
          utm_link
      });

      const savedUtmTag = await newUtmTag.save();
      res.status(201).json(savedUtmTag);
  } catch (error) {
      console.error('Error creating UTM tag:', error);
      res.status(500).json({ message: 'Failed to create UTM tag', error });
  }
};

// Delete a UTM tag by ID
exports.deleteUtmTag = async (req, res) => {
  const { id } = req.params;

  try {
      const deletedUtmTag = await UtmTag.findByIdAndDelete(id);

      if (!deletedUtmTag) {
          return res.status(404).json({ message: 'UTM tag not found' });
      }

      res.status(200).json({ message: 'UTM tag deleted successfully' });
  } catch (error) {
      console.error('Error deleting UTM tag:', error);
      res.status(500).json({ message: 'Failed to delete UTM tag', error });
  }
};

exports.updateUtmTag = async (req, res) => {
  const { id } = req.params;
  const { utm_source, utm_medium, utm_campaign, utm_term, utm_content } = req.body;

  try {
      const tagData = req.body;
      const utm_link = generateUTMLink(tagData);

      const updatedTag = await UtmTag.findByIdAndUpdate(
          id,
          { utm_source, utm_medium, utm_campaign, utm_term, utm_content, utm_link},
          { new: true, runValidators: true }
      );

      if (!updatedTag) {
          return res.status(404).json({ message: 'UTM Tag not found' });
      }

      res.status(200).json({ message: 'UTM Tag updated successfully', data: updatedTag });
  } catch (error) {
      console.error('Error updating UTM Tag:', error);
      res.status(500).json({ message: 'Failed to update UTM Tag', error });
  }
};

// Function to create a QIWI payment
exports.createPayment = async (req, res) => {
  const { amount, currency, username, userId, subscriptionType } = req.body;

  // Prepare the data to send to QIWI
  const paymentData = {
      amount: {
          value: amount,
          currency: currency
      },
      paymentMethod: {
          type: 'qiwi',
          paymentInstrument: {
              type: 'wallet',
              walletId: userId // Use the user's wallet ID if needed
          }
      },
      comment: `${subscriptionType} subscription for ${username}`,
      successUrl: `https://ru-novel.ru/payment-success`, // Redirect URL after successful payment
      failUrl: `https://ru-novel.ru/payment-failure`, // Redirect URL after failed payment
  };

  try {
      // Send payment request to QIWI API
      const response = await axios.post('https://api.qiwi.com/partner/payin/v1/sites/{site_id}/invoices', paymentData, {
          headers: {
              Authorization: `Bearer ${QIWI_SECRET_KEY}`,
              'Content-Type': 'application/json',
          }
      });

      const paymentUrl = response.data.payUrl; // Assuming QIWI provides a payUrl in their response

      // Save the subscription in the database
      const newSubscription = new Subscriptiondb({
          userId,
          username,
          subscriptionType,
          startDate: new Date(),
          status: 'pending',
          amount,
          currency,
          paymentUrl,
      });

      await newSubscription.save();

      // Send the payment URL back to the frontend
      res.status(200).json({ paymentUrl });
  } catch (error) {
      console.error('Error creating payment:', error);
      res.status(500).json({ error: 'Failed to create payment' });
  }
};

// Function to handle QIWI payment notifications (optional)
// You can create a route that QIWI calls to notify your backend of payment status
exports.paymentNotification = async (req, res) => {
  const { bill_id, status, amount, userId } = req.body;

  try {
      const subscription = await Subscriptiondb.findOne({ paymentId: bill_id });

      if (subscription) {
          subscription.status = status.value === 'PAID' ? 'active' : 'failed';
          subscription.endDate = status.value === 'PAID' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null; // For a 1-month subscription
          await subscription.save();
      }

      res.status(200).send('OK');
  } catch (error) {
      console.error('Error handling payment notification:', error);
      res.status(500).json({ error: 'Failed to handle payment notification' });
  }
};


exports.advertisment=async(req,res)=>{   

  const { title, image } = req.body;

  try {
    // Ensure title and image are provided
    if (!title || !image) {
      return res.status(400).json({ message: 'Title and image are required' });
    }

    // Check the total number of advertisements in the database
    const totalAds = await addDB.countDocuments();

    if (totalAds >= 4) {
      return res.status(400).json({ message: 'Cannot add more than 4 advertisements' });
    }

    // Find the last added advertisement to determine the next ID
    const lastAd = await addDB.findOne().sort({ _id: -1 });

    let newId;
    if (lastAd) {
      const lastIdNum = parseInt(lastAd.id.split('_')[1], 10);
      newId = `Ad_${lastIdNum + 1}`;
    } else {
      newId = 'Ad_1';
    }

    // Create a new advertisement
    const newAd = new addDB({ id: newId, title, image });
    await newAd.save();

    return res.json({ message: 'Advertisement created', ad: newAd });
  } catch (error) {
    console.error('Error handling advertisement', error);
    return res.status(500).json({ message: 'Server error' });
  }

  }

  exports.fetchAds=async(req,res)=>{
    try {
      // Fetch all advertisements from the database
      const ads = await addDB.find();
  
      // Respond with the advertisements
      res.status(200).json({ ads });
    } catch (error) {
      console.error('Error fetching advertisements:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  exports.updateAds=async(req,res)=>{
    const { id, title, image, link } = req.body;

    try {
      // Find the advertisement by title
      const ad = await addDB.findOne({ id });
  
      if (ad) {
        // Update the advertisement with new data
        ad.image = image;
        ad.title= title;
        ad.link= link;
  
        await ad.save(); // Save the updated advertisement
  
        res.status(200).json({ message: 'Advertisement updated successfully', ad });
      } else {
        res.status(404).json({ message: 'Advertisement not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }

  exports.showAdds = async (req, res) => {
    const { id } = req.body;
  
    try {
      // Adjust based on your model and schema
      // Assuming `addDB` has a method to find an ad by a different identifier
      const ad = await addDB.findOne({ id: id });
  
      if (ad) {
        res.status(200).json(ad);
      } else {
        res.status(404).json({ message: 'Advertisement not found' });
      }
    } catch (error) {
      console.error('Error fetching advertisement data:', error); // Log the error for debugging
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  exports.deleteAds=async(req,res)=>{
    const { key } = req.body;

  try {
    // Update the document by unsetting `title` and `image` fields
    const updatedAd = await addDB.findOneAndUpdate(
      { id: key }, // Find the document by key
      { $unset: { title: "", image: "", link: ""  } }, // Remove the title and image fields
      { new: true } // Return the updated document
    );

    if (updatedAd) {
      res.status(200).json({ message: "Title and image deleted successfully", ad: updatedAd });
    } else {
      res.status(404).json({ message: "Advertisement not found" });
    }
  } catch (error) {
    console.error("Error deleting advertisement:", error);
    res.status(500).json({ message: "Internal server error" });
  }

  };

  exports.searchUsers = async (req, res) => {
    const query = req.query.q || '';  // Get the query parameter 'q'
    try {
      // Modify the regex to anchor at the start of the username string
      const users = await Userdb.find({
        username: { $regex: `^${query}`, $options: 'i' }  // Starts with the query, case-insensitive
      }, 'username -_id');
  
      if (users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }
  
      res.status(200).json(users.map(user => user.username));
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error during user search' });
    }
  };

  // Get borders by tag (level or premium)
exports.getBordersByTag = async (req, res) => {
  try {
    const { tag } = req.query;
    const borders = await Border.find({ tag });
    res.json(borders);
  } catch (error) {
    console.error('Error fetching borders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new border
exports.addBorder = async (req, res) => {
  try {
    const { name, imageUrl, link, tag } = req.body;
    const newBorder = new Border({ name, imageUrl, link, tag });
    await newBorder.save();
    res.status(201).json({ message: 'Border added successfully', border: newBorder });
  } catch (error) {
    console.error('Error adding border:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a border by ID
exports.deleteBorder = async (req, res) => {
  try {
      const { id } = req.params;
      await Border.findByIdAndDelete(id);
      res.json({ message: 'Border deleted successfully' });
  } catch (error) {
      console.error('Error deleting border:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

// In controller.js
exports.deleteBorders = async (req, res) => {
  try {
      const { ids } = req.body;
      if (!ids || !Array.isArray(ids)) {
          return res.status(400).json({ message: 'Invalid request' });
      }
      await Border.deleteMany({ _id: { $in: ids } });
      res.json({ message: 'Borders deleted successfully' });
  } catch (error) {
      console.error('Error deleting borders:', error);
      res.status(500).json({ message: 'Server error' });
  }
};
exports.updateUserFictions = async (req, res) => {
  const { username, title } = req.body;

  try {
      // Find the user by username and append the title to the fictions array
      const user = await Userdb.findOneAndUpdate(
          { username: username },
          { $addToSet: { fictions: title } }, // Add the title if it doesn't already exist in the array
          { new: true }
      );

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'Fictions updated successfully', user });
  } catch (error) {
      console.error('Error updating user fictions:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserFictions = async (req, res) => {
  const { username } = req.params;

  try {
      const fictions = await BookThread.find({ author: username });
      res.json(fictions);
  } catch (error) {
      console.error('Error fetching user fictions:', error);
      res.status(500).json({ message: 'Server error' });
  }
};


// Adding a new method in the controller to handle chapter submissions
exports.addChapter = async (req, res) => {
  try {
      const { title, content, author, requestType, fictionId } = req.body;

      // Fetch the existing BookThread to get the fiction details
      const bookThread = await BookThread.findById(fictionId);

      if (!bookThread) {
          return res.status(404).json({ error: 'Fiction not found' });
      }

      // Create a new submission for the chapter
      const submission = new Submission({
          title: bookThread.title,  // Title of the fiction
          author,
          synopsis: bookThread.synopsis,
          url: bookThread.url,
          image: bookThread.image,
          genres: bookThread.genres,
          tags: bookThread.tags,
          warnings: bookThread.warnings,
          ownershipProof: bookThread.ownershipProof,
          manualRelease: bookThread.manualRelease,
          requestType: 'New Chapter',
          chapters: [{ title, content }],
          status: 'Pending'
      });

      await submission.save();

      return res.status(201).json(submission);
  } catch (error) {
      console.error('Error adding chapter submission:', error);
      return res.status(500).json({ error: 'Failed to submit chapter' });
  }
};

// In your approval function, you should handle the 'New Chapter' requestType
exports.approveSubmission = async (req, res) => {
  try {
      const submission = await Submission.findById(req.params.id);

      if (!submission) {
          return res.status(404).json({ error: 'Submission not found' });
      }

      if (submission.requestType === 'New Chapter') {
          // Fetch the corresponding book thread
          const bookThread = await BookThread.findOne({ title: submission.title, author: submission.author });

          if (!bookThread) {
              return res.status(404).json({ error: 'BookThread not found' });
          }

          // Append the new chapter to the existing chapters
          bookThread.chapters.push(...submission.chapters);

          // Increment the chapters count in stats
          bookThread.stats.chapters = String(parseInt(bookThread.stats.chapters) + 1);

          await bookThread.save();
      }

      submission.status = 'Approved';
      await submission.save();

      res.json({ message: 'Submission approved successfully', submission });
  } catch (error) {
      console.error('Error approving submission:', error);
      return res.status(500).json({ error: 'Failed to approve submission' });
  }
};

exports.updateChapter = async (req, res) => {
  const { title, author, chapter } = req.body;

  try {
      const bookThread = await BookThread.findOne({ title, author });

      if (!bookThread) {
          return res.status(404).json({ message: 'Book not found' });
      }

      // Append the new chapter
      bookThread.chapters.push(chapter);

      // Increment the chapter count
      bookThread.stats.chapters = (parseInt(bookThread.stats.chapters) || 0) + 1;

      await bookThread.save();

      res.status(200).json({ message: 'Chapter added successfully' });
  } catch (error) {
      console.error('Error updating book with new chapter:', error);
      res.status(500).json({ message: 'Failed to update book with new chapter' });
  }
};

exports.getAllMembers = async (req, res) => {
  try {
      // Fetch all users from the database
      const users = await Userdb.find({});

      // Map over the users to calculate the number of fictions
      const membersData = users.map(user => {
          const fictionCount = Array.isArray(user.fictions) ? user.fictions.length : 0;

          return {
              username: user.username,
              avatarURL: user.profilePicture || '', // Assuming the profile picture URL is stored in profilePicture
              fictions: fictionCount,
              chapters: fictionCount,  // Assuming each fiction is counted as a chapter count for simplicity
          };
      });

      // Sort members by fiction count in descending order
      membersData.sort((a, b) => b.fictions - a.fictions);

      // Send the sorted data as a response
      res.json(membersData);
  } catch (error) {
      console.error('Error fetching members:', error);
      res.status(500).json({ error: 'An error occurred while fetching the members' });
  }
};
  

exports.follow=async(req,res)=>{
  const { email, mail } = req.body;
  try {
    const comment = await Commentdb.findOne({ email });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const isFollowing = comment.follow.some(follow => follow.mail === mail);
    if (isFollowing) {
      comment.follow = comment.follow.filter(follow => follow.mail !== mail);
    } else {
      comment.follow.push({ mail });
    }

    await comment.save();
    res.status(200).json({ success: true, isFollowing: !isFollowing });
  } catch (error) {
    console.error('Error updating follow status:', error);
    res.status(500).json({ message: 'Server error' });
  }


}
exports.followList=async(req,res)=>{
 
  const { mail , email } = req.body;

  try {
    // Assuming Commentdb contains follow arrays, where each follow has an email field
    const comment = await Commentdb.findOne({ email });


  if (!comment) {
    return res.status(404).json({ message: 'Follow list not found' });
  }

  // Filter the follow list by the provided email
  const followList = comment.follow.filter(follow => follow.mail === mail);

  if (followList.length === 0) {
    return res.status(404).json({ message: 'User not following' });
  }

  res.status(200).json({ success: true, followList, isFollowing: true });
} catch (error) {
  console.error('Error checking follow status:', error);
  res.status(500).json({ message: 'Server error' });

}

}
exports.sort=async(req,res)=>{
  try {
    const comments = await Commentdb.find().sort({ createdAt: -1 }); // Sort by createdAt descending
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Errror fetchingg comments', error });
  }
}

exports.report=async(req,res)=>{
  const { mail, reporterEmail, reason, information } = req.body;

  try {
    // Find the comment by the email (you can modify this to use another unique identifier)
    const comment = await Commentdb.findOne({ email: mail });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Add the report to the report array
    comment.report.push({
      mail,
      reporterEmail,
      reason,
      information,
    });

    // Save the updated comment
    await comment.save();

    res.status(200).json({ message: 'Report submitted successfully', comment });
  } catch (error) {
    console.error('Error submitting report:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}