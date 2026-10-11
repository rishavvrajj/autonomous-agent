'use client';

import { useState } from 'react';
import { Shuffle } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

function buildAvatarUrl(seed: string) {
  return `https://api.dicebear.com/10.x/gaze/svg?tags=animation&seed=${seed}`;
}

export default function CreateNewAgentPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [avatarSeed, setAvatarSeed] = useState(crypto.randomUUID());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Derived — no need to store in state, always in sync with avatarSeed
  const avatarUrl = buildAvatarUrl(avatarSeed);
  const canSubmit = name.trim().length > 0 && !loading;

  const handleShuffle = () => {
    setAvatarSeed(crypto.randomUUID());
  };

  const handleClear = () => {
    setName('');
    setDescription('');
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!name.trim()) return;

    setLoading(true);

    try {
      const { data } = await axios.post('/api/agent', {
        agentId: avatarSeed,
        name: name.trim(),
        description: description.trim(),
        agentImage: avatarUrl,
      });

      console.log('Agent created:', data);
      router.push(`/workspace/${name}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error ?? err.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mx-auto max-w-2xl space-y-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-xl font-bold">Create New Agent</h1>
          <p className="max-w-sm text-sm text-muted-foreground">
            Set up your AI agent by choosing an avatar, name, and description.
            You can configure its tools and behavior later.
          </p>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-3 py-4">
          <img
            src={avatarUrl}
            alt="Agent avatar"
            className="size-32"
          />
          <Button type="button" variant="outline" onClick={handleShuffle}>
            <Shuffle className="mr-2 size-4" />
            Shuffle Image
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="agent-name">Agent Name</Label>
            <Input
              id="agent-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Research Assistant"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="agent-description">Agent Description</Label>
            <Textarea
              id="agent-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this agent will help you with..."
              rows={4}
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={handleClear}>
              Clear
            </Button>
            <Button type="submit" disabled={!canSubmit}>
              {loading && <Spinner className="mr-2" />}
              {loading ? 'Creating...' : 'Create Agent'}
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}
