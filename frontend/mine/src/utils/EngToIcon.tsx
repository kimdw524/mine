import React, { ReactNode } from 'react';
import { EnvelopeIcon, TagIcon, UserIcon } from '@heroicons/react/24/outline';

export const engToIcon: Record<string, ReactNode> = {
  email: <EnvelopeIcon />,
  nickname: <TagIcon />,
  gender: <UserIcon />,
};
