import { useState, useEffect, useRef } from "react";

const PURPLE = "#9333ea";
const PURPLE_DARK = "#6b21a8";
const PURPLE_BRIGHT = "#c026d3";
const BG = "#0a0a0f";
const CARD = "#12121a";
const CARD2 = "#1a1a26";
const BORDER = "#2a2a3a";
const TEXT = "#e2e8f0";
const MUTED = "#64748b";
const GREEN = "#22c55e";
const RED = "#ef4444";
const YELLOW = "#eab308";
const CYAN = "#06b6d4";

const versions = [
  { id: "1.21.4", label: "1.21.4", tag: "Latest" },
  { id: "1.20.1", label: "1.20.1", tag: "Stable" },
  { id: "1.19.4", label: "1.19.4", tag: "" },
  { id: "1.18.2", label: "1.18.2", tag: "" },
  { id: "1.16.5", label: "1.16.5", tag: "Popular" },
  { id: "1.12.2", label: "1.12.2", tag: "Legacy" },
];

const loaders = ["Vanilla", "Fabric", "Forge", "NeoForge", "Quilt"];

const accounts = [
  { name: "Steve", type: "Offline", color: "#9333ea", avatar: "S" },
  { name: "GamerBoy", type: "Microsoft", color: "#0078d4", avatar: "G" },
  { name: "NotMaster", type: "Offline", color: "#ef4444", avatar: "N" },
];

const mods = [
  { name: "Sodium 0.5.2", cat: "Optimization", ver: "1.20.1", enabled: true, icon: "⚡" },
  { name: "Iris Shaders", cat: "Shaders", ver: "1.20.1", enabled: true, icon: "🌟" },
  { name: "Replay Mod", cat: "Misc", ver: "1.20.1", enabled: false, icon: "🎬" },
  { name: "OptiFine", cat: "Optimization", ver: "1.20.1", enabled: true, icon: "🔧" },
  { name: "Xaero's Minimap", cat: "Utility", ver: "1.20.1", enabled: true, icon: "🗺️" },
  { name: "JourneyMap", cat: "Utility", ver: "1.20.1", enabled: false, icon: "📍" },
];

const downloadItems = [
  { name: "Better Minecraft [FABRIC]", cat: "Modpack", ver: "1.20.1", size: "12.5M", icon: "🧊" },
  { name: "Patrix PvP Pack", cat: "Resource Pack", ver: "1.20.1", size: "1.2M", icon: "⚔️" },
  { name: "BSL Shaders", cat: "Shader Pack", ver: "1.20.1", size: "2.8M", icon: "✨" },
  { name: "SkyBlock Map", cat: "Map", ver: "1.20.1", size: "890K", icon: "🏝️" },
  { name: "Essential Mod", cat: "Mod", ver: "1.20.1", size: "3.1M", icon: "💎" },
  { name: "FPS Booster Ultra", cat: "Optimization", ver: "1.21.4", size: "240K", icon: "🚀" },
];

const worlds = [
  { name: "Survival World", mode: "Survival", ver: "1.20.1", date: "Today", icon: "🌲" },
  { name: "My Base World", mode: "Survival", ver: "1.20.1", date: "Yesterday", icon: "🏠" },
  { name: "Creative World", mode: "Creative", ver: "1.20.1", date: "3 Days Ago", icon: "🎨" },
  { name: "RoyalXSMP", mode: "SMP", ver: "1.21.4", date: "1 Week Ago", icon: "👑" },
];

const servers = [
  { name: "Hypixel Network", players: "54321", ping: 45, fav: true, icon: "H", color: "#f59e0b" },
  { name: "GommeHD", players: "1267", ping: 80, fav: false, icon: "G", color: "#3b82f6" },
  { name: "MineBerry", players: "856", ping: 120, fav: false, icon: "M", color: "#22c55e" },
  { name: "RoyalXSMP", players: "42", ping: 30, fav: true, icon: "R", color: "#9333ea" },
];

const news = [
  { title: "Minecraft 1.21.4 Released!", body: "New features and bug fixes in the latest snapshot.", date: "2 days ago", tag: "Update" },
  { title: "AddaLauncher v2.0 Drop!", body: "Major update with new performance optimizations.", date: "5 days ago", tag: "Launcher" },
  { title: "Top 10 Mods of 2024", body: "Best mods to enhance your Minecraft experience.", date: "1 week ago", tag: "Mods" },
];

const crashLogs = [
  { time: "17-05-2024 12:30 PM", error: "java.lang.RuntimeException", severity: "high" },
  { time: "16-05-2024 09:15 PM", error: "Exit Code: -1", severity: "med" },
  { time: "15-05-2024 08:10 PM", error: "java.lang.NullPointerException", severity: "high" },
];

const controlLayouts = ["Layout 1", "Layout 2", "PvP", "Survival", "Crystal PvP"];

const navItems = [
  { id: "home", icon: "🏠", label: "Home" },
  { id: "play", icon: "▶️", label: "Play" },
  { id: "accounts", icon: "👤", label: "Accounts" },
  { id: "controls", icon: "🎮", label: "Controls" },
  { id: "addons", icon: "📦", label: "Add-ons" },
  { id: "resources", icon: "🖼️", label: "Resource Packs" },
  { id: "shaders", icon: "✨", label: "Shaders" },
  { id: "worlds", icon: "🌍", label: "Worlds" },
  { id: "servers", icon: "🌐", label: "Servers" },
  { id: "settings", icon: "⚙️", label: "Settings" },
];

function PingBars({ ping }) {
  const bars = ping < 60 ? 3 : ping < 100 ? 2 : 1;
  const color = ping < 60 ? GREEN : ping < 100 ? YELLOW : RED;
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 16 }}>
      {[1, 2, 3].map(b => (
        <div key={b} style={{
          width: 4, height: 4 + b * 3,
          background: b <= bars ? color : BORDER,
          borderRadius: 1
        }} />
      ))}
    </div>
  );
}

function Toggle({ on, onChange }) {
  return (
    <div onClick={() => onChange(!on)} style={{
      width: 44, height: 24, borderRadius: 12,
      background: on ? PURPLE : BORDER,
      position: "relative", cursor: "pointer",
      transition: "background 0.2s",
      flexShrink: 0
    }}>
      <div style={{
        position: "absolute", top: 3, left: on ? 23 : 3,
        width: 18, height: 18, borderRadius: "50%",
        background: "#fff", transition: "left 0.2s",
        boxShadow: "0 1px 4px rgba(0,0,0,0.4)"
      }} />
    </div>
  );
}

function Badge({ label, color }) {
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, letterSpacing: 1,
      padding: "2px 6px", borderRadius: 4,
      background: color + "22", color: color, border: `1px solid ${color}44`
    }}>{label}</span>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: CARD, border: `1px solid ${BORDER}`,
      borderRadius: 12, padding: 16, ...style
    }}>{children}</div>
  );
}

function SectionTitle({ icon, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
      <span style={{ fontSize: 13 }}>{icon}</span>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: MUTED, textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}

function PlayButton({ loading, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: "100%", padding: "14px 0",
      background: loading ? `linear-gradient(135deg, ${PURPLE_DARK}, ${PURPLE})` : `linear-gradient(135deg, ${PURPLE}, ${PURPLE_BRIGHT})`,
      border: "none", borderRadius: 10, cursor: "pointer",
      color: "#fff", fontSize: 15, fontWeight: 800, letterSpacing: 2,
      fontFamily: "'Rajdhani', sans-serif",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
      boxShadow: `0 0 30px ${PURPLE}66`,
      transition: "all 0.2s",
      position: "relative", overflow: "hidden"
    }}>
      {loading ? (
        <>
          <div style={{
            width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)",
            borderTop: "2px solid #fff", borderRadius: "50%",
            animation: "spin 0.8s linear infinite"
          }} />
          LAUNCHING...
        </>
      ) : (
        <><span style={{ fontSize: 18 }}>▶</span> PLAY NOW</>
      )}
    </button>
  );
}

// ============= PAGES =============

function HomePage({ onNav }) {
  const [launching, setLaunching] = useState(false);
  const [selVer, setSelVer] = useState("1.21.4");
  const [selLoader, setSelLoader] = useState("Fabric");
  const [ram, setRam] = useState(2048);
  const [modToggle, setModToggle] = useState({});
  const [installed, setInstalled] = useState({});

  const toggleMod = (i) => setModToggle(p => ({ ...p, [i]: !p[i] }));

  const handlePlay = () => {
    setLaunching(true);
    setTimeout(() => setLaunching(false), 3000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Hero Banner */}
      <div style={{
        background: `linear-gradient(135deg, #0d0d1a 0%, #1a0a2e 50%, #0a1a0d 100%)`,
        border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24,
        position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: -40, right: -40,
          width: 200, height: 200, borderRadius: "50%",
          background: `radial-gradient(circle, ${PURPLE}33 0%, transparent 70%)`
        }} />
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 28, fontWeight: 900, letterSpacing: -0.5,
              fontFamily: "'Rajdhani', sans-serif",
              background: `linear-gradient(135deg, #fff 30%, ${PURPLE_BRIGHT})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>AddaLauncher</div>
            <div style={{ color: MUTED, fontSize: 12, marginTop: 2, letterSpacing: 1 }}>THE ULTIMATE MINECRAFT EXPERIENCE</div>
            <div style={{ display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
              {[["Version", selVer], ["Loader", selLoader], ["RAM", `${ram}MB`]].map(([k, v]) => (
                <div key={k} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: MUTED, letterSpacing: 1, textTransform: "uppercase" }}>{k}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: PURPLE_BRIGHT, fontFamily: "'Rajdhani', sans-serif" }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <PlayButton loading={launching} onClick={handlePlay} />
            </div>
          </div>
          <div style={{
            width: 120, height: 120, borderRadius: 16,
            background: `linear-gradient(135deg, #1a2a1a, #0d1a0d)`,
            border: `2px solid ${PURPLE}44`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 56, flexShrink: 0
          }}>⛏️</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Version Selector */}
        <Card>
          <SectionTitle icon="📋" label="Version" />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {versions.map(v => (
              <div key={v.id} onClick={() => setSelVer(v.id)} style={{
                padding: "8px 12px", borderRadius: 8, cursor: "pointer",
                background: selVer === v.id ? `${PURPLE}22` : "transparent",
                border: `1px solid ${selVer === v.id ? PURPLE + "66" : "transparent"}`,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                transition: "all 0.15s"
              }}>
                <span style={{ fontSize: 13, fontWeight: selVer === v.id ? 700 : 400, color: selVer === v.id ? "#fff" : MUTED }}>{v.label}</span>
                {v.tag && <Badge label={v.tag} color={v.tag === "Latest" ? GREEN : v.tag === "Popular" ? YELLOW : PURPLE} />}
              </div>
            ))}
          </div>
        </Card>

        {/* Loader + RAM */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card>
            <SectionTitle icon="⚙️" label="Loader" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {loaders.map(l => (
                <button key={l} onClick={() => setSelLoader(l)} style={{
                  padding: "6px 12px", borderRadius: 6, border: "none", cursor: "pointer",
                  background: selLoader === l ? PURPLE : CARD2,
                  color: selLoader === l ? "#fff" : MUTED,
                  fontSize: 12, fontWeight: 600, transition: "all 0.15s"
                }}>{l}</button>
              ))}
            </div>
          </Card>
          <Card>
            <SectionTitle icon="🧠" label="RAM" />
            <div style={{ fontSize: 22, fontWeight: 800, color: PURPLE_BRIGHT, fontFamily: "'Rajdhani', sans-serif", marginBottom: 8 }}>{ram} MB</div>
            <input type="range" min={512} max={8192} step={256} value={ram}
              onChange={e => setRam(+e.target.value)}
              style={{ width: "100%", accentColor: PURPLE }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: MUTED, marginTop: 4 }}>
              <span>512 MB</span><span>8192 MB</span>
            </div>
          </Card>
        </div>
      </div>

      {/* News */}
      <Card>
        <SectionTitle icon="📰" label="Latest News" />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {news.map((n, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, padding: 12, borderRadius: 10,
              background: CARD2, cursor: "pointer",
              border: `1px solid ${BORDER}`,
              transition: "border-color 0.2s"
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 8,
                background: `linear-gradient(135deg, ${PURPLE}33, ${CYAN}22)`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0
              }}>📰</div>
              <div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 3 }}>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{n.title}</span>
                  <Badge label={n.tag} color={n.tag === "Update" ? GREEN : n.tag === "Launcher" ? PURPLE : YELLOW} />
                </div>
                <div style={{ fontSize: 11, color: MUTED }}>{n.body}</div>
                <div style={{ fontSize: 10, color: MUTED, marginTop: 4 }}>{n.date}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[
          { label: "Mods", value: "24", icon: "🔧", color: PURPLE },
          { label: "Worlds", value: "8", icon: "🌍", color: GREEN },
          { label: "Servers", value: "12", icon: "🌐", color: CYAN },
          { label: "Screenshots", value: "67", icon: "📸", color: YELLOW },
        ].map(s => (
          <Card key={s.label} style={{ textAlign: "center", padding: 12 }}>
            <div style={{ fontSize: 22 }}>{s.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: "'Rajdhani', sans-serif" }}>{s.value}</div>
            <div style={{ fontSize: 10, color: MUTED, letterSpacing: 1 }}>{s.label.toUpperCase()}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AccountsPage() {
  const [accs, setAccs] = useState(accounts);
  const [active, setActive] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");

  const addAcc = () => {
    if (!newName.trim()) return;
    setAccs(p => [...p, { name: newName, type: "Offline", color: PURPLE, avatar: newName[0].toUpperCase() }]);
    setNewName(""); setShowAdd(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0, fontFamily: "'Rajdhani', sans-serif", fontSize: 22, fontWeight: 800 }}>Account Manager</h2>
        <button onClick={() => setShowAdd(!showAdd)} style={{
          padding: "8px 16px", borderRadius: 8, border: "none",
          background: PURPLE, color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 13
        }}>+ Add Account</button>
      </div>

      {showAdd && (
        <Card style={{ border: `1px solid ${PURPLE}44` }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Add Offline Account</div>
          <div style={{ display: "flex", gap: 10 }}>
            <input value={newName} onChange={e => setNewName(e.target.value)}
              placeholder="Enter username..."
              style={{
                flex: 1, padding: "10px 14px", borderRadius: 8,
                background: CARD2, border: `1px solid ${BORDER}`,
                color: TEXT, fontSize: 13, outline: "none"
              }} />
            <button onClick={addAcc} style={{
              padding: "10px 20px", borderRadius: 8, border: "none",
              background: PURPLE, color: "#fff", cursor: "pointer", fontWeight: 700
            }}>Add</button>
          </div>
          <div style={{ marginTop: 12 }}>
            <button style={{
              width: "100%", padding: "10px", borderRadius: 8, border: `1px solid ${BORDER}`,
              background: "transparent", color: TEXT, cursor: "pointer", fontSize: 13, fontWeight: 600,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8
            }}>
              <span style={{ color: "#0078d4" }}>⊞</span> Sign in with Microsoft
            </button>
          </div>
        </Card>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {accs.map((acc, i) => (
          <div key={i} onClick={() => setActive(i)} style={{
            padding: 16, borderRadius: 12, cursor: "pointer",
            background: active === i ? `${PURPLE}15` : CARD,
            border: `1px solid ${active === i ? PURPLE + "66" : BORDER}`,
            display: "flex", alignItems: "center", gap: 14, transition: "all 0.15s"
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: `linear-gradient(135deg, ${acc.color}, ${acc.color}99)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, fontWeight: 800, color: "#fff"
            }}>{acc.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{acc.name}</div>
              <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{acc.type} Account</div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {active === i && <Badge label="ACTIVE" color={GREEN} />}
              <Badge label={acc.type.toUpperCase()} color={acc.type === "Microsoft" ? "#0078d4" : MUTED} />
            </div>
          </div>
        ))}
      </div>

      {/* Active profile card */}
      <Card style={{ background: `linear-gradient(135deg, ${PURPLE}15, transparent)`, border: `1px solid ${PURPLE}33` }}>
        <SectionTitle icon="👤" label={`Profile — ${accs[active]?.name}`} />
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <div style={{
            width: 80, height: 80, borderRadius: 16,
            background: `linear-gradient(135deg, ${accs[active]?.color}, #1a1a2e)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 40, border: `2px solid ${accs[active]?.color}66`
          }}>🧑‍💻</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "'Rajdhani', sans-serif" }}>{accs[active]?.name}</div>
            <div style={{ color: MUTED, fontSize: 12, marginTop: 4 }}>{accs[active]?.type} Account</div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              {["Edit Skin", "Change Name", "View Cape"].map(a => (
                <button key={a} style={{
                  padding: "6px 12px", borderRadius: 6, border: `1px solid ${BORDER}`,
                  background: CARD2, color: TEXT, cursor: "pointer", fontSize: 11, fontWeight: 600
                }}>{a}</button>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ControlsPage() {
  const [activeLayout, setActiveLayout] = useState("Survival");
  const [sensitivity, setSensitivity] = useState(65);
  const [gyro, setGyro] = useState(true);
  const [buttonSize, setButtonSize] = useState(50);
  const [opacity, setOpacity] = useState(80);

  const controlBtns = [
    { label: "W", pos: { top: "30%", left: "15%" } },
    { label: "A", pos: { top: "40%", left: "8%" } },
    { label: "S", pos: { top: "50%", left: "15%" } },
    { label: "D", pos: { top: "40%", left: "22%" } },
    { label: "J", pos: { top: "60%", right: "20%" } },
    { label: "⇧", pos: { top: "70%", right: "10%" } },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0, fontFamily: "'Rajdhani', sans-serif", fontSize: 22, fontWeight: 800 }}>Controls Editor</h2>
        <button style={{
          padding: "8px 16px", borderRadius: 8, border: "none",
          background: PURPLE, color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 13
        }}>Save Layout</button>
      </div>

      {/* Layout tabs */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {controlLayouts.map(l => (
          <button key={l} onClick={() => setActiveLayout(l)} style={{
            padding: "7px 14px", borderRadius: 8, border: "none", cursor: "pointer",
            background: activeLayout === l ? PURPLE : CARD2,
            color: activeLayout === l ? "#fff" : MUTED,
            fontSize: 12, fontWeight: 600
          }}>{l}</button>
        ))}
      </div>

      {/* Game viewport preview */}
      <div style={{
        background: `linear-gradient(160deg, #0a1a0a 0%, #0a0a1a 50%, #1a0a0a 100%)`,
        border: `1px solid ${BORDER}`, borderRadius: 14, height: 260, position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.06,
          background: "repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(147,51,234,0.5) 30px, rgba(147,51,234,0.5) 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(147,51,234,0.5) 30px, rgba(147,51,234,0.5) 31px)"
        }} />
        <div style={{ position: "absolute", top: 12, left: 12, fontSize: 11, color: MUTED, letterSpacing: 1 }}>
          🎮 {activeLayout.toUpperCase()} LAYOUT
        </div>
        {/* Crosshair */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 20, height: 20 }}>
          <div style={{ position: "absolute", top: 9, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.5)" }} />
          <div style={{ position: "absolute", left: 9, top: 0, bottom: 0, width: 2, background: "rgba(255,255,255,0.5)" }} />
        </div>
        {/* Control buttons */}
        {controlBtns.map((b, i) => (
          <div key={i} style={{
            position: "absolute", ...b.pos,
            width: Math.max(32, buttonSize * 0.7), height: Math.max(32, buttonSize * 0.7),
            background: `rgba(147,51,234,${opacity / 300})`,
            border: `1px solid ${PURPLE}88`,
            borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 13, fontWeight: 700, cursor: "grab",
            backdropFilter: "blur(4px)"
          }}>{b.label}</div>
        ))}
        <div style={{ position: "absolute", bottom: 10, right: 10, fontSize: 10, color: MUTED }}>Tap & drag buttons to reposition</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Card>
          <SectionTitle icon="🖱️" label="Sensitivity" />
          <div style={{ fontSize: 22, fontWeight: 800, color: PURPLE_BRIGHT, fontFamily: "'Rajdhani', sans-serif" }}>{sensitivity}%</div>
          <input type="range" min={10} max={100} value={sensitivity}
            onChange={e => setSensitivity(+e.target.value)}
            style={{ width: "100%", accentColor: PURPLE, marginTop: 8 }} />
        </Card>
        <Card>
          <SectionTitle icon="📐" label="Button Size" />
          <div style={{ fontSize: 22, fontWeight: 800, color: CYAN, fontFamily: "'Rajdhani', sans-serif" }}>{buttonSize}px</div>
          <input type="range" min={30} max={80} value={buttonSize}
            onChange={e => setButtonSize(+e.target.value)}
            style={{ width: "100%", accentColor: CYAN, marginTop: 8 }} />
        </Card>
      </div>

      <Card>
        <SectionTitle icon="⚙️" label="Advanced Controls" />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            ["Gyroscope Aim", gyro, setGyro],
            ["Vibration Feedback", true, () => {}],
            ["Show HUD", true, () => {}],
          ].map(([label, val, setter]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13 }}>{label}</span>
              <Toggle on={val} onChange={setter} />
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13 }}>Opacity</span>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 12, color: PURPLE_BRIGHT, fontWeight: 700 }}>{opacity}%</span>
              <input type="range" min={20} max={100} value={opacity}
                onChange={e => setOpacity(+e.target.value)}
                style={{ width: 100, accentColor: PURPLE }} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function AddonsPage() {
  const [localMods, setLocalMods] = useState(mods.map(m => ({ ...m })));
  const [activeTab, setActiveTab] = useState("Mods");
  const tabs = ["Mods", "Modpacks", "Resource Packs", "Shaders", "Data Packs", "Maps", "Skins"];

  const toggle = (i) => setLocalMods(p => p.map((m, idx) => idx === i ? { ...m, enabled: !m.enabled } : m));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2 style={{ margin: 0, fontFamily: "'Rajdhani', sans-serif", fontSize: 22, fontWeight: 800 }}>Add-ons & Content</h2>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            padding: "7px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
            background: activeTab === t ? PURPLE : CARD2,
            color: activeTab === t ? "#fff" : MUTED
          }}>{t}</button>
        ))}
      </div>

      <Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {localMods.map((mod, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "12px 4px",
              borderBottom: i < localMods.length - 1 ? `1px solid ${BORDER}` : "none"
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: `${PURPLE}22`, border: `1px solid ${PURPLE}33`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0
              }}>{mod.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{mod.name}</div>
                <div style={{ fontSize: 11, color: MUTED }}>{mod.cat} • {mod.ver}</div>
              </div>
              <Badge label={mod.enabled ? "ENABLED" : "DISABLED"} color={mod.enabled ? GREEN : MUTED} />
              <Toggle on={mod.enabled} onChange={() => toggle(i)} />
              <button style={{
                padding: "5px 10px", borderRadius: 6, border: `1px solid ${RED}44`,
                background: "transparent", color: RED, cursor: "pointer", fontSize: 11, fontWeight: 700
              }}>✕</button>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: "flex", gap: 10 }}>
        {["⇪ Import (.jar)", "📁 Import Folder"].map(a => (
          <button key={a} style={{
            flex: 1, padding: "11px", borderRadius: 9, border: `1px solid ${BORDER}`,
            background: CARD2, color: TEXT, cursor: "pointer", fontSize: 13, fontWeight: 600
          }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function DownloadPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [installed, setInstalled] = useState({});
  const filters = ["All", "Mods", "Modpacks", "PvP Packs", "Maps", "Shaders"];

  const filtered = downloadItems.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "All" || d.cat.toLowerCase().includes(activeFilter.toLowerCase().replace(" packs", ""));
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2 style={{ margin: 0, fontFamily: "'Rajdhani', sans-serif", fontSize: 22, fontWeight: 800 }}>Download Center</h2>

      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: CARD2, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px"
      }}>
        <span style={{ color: MUTED }}>🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search mods, packs, maps..."
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: TEXT, fontSize: 14 }} />
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {filters.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)} style={{
            padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
            background: activeFilter === f ? PURPLE : CARD2,
            color: activeFilter === f ? "#fff" : MUTED
          }}>{f}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((item, i) => (
          <Card key={i} style={{ padding: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 10,
                background: `linear-gradient(135deg, ${PURPLE}33, ${CYAN}22)`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0
              }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{item.name}</div>
                <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{item.cat} • {item.ver} • ⬇ {item.size}</div>
              </div>
              <button onClick={() => setInstalled(p => ({ ...p, [i]: !p[i] }))} style={{
                padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer",
                background: installed[i] ? GREEN : PURPLE,
                color: "#fff", fontWeight: 700, fontSize: 12, transition: "all 0.15s"
              }}>{installed[i] ? "✓ Done" : "Install"}</button>
            </div>
            {installed[i] && (
              <div style={{ marginTop: 10 }}>
                <div style={{ height: 4, background: BORDER, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: "100%", background: `linear-gradient(90deg, ${PURPLE}, ${GREEN})`, borderRadius: 4 }} />
                </div>
                <div style={{ fontSize: 10, color: GREEN, marginTop: 4 }}>✓ Installed successfully</div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

function WorldsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0, fontFamily: "'Rajdhani', sans-serif", fontSize: 22, fontWeight: 800 }}>Worlds</h2>
        <button style={{
          padding: "8px 16px", borderRadius: 8, border: "none",
          background: PURPLE, color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 13
        }}>+ New World</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {worlds.map((w, i) => (
          <Card key={i} style={{ padding: 14 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{
                width: 56, height: 56, borderRadius: 12,
                background: `linear-gradient(135deg, ${PURPLE}33, #1a2a1a)`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0
              }}>{w.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{w.name}</div>
                <div style={{ fontSize: 11, color: MUTED, marginTop: 3 }}>{w.mode} • {w.ver}</div>
                <div style={{ fontSize: 10, color: MUTED, marginTop: 2 }}>Last played: {w.date}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{
                  padding: "7px 14px", borderRadius: 8, border: "none",
                  background: PURPLE, color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 12
                }}>▶ Play</button>
                <button style={{
                  padding: "7px 10px", borderRadius: 8, border: `1px solid ${BORDER}`,
                  background: "transparent", color: MUTED, cursor: "pointer", fontSize: 12
                }}>⋮</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <button style={{
        width: "100%", padding: "11px", borderRadius: 9, border: `1px solid ${BORDER}`,
        background: CARD2, color: TEXT, cursor: "pointer", fontSize: 13, fontWeight: 600
      }}>⇪ Import World (.zip)</button>
    </div>
  );
}

function ServersPage() {
  const [srvs, setSrvs] = useState(servers);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0, fontFamily: "'Rajdhani', sans-serif", fontSize: 22, fontWeight: 800 }}>Server List</h2>
        <button style={{
          padding: "8px 16px", borderRadius: 8, border: "none",
          background: PURPLE, color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 13
        }}>+ Add Server</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {srvs.map((s, i) => (
          <Card key={i} style={{ padding: 14 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{
                width: 48, height: 48, borderRadius: 10,
                background: `${s.color}22`, border: `2px solid ${s.color}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, fontWeight: 800, color: s.color
              }}>{s.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
                <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>🟢 {parseInt(s.players).toLocaleString()} Players Online</div>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <PingBars ping={s.ping} />
                <span style={{ fontSize: 11, color: s.ping < 60 ? GREEN : s.ping < 100 ? YELLOW : RED }}>{s.ping}ms</span>
                <span onClick={() => setSrvs(p => p.map((x, j) => j === i ? { ...x, fav: !x.fav } : x))}
                  style={{ cursor: "pointer", fontSize: 16, color: s.fav ? YELLOW : BORDER }}>★</span>
                <button style={{
                  padding: "7px 14px", borderRadius: 8, border: "none",
                  background: PURPLE, color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 12
                }}>Join</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SettingsPage() {
  const [theme, setTheme] = useState("Dark");
  const [ram, setRam] = useState(2048);
  const [fps, setFps] = useState(true);
  const [lowRam, setLowRam] = useState(false);
  const [battery, setBattery] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [java, setJava] = useState("Internal Java 17");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2 style={{ margin: 0, fontFamily: "'Rajdhani', sans-serif", fontSize: 22, fontWeight: 800 }}>Settings</h2>

      {/* Appearance */}
      <Card>
        <SectionTitle icon="🎨" label="Appearance" />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div style={{ fontSize: 12, color: MUTED, marginBottom: 8 }}>Theme</div>
            <div style={{ display: "flex", gap: 8 }}>
              {["Dark", "Light", "Purple"].map(t => (
                <button key={t} onClick={() => setTheme(t)} style={{
                  padding: "7px 16px", borderRadius: 8, border: "none", cursor: "pointer",
                  background: theme === t ? PURPLE : CARD2, color: theme === t ? "#fff" : MUTED,
                  fontWeight: 600, fontSize: 12
                }}>{t}</button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Performance */}
      <Card>
        <SectionTitle icon="⚡" label="Performance" />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            ["FPS Booster", fps, setFps, PURPLE, "Boost FPS and smooth gameplay"],
            ["Low RAM Mode", lowRam, setLowRam, CYAN, "Reduce memory usage"],
            ["Battery Saver", battery, setBattery, GREEN, "Limit FPS to save battery"],
          ].map(([label, val, setter, color, desc]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div>
                <div style={{ fontSize: 11, color: MUTED }}>{desc}</div>
              </div>
              <Toggle on={val} onChange={setter} />
            </div>
          ))}
        </div>
      </Card>

      {/* Java */}
      <Card>
        <SectionTitle icon="☕" label="Java Runtime" />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {["Internal Java 17", "Internal Java 21", "System Java"].map(j => (
            <div key={j} onClick={() => setJava(j)} style={{
              padding: "10px 14px", borderRadius: 8, cursor: "pointer",
              background: java === j ? `${PURPLE}22` : CARD2,
              border: `1px solid ${java === j ? PURPLE + "55" : BORDER}`,
              display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
              <span style={{ fontSize: 13, fontWeight: java === j ? 700 : 400 }}>☕ {j}</span>
              {java === j && <Badge label="SELECTED" color={PURPLE} />}
            </div>
          ))}
        </div>
      </Card>

      {/* Memory */}
      <Card>
        <SectionTitle icon="🧠" label="Memory Allocation" />
        <div style={{ fontSize: 24, fontWeight: 800, color: PURPLE_BRIGHT, fontFamily: "'Rajdhani', sans-serif" }}>{ram} MB</div>
        <input type="range" min={512} max={8192} step={256} value={ram}
          onChange={e => setRam(+e.target.value)}
          style={{ width: "100%", accentColor: PURPLE, margin: "10px 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: MUTED }}>
          <span>Min: 512 MB</span><span>Recommended: 2048 MB</span><span>Max: 8192 MB</span>
        </div>
      </Card>

      {/* Other */}
      <Card>
        <SectionTitle icon="🔔" label="General" />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Auto Update Launcher</div>
            <div style={{ fontSize: 11, color: MUTED }}>Automatically download updates</div>
          </div>
          <Toggle on={autoUpdate} onChange={setAutoUpdate} />
        </div>
      </Card>
    </div>
  );
}

function CrashLogsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2 style={{ margin: 0, fontFamily: "'Rajdhani', sans-serif", fontSize: 22, fontWeight: 800 }}>Crash Logs</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {crashLogs.map((c, i) => (
          <Card key={i} style={{ borderColor: c.severity === "high" ? RED + "44" : YELLOW + "44" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                background: c.severity === "high" ? `${RED}22` : `${YELLOW}22`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18
              }}>💥</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: c.severity === "high" ? RED : YELLOW }}>{c.error}</div>
                <div style={{ fontSize: 11, color: MUTED, marginTop: 4 }}>{c.time}</div>
              </div>
              <button style={{
                padding: "5px 10px", borderRadius: 6, border: `1px solid ${BORDER}`,
                background: "transparent", color: TEXT, cursor: "pointer", fontSize: 11
              }}>View</button>
            </div>
          </Card>
        ))}
      </div>
      <button style={{
        width: "100%", padding: "11px", borderRadius: 9, border: `1px solid ${BORDER}`,
        background: CARD2, color: TEXT, cursor: "pointer", fontSize: 13, fontWeight: 600
      }}>📋 View All Logs</button>
    </div>
  );
}

// ============= MAIN APP =============

export default function AddaLauncher() {
  const [page, setPage] = useState("home");
  const [sideOpen, setSideOpen] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const msgs = ["✅ Mod enabled: Sodium", "⬇️ BSL Shaders installed!", "🔔 Minecraft 1.21.4 update available!"];
    let idx = 0;
    const cycle = () => {
      setNotification(msgs[idx % msgs.length]);
      idx++;
      setTimeout(() => setNotification(null), 3000);
    };
    cycle();
    const timer = setInterval(cycle, 8000);
    return () => clearInterval(timer);
  }, []);

  const pageMap = {
    home: <HomePage onNav={setPage} />,
    accounts: <AccountsPage />,
    controls: <ControlsPage />,
    addons: <AddonsPage />,
    worlds: <WorldsPage />,
    servers: <ServersPage />,
    settings: <SettingsPage />,
    crashes: <CrashLogsPage />,
    downloads: <DownloadPage />,
  };

  const pageContent = pageMap[page] || pageMap.home;

  return (
    <div style={{
      minHeight: "100vh", background: BG, color: TEXT,
      fontFamily: "'Exo 2', 'Segoe UI', sans-serif",
      display: "flex", flexDirection: "column"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700;800;900&family=Exo+2:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${PURPLE}55; border-radius: 4px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        input[type=range] { -webkit-appearance: none; height: 4px; border-radius: 4px; background: ${BORDER}; cursor: pointer; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: ${PURPLE}; cursor: pointer; }
      `}</style>

      {/* Top Bar */}
      <div style={{
        height: 52, background: CARD, borderBottom: `1px solid ${BORDER}`,
        display: "flex", alignItems: "center", paddingInline: 16, gap: 14,
        position: "sticky", top: 0, zIndex: 100
      }}>
        <button onClick={() => setSideOpen(!sideOpen)} style={{
          background: "none", border: "none", cursor: "pointer", color: TEXT, fontSize: 18, padding: 4
        }}>☰</button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 22 }}>⛏️</span>
          <span style={{
            fontSize: 18, fontWeight: 900, fontFamily: "'Rajdhani', sans-serif",
            background: `linear-gradient(135deg, #fff, ${PURPLE_BRIGHT})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>AddaLauncher</span>
        </div>
        <div style={{ flex: 1 }} />
        <button onClick={() => setPage("downloads")} style={{
          padding: "6px 14px", borderRadius: 8, border: "none",
          background: PURPLE, color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 12
        }}>⬇ Download Center</button>
        <button onClick={() => setPage("crashes")} style={{
          padding: "6px 14px", borderRadius: 8, border: `1px solid ${BORDER}`,
          background: "transparent", color: MUTED, cursor: "pointer", fontSize: 12
        }}>💥 Crash Logs</button>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: `${PURPLE}33`, display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", fontSize: 15
        }}>🔔</div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        {sideOpen && (
          <div style={{
            width: 200, background: CARD, borderRight: `1px solid ${BORDER}`,
            display: "flex", flexDirection: "column", padding: "12px 8px",
            overflowY: "auto", flexShrink: 0
          }}>
            {navItems.map(item => (
              <button key={item.id} onClick={() => setPage(item.id)} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                borderRadius: 9, border: "none", cursor: "pointer",
                background: page === item.id ? `${PURPLE}22` : "transparent",
                color: page === item.id ? "#fff" : MUTED,
                fontWeight: page === item.id ? 700 : 400, fontSize: 13,
                textAlign: "left", marginBottom: 2, transition: "all 0.15s"
              }}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                {item.label}
                {page === item.id && (
                  <div style={{
                    marginLeft: "auto", width: 4, height: 16, borderRadius: 2,
                    background: PURPLE
                  }} />
                )}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            <div style={{ padding: "12px 12px 4px", borderTop: `1px solid ${BORDER}`, marginTop: 8 }}>
              <div style={{ fontSize: 10, color: MUTED, letterSpacing: 1, marginBottom: 8 }}>EXTRAS</div>
              {[["💾", "Backup / Restore"], ["💬", "Discord"], ["📰", "News"]].map(([ic, lbl]) => (
                <button key={lbl} style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", width: "100%",
                  borderRadius: 8, border: "none", background: "transparent", color: MUTED,
                  cursor: "pointer", fontSize: 12, marginBottom: 2
                }}>{ic} {lbl}</button>
              ))}
            </div>
          </div>
        )}

        {/* Main content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
          {pageContent}
        </div>
      </div>

      {/* Notification toast */}
      {notification && (
        <div style={{
          position: "fixed", bottom: 24, right: 24,
          background: CARD2, border: `1px solid ${PURPLE}55`,
          borderRadius: 12, padding: "12px 18px",
          fontSize: 13, fontWeight: 600,
          boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${PURPLE}22`,
          animation: "slideIn 0.3s ease",
          zIndex: 999, maxWidth: 280
        }}>{notification}</div>
      )}

      {/* Footer bar */}
      <div style={{
        height: 36, background: CARD, borderTop: `1px solid ${BORDER}`,
        display: "flex", alignItems: "center", paddingInline: 16, gap: 16, fontSize: 11, color: MUTED
      }}>
        <span style={{ color: GREEN, animation: "pulse 2s infinite" }}>●</span>
        <span>Online</span>
        <span>•</span>
        <span>v2.0.1</span>
        <span>•</span>
        <span>Android 12</span>
        <div style={{ flex: 1 }} />
        <span style={{ color: PURPLE }}>RoyalXSMP ✦</span>
      </div>
    </div>
  );
}
