import React from 'react';
import { AISignal } from '../types/trading';
import { TrendingUp, TrendingDown, Clock, Target, Shield, Zap } from 'lucide-react';

interface SignalPanelProps {
  signal: AISignal | null;
  isLoading: boolean;
  theme: 'light' | 'dark';
}

const SignalPanel: React.FC<SignalPanelProps> = ({ signal, isLoading, theme }) => {
  const isDark = theme === 'dark';

  if (isLoading) {
    return (
      <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!signal) {
    return (
      <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="text-center">
          <Zap className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Waiting for Signal
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            AI is analyzing market conditions...
          </p>
          <div className={`mt-4 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            <p>Requirements:</p>
            <p>• Confidence {'>'}  82%</p>
            <p>• Spread {'<'} 0.2 pips</p>
            <p>• Slippage {'<'} 0.1 pips</p>
          </div>
        </div>
      </div>
    );
  }

  const signalColor = signal.side === 'BUY' ? 'text-green-500' : 'text-red-500';
  const signalBg = signal.side === 'BUY' 
    ? (isDark ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-200')
    : (isDark ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200');

  return (
    <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className={`flex items-center gap-3 p-4 rounded-lg border mb-4 ${signalBg}`}>
        {signal.side === 'BUY' ? (
          <TrendingUp className={`w-8 h-8 ${signalColor}`} />
        ) : (
          <TrendingDown className={`w-8 h-8 ${signalColor}`} />
        )}
        <div>
          <h3 className={`text-xl font-bold ${signalColor}`}>
            {signal.side} {signal.symbol}
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Confidence: {(signal.confidence * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Entry
            </span>
          </div>
          <span className={`font-mono text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {signal.entry.toFixed(5)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Take Profit
            </span>
          </div>
          <span className="font-mono text-sm text-green-500">
            {signal.takeProfit.toFixed(5)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-red-500" />
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Stop Loss
            </span>
          </div>
          <span className="font-mono text-sm text-red-500">
            {signal.stopLoss.toFixed(5)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Risk:Reward
            </span>
          </div>
          <span className={`font-mono text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
            1:{signal.riskReward.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-2">
            <Clock className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Generated
            </span>
          </div>
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {new Date(signal.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className={`mt-4 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          <strong>Trade ID:</strong> {signal.id}
        </p>
        <p className={`text-xs mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          <strong>Status:</strong> {signal.status.toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default SignalPanel;