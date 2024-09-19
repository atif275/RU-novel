import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, CircularProgress, Card, Typography, Alert, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Swal from 'sweetalert2'; // SweetAlert2 for better-looking alerts

const ManageSubscriptionPage = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmUsername, setConfirmUsername] = useState("");
  const [upgradeDialog, setUpgradeDialog] = useState(false); // State for upgrade confirmation dialog
  const [renewDialog, setRenewDialog] = useState(false); // State for renew confirmation dialog

  const user = useSelector((state) => state.userData.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      try {
        const response = await axios.post('https://api.ru-novel.ru/api/subscriptionn', { username: user.username });
        setSubscription(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching subscription details");
        setLoading(false);
      }
    };

    if (user && user.username) {
      fetchSubscriptionDetails();
    }
  }, [user.username]);

  // Handle Cancel Subscription
  const handleCancel = async () => {
    if (confirmUsername !== user.username) {
      Swal.fire({
        icon: 'error',
        title: 'Wrong Username',
        text: 'Please enter the correct username to cancel the subscription.',
        input: 'text',
        inputPlaceholder: 'Enter username',
        inputAttributes: { style: 'border-color: red;' },
        inputValidator: (value) => {
          if (value !== user.username) {
            return 'Incorrect username!';
          }
        }
      });
      return;
    }
    try {
      await axios.post('https://api.ru-novel.ru/api/manage-subscription', { action: 'cancel', paymentId: subscription.paymentId });
      Swal.fire('Cancelled!', 'Your subscription has been successfully cancelled.', 'success');
      navigate('/premium');
    } catch (err) {
      console.error(err);
    }
  };


const handleUpgrade = async () => {
    // Show confirmation dialog for username before upgrading
    setUpgradeDialog(true);
  };

  const processUpgrade = async () => {
    if (confirmUsername !== user.username) {
      Swal.fire({
        icon: 'error',
        title: 'Wrong Username',
        text: 'Please enter the correct username to upgrade the subscription.',
        input: 'text',
        inputPlaceholder: 'Enter username',
        inputAttributes: { style: 'border-color: red;' },
        inputValidator: (value) => {
          if (value !== user.username) {
            return 'Incorrect username!';
          }
        }
      });
      return;
    }
    try {
      // Proceed to payment gateway for upgrading to yearly
      const response = await axios.post('https://api.ru-novel.ru/api/create-payment', {
        amount: 34.99, // Yearly plan amount
        plan: 'Yearly',
        email: user.email,
        username: user.username,
        userId: user._id,
      });

      const { paymentUrl } = response.data;

      // Redirect to the payment gateway
      window.location.href = paymentUrl;
    } catch (err) {
      console.error('Error processing upgrade payment:', err);
      Swal.fire('Error', 'An error occurred while processing your upgrade. Please try again.', 'error');
    }
  };

  const handleRenew = () => {
    setRenewDialog(true);
  };
  // Check if the subscription is within 7 days of expiry
  const isNearExpiry = () => {
    if (!subscription || !subscription.endDate) return false;
    const currentDate = new Date();
    const endDate = new Date(subscription.endDate);
    const diffInDays = (endDate - currentDate) / (1000 * 60 * 60 * 24); // Difference in days
    return diffInDays <= 7;
  };

  const processRenew = async () => {
    if (confirmUsername !== user.username) {
      Swal.fire({
        icon: 'error',
        title: 'Wrong Username',
        text: 'Please enter the correct username to renew the subscription.',
        input: 'text',
        inputPlaceholder: 'Enter username',
        inputAttributes: { style: 'border-color: red;' },
        inputValidator: (value) => {
          if (value !== user.username) {
            return 'Incorrect username!';
          }
        }
      });
      return;
    }

    try {
      // Proceed to payment gateway with the current plan details
      const response = await axios.post('https://api.ru-novel.ru/api/create-payment', {
        amount: subscription.amount, // Use the current plan amount
        plan: subscription.subscriptionType, // Use the current plan type
        email: user.email,
        username: user.username,
        userId: user._id,
      });

      const { paymentUrl } = response.data;

      // Redirect to the payment gateway
      window.location.href = paymentUrl;
    } catch (err) {
      console.error('Error processing renewal payment:', err);
      Swal.fire('Error', 'An error occurred while processing your renewal. Please try again.', 'error');
    }
  };



  const openConfirmationDialog = () => setOpenDialog(true);
  const closeConfirmationDialog = () => setOpenDialog(false);
  const closeUpgradeDialog = () => setUpgradeDialog(false);
  const closeRenewDialog = () => setRenewDialog(false);


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <div className="container pt-2 mx-auto sm:px-6 sm:pr-4 bg-gray-200 w-full pb-8">
        <div className="px-12">
    <Box display="flex" flexDirection="column" gap={3} alignItems="" minHeight="80vh" backgroundColor="">
        <div className="mt-12">
        <Link to={"/author-dashboard"} className="mb-4 pb-6 text-gray-500"> {"<  "}Go To Dashboard</Link>
        <div className="mt-4"><Typography  variant="h4" gutterBottom>Billing & Plan</Typography></div>
        
        </div>
      
      <Card sx={{ padding: 4, width: "50%", maxWidth: "45%" ,backgroundColor:"white" }}>
        <Box>
          <Typography variant="h6"><strong>Current Plan</strong></Typography>
          <div className="mt-2">
         

            <span className="text-white bg-gray-600 py-1 px-2 rounded">
            <strong>
            {`${subscription.subscriptionType.toUpperCase()}`}
            </strong>
            </span>
            {" "}Plan
            <div className="mt-2">
                <p className="text-gray-600 text-sm">Member Since {new Date(subscription.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
          {/* <Typography variant="body1"><strong>Plan:</strong> {subscription.subscriptionType} Plan</Typography> */}
          <Typography variant="body1"><strong>Status:</strong> {subscription.status}</Typography>
          <Typography variant="body1"><strong>Username:</strong> {user.username}</Typography>
          <Typography variant="body1"><strong>Payment ID:</strong> {subscription.paymentId}</Typography>
          <Typography variant="body1"><strong>Start Date:</strong> {new Date(subscription.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</Typography>
          <Typography variant="body1"><strong>Next Payment:</strong> {new Date(subscription.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</Typography>
          <Typography variant="body1"><strong>Payment Method:</strong> {subscription.paymentMethod}</Typography>
        
          </div>
          </Box>

        <Box>
          <Button variant="contained" color="error" onClick={openConfirmationDialog} fullWidth>Cancel Subscription</Button>
          {subscription.subscriptionType === "monthly" && (
            <Button variant="contained" color="primary" onClick={handleUpgrade} fullWidth>Upgrade to Yearly</Button>
          )}
          {isNearExpiry() && (
            <Button variant="contained" color="success" onClick={handleRenew} fullWidth>Renew Subscription</Button>
          )}
        </Box>
      </Card>

      {/* Dialog for Cancel Confirmation */}
      <Dialog open={openDialog} onClose={closeConfirmationDialog}>
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>
          <Typography>Please enter your username to confirm cancellation:</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={confirmUsername}
            onChange={(e) => setConfirmUsername(e.target.value)}
            error={confirmUsername !== "" && confirmUsername !== user.username}
            helperText={confirmUsername !== "" && confirmUsername !== user.username ? "Incorrect username!" : ""}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmationDialog} color="secondary">Cancel</Button>
          <Button onClick={handleCancel} color="error">Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Upgrade Confirmation */}
      <Dialog open={upgradeDialog} onClose={closeUpgradeDialog}>
        <DialogTitle>Confirm Upgrade</DialogTitle>
        <DialogContent>
          <Typography>Please enter your username to confirm upgrade:</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={confirmUsername}
            onChange={(e) => setConfirmUsername(e.target.value)}
            error={confirmUsername !== "" && confirmUsername !== user.username}
            helperText={confirmUsername !== "" && confirmUsername !== user.username ? "Incorrect username!" : ""}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUpgradeDialog} color="secondary">Cancel</Button>
          <Button onClick={processUpgrade} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Renew Confirmation */}
      <Dialog open={renewDialog} onClose={closeRenewDialog}>
        <DialogTitle>Confirm Renewal</DialogTitle>
        <DialogContent>
          <Typography>Please enter your username to confirm renewal:</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={confirmUsername}
            onChange={(e) => setConfirmUsername(e.target.value)}
            error={confirmUsername !== "" && confirmUsername !== user.username}
            helperText={confirmUsername !== "" && confirmUsername !== user.username ? "Incorrect username!" : ""}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRenewDialog} color="secondary">Cancel</Button>
          <Button onClick={processRenew} color="success">Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
    </div>
    </div>
  );
};

export default ManageSubscriptionPage;