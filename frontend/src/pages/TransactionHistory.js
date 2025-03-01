import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Mock data for transactions
const transactionData = [
  {
    id: "TX123456",
    date: "2023-12-15T10:30:00",
    title: "Dune",
    type: "movie",
    transactionType: "purchase",
    amount: 14.99,
    paymentMethod: "Credit Card (ending in 1234)",
    status: "completed"
  },
  {
    id: "TX123457",
    date: "2023-11-20T15:45:00",
    title: "No Time to Die",
    type: "movie",
    transactionType: "rental",
    amount: 5.99,
    paymentMethod: "PayPal",
    status: "completed"
  },
  {
    id: "TX123458",
    date: "2023-10-05T09:15:00",
    title: "Stranger Things (Complete Series)",
    type: "series",
    transactionType: "purchase",
    amount: 29.99,
    paymentMethod: "Credit Card (ending in 1234)",
    status: "completed"
  },
  {
    id: "TX123459",
    date: "2023-09-18T18:20:00",
    title: "The Witcher (Season 2)",
    type: "series",
    transactionType: "rental",
    amount: 9.99,
    paymentMethod: "Credit Card (ending in 1234)",
    status: "completed"
  },
  {
    id: "TX123460",
    date: "2023-08-30T14:10:00",
    title: "The Shawshank Redemption",
    type: "movie",
    transactionType: "purchase",
    amount: 12.99,
    paymentMethod: "PayPal",
    status: "completed"
  },
  {
    id: "TX123461",
    date: "2023-07-12T11:05:00",
    title: "Breaking Bad (Complete Series)",
    type: "series",
    transactionType: "purchase",
    amount: 39.99,
    paymentMethod: "Credit Card (ending in 1234)",
    status: "completed"
  },
  {
    id: "TX123462",
    date: "2023-06-28T20:30:00",
    title: "Subscription - Premium Plan",
    type: "subscription",
    transactionType: "subscription",
    amount: 14.99,
    paymentMethod: "Credit Card (ending in 1234)",
    status: "completed"
  },
  {
    id: "TX123463",
    date: "2023-05-28T20:30:00",
    title: "Subscription - Premium Plan",
    type: "subscription",
    transactionType: "subscription",
    amount: 14.99,
    paymentMethod: "Credit Card (ending in 1234)",
    status: "completed"
  }
];

const TransactionHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'purchases', 'rentals', 'subscriptions'
  const [selectedTransaction, setSelectedTransaction] = useState(null); // For transaction details
  
  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setTransactions(transactionData);
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter transactions based on selected filter
  const filteredTransactions = transactions.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'purchases') return item.transactionType === 'purchase';
    if (filter === 'rentals') return item.transactionType === 'rental';
    if (filter === 'subscriptions') return item.transactionType === 'subscription';
    return true;
  });
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get transaction status badge style
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Get transaction type badge style
  const getTypeBadgeClass = (type) => {
    switch(type) {
      case 'purchase':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'rental':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'subscription':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">Transaction History</h1>
          <p className="text-gray-300">View your purchase and rental history</p>
        </div>
      </section>
      
      {/* Filter Section */}
      <section className="py-6 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === 'all' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All Transactions
            </button>
            <button 
              onClick={() => setFilter('purchases')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === 'purchases' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Purchases
            </button>
            <button 
              onClick={() => setFilter('rentals')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === 'rentals' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Rentals
            </button>
            <button 
              onClick={() => setFilter('subscriptions')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === 'subscriptions' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Subscriptions
            </button>
          </div>
        </div>
      </section>
      
      {/* Transactions List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <svg className="w-16 h-16 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
              <p className="text-xl text-gray-400 mb-4">No transactions found</p>
              <Link to="/" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition">
                Browse Content
              </Link>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Transaction ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Item
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-750">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {transaction.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {formatDate(transaction.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {transaction.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeBadgeClass(transaction.transactionType)}`}>
                            {transaction.transactionType.charAt(0).toUpperCase() + transaction.transactionType.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          ${transaction.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(transaction.status)}`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <button 
                            onClick={() => setSelectedTransaction(transaction)}
                            className="text-red-500 hover:text-red-400 transition"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">Transaction Details</h3>
                <button 
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6 pb-6 border-b border-gray-700">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Transaction ID</p>
                    <p className="text-white">{selectedTransaction.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Date</p>
                    <p className="text-white">{formatDate(selectedTransaction.date)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Status</p>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(selectedTransaction.status)}`}>
                      {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Type</p>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeBadgeClass(selectedTransaction.transactionType)}`}>
                      {selectedTransaction.transactionType.charAt(0).toUpperCase() + selectedTransaction.transactionType.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6 pb-6 border-b border-gray-700">
                <h4 className="text-white font-medium mb-4">Item Details</h4>
                <p className="text-gray-400 text-sm">Title</p>
                <p className="text-white mb-4">{selectedTransaction.title}</p>
                
                <p className="text-gray-400 text-sm">Content Type</p>
                <p className="text-white mb-4">{selectedTransaction.type.charAt(0).toUpperCase() + selectedTransaction.type.slice(1)}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-white font-medium mb-4">Payment Details</h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Amount</p>
                    <p className="text-white">${selectedTransaction.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Payment Method</p>
                    <p className="text-white">{selectedTransaction.paymentMethod}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition"
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory; 