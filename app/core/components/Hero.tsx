import React from 'react';

import { HeroContentProps, HeroProps, HeroTitleProps } from './Hero.type';

const Hero: React.FC<HeroProps> = props => (
  <div className={`hero ${props.className ?? ''}`}>
    <div className='hero-content text-center'>
      <div className='max-w-md'>{props.children}</div>
    </div>
  </div>
);

export const HeroTitle: React.FC<HeroTitleProps> = props => (
  <h2 className='text-5xl font-bold'>{props.children}</h2>
);

export const HeroContent: React.FC<HeroContentProps> = props => (
  <p className='py-6'>{props.children}</p>
);

export default Hero;
