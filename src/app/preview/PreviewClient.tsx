"use client";

import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Dropdown,
  Input,
  RadioGroup,
  Switch,
  Tabs,
} from "@/shared/components";

type SectionId =
  "button" | "tabs" | "badge" | "card" | "input" | "dropdown" | "switch" | "checkbox" | "radio";

const sections: { id: SectionId; label: string }[] = [
  { id: "button", label: "Button" },
  { id: "tabs", label: "Tabs" },
  { id: "badge", label: "Badge" },
  { id: "card", label: "Card" },
  { id: "input", label: "Input" },
  { id: "dropdown", label: "Dropdown" },
  { id: "switch", label: "Switch" },
  { id: "checkbox", label: "Checkbox" },
  { id: "radio", label: "Radio Group" },
];

export function PreviewClient() {
  const [active, setActive] = useState<SectionId>("button");

  return (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
      <aside
        style={{
          position: "sticky",
          top: 24,
          width: 200,
          flexShrink: 0,
          borderRight: "1px solid #e5e7eb",
          paddingRight: 16,
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {sections.map((s) => {
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                style={{
                  textAlign: "left",
                  padding: "8px 12px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
                  backgroundColor: isActive ? "#eff6ff" : "transparent",
                  color: isActive ? "#1d4ed8" : "#374151",
                }}
              >
                {s.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <section style={{ flex: 1, minWidth: 0 }}>
        {active === "button" && <ButtonSection />}
        {active === "tabs" && <TabsSection />}
        {active === "badge" && <BadgeSection />}
        {active === "card" && <CardSection />}
        {active === "input" && <InputSection />}
        {active === "dropdown" && <DropdownSection />}
        {active === "switch" && <SwitchSection />}
        {active === "checkbox" && <CheckboxSection />}
        {active === "radio" && <RadioSection />}
      </section>
    </div>
  );
}

function Heading({ children }: { children: string }) {
  return <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>{children}</h2>;
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>{children}</div>
  );
}

function ButtonSection() {
  return (
    <>
      <Heading>Button</Heading>
      <Row>
        <Button text="Primary" />
        <Button text="Secondary" variant="secondary" />
        <Button text="Ghost" variant="ghost" />
        <Button text="Danger" variant="danger" />
      </Row>
      <Row>
        <Button text="With icon" icon={<span aria-hidden>+</span>} />
        <Button text="Loading" loading />
        <Button text="Disabled" disabled />
        <Button text="Add" iconOnly icon={<span aria-hidden>+</span>} variant="secondary" />
        <Button text="Docs" href="https://nextjs.org" variant="ghost" />
        <Button text="Home" href="/" variant="ghost" />
      </Row>
      <Row>
        <Button text="Small" size="sm" />
        <Button text="Medium" size="md" />
        <Button text="Large" size="lg" />
      </Row>
    </>
  );
}

function TabsSection() {
  const [tab, setTab] = useState("positions");
  const [variant, setVariant] = useState<"underline" | "pills" | "segmented">("underline");

  return (
    <>
      <Heading>Tabs</Heading>
      <div style={{ marginBottom: 16 }}>
        <Tabs
          tabs={[
            { id: "underline", label: "underline" },
            { id: "pills", label: "pills" },
            { id: "segmented", label: "segmented" },
          ]}
          value={variant}
          onChange={(v) => setVariant(v as typeof variant)}
          variant="pills"
        />
      </div>
      <Tabs
        aria-label="Trading tabs"
        tabs={[
          { id: "positions", label: "Open Positions", badge: 2 },
          { id: "closed", label: "Closed Trades" },
          { id: "watchlist", label: "Watchlist" },
          { id: "settings", label: "Settings", disabled: true },
        ]}
        value={tab}
        onChange={setTab}
        variant={variant}
      />
      <p style={{ marginTop: 12, fontSize: 13, color: "#6b7280" }}>Active: {tab}</p>
    </>
  );
}

function BadgeSection() {
  return (
    <>
      <Heading>Badge</Heading>
      <Row>
        <Badge text="Neutral" />
        <Badge text="Connected" variant="success" dot />
        <Badge text="LIVE" variant="success" dot pulse />
        <Badge text="HALTED" variant="danger" dot />
        <Badge text="BUY" variant="success" />
        <Badge text="SELL" variant="danger" />
        <Badge text="SUPPLY 5m" variant="info" />
        <Badge text="Pending" variant="warning" />
      </Row>
      <Row>
        <Badge text="Small" variant="info" size="sm" />
        <Badge text="Medium" variant="info" size="md" />
        <Badge text="Large" variant="info" size="lg" />
      </Row>
    </>
  );
}

function CardSection() {
  return (
    <>
      <Heading>Card</Heading>
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        <Card
          title="RELIANCE"
          subtitle="NSE · Oil & Gas"
          headerRight={<Badge text="+2.45%" variant="success" size="sm" />}
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
                display: "flex",
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#dbeafe",
                color: "#1d4ed8",
              }}
            >
              OB
            </div>
          }
          onClick={() => alert("clicked")}
        />
        <Card
          variant="square"
          title="P&L Today"
          subtitle="Paper trading"
          footer={<span style={{ fontSize: 11, color: "#6b7280" }}>Updated just now</span>}
        >
          <div style={{ fontSize: 28, fontWeight: 700, color: "#16a34a" }}>+₹1,245</div>
        </Card>
      </div>
    </>
  );
}

function InputSection() {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  return (
    <>
      <Heading>Input</Heading>
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        <Input
          label="Full name"
          value={text}
          onChange={setText}
          placeholder="Satoshi"
          required
          error={text.length === 0 ? "Name is required" : false}
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          helperText="We'll never share this."
          prefix={<span>@</span>}
        />
        <Input label="Small" size="sm" value="" onChange={() => {}} placeholder="sm" />
        <Input label="Large" size="lg" value="" onChange={() => {}} placeholder="lg" />
        <Input label="Disabled" value="locked" onChange={() => {}} disabled />
        <Input label="Read-only" value="read-only" onChange={() => {}} readOnly />
      </div>
    </>
  );
}

function DropdownSection() {
  const [symbol, setSymbol] = useState<string | null>(null);
  const [tf, setTf] = useState<string | null>(null);
  return (
    <>
      <Heading>Dropdown</Heading>
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        <Dropdown
          label="Symbol"
          value={symbol}
          onChange={setSymbol}
          options={[
            { value: "RELIANCE", label: "RELIANCE", description: "NSE · Oil & Gas" },
            { value: "TCS", label: "TCS", description: "NSE · IT Services" },
            { value: "HDFCBANK", label: "HDFCBANK", description: "NSE · Banking" },
            { value: "INFY", label: "INFY", description: "NSE · IT Services" },
            { value: "SBIN", label: "SBIN", description: "NSE · Banking", disabled: true },
          ]}
          searchable
          placeholder="Pick a symbol"
          required
          error={symbol === null ? "Select a symbol" : false}
        />
        <Dropdown
          label="Timeframe"
          value={tf}
          onChange={setTf}
          options={[
            { value: "1m", label: "1 minute" },
            { value: "5m", label: "5 minutes" },
            { value: "15m", label: "15 minutes" },
            { value: "1d", label: "1 day" },
          ]}
          helperText="Used for chart bars"
        />
      </div>
    </>
  );
}

function SwitchSection() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);
  return (
    <>
      <Heading>Switch</Heading>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Switch
          label="Order notifications"
          description="Ping on fills and rejections"
          checked={notify}
          onChange={setNotify}
        />
        <Switch label="Dark mode" checked={dark} onChange={setDark} labelPosition="left" />
        <Switch label="Small" size="sm" checked={notify} onChange={setNotify} />
        <Switch label="Large" size="lg" checked={notify} onChange={setNotify} />
        <Switch label="Disabled" checked={false} onChange={() => {}} disabled />
      </div>
    </>
  );
}

function CheckboxSection() {
  const [agree, setAgree] = useState(false);
  const [some, setSome] = useState(false);
  return (
    <>
      <Heading>Checkbox</Heading>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Checkbox
          label="I agree to the terms"
          description="Required to open an account"
          checked={agree}
          onChange={setAgree}
          required
          error={!agree ? "You must agree" : false}
        />
        <Checkbox
          label="Indeterminate (select all)"
          checked={some}
          indeterminate={!some}
          onChange={setSome}
        />
        <Checkbox label="Disabled" checked={false} onChange={() => {}} disabled />
      </div>
    </>
  );
}

function RadioSection() {
  const [side, setSide] = useState<string | null>("buy");
  const [strategy, setStrategy] = useState<string | null>(null);
  return (
    <>
      <Heading>Radio Group</Heading>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <RadioGroup
          name="side"
          label="Order side"
          value={side}
          onChange={setSide}
          direction="horizontal"
          options={[
            { value: "buy", label: "Buy" },
            { value: "sell", label: "Sell" },
          ]}
        />
        <RadioGroup
          name="strategy"
          label="Strategy"
          value={strategy}
          onChange={setStrategy}
          required
          error={strategy === null ? "Pick a strategy" : false}
          options={[
            { value: "smc", label: "SMC zones", description: "Supply/demand blocks" },
            { value: "orb", label: "Opening Range Breakout", description: "First 15m range" },
            { value: "momo", label: "Momentum", description: "Trend-following" },
          ]}
        />
      </div>
    </>
  );
}
