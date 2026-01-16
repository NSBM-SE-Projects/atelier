import { useState, useEffect, forwardRef } from 'react';
import { UserPlus, ShoppingBag, CheckCircle, Clock, Filter } from 'lucide-react';
import { Card } from './ui/card';
import { getAllActivities } from '../lib/dashboard';

const ActivityTable = forwardRef((props, ref) => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    filterActivities();
  }, [filterType, activities]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const data = await getAllActivities();
      setActivities(data);
      setFilteredActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterActivities = () => {
    let filtered = [...activities];

    // Filter by type
    if (filterType !== 'All') {
      filtered = filtered.filter((a) => a.activityType === filterType);
    }

    setFilteredActivities(filtered);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'SIGNUP':
        return <UserPlus className="w-4 h-4" />;
      case 'ORDER_PLACED':
        return <ShoppingBag className="w-4 h-4" />;
      case 'ORDER_COMPLETED':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getActivityBadge = (type) => {
    switch (type) {
      case 'SIGNUP':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-700',
          dot: 'bg-blue-500',
          label: 'SIGNUP',
        };
      case 'ORDER_PLACED':
        return {
          bg: 'bg-orange-100',
          text: 'text-orange-700',
          dot: 'bg-orange-500',
          label: 'ORDER',
        };
      case 'ORDER_COMPLETED':
        return {
          bg: 'bg-green-100',
          text: 'text-green-700',
          dot: 'bg-green-500',
          label: 'COMPLETED',
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-700',
          dot: 'bg-gray-500',
          label: type,
        };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const filterOptions = ['All', 'SIGNUP', 'ORDER_PLACED', 'ORDER_COMPLETED'];

  return (
    <Card className="p-6" ref={ref}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Activity Log</h3>
        <p className="text-gray-500 text-sm mt-1">
          Track all customer activities and system events
        </p>
      </div>

      {/* Filters */}
      <div className="flex justify-end mb-6">
        {/* Type Filter */}
        <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors min-w-[140px] justify-between"
          >
            <span className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Type: {filterType}
            </span>
          </button>

          {filterOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setFilterType(option);
                    setFilterOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                    filterType === option
                      ? 'text-blue-600 font-medium bg-blue-50'
                      : 'text-gray-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Customer
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Date
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Activity
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Description
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Loading skeleton
              [...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-4 px-4">
                    <div className="animate-pulse h-4 bg-gray-200 rounded w-32" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="animate-pulse h-4 bg-gray-200 rounded w-24" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="animate-pulse h-6 bg-gray-200 rounded w-20" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="animate-pulse h-4 bg-gray-200 rounded w-40" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="animate-pulse h-6 bg-gray-200 rounded w-20" />
                  </td>
                </tr>
              ))
            ) : filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => {
                const badge = getActivityBadge(activity.activityType);
                return (
                  <tr
                    key={activity.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {activity.userName || 'Unknown'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {activity.userEmail || '-'}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {formatDate(activity.createdAt)}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        {badge.label}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600 max-w-xs truncate">
                      {activity.description}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          activity.isRead
                            ? 'bg-gray-100 text-gray-600'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            activity.isRead ? 'bg-gray-400' : 'bg-green-500'
                          }`}
                        />
                        {activity.isRead ? 'READ' : 'NEW'}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-12 text-center text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No activities found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
});

ActivityTable.displayName = 'ActivityTable';

export default ActivityTable;
