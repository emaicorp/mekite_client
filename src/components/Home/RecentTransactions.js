import React from 'react';

function RecentTransactions() {
  return (
    <div className="container mx-auto px-4 py-16  ">
      <h2 className="text-4xl font-bold text-center text-white mb-8">Recent Transactions</h2>
      
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Deposits Section */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Deposits</h2>
        <div className="space-y-4">
          {[
            { user: 'david mcclain', amount: '$2704.51', coin: '' },
            { user: 'gulder', amount: '$500', coin: 'BNB' },
            { user: 'jesus alfonso', amount: '$71.2', coin: '' },
            { user: 'natiq', amount: '$49.2307', coin: '' },
            { user: 'nazigul', amount: '$0.00013', coin: '' },
            { user: 'ramin', amount: '$5.14555', coin: '' },
            { user: 'madiyar zhan', amount: '$72.76', coin: '' },
            { user: 'meiro segovia rojas', amount: '$103.388', coin: '' },
            { user: 'duisenov', amount: '$257.361', coin: '' },
            { user: 'ramin', amount: '$5.14585', coin: '' }
          ].map((transaction, index) => (
            <div 
              key={index}
              className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0"
            >
              <div className="text-gray-300">{transaction.user}</div>
              <div className="flex items-center space-x-4">
                {transaction.coin && (
                  <span className="text-gray-400">{transaction.coin}</span>
                )}
                <span className="text-blue-400">{transaction.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Withdrawals Section */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Withdrawals</h2>
        <div className="space-y-4">
          {[
            { user: 'jorunn', amount: '$4627.26', coin: 'BITCOIN' },
            { user: 'jorunn', amount: '$1205.27', coin: 'BNB' },
            { user: 'darkhan', amount: '$200', coin: 'BITCOIN' },
            { user: 'duisenov', amount: '$100', coin: 'BITCOIN' },
            { user: 'yusuf idris', amount: '$15', coin: 'BNB' },
            { user: 'ramin', amount: '$10', coin: 'BITCOIN' },
            { user: 'dallas', amount: '$1734.49', coin: 'DOGE' },
            { user: 'alberto selma', amount: '$331.21', coin: 'BITCOIN' },
            { user: 'jorunn', amount: '$856.07', coin: 'BITCOIN' },
            { user: 'esbolat', amount: '$100', coin: 'BITCOIN' }
          ].map((transaction, index) => (
            <div 
              key={index}
              className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0"
            >
              <div className="text-gray-300">{transaction.user}</div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-400">{transaction.coin}</span>
                <span className="text-blue-400">{transaction.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default RecentTransactions; 