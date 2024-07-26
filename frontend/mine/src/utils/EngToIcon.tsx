import React, { ReactNode } from 'react';
import {
  ArchiveBoxIcon,
  EnvelopeIcon,
  InformationCircleIcon,
  TagIcon,
  UserIcon,
  ChatBubbleBottomCenterTextIcon,
  HomeIcon,
  MicrophoneIcon,
} from '@heroicons/react/24/outline';

export const engToIcon: Record<string, ReactNode> = {
  email: <EnvelopeIcon />,
  nickname: <TagIcon />,
  gender: <UserIcon />,
  avatar: <UserIcon />,
  achievement: <ArchiveBoxIcon />,
  userInfo: <InformationCircleIcon />,
  chatting: <ChatBubbleBottomCenterTextIcon />,
  home: <HomeIcon />,
  speech: <MicrophoneIcon />,
};
