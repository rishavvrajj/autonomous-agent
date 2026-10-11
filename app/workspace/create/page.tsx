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
  return `https://api.dicebear.com/10.x/fun-emoji/svg?tags=animation&seed=${seed}`;
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
      <div className="mx-auto max-w-2xl w-full py-4">

        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-2xl font-bold text-center">Create New Agent</h1>
          <p className="max-w-lg text-sm text-muted-foreground text-center">
            Set up your AI agent by choosing an avatar, name, and description.
            You can configure its tools and behavior later.
          </p>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-6 py-4">
          <img
            src={avatarUrl}
            alt="Agent avatar"
            className="size-48 hover:scale-105 transition-transform duration-200 rounded-lg"
          />
          <Button type="button" variant="outline" onClick={handleShuffle} className="w-fit">
            <Shuffle className="mr-2 size-5" />
            Shuffle Image
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div className="space-y-2">
            <Label htmlFor="agent-name" className="text-sm font-medium text-foreground mb-1">
              Agent Name
            </Label>
            <Input
              id="agent-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Research Assistant"
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agent-description" className="text-sm font-medium text-foreground mb-1">
              Agent Description
            </Label>
            <Textarea
              id="agent-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this agent will help you with..."
              rows={5}
              className="min-h-[96px] resize-y"
            />
          </div>

          {error && (
            <p role="alert" className="mt-2 text-sm text-destructive w-full">
              {error}
            </p>
          )}

          <div className="mt-6 flex justify-end gap-3 w-full">
            <Button type="button" variant="outline" onClick={handleClear} className="h-12 w-fit">
              Clear
            </Button>
            <Button type="submit" disabled={!canSubmit} className="h-12 w-fit">
              {loading && <Spinner className="mr-2 h-4 w-4" />}
              {loading ? 'Creating...' : 'Create Agent'}
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}
