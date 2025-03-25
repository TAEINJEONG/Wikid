import React from 'react';
import Alram from '@/assets/images/alram.svg';
import Bell from '@/assets/images/bell.svg';
import BigestLandingPageBackground from '@/assets/images/bigest-landing-page-background.svg';
import Chat from '@/assets/images/chat.svg';
import Group199 from '@/assets/images/Group199.svg';
import Group1993 from '@/assets/images/Group1993.svg';
import Keyboard from '@/assets/images/keyboard.svg';
import LandingPageBackground from '@/assets/images/landing-page-background.svg';
import Loudspeaker from '@/assets/images/loudSpeaker.svg';
import Phone from '@/assets/images/phone.svg';
import Review from '@/assets/images/review.svg';
import Speechballoon from '@/assets/images/speechBalloon.svg';
import Type1 from '@/assets/images/type=image1.svg';
import Wikidmark from '@/assets/images/WikidMark.svg';

export const AlramImage = ({ className = '', alt = '' }: { className?: string; alt?: string }) => (
  <Alram className={className} aria-label={alt} />
);

export const BellImage = ({ className = '', alt = '' }: { className?: string; alt?: string }) => (
  <Bell className={className} aria-label={alt} />
);

export const BigestLandingPageBackgroundImage = ({
  className = '',
  alt = '',
}: {
  className?: string;
  alt?: string;
}) => <BigestLandingPageBackground className={className} aria-label={alt} />;

export const ChatImage = ({ className = '', alt = '' }: { className?: string; alt?: string }) => (
  <Chat className={className} aria-label={alt} />
);

export const Group199Image = ({
  className = '',
  alt = '',
}: {
  className?: string;
  alt?: string;
}) => <Group199 className={className} aria-label={alt} />;

export const Group1993Image = ({
  className = '',
  alt = '',
}: {
  className?: string;
  alt?: string;
}) => <Group1993 className={className} aria-label={alt} />;

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

export const PhoneImage = ({ className = '', alt = '' }: { className?: string; alt?: string }) => (
  <Phone className={className} aria-label={alt} />
);

export const ReviewImage = ({ className = '', alt = '' }: { className?: string; alt?: string }) => (
  <Review className={className} aria-label={alt} />
);

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
