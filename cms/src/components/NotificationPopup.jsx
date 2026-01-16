import { UserPlus, ShoppingBag, CheckCircle, Clock, X } from 'lucide-react';

const NotificationPopup = ({ notifications, onClose, onNotificationClick, onMarkAllRead }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'SIGNUP':
        return (
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-blue-600" />
          </div>
        );
      case 'ORDER_PLACED':
        return (
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-orange-600" />
          </div>
        );
      case 'ORDER_COMPLETED':
        return (
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Clock className="w-5 h-5 text-gray-600" />
          </div>
        );
    }
  };

  const getHighlightText = (type) => {
    switch (type) {
      case 'SIGNUP':
        return 'text-blue-600';
      case 'ORDER_PLACED':
        return 'text-orange-600';
      case 'ORDER_COMPLETED':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="absolute right-0 top-12 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Notification</h3>
            <p className="text-sm text-gray-500">
              You have {notifications.length} unread messages
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          <>
            <div className="px-4 py-2 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase">New</span>
            </div>
            {notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => onNotificationClick(notification)}
                className="w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left"
              >
                {getActivityIcon(notification.activityType)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className={`font-semibold ${getHighlightText(notification.activityType)}`}>
                      {notification.title}
                    </span>{' '}
                    <span className="text-gray-600">
                      {notification.activityType === 'SIGNUP'
                        ? `${notification.userName} has registered`
                        : notification.description}
                    </span>
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{notification.timeAgo}</span>
                  </div>
                </div>
              </button>
            ))}
          </>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No new notifications</p>
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="p-3 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onMarkAllRead}
            className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Mark all as read
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationPopup;
