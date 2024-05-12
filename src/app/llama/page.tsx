'use client';
import React, { useState } from 'react';

export default function LlamaPage() {
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPoem = async () => {
    setLoading(true);
    const response = await fetch('/api/llama', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: "Can you write a poem about open source machine learning?" })
    });

    if (response.ok) {
      const data = await response.json();
      setOutput(data.poem);
    } else {
      setOutput('Failed to load the poem');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Generated Poem</h1>
      <button onClick={fetchPoem} disabled={loading}>
        {loading ? 'Loading...' : 'Generate Poem'}
      </button>
      <p>{output}</p>
    </div>
  );
}
