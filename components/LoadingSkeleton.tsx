import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '', width = '100%', height = '1rem' }) => {
  return (
    <div
      className={`bg-slate-200 animate-pulse rounded ${className}`}
      style={{ width, height }}
    />
  );
};

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar h-full bg-slate-50">
      <div className="p-6 md:p-10 pb-40 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <Skeleton className="mb-2" width="120px" height="14px" />
            <div className="flex items-center gap-4">
              <Skeleton width="200px" height="48px" />
              <Skeleton width="80px" height="32px" className="rounded-full" />
            </div>
          </div>
          <Skeleton width="140px" height="48px" className="rounded-xl" />
        </div>

        {/* Chart Card */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-white mb-10">
          <div className="flex justify-between items-center mb-6">
            <Skeleton width="150px" height="24px" />
            <div className="flex gap-2">
              <Skeleton width="60px" height="32px" className="rounded-lg" />
              <Skeleton width="60px" height="32px" className="rounded-lg" />
            </div>
          </div>
          <Skeleton className="mb-6" height="200px" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Skeleton width="100px" height="20px" className="mx-auto mb-2" />
              <Skeleton width="80px" height="16px" className="mx-auto" />
            </div>
            <div className="text-center">
              <Skeleton width="100px" height="20px" className="mx-auto mb-2" />
              <Skeleton width="80px" height="16px" className="mx-auto" />
            </div>
            <div className="text-center">
              <Skeleton width="100px" height="20px" className="mx-auto mb-2" />
              <Skeleton width="80px" height="16px" className="mx-auto" />
            </div>
          </div>
        </div>

        {/* Piggy Banks Section */}
        <div className="mb-8">
          <Skeleton width="180px" height="28px" className="mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Skeleton width="48px" height="48px" className="rounded-2xl" />
                    <div>
                      <Skeleton width="120px" height="20px" className="mb-1" />
                      <Skeleton width="80px" height="14px" />
                    </div>
                  </div>
                  <Skeleton width="32px" height="32px" className="rounded-full" />
                </div>
                <Skeleton width="100px" height="24px" className="mb-2" />
                <Skeleton width="60px" height="16px" className="mb-4" />
                <div className="flex gap-2">
                  <Skeleton width="80px" height="32px" className="rounded-xl" />
                  <Skeleton width="80px" height="32px" className="rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guest Banks Section */}
        <div>
          <Skeleton width="160px" height="28px" className="mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-white opacity-75">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Skeleton width="48px" height="48px" className="rounded-2xl" />
                    <div>
                      <Skeleton width="100px" height="20px" className="mb-1" />
                      <Skeleton width="70px" height="14px" />
                    </div>
                  </div>
                  <Skeleton width="32px" height="32px" className="rounded-full" />
                </div>
                <Skeleton width="90px" height="24px" className="mb-2" />
                <Skeleton width="50px" height="16px" className="mb-4" />
                <Skeleton width="100px" height="32px" className="rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;