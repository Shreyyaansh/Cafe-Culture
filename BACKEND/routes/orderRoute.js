import express from 'express';
import authUser from '../middlewares/authUser.js';
import authSeller from '../middlewares/authSeller.js';
import { placeOrderCOD, getUserOrders, getAllOrders, createRazorpayOrder, verifyRazorpayPayment, getSellerStats, updateOrderPaymentStatus } from '../controllers/orderController.js';


const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD);
orderRouter.post('/razorpay/create', authUser, createRazorpayOrder);
orderRouter.post('/razorpay/verify', authUser, verifyRazorpayPayment);
orderRouter.get('/user', authUser, getUserOrders);
orderRouter.get('/seller', authSeller, getAllOrders);
orderRouter.get('/seller/stats', authSeller, getSellerStats);
orderRouter.patch('/seller/:id/payment-status', authSeller, updateOrderPaymentStatus);

export default orderRouter;