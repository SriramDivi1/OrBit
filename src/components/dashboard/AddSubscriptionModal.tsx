import React from 'react';
import { Modal, Input, Select } from '../ui/form-elements';
import { Button } from '../ui/design-system';
import { Subscription } from './SubscriptionTable';
import { toast } from "sonner";

interface AddSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newSub: Omit<Subscription, 'id'>) => void;
}

export function AddSubscriptionModal({ isOpen, onClose, onAdd }: AddSubscriptionModalProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    amount: '',
    currency: 'usd',
    category: 'Entertainment',
    date: ''
  });

  const handleSubmit = () => {
    // Basic validation
    if (!formData.name || !formData.amount) {
      toast.error("Please fill in the service name and amount");
      return;
    }

    onAdd({
      name: formData.name,
      logo: `https://logo.clearbit.com/${formData.name.toLowerCase().replace(/\s/g, '')}.com`,
      category: formData.category,
      amount: formData.amount.startsWith('$') ? formData.amount : `$${formData.amount}`,
      cycle: 'Monthly',
      nextPayment: formData.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'success',
      statusLabel: 'Active'
    });
    
    toast.success("Subscription added successfully");

    // Reset form
    setFormData({
      name: '',
      amount: '',
      currency: 'usd',
      category: 'Entertainment',
      date: ''
    });
    
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Subscription"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Subscription</Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input 
          label="Service Name" 
          placeholder="e.g. Spotify" 
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
        />
        <div className="grid grid-cols-2 gap-4">
           <Input 
            label="Amount" 
            placeholder="9.99" 
            value={formData.amount}
            onChange={e => setFormData({...formData, amount: e.target.value})}
          />
           <Select 
            label="Currency" 
            value={formData.currency}
            onChange={e => setFormData({...formData, currency: e.target.value})}
            options={[
              { value: 'usd', label: 'USD ($)' },
              { value: 'eur', label: 'EUR (€)' }
            ]}
          />
        </div>
        <Select 
          label="Category" 
          value={formData.category}
          onChange={e => setFormData({...formData, category: e.target.value})}
          options={[
            { value: 'Entertainment', label: 'Entertainment' },
            { value: 'Productivity', label: 'Productivity' },
            { value: 'Design Tools', label: 'Design Tools' },
            { value: 'Utilities', label: 'Utilities' }
          ]}
        />
        <Input 
          label="First Payment Date" 
          type="date" 
          value={formData.date}
          onChange={e => setFormData({...formData, date: e.target.value})}
        />
      </div>
    </Modal>
  );
}
