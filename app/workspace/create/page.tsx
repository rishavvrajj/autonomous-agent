'use client';

import React, { useState } from 'react';
import { Shuffle } from 'lucide-react';

interface AgentCreatePayload {
  name: string;
  description: string;
  avatarUrl: string;
}

export default function CreateNewAgentPage() {
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // Generate a random seed for the avatar
  const generateAvatar = (): void => {
    const seed: string = Math.random().toString(36).substring(2, 15);
    setAvatarUrl(`https://avatars.dicebear.com/api/avataaars/${seed}.svg`);
  };

  // Initialize with a random avatar
  React.useEffect((): void => {
    generateAvatar();
  }, []);

  const handleShuffle = (): void => {
    generateAvatar();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Here we would typically send the data to an API to create the agent.
    // For now, we'll just log and reset the form or show a success message.
    const agentData: AgentCreatePayload = { name, description, avatarUrl };
    console.log('Creating agent:', agentData);
    // Reset the form and show an alert for now.
    alert('Agent created successfully!');
    setName('');
    setDescription('');
    generateAvatar(); // Get a new avatar for next time
  };

  return (
    <div className="min-h-screen p-6 sm:p-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Create New Agent
        </h1>
        <p className="mb-6 text-gray-600">
          Set up your AI agent by choosing an avatar, name, and description. You can configure its tools and behavior later.
        </p>

        {/* Avatar Section */}
        <div className="mb-8 text-center">
          <img
            src={avatarUrl}
            alt="Agent avatar"
            className="h-48 w-48 object-contain rounded-lg border border-gray-200"
          />
          <div className="mt-4">
            <button
              onClick={handleShuffle}
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Shuffle className="mr-2 h-4 w-4" />
              Shuffle Image
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agent Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Research Assistant"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agent Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this agent will help you with..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                // Reset the form on cancel
                setName('');
                setDescription('');
                generateAvatar(); // Get a new avatar
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-800"
            >
              Create Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}