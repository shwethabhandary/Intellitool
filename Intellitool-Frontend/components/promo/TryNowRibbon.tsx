import { bgLinearGradientClassName } from '@/styles/styles';
import Link from 'next/link';
import React from 'react';

interface TryNowRibbonProps {
  href: string;
}

export const TryNowRibbon = ({ href }: TryNowRibbonProps) => {
  return (
    <Link
      href="/joinUs"
      className={`fixed top-1/2 right-[-24px] -rotate-90 w-max px-3 py-2 text-white font-bold ${bgLinearGradientClassName}`}>
      Join Now
    </Link>
  );
};
