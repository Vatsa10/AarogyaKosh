'use client';

import { useState, useEffect } from 'react';
import { Plus, Camera, FileText, User as UserIcon } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Profile } from '@/types';

export default function Home() {
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const savedCurrent = localStorage.getItem('currentProfile');
    if (savedCurrent) {
      setCurrentProfile(JSON.parse(savedCurrent));
    }
  }, []);

  if (!currentProfile) {
    return (
      <AppLayout>
        <div className="p-4 text-center">
          <p>Loading profile...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout currentProfile={currentProfile}>
      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {currentProfile.name}!
          </h2>
          <p className="text-gray-600">Manage your health records with ease</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Camera className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Upload Prescription</h3>
              <p className="text-sm text-gray-600 mt-1">Camera or PDF</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Upload Lab Report</h3>
              <p className="text-sm text-gray-600 mt-1">Blood tests & more</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Records */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Records</CardTitle>
            <CardDescription>Your latest health records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No records yet</p>
              <p className="text-sm mt-1">Upload your first prescription or lab report</p>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Reminders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Today's Reminders</CardTitle>
            <CardDescription>Medicine reminders for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Plus className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No reminders for today</p>
              <p className="text-sm mt-1">Upload prescriptions to auto-generate reminders</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
