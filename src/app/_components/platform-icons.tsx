"use client";

import type React from 'react';

const BlogIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4.5 4.5H19.5V8.5H4.5V4.5Z" fill="url(#blog-gradient)"/>
        <path d="M4.5 10.5H14.5V12.5H4.5V10.5Z" fill="url(#blog-gradient)" fillOpacity="0.7"/>
        <path d="M4.5 14.5H19.5V16.5H4.5V14.5Z" fill="url(#blog-gradient)" fillOpacity="0.7"/>
        <path d="M16 10.5H19.5V12.5H16V10.5Z" fill="url(#blog-gradient)" fillOpacity="0.7"/>
        <path d="M4.5 18.5H14.5V20.5H4.5V18.5Z" fill="url(#blog-gradient)" fillOpacity="0.7"/>
        <defs>
            <linearGradient id="blog-gradient" x1="4.5" y1="4.5" x2="19.5" y2="20.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#10B981"/>
                <stop offset="1" stopColor="#3B82F6"/>
            </linearGradient>
        </defs>
    </svg>
);
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <radialGradient id="insta-gradient" cx="0.3" cy="1.2" r="1.3">
                <stop offset="0" stopColor="#FEDA77" />
                <stop offset="0.1" stopColor="#F58529" />
                <stop offset="0.3" stopColor="#DD2A7B" />
                <stop offset="0.6" stopColor="#8134AF" />
                <stop offset="1" stopColor="#515BD4" />
            </radialGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill="url(#insta-gradient)" />
        <path d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.5 6.51L17.51 6.499" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="28" height="28" rx="6" fill="black"/>
        <path d="M19.14 7.32996C18.2 7.31996 17.26 7.32996 16.32 7.32996C16.27 8.52996 15.82 9.72996 14.93 10.59C14.04 11.48 12.83 11.9 11.63 12.04V15.2C13.06 15.16 14.49 14.88 15.78 14.37C16.25 14.17 16.69 13.9 17.1 13.62C17.11 15.89 17.09 18.16 17.12 20.43C17.08 21.55 16.63 22.66 15.85 23.51C14.77 25.04 12.89 25.24 11.16 24.3C9.74001 23.44 8.91001 21.84 8.91001 20.21C8.92001 18.57 9.68001 16.92 11.02 15.93C11.94 15.2 13.11 14.85 14.28 14.86C14.27 11.66 14.29 8.46996 14.26 5.27996L19.14 7.32996Z" fill="#FE2C55"/>
        <path d="M19.14 7.32996L14.26 5.27996V14.86C13.09 14.85 11.92 15.2 11.00 15.93C9.66001 16.92 8.90001 18.57 8.91001 20.21C8.91001 21.84 9.74001 23.44 11.16 24.3C12.89 25.24 14.77 25.04 15.85 23.51C16.63 22.66 17.08 21.55 17.12 20.43C17.09 18.16 17.11 15.89 17.1 13.62C17.51 13.9 17.95 14.17 18.42 14.37C18.66 14.46 18.9 14.56 19.14 14.63V10.87C17.99 10.73 16.84 10.38 15.78 9.84C14.93 10.59 15.38 9.39996 14.93 10.59C15.82 9.72996 16.27 8.52996 16.32 7.32996H19.14V10.87C18.9 10.8 18.66 10.71 18.42 10.61C16.95 10.02 15.52 10.29 14.28 11.23V7.32996H16.32C17.26 7.32996 18.2 7.31996 19.14 7.32996Z" fill="#20F1ED"/>
    </svg>
);
const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="6" fill="#FF0000"/>
        <path d="M10 15L15 12L10 9V15Z" fill="white"/>
    </svg>
);
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="6" fill="#1877F2"/>
        <path d="M14.5 21V13.5H17.5L18 9.5H14.5V7.5C14.5 6.47 14.5 5.5 16.5 5.5H18V2.14C17.674 2.097 16.637 2 15.426 2C12.896 2 11 3.657 11 6.7V9.5H8V13.5H11V21H14.5Z" fill="white"/>
    </svg>
);
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="24" rx="6" fill="black"/>
        <path d="M18.244 2.25H21.552L14.325 10.51L23.054 21.75H16.388L10.395 14.093L3.678 21.75H0.369L8.097 12.91L-0.375 2.25H6.46L11.83 8.917L18.244 2.25ZM17.083 19.467H19.14L7.042 4.126H4.88L17.083 19.467Z" fill="white"/>
    </svg>
);

export const platformIcons: { [key: string]: React.ElementType } = {
  Blog: BlogIcon,
  Instagram: InstagramIcon,
  TikTok: TikTokIcon,
  YouTube: YouTubeIcon,
  Facebook: FacebookIcon,
  X: XIcon,
};
