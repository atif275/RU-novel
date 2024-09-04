const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDB',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  subscriptionType: {
    type: String,
    enum: ['monthly', 'yearly'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  paymentId: {
    type: String,
    unique: true
  },
  paymentUrl: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'canceled', 'failed'],
    default: 'pending'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
  },
  autoRenewal: {
    type: Boolean,
    default: true
  },
  paymentMethod: {
    type: String,
    enum: ['qiwi', 'paypal', 'credit_card'],
    default: 'qiwi'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

SubscriptionSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Subscriptiondb = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscriptiondb;
