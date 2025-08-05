import express from 'express';
import { 
  getTransactions, 
  createTransaction, 
  updateTransaction, 
  deleteTransaction,
  getStats 
} from '../controllers/transactionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getTransactions)
  .post(createTransaction);

router.route('/stats')
  .get(getStats);

router.route('/:id')
  .put(updateTransaction)
  .delete(deleteTransaction);

export default router;