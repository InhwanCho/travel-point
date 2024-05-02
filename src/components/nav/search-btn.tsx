import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function SearchBtn() {
  return (
    <Button variant='ghost' >
      <Search className='size-6 hover:cursor-pointer' />
    </Button>
  );
}
