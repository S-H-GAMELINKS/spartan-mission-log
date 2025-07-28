import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="spartan-header">
        <div className="container flex h-20 items-center">
          <h1 className="spartan-title text-3xl">SPARTAN MISSION LOG</h1>
          <div className="ml-auto text-sm text-gray-300">
            Master Chief Collection Compatible
          </div>
        </div>
      </header>
      <main className="container py-10 px-6">
        {children}
      </main>
    </div>
  );
}
