'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home, FileText, Bell, TrendingUp, User, Plus } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Profile } from '@/types';

interface AppLayoutProps {
  children: React.ReactNode;
  currentProfile?: Profile;
  onProfileChange?: (profile: Profile) => void;
}

export default function AppLayout({ children, currentProfile, onProfileChange }: AppLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const getActiveTab = () => {
    if (pathname === '/') return 'home';
    if (pathname === '/records') return 'records';
    if (pathname === '/reminders') return 'reminders';
    if (pathname === '/insights') return 'insights';
    if (pathname === '/profile') return 'profile';
    return 'home';
  };

  const handleTabChange = (value: string) => {
    switch (value) {
      case 'home':
        router.push('/');
        break;
      case 'records':
        router.push('/records');
        break;
      case 'reminders':
        router.push('/reminders');
        break;
      case 'insights':
        router.push('/insights');
        break;
      case 'profile':
        router.push('/profile');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-blue-600">Aapka Aarogya Kosh</h1>
            
            {/* Profile Switcher */}
            {currentProfile && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Profile:</span>
                <select 
                  className="text-sm font-medium text-gray-900 bg-gray-100 rounded px-2 py-1"
                  onChange={(e) => {
                    // Handle profile change
                  }}
                >
                  <option>{currentProfile.name}</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <Tabs value={getActiveTab()} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-16 bg-transparent border-none">
            <TabsTrigger value="home" className="flex flex-col gap-1 data-[state=active]:bg-blue-50">
              <Home size={20} />
              <span className="text-xs">Home</span>
            </TabsTrigger>
            <TabsTrigger value="records" className="flex flex-col gap-1 data-[state=active]:bg-blue-50">
              <FileText size={20} />
              <span className="text-xs">Records</span>
            </TabsTrigger>
            <TabsTrigger value="reminders" className="flex flex-col gap-1 data-[state=active]:bg-blue-50">
              <Bell size={20} />
              <span className="text-xs">Reminders</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex flex-col gap-1 data-[state=active]:bg-blue-50">
              <TrendingUp size={20} />
              <span className="text-xs">Insights</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex flex-col gap-1 data-[state=active]:bg-blue-50">
              <User size={20} />
              <span className="text-xs">Profile</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </nav>
    </div>
  );
}
