'use client';

import { useState } from 'react';
import { Badge, Button, Card, Tabs } from '@/shared/components';

export function PreviewClient() {
  const [tab, setTab] = useState('positions');
  const [tabVariant, setTabVariant] = useState('underline');

  return (
    <>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Button</h2>
        <div className="flex flex-wrap gap-3">
          <Button text="Primary" />
          <Button text="Secondary" variant="secondary" />
          <Button text="Ghost" variant="ghost" />
          <Button text="Danger" variant="danger" />
          <Button text="With icon" icon={<span aria-hidden>+</span>} />
          <Button text="Loading" loading />
          <Button text="Disabled" disabled />
          <Button
            text="Add"
            iconOnly
            icon={<span aria-hidden>+</span>}
            variant="secondary"
          />
          <Button text="Docs" href="https://nextjs.org" variant="ghost" />
          <Button text="Home" href="/" variant="ghost" />
        </div>
        <div className="flex flex-wrap gap-3">
          <Button text="Small" size="sm" />
          <Button text="Medium" size="md" />
          <Button text="Large" size="lg" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Tabs</h2>
        <Tabs
          tabs={[
            { id: 'underline', label: 'underline' },
            { id: 'pills', label: 'pills' },
            { id: 'segmented', label: 'segmented' },
          ]}
          value={tabVariant}
          onChange={setTabVariant}
          variant="pills"
        />
        <Tabs
          aria-label="Trading tabs"
          tabs={[
            { id: 'positions', label: 'Open Positions', badge: 2 },
            { id: 'closed', label: 'Closed Trades' },
            { id: 'watchlist', label: 'Watchlist' },
            { id: 'settings', label: 'Settings', disabled: true },
          ]}
          value={tab}
          onChange={setTab}
          variant={tabVariant as 'underline' | 'pills' | 'segmented'}
        />
        <p className="text-sm text-gray-500">Active: {tab}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Badge</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Badge text="Neutral" />
          <Badge text="Connected" variant="success" dot />
          <Badge text="LIVE" variant="success" dot pulse />
          <Badge text="HALTED" variant="danger" dot />
          <Badge text="BUY" variant="success" />
          <Badge text="SELL" variant="danger" />
          <Badge text="SUPPLY 5m" variant="info" />
          <Badge text="Pending" variant="warning" />
          <Badge text="Small" variant="info" size="sm" />
          <Badge text="Medium" variant="info" size="md" />
          <Badge text="Large" variant="info" size="lg" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Card</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card
            title="RELIANCE"
            subtitle="NSE · Oil & Gas"
            headerRight={
              <span
                style={{
                  borderRadius: 9999,
                  backgroundColor: '#dcfce7',
                  padding: '4px 8px',
                  fontSize: 11,
                  fontWeight: 500,
                  color: '#15803d',
                }}
              >
                +2.45%
              </span>
            }
            href="/"
          >
            <div style={{ fontSize: 22, fontWeight: 700 }}>₹2,845.20</div>
          </Card>

          <Card
            variant="horizontal"
            title="Mantri Signal"
            subtitle="Order block zone"
            media={
              <div
                style={{
                  display: 'flex',
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#dbeafe',
                  color: '#1d4ed8',
                }}
              >
                OB
              </div>
            }
            onClick={() => alert('clicked')}
          />

          <Card
            variant="square"
            title="P&L Today"
            subtitle="Paper trading"
            footer={
              <span style={{ fontSize: 11, color: '#6b7280' }}>
                Updated just now
              </span>
            }
          >
            <div style={{ fontSize: 28, fontWeight: 700, color: '#16a34a' }}>
              +₹1,245
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
