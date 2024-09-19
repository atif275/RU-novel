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
    default: 'RUB'
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
    enum: ['pending', 'active', 'canceled', 'expired', 'failed'],
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
    default: 'yoomoney'
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

// Pre-save hook to update the timestamp
SubscriptionSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Subscriptiondb = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscriptiondb;
