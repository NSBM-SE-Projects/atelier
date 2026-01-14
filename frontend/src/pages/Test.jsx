import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { healthCheckService } from '@/lib/healthCheck';
import viteLogo from '/vite.svg';
import reactLogo from '../assets/react.svg';

export default function Test() {
  const [frontendStatus, setFrontendStatus] = useState('ready');
  const [backendStatus, setBackendStatus] = useState('loading');
  const [databaseStatus, setDatabaseStatus] = useState('loading');
  const [count, setCount] = useState(0);

  // Run health checks on component mount
  useEffect(() => {
    const runHealthChecks = async () => {
      const backendCheck = await healthCheckService.checkBackend();
      setBackendStatus(backendCheck.status);

      const databaseCheck = await healthCheckService.checkDatabase();
      setDatabaseStatus(databaseCheck.status);
    };

    runHealthChecks();
  }, []);

  // Rerun health checks
  const handleRecheck = async () => {
    setBackendStatus('loading');
    setDatabaseStatus('loading');

    const backendCheck = await healthCheckService.checkBackend();
    setBackendStatus(backendCheck.status);

    const databaseCheck = await healthCheckService.checkDatabase();
    setDatabaseStatus(databaseCheck.status);
  };

  // Status badge component
  const StatusBadge = ({ status, label }) => {
    const bgColor =
      status === 'ready'
        ? 'bg-green-800'
        : status === 'error'
          ? 'bg-red-800'
          : 'bg-yellow-800';

    const textColor =
      status === 'ready'
        ? 'text-green-500'
        : status === 'error'
          ? 'text-red-500'
          : 'text-yellow-500';

    const statusText =
      status === 'ready'
        ? '✅ Ready'
        : status === 'error'
          ? '❌ Error'
          : '⏳ Loading...';

    return (
      <div className={`${bgColor} ${textColor} px-5 py-4 rounded-3xl flex items-center gap-2 `}>
        <span className="font-bold !text-neutral-200">{label}:</span>
        <span className="font-bold">{statusText}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-900 p-14">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-neutral-200">
            🧪 Atelier Health Check
          </h1>
        </div>

        {/* Status Cards */}
        <div className="space-y-4 mb-11">
          <StatusBadge status={frontendStatus} label="Frontend" />
          <StatusBadge status={backendStatus} label="Backend" />
          <StatusBadge status={databaseStatus} label="Database" />
        </div>

        {/* Status Summary */}
        <div className="bg-neutral-700 rounded-2xl shadow-xl p-7 mb-8 border border-neutral-900">
          <h2 className="text-2xl font-bold text-neutral-200 mb-3">Status Summary</h2>
          <div className="space-y-2 text-sm text-neutral-400">
            <p>
              <span className="font-normal text-neutral-200">Frontend:</span> Loaded and running on port 5173
            </p>
            <p>
              <span className="font-normal text-neutral-200">Backend:</span>{' '}
              {backendStatus === 'ready'
                ? 'Connected to localhost:8080'
                : 'Not responding - is Spring Boot running?'}
            </p>
            <p>
              <span className="font-normal text-neutral-200">Database:</span>{' '}
              {databaseStatus === 'ready'
                ? 'Connected to Neon PostgreSQL'
                : 'Connection failed - check credentials'}
            </p>
          </div>
        </div>

        {/* Counter Section */}
        <div className="bg-neutral-700 rounded-xl shadow-xl p-6 mb-8 border border-neutral-900">
          <h2 className="text-2xl font-bold text-neutral-200 mb-4">Counter Demo</h2>
          <div className="flex items-center justify-between">
            <div className="text-6xl font-black text-neutral-200">{count}</div>
            <Button
              onClick={() => setCount(count + 1)}
              className="bg-neutral-950 hover:bg-neutral-900 text-neutral-200 px-12 py-6 rounded-3xl"
            >
              + Count
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-neutral-700 rounded-xl shadow-xl p-7 mb-8 border border-neutral-900">
          <h2 className="text-2xl font-bold text-neutral-200 mb-5">Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Primary Button */}
            <Button
              onClick={handleRecheck}
              className="bg-neutral-950 hover:bg-neutral-900 text-neutral-200 font-bold rounded-xl"
            >
              Recheck Connections
            </Button>

            {/* Secondary Button */}
            <Button
              className="bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-xl"
            >
              Secondary Button
            </Button>

            {/* Destructive Button */}
            <Button
              onClick={() => {
                setCount(0);
              }}
              className="bg-red-800 hover:bg-red-700 text-red-400 rounded-xl"
            >
              Reset All
            </Button>
          </div>
        </div>

        {/* Debug Info */}
        <div className="bg-neutral-700 rounded-xl p-7 border border-neutral-900">
          <h3 className="font-bold text-base text-neutral-200 mb-2">Debug Info</h3>
          <div className="text-xs text-neutral-400 space-y-1 font-mono">
            <p>Frontend URL: http://localhost:5173</p>
            <p>Backend URL: http://localhost:8080</p>
            <p>API Base: http://localhost:8080/api</p>
            <p className="text-neutral-300">Health Check Endpoints:</p>
            <ul className="ml-4 space-y-1">
              <li>• GET /api/health/backend</li>
              <li>• GET /api/health/database</li>
              <li>• GET /api/health</li>
            </ul>
          </div>
        </div>

        {/* Logos Section */}
        <div className="flex justify-center gap-7 my-14">
          <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="h-24 hover:opacity-70 transition-opacity" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="h-24 hover:opacity-70 transition-opacity" alt="React logo" />
          </a>
        </div>

        {/* Navigation Link */}
        <div className="text-center">
          <a href="/" className="text-neutral-200 hover:text-neutral-400 underline">
            ← Back Home
          </a>
        </div>
      </div>
    </div>
  );
}
