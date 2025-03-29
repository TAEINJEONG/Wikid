import React from 'react';
import Alram from '@/assets/images/alram.svg';
import Bell from '@/assets/images/bell.svg';
import Chat from '@/assets/images/chat.svg';
import Keyboard from '@/assets/images/keyboard.svg';
import LandingPageBackground from '@/assets/images/landing-page-background.svg';
import Loudspeaker from '@/assets/images/loudSpeaker.svg';
import Phone from '@/assets/images/phone.svg';
import Review from '@/assets/images/review.svg';
import Speechballoon from '@/assets/images/speechBalloon.svg';
import Type1 from '@/assets/images/type=image1.svg';
import Wikidmark from '@/assets/images/WikidMark.svg';

export const AlramImage = ({
  className = '',
  alt = '',
}: {
  className?: string;
  alt?: string;
}) => <Alram className={className} aria-label={alt} />;

export const BellImage = ({
  className = '',
  alt = '',
}: {
  className?: string;
  alt?: string;
}) => <Bell className={className} aria-label={alt} />;

export const ChatImage = ({
  className = '',
  alt = '',
}: {
  className?: string;
  alt?: string;
}) => <Chat className={className} aria-label={alt} />;

export const KeyboardImage = ({
  className = '',
  alt = '',
}: {
  className?: string;
  alt?: string;
}) => <Keyboard className={className} aria-label={alt} />;

export const LandingPageBackgroundImage = ({
  className = '',
  alt = '',
}: {
  className?: string;
  alt?: string;
}) => <LandingPageBackground className={className} aria-label={alt} />;

export const LoudspeakerImage = ({
  className = '',
  alt = '',
}: {
  className?: string;
  alt?: string;
}) => <Loudspeaker className={className} aria-label={alt} />;

export const PhoneImage = ({
  className = '',
  alt = '',
}: {
  className?: string;
  alt?: string;
}) => <Phone className={className} aria-label={alt} />;

export const ReviewImage = ({
  className = '',
  alt = '',
}: {
  className?: string;
  alt?: string;
}) => <Review className={className} aria-label={alt} />;

export const SpeechballoonImage = ({
  className = '',
  alt = '',
}: {
  className?: string;
  alt?: string;
}) => <Speechballoon className={className} aria-label={alt} />;

export const TypeImage1Image = ({
  className = '',
  alt = '',
}: {
  className?: string;
  alt?: string;
}) => <Type1 className={className} aria-label={alt} />;

export const WikidmarkImage = ({
  className = '',
  alt = '',
}: {
  className?: string;
  alt?: string;
}) => <Wikidmark className={className} aria-label={alt} />;
