import React from 'react';
import {
  X,
  CreditCard,
  Download,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  ShieldCheck,
  Send
} from 'lucide-react';
import { Transaction } from '../types';

interface TransactionDetailModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  transaction,
  onClose
}) => {
  if (!transaction) return null;

  const downloadReceipt = () => {
    const text = `ASTROANALYTICS ENTERPRISE RECEIPT\nInvoice ID: ${transaction.invoiceId}\nCustomer: ${transaction.customerName} (${transaction.customerEmail})\nDate: ${transaction.date}\nAmount: $${transaction.amount.toFixed(2)}\nStatus: ${transaction.status}\nProduct: ${transaction.product}\nPayment: ${transaction.paymentMethod}\n\nThank you for choosing AstroAnalytics Enterprise.`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt_${transaction.invoiceId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-dropdown w-full max-w-lg p-6 relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 text-[#5A5654] hover:text-[#1A1A1A] hover:bg-[#F4F2EE] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center pb-6 border-b border-[#1A1A1A]/10 mb-6">
          <div className="w-12 h-12 bg-[#F4F2EE] border border-[#1A1A1A]/20 text-[#1A1A1A] flex items-center justify-center mx-auto mb-3">
            <CreditCard className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-mono text-[#5A5654] uppercase tracking-widest block mb-1">
            {transaction.invoiceId}
          </span>
          <h3 className="text-[32px] font-serif font-bold text-[#1A1A1A]">
            ${transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h3>

          <div className="flex items-center justify-center gap-2 mt-2">
            {transaction.status === 'Success' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#EBF4EF] text-[#2D5A47] border border-[#2D5A47]/25">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Settled Successfully
              </span>
            )}
            {transaction.status === 'Pending' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#FBF4EB] text-[#94631D] border border-[#94631D]/25">
                <Clock className="w-3.5 h-3.5" />
                Processing Settlement
              </span>
            )}
            {transaction.status === 'Failed' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#FBECED] text-[#9E2A2B] border border-[#9E2A2B]/25">
                <AlertTriangle className="w-3.5 h-3.5" />
                Charge Failed
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2.5 text-[13px] text-[#5A5654] mb-6">
          <div className="flex justify-between py-1.5 border-b border-[#1A1A1A]/10">
            <span>Customer / Account</span>
            <span className="text-[#1A1A1A] font-serif font-medium">{transaction.customerName}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#1A1A1A]/10">
            <span>Billing Contact</span>
            <span className="text-[#1A1A1A] font-mono text-[12px]">{transaction.customerEmail}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#1A1A1A]/10">
            <span>Purchased Tier / Item</span>
            <span className="text-[#1A1A1A] font-medium">{transaction.product}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#1A1A1A]/10">
            <span>Payment Method</span>
            <span className="text-[#1A1A1A]">{transaction.paymentMethod}</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span>Transaction Timestamp</span>
            <span className="text-[#1A1A1A]">{transaction.date}</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1A1A1A]/10">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#F4F2EE] hover:bg-[#EAE7E1] text-[#1A1A1A] text-[11px] uppercase tracking-[0.15em] font-sans font-bold border border-[#1A1A1A]/20 transition-colors"
          >
            Close
          </button>
          <button
            onClick={downloadReceipt}
            className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCFB] text-[11px] uppercase tracking-[0.15em] font-sans font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Invoice PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
