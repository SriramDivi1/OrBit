import { useState, useMemo } from 'react';
import { Card, Button, Badge } from '../ui/design-system';
import { Subscription } from '../dashboard/SubscriptionTable';
import { 
  Search, 
  Filter, 
  Plus, 
  Grid, 
  List, 
  ArrowUpDown,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  Tag,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface SubscriptionsViewProps {
  subscriptions: Subscription[];
  onEdit: (sub: Subscription) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

type ViewMode = 'list' | 'grid';
type SortOption = 'name' | 'amount' | 'nextPayment' | 'category';
type FilterStatus = 'all' | 'success' | 'process' | 'error';
type FilterCategory = 'all' | string;

export function SubscriptionsView({ subscriptions, onEdit, onDelete, onAdd }: SubscriptionsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(subscriptions.map(s => s.category)));
  }, [subscriptions]);

  // Filter and sort subscriptions
  const filteredSubscriptions = useMemo(() => {
    let result = [...subscriptions];

    // Search filter
    if (searchQuery) {
      result = result.filter(sub => 
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      result = result.filter(sub => sub.status === filterStatus);
    }

    // Category filter
    if (filterCategory !== 'all') {
      result = result.filter(sub => sub.category === filterCategory);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'amount':
          comparison = parseFloat(a.amount.replace(/[^0-9.]/g, '')) - parseFloat(b.amount.replace(/[^0-9.]/g, ''));
          break;
        case 'nextPayment':
          comparison = new Date(a.nextPayment).getTime() - new Date(b.nextPayment).getTime();
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [subscriptions, searchQuery, filterStatus, filterCategory, sortBy, sortOrder]);

  // Statistics
  const stats = useMemo(() => {
    const active = subscriptions.filter(s => s.status === 'success').length;
    const pending = subscriptions.filter(s => s.status === 'process').length;
    const cancelled = subscriptions.filter(s => s.status === 'error').length;
    const totalMonthly = subscriptions
      .filter(s => s.status === 'success')
      .reduce((acc, sub) => acc + parseFloat(sub.amount.replace(/[^0-9.]/g, '') || '0'), 0);
    
    return { active, pending, cancelled, totalMonthly };
  }, [subscriptions]);

  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortOrder('asc');
    }
  };

  const handleBulkAction = (action: string) => {
    toast.info(`Bulk ${action} feature coming soon!`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Subscriptions</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and organize all your subscriptions in one place.</p>
        </div>
        <Button onClick={onAdd} className="shadow-lg shadow-purple-900/20 w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Subscription
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 dark:bg-gray-900 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Active</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
              <p className="text-xs text-gray-500">Cancelled</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 dark:bg-gray-900 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.totalMonthly.toFixed(0)}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Monthly</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters Bar */}
      <Card className="p-4 dark:bg-gray-900 dark:border-gray-800">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search subscriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF971D] focus:border-transparent bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
            />
          </div>

          {/* Filter & View Controls */}
          <div className="flex items-center gap-2">
            <Button 
              variant={showFilters ? 'primary' : 'secondary'} 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {(filterStatus !== 'all' || filterCategory !== 'all') && (
                <span className="ml-2 w-5 h-5 bg-white text-[#FF971D] rounded-full text-xs flex items-center justify-center font-bold">
                  {(filterStatus !== 'all' ? 1 : 0) + (filterCategory !== 'all' ? 1 : 0)}
                </span>
              )}
            </Button>

            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-[#FF971D] text-white' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[#FF971D] text-white' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'success', 'process', 'error'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setFilterStatus(status as FilterStatus)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                          filterStatus === status
                            ? 'bg-[#FF971D] text-white border-[#FF971D]'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {status === 'all' ? 'All' : status === 'success' ? 'Active' : status === 'process' ? 'Pending' : 'Cancelled'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF971D]"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Sort Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: 'name', label: 'Name' },
                      { key: 'amount', label: 'Price' },
                      { key: 'nextPayment', label: 'Due Date' },
                    ].map((option) => (
                      <button
                        key={option.key}
                        onClick={() => toggleSort(option.key as SortOption)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1 ${
                          sortBy === option.key
                            ? 'bg-[#FF971D] text-white border-[#FF971D]'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {option.label}
                        {sortBy === option.key && (
                          <ArrowUpDown className="w-3 h-3" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {(filterStatus !== 'all' || filterCategory !== 'all' || searchQuery) && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setFilterStatus('all');
                      setFilterCategory('all');
                      setSearchQuery('');
                    }}
                    className="text-sm text-[#FF971D] hover:underline font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing <span className="font-medium text-gray-900 dark:text-white">{filteredSubscriptions.length}</span> of{' '}
          <span className="font-medium text-gray-900 dark:text-white">{subscriptions.length}</span> subscriptions
        </p>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => handleBulkAction('export')}>
            Export
          </Button>
        </div>
      </div>

      {/* Subscriptions Display */}
      {filteredSubscriptions.length === 0 ? (
        <Card className="p-12 text-center dark:bg-gray-900 dark:border-gray-800">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No subscriptions found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
          <Button variant="secondary" onClick={() => { setFilterStatus('all'); setFilterCategory('all'); setSearchQuery(''); }}>
            Clear Filters
          </Button>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSubscriptions.map((sub, index) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card className="p-4 hover:shadow-md transition-shadow h-full dark:bg-gray-900 dark:border-gray-800">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-2 border border-gray-100 dark:border-gray-700">
                      <img
                        src={sub.logo}
                        alt={sub.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${sub.name}&background=random`;
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{sub.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{sub.category}</p>
                    </div>
                  </div>
                  <Badge variant={sub.status}>{sub.statusLabel}</Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <DollarSign className="w-3 h-3" /> Amount
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">{sub.amount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Next Payment
                    </span>
                    <span className="text-gray-700">{sub.nextPayment}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Tag className="w-3 h-3" /> Cycle
                    </span>
                    <span className="text-gray-700">{sub.cycle}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <Button variant="secondary" size="sm" className="flex-1" onClick={() => onEdit(sub)}>
                    <Edit className="w-3 h-3 mr-1" /> Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50" onClick={() => onDelete(sub.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden dark:bg-gray-900 dark:border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50/80 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-4 font-medium">
                    <button onClick={() => toggleSort('name')} className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white">
                      Service {sortBy === 'name' && <ArrowUpDown className="w-3 h-3" />}
                    </button>
                  </th>
                  <th className="px-6 py-4 font-medium">
                    <button onClick={() => toggleSort('category')} className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white">
                      Category {sortBy === 'category' && <ArrowUpDown className="w-3 h-3" />}
                    </button>
                  </th>
                  <th className="px-6 py-4 font-medium">
                    <button onClick={() => toggleSort('amount')} className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white">
                      Amount {sortBy === 'amount' && <ArrowUpDown className="w-3 h-3" />}
                    </button>
                  </th>
                  <th className="px-6 py-4 font-medium">
                    <button onClick={() => toggleSort('nextPayment')} className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white">
                      Next Payment {sortBy === 'nextPayment' && <ArrowUpDown className="w-3 h-3" />}
                    </button>
                  </th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSubscriptions.map((sub, index) => (
                  <motion.tr
                    key={sub.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02 }}
                    className="bg-white dark:bg-gray-900 hover:bg-gray-50/80 dark:hover:bg-gray-800/80 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-2 border border-gray-100 dark:border-gray-700">
                          <img
                            src={sub.logo}
                            alt={sub.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${sub.name}&background=random`;
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">{sub.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{sub.cycle}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{sub.category}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{sub.amount}</td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{sub.nextPayment}</td>
                    <td className="px-6 py-4">
                      <Badge variant={sub.status}>{sub.statusLabel}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEdit(sub)}
                          className="p-2 text-gray-500 hover:text-[#FF971D] hover:bg-orange-50 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(sub.id)}
                          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
