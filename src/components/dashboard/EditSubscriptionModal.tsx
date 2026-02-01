import React, { useEffect } from 'react';
import { Modal, Input, Select } from '../ui/form-elements';
import { Button } from '../ui/design-system';
import { Subscription } from './SubscriptionTable';
import { toast } from "sonner";

interface EditSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: Subscription | null;
  onSave: (updatedSub: Subscription) => void;
}

export function EditSubscriptionModal({ isOpen, onClose, subscription, onSave }: EditSubscriptionModalProps) {
  const [formData, setFormData] = React.useState<Partial<Subscription>>({});

  useEffect(() => {
    if (subscription) {
      setFormData(subscription);
    }
  }, [subscription]);

  const handleSubmit = () => {
    if (formData && subscription) {
      onSave({ ...subscription, ...formData } as Subscription);
      toast.success("Subscription updated successfully");
      onClose();
    }
  };

  if (!subscription) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Subscription"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input 
          label="Subscription Name" 
          value={formData.name || ''} 
          onChange={e => setFormData({...formData, name: e.target.value})}
          placeholder="e.g. Netflix" 
        />
        <Input 
          label="Cost" 
          value={formData.amount || ''}
          onChange={e => setFormData({...formData, amount: e.target.value})}
          placeholder="$0.00" 
        />
        <Select 
          label="Billing Cycle" 
          value={formData.cycle || 'Monthly'}
          onChange={e => setFormData({...formData, cycle: e.target.value})}
          options={[
            { value: 'Monthly', label: 'Monthly' },
            { value: 'Yearly', label: 'Yearly' }
          ]}
        />
        <Input 
          label="Next Payment" 
          type="text" 
          value={formData.nextPayment || ''}
          onChange={e => setFormData({...formData, nextPayment: e.target.value})}
          placeholder="Apr 20, 2024"
        />
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <div className="flex flex-wrap gap-2">
            {['Entertainment', 'Productivity', 'Design Tools', 'Utilities'].map(cat => (
              <button 
                key={cat}
                onClick={() => setFormData({...formData, category: cat})}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  formData.category === cat
                    ? 'bg-[#FFF5E5] text-[#FF971D] border-[#FF971D]' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
