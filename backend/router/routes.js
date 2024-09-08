


const express=require('express')
const router=express.Router()
const control=require('../Controller/controller')
const Userdb=require('../model/user')
const multer = require('multer');
const Message = require('../model/Message')
const Border = require('../model/Border')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() 
      cb(null, uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

router.post('/api/createUser',control.create)
router.post('/api/login',control.login)
router.post('/account/externalloginconfirmation', upload.single('avatar'), control.changingData);
router.post('/api/comments/follow',control.follow)
router.post('/api/comments/followlist',control.followList)
router.get('/api/top', control.sort); 
router.post('/api/report',control.report)
// router.post('//add', upload.single('image'), control.addSubmission);

//router.post('/account/externalloginconfirmation', upload.single('image'), control.changingData);
router.post('/api/forgot-password', control.forgotPassword);
router.post('/api/reset-password', control.resetPassword);
router.post('/api/books', control.findBooks);
router.post('/api/idea', control.idea);
router.post('/api/newIdea', control.addOrUpdateComment); 
router.get('/api/load/comments', control.loadCommments); 
router.post('/api/comment/box',control.commentBox)
router.post('/api/comment/save',control.comBox)
router.post('/api/reply',control.replyComment)
router.post('/api/bookOne',control.findBookById)
router.post('/api/ticket',control.tickets)
router.post('/api/find/ticket',control.findTickets)
router.post('/api/load/search',control.loadComments2)
router.post('/api/token',control.token)

router.get('/api/users/:email', async (req, res) => {
   
  const email = req.params.email;
    if (!email) {
      return res.status(400).json({ error: 'Email query parameter is required' });
    }
  
    try {
      const user = await Userdb.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        message: 'User data fetched successfully'
      });
    } catch (err) {
      console.error('Error fetching user data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.get('/api/userss/:email', async (req, res) => {
    try {
      const user = await Userdb.findOne({ email: req.params.email });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Update user data
router.post('/api/users/:email', async (req, res) => {
  try {
    const updatedUser = await Userdb.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/api/count/suggestions', control.countSuggestions);
router.get('/api/count/tickets', control.countTickets);
router.get('/api/count/fictions', control.countFictions);
router.get('/api/count/users', control.countUsers);
router.get('/api/load/recent/suggestions', control.getRecentSuggestions);
router.get('/api/load/recent/tickets', control.getRecentTickets);

// Route to delete tickets
router.post('/api/delete/tickets', control.deleteTickets);

// Route to delete suggestions
router.post('/api/delete/suggestions', control.deleteSuggestions);

// Fetch users by role
router.get('/api/users', control.getUsersByRole);

// Block user
router.post('/api/block-users', control.blockUser);

// Unblock user
router.post('/api/unblock-users', control.unblockUser);
router.post('/api/add-users', control.addUser);


// Delete users
router.post('/api/delete-users', control.deleteUsers);

router.put('/api/update-userinfo/:id', control.updateUser);

  // Route to get all UTM tags
router.get('/api/utm-tags', control.getAllUtmTags);

// Route to create a new UTM tag
router.post('/api/utm-tags', control.createUtmTag);

// Route to delete a UTM tag by ID
router.delete('/api/utm-tags/:id', control.deleteUtmTag);

// Update an existing UTM tag by ID
router.put('/api/utm-tags/:id', control.updateUtmTag);

router.post('/api/qiwi/payment', control.createPayment);


router.post('/api/advertisment',control.advertisment)
router.get('/api/ads',control.fetchAds)
router.put('/api/update/ads',control.updateAds)
router.post('/api/ado',control.showAdds)
router.put('/api/delete/ads',control.deleteAds)

// Route to get borders based on tag
router.get('/api/borders', control.getBordersByTag);

// Route to add a new border
router.post('/api/add-border', control.addBorder);
// In routes.js
router.post('/delete-borders', control.deleteBorders);

// Route to delete a border by ID
router.delete('/api/delete-border/:id', control.deleteBorder);
router.post('/api/usersssss/update-fictions', control.updateUserFictions);
router.get('/api/fictions/:username', control.getUserFictions);

// Adding a new route to handle chapter submissions
router.post('/api/chapters/add', control.addChapter);
router.post('/api/bookthreads/update-chapter', control.updateChapter);

router.get('/api/members-list', control.getAllMembers);
// ----------------------------sabhee works--------------------------

router.get('/api/search-users', control.searchUsers);

router.post('/api/messages', async (req, res) => {
  try {
    const { recipient, subject, message, sender, status } = req.body;

    if (!recipient || !subject || !message || !sender || !status) {
      return res.status(400).json({ message: 'All fields including status are required' });
    }

    const newMessage = new Message({ recipient, subject, message, sender, status });
    await newMessage.save();
    res.status(201).json({ message: `Message ${status === 'draft' ? 'saved to drafts' : 'sent'} successfully` });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to process message' });
  }
});

router.get('/api/messages/:recipient', async (req, res) => {
  const { recipient } = req.params;
  try {
      // Now also selecting the 'message' field to show in the dropdown
      const messages = await Message.find({ recipient: recipient })
                                     .select('subject sender message createdAt -_id')  // Include 'message' in the selected fields
                                     .sort({ createdAt: -1 });  // Sort by date in descending order

      if (messages.length === 0) {
          return res.status(404).json({ message: 'No messages found' });
      }

      res.status(200).json(messages);
  } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ message: 'Server error' });
  }
});
// Update message status endpoint
router.put('/api/messages/status', async (req, res) => {
  const { subject, status } = req.body;

  if (!['sent', 'draft', 'trashcan'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status provided' });
  }

  try {
      const updatedMessage = await Message.findOneAndUpdate(
          { subject }, // Query by subject instead of ID
          { status }, // Update operation
          { new: true } // Return the modified document rather than the original
      );

      if (!updatedMessage) {
          return res.status(404).json({ message: 'Message not found' });
      }

      res.status(200).json({ message: 'Message updated successfully', updatedMessage });
  } catch (error) {
      console.error('Error updating message:', error);
      res.status(500).json({ message: 'Server error', error });
  }
});



//For  Delete code?

router.delete('/api/messages/:subject', async (req, res) => {
  try {
      const deletedMessage = await Message.findOneAndDelete({ subject: req.params.subject });
      if (!deletedMessage) {
          return res.status(404).send({ message: 'Message not found' });
      }
      res.status(200).send({ message: 'Message deleted successfully', deletedMessage });
  } catch (error) {
      res.status(500).send({ message: 'Error deleting message', error });
  }
});
// Node.js Express backend
router.get('/api/messages/sent/:username', async (req, res) => {
  const { username } = req.params;

  try {
      const query = {
        sender: username,   // Assuming the username parameter should match the 'sender' field
        status: 'sent'      // Only fetch messages that are marked as 'sent'
      };

      // Use .select() to specify which fields to include or exclude
      const messages = await Message.find(query)
                                    .select('subject recipient message createdAt -_id')  // Include specific fields and exclude _id
                                    .sort({ createdAt: -1 });  // Sort messages by creation date in descending order

      if (messages.length === 0) {
          return res.status(404).json({ message: 'No messages found' });
      }
      res.json(messages);
  } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ message: 'Server error' });
  }
});
router.get('/api/messages/drafts/:username', async (req, res) => {
  const { username } = req.params;

  try {
      const query = {
        sender: username,   // Assuming the username parameter should match the 'sender' field
        status: 'draft'      // Only fetch messages that are marked as 'sent'
      };

      // Use .select() to specify which fields to include or exclude
      const messages = await Message.find(query)
                                    .select('subject sender message createdAt -_id')  // Include specific fields and exclude _id
                                    .sort({ createdAt: -1 });  // Sort messages by creation date in descending order

      if (messages.length === 0) {
          return res.status(404).json({ message: 'No messages found' });
      }
      res.json(messages);
  } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ message: 'Server error' });
  }
});
router.get('/api/messages/trashcan/:username', async (req, res) => {
  const { username } = req.params;

  try {
      const query = {
          $or: [{ sender: username }, { recipient: username }],  // Match either sender or recipient
          status: 'trashcan'  // Match messages with 'trashcan' status
      };

      // Use .select() to specify which fields to include
      const messages = await Message.find(query)
                                    .select('subject sender message createdAt -_id')  // Include specific fields, exclude _id
                                    .sort({ createdAt: -1 });  // Sort messages by creation date in descending order

      if (messages.length === 0) {
          return res.status(404).json({ message: 'No messages found' });
      }
      res.json(messages);
  } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ message: 'Server error' });
  }
});




router.put('/api/update-email', async (req, res) => {
  const { currentEmail, newEmail } = req.body;

  if (!currentEmail || !newEmail) {
      return res.status(400).json({ message: 'Both current and new email must be provided.' });
  }

  try {
      // Check if the current email exists in the database
      const user = await Userdb.findOne({ email: currentEmail });
      if (!user) {
          return res.status(404).json({ message: 'User not found with the current email.' });
      }

      // Check if the new email is already in use
      const emailExist = await Userdb.findOne({ email: newEmail });
      if (emailExist) {
          return res.status(409).json({ message: 'The new email is already in use.' });
      }

      // Update the user's email
      user.email = newEmail;
      await user.save();
      res.status(200).json({ message: 'Email updated successfully.', email: user.email });
  } catch (err) {
      console.error('Error updating email:', err);
      res.status(500).json({ message: 'Internal server error' });
  }
});
// Endpoint to update user's profile picture border
router.put('/update-border/:username', async (req, res) => {
  const { username } = req.params;
  const { newBorder } = req.body;

  if (!newBorder) {
      return res.status(400).json({ error: 'New border must be provided.' });
  }

  try {
      const updatedUser = await Userdb.findOneAndUpdate(
          { username: username },
          { $set: { profilePictureBorder: newBorder }},
          { new: true }
      );

      if (!updatedUser) {
          return res.status(404).json({ error: 'User not found.' });
      }

      res.json({
          message: 'Border updated successfully.',
          profilePictureBorder: updatedUser.profilePictureBorder
      });
  } catch (error) {
      console.error('Database update error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/api/level/borders', async (req, res) => {
  const { tag, fictionCount } = req.query;
  try {
    const query = tag ? { tag: tag } : {};
    let borders = await Border.find(query);

    // Dynamically determine how many borders to send based on fictionCount
    const count = parseInt(fictionCount, 10);
    let numberOfBorders = 0;
    if (!isNaN(count) && count > 0) {
      numberOfBorders = Math.floor(count / 10) + 1; // For every 10 increase in fictionCount, add one more border
      numberOfBorders = Math.min(numberOfBorders, borders.length); // Ensure we do not exceed the number of available borders
    }

    borders = borders.slice(0, numberOfBorders); // Slice the array to the calculated number of borders

    res.json(borders);
  } catch (error) {
    console.error('Failed to retrieve borders:', error);
    res.status(500).json({ message: 'Failed to retrieve borders' });
  }
});


router.get('/api/premium/borders', async (req, res) => {
  const { tag } = req.query;
  try {
      const query = tag ? { tag: tag } : {};
      let borders = await Border.find(query);
      res.json(borders); // Sends back the borders filtered by the tag, including 'premium'
  } catch (error) {
      console.error('Failed to retrieve borders with tag:', tag, error);
      res.status(500).json({ message: 'Failed to retrieve borders' });
  }
});





  module.exports = router;
  

