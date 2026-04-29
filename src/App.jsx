import { useState, useEffect } from "react";

const PURPLE = "#9333ea";
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

const POJAV_PACKAGE = "net.kdt.pojavlaunch";

const versions = [
  { id: "1.21.4", label: "1.21.4", tag: "Latest" },
  { id: "1.20.1", label: "1.20.1", tag: "Stable" },
  { id: "1.19.4", label: "1.19.4", tag: "" },
  { id: "1.18.2", label: "1.18.2", tag: "" },
  { id: "1.16.5", label: "1.16.5", tag: "Popular" },
  { id: "1.12.2", label: "1.12.2", tag: "Legacy" },
];

const loaders = ["Vanilla", "Fabric", "Forge", "NeoForge", "Quilt"];

const mods = [
  { name: "Sodium 0.5.2", cat: "Optimization", enabled: true, icon: "⚡" },
  { name: "Iris Shaders", cat: "Shaders", enabled: true, icon: "🌟" },
  { name: "Replay Mod", cat: "Misc", enabled: false, icon: "🎬" },
  { name: "OptiFine", cat: "Optimization", enabled: true, icon: "🔧" },
  { name: "Xaero's Minimap", cat: "Utility", enabled: true, icon: "🗺️" },
];

const servers = [
  { name: "Hypixel Network", players: "54321", ping: 45, fav: true, icon: "H", color: "#f59e0b" },
  { name: "GommeHD", players: "1267", ping: 80, fav: false, icon: "G", color: "#3b82f6" },
  { name: "RoyalXSMP", players: "42", ping: 30, fav: true, icon: "R", color: "#9333ea" },
];

function Toggle({ on, onChange }) {
  return (
    <div onClick={() => onChange(!on)} style={{
      width: 44, height: 24, borderRadius: 12,
      background: on ? PURPLE : BORDER,
      position: "relative", cursor: "pointer",
      transition: "background 0.2s", flexShrink: 0
    }}>
      <div style={{
        position: "absolute", top: 3, left: on ? 23 : 3,
        width: 18, height: 18, borderRadius: "50%",
        background: "#fff", transition: "left 0.2s"
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

// PojavLauncher Launch Function
function launchPojav() {
  // Method 1: Android Intent via custom URL scheme
  try {
    window.location.href = `intent://#Intent;package=${POJAV_PACKAGE};scheme=pojav;end`;
  } catch (e) {
    // Method 2: Try direct package launch
    try {
      window.AndroidBridge && window.AndroidBridge.launchApp(POJAV_PACKAGE);
    } catch (e2) {
      // Method 3: Show instructions
      return false;
    }
  }
  return true;
}

// ========== PAGES ==========

function HomePage() {
  const [launching, setLaunching] = useState(false);
  const [launchStatus, setLaunchStatus] = useState(null);
  const [selVer, setSelVer] = useState("1.21.4");
  const [selLoader, setSelLoader] = useState("Fabric");
  const [ram, setRam] = useState(2048);
  const [showLaunchModal, setShowLaunchModal] = useState(false);

  const handlePlay = () => {
    setLaunching(true);
    setLaunchStatus("Preparing launch...");

    setTimeout(() => {
      setLaunchStatus("Loading Java runtime...");
    }, 800);

    setTimeout(() => {
      setLaunchStatus("Starting Minecraft...");
    }, 1600);

    setTimeout(() => {
      setLaunching(false);
      setLaunchStatus(null);
      setShowLaunchModal(true);
    }, 2400);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Launch Modal */}
      {showLaunchModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
          zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center",
          padding: 20
        }}>
          <div style={{
            background: CARD, border: `1px solid ${PURPLE}55`,
            borderRadius: 20, padding: 28, maxWidth: 340, width: "100%",
            boxShadow: `0 0 60px ${PURPLE}33`
          }}>
            <div style={{ fontSize: 48, textAlign: "center", marginBottom: 16 }}>⛏️</div>
            <div style={{ fontSize: 20, fontWeight: 800, textAlign: "center", fontFamily: "'Rajdhani', sans-serif", marginBottom: 8 }}>
              Launch Minecraft
            </div>
            <div style={{ fontSize: 13, color: MUTED, textAlign: "center", marginBottom: 20 }}>
              Version: <span style={{ color: PURPLE_BRIGHT, fontWeight: 700 }}>{selVer} {selLoader}</span>
              <br />RAM: <span style={{ color: GREEN, fontWeight: 700 }}>{ram}MB</span>
            </div>

            {/* Launch via PojavLauncher */}
            <a href={`intent://#Intent;action=android.intent.action.MAIN;package=${POJAV_PACKAGE};end`}
              style={{ textDecoration: "none" }}>
              <button style={{
                width: "100%", padding: "14px", borderRadius: 12, border: "none",
                background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_BRIGHT})`,
                color: "#fff", fontSize: 16, fontWeight: 800, cursor: "pointer",
                marginBottom: 10, fontFamily: "'Rajdhani', sans-serif",
                boxShadow: `0 0 20px ${PURPLE}55`
              }}>
                🚀 Launch via PojavLauncher
              </button>
            </a>

            {/* Direct Intent */}
            <a href={`intent://net.kdt.pojavlaunch#Intent;scheme=pojav;package=net.kdt.pojavlaunch;end`}
              style={{ textDecoration: "none" }}>
              <button style={{
                width: "100%", padding: "12px", borderRadius: 10, border: `1px solid ${BORDER}`,
                background: CARD2, color: TEXT, fontSize: 14, fontWeight: 600, cursor: "pointer",
                marginBottom: 10
              }}>
                📱 Open PojavLauncher App
              </button>
            </a>

            <button onClick={() => setShowLaunchModal(false)} style={{
              width: "100%", padding: "10px", borderRadius: 8, border: `1px solid ${BORDER}`,
              background: "transparent", color: MUTED, fontSize: 13, cursor: "pointer"
            }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, #0d0d1a 0%, #1a0a2e 50%, #0a1a0d 100%)`,
        border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24,
        position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: -40, right: -40, width: 200, height: 200,
          borderRadius: "50%", background: `radial-gradient(circle, ${PURPLE}33 0%, transparent 70%)`
        }} />
        <div style={{
          fontSize: 30, fontWeight: 900, fontFamily: "'Rajdhani', sans-serif",
          background: `linear-gradient(135deg, #fff 30%, ${PURPLE_BRIGHT})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>AddaLauncher</div>
        <div style={{ color: MUTED, fontSize: 11, marginTop: 2, letterSpacing: 1 }}>
          POWERED BY POJAVLAUNCHER ENGINE
        </div>

        <div style={{ display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
          {[["Version", selVer], ["Loader", selLoader], ["RAM", `${ram}MB`], ["Engine", "PojaV"]].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: 9, color: MUTED, letterSpacing: 1, textTransform: "uppercase" }}>{k}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: PURPLE_BRIGHT, fontFamily: "'Rajdhani', sans-serif" }}>{v}</div>
            </div>
          ))}
        </div>

        <button onClick={handlePlay} style={{
          marginTop: 16, width: "100%", padding: "14px",
          background: launching ? `${PURPLE}88` : `linear-gradient(135deg, ${PURPLE}, ${PURPLE_BRIGHT})`,
          border: "none", borderRadius: 10, cursor: "pointer",
          color: "#fff", fontSize: 15, fontWeight: 800, letterSpacing: 2,
          fontFamily: "'Rajdhani', sans-serif",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          boxShadow: `0 0 30px ${PURPLE}55`
        }}>
          {launching ? (
            <>
              <div style={{
                width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)",
                borderTop: "2px solid #fff", borderRadius: "50%",
                animation: "spin 0.8s linear infinite"
              }} />
              {launchStatus}
            </>
          ) : (
            <><span style={{ fontSize: 18 }}>▶</span> PLAY MINECRAFT</>
          )}
        </button>
      </div>

      {/* Version + Loader */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <SectionTitle icon="📋" label="Version" />
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {versions.map(v => (
              <div key={v.id} onClick={() => setSelVer(v.id)} style={{
                padding: "7px 10px", borderRadius: 7, cursor: "pointer",
                background: selVer === v.id ? `${PURPLE}22` : "transparent",
                border: `1px solid ${selVer === v.id ? PURPLE + "55" : "transparent"}`,
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <span style={{ fontSize: 12, fontWeight: selVer === v.id ? 700 : 400, color: selVer === v.id ? "#fff" : MUTED }}>{v.label}</span>
                {v.tag && <Badge label={v.tag} color={v.tag === "Latest" ? GREEN : v.tag === "Popular" ? YELLOW : PURPLE} />}
              </div>
            ))}
          </div>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Card>
            <SectionTitle icon="⚙️" label="Loader" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {loaders.map(l => (
                <button key={l} onClick={() => setSelLoader(l)} style={{
                  padding: "5px 10px", borderRadius: 6, border: "none", cursor: "pointer",
                  background: selLoader === l ? PURPLE : CARD2,
                  color: selLoader === l ? "#fff" : MUTED, fontSize: 11, fontWeight: 600
                }}>{l}</button>
              ))}
            </div>
          </Card>
          <Card>
            <SectionTitle icon="🧠" label="RAM" />
            <div style={{ fontSize: 20, fontWeight: 800, color: PURPLE_BRIGHT, fontFamily: "'Rajdhani', sans-serif" }}>{ram} MB</div>
            <input type="range" min={512} max={8192} step={256} value={ram}
              onChange={e => setRam(+e.target.value)}
              style={{ width: "100%", accentColor: PURPLE, marginTop: 8 }} />
          </Card>
        </div>
      </div>

      {/* FPS Boost Card */}
      <Card style={{ border: `1px solid ${GREEN}33`, background: `linear-gradient(135deg, #0a1a0a, ${CARD})` }}>
        <SectionTitle icon="🚀" label="FPS Boost" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { label: "Sodium", desc: "Best FPS mod", color: GREEN, pkg: "sodium" },
            { label: "Iris", desc: "Shader support", color: CYAN, pkg: "iris" },
            { label: "Lithium", desc: "Server optimize", color: YELLOW, pkg: "lithium" },
            { label: "FerriteCore", desc: "RAM reducer", color: PURPLE, pkg: "ferrite" },
          ].map(m => (
            <div key={m.label} style={{
              padding: 10, borderRadius: 8,
              background: `${m.color}11`, border: `1px solid ${m.color}33`
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: m.color }}>{m.label}</div>
              <div style={{ fontSize: 10, color: MUTED, marginTop: 2 }}>{m.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, fontSize: 11, color: MUTED, textAlign: "center" }}>
          💡 Install these mods in PojavLauncher for best performance
        </div>
      </Card>
    </div>
  );
}

function ModsPage() {
  const [localMods, setLocalMods] = useState(mods.map(m => ({ ...m })));
  const [activeTab, setActiveTab] = useState("Mods");
  const tabs = ["Mods", "Resource Packs", "Shaders", "Maps"];

  const toggle = (i) => setLocalMods(p => p.map((m, idx) => idx === i ? { ...m, enabled: !m.enabled } : m));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2 style={{ margin: 0, fontFamily: "'Rajdhani', sans-serif", fontSize: 22, fontWeight: 800 }}>Mod Manager</h2>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            padding: "7px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
            background: activeTab === t ? PURPLE : CARD2, color: activeTab === t ? "#fff" : MUTED
          }}>{t}</button>
        ))}
      </div>

      {/* Mod folder path info */}
      <Card style={{ border: `1px solid ${CYAN}33` }}>
        <div style={{ fontSize: 11, color: CYAN, fontWeight: 700, marginBottom: 6 }}>📁 POJAV MOD FOLDER PATH</div>
        <div style={{
          padding: "8px 12px", borderRadius: 6, background: CARD2,
          fontSize: 11, color: TEXT, fontFamily: "monospace", wordBreak: "break-all"
        }}>
          /sdcard/games/com.mojang/mods/
        </div>
        <div style={{ fontSize: 10, color: MUTED, marginTop: 6 }}>
          Copy .jar mod files to this folder, then enable below
        </div>
      </Card>

      <Card>
        {localMods.map((mod, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "12px 4px",
            borderBottom: i < localMods.length - 1 ? `1px solid ${BORDER}` : "none"
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 8,
              background: `${PURPLE}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18
            }}>{mod.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{mod.name}</div>
              <div style={{ fontSize: 10, color: MUTED }}>{mod.cat}</div>
            </div>
            <Badge label={mod.enabled ? "ON" : "OFF"} color={mod.enabled ? GREEN : MUTED} />
            <Toggle on={mod.enabled} onChange={() => toggle(i)} />
          </div>
        ))}
      </Card>

      {/* Install mod button */}
      <button style={{
        width: "100%", padding: "13px", borderRadius: 10, border: "none",
        background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_BRIGHT})`,
        color: "#fff", fontWeight: 800, fontSize: 14, cursor: "pointer",
        fontFamily: "'Rajdhani', sans-serif", letterSpacing: 1
      }}>
        ⇪ INSTALL MOD (.jar)
      </button>
    </div>
  );
}

function ControlsPage() {
  const [activeLayout, setActiveLayout] = useState("Survival");
  const [sensitivity, setSensitivity] = useState(65);
  const [gyro, setGyro] = useState(true);
  const [buttonSize, setButtonSize] = useState(50);
  const layouts = ["Default", "PvP", "Survival", "Crystal PvP", "Custom"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2 style={{ margin: 0, fontFamily: "'Rajdhani', sans-serif", fontSize: 22, fontWeight: 800 }}>Controls</h2>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {layouts.map(l => (
          <button key={l} onClick={() => setActiveLayout(l)} style={{
            padding: "7px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
            background: activeLayout === l ? PURPLE : CARD2, color: activeLayout === l ? "#fff" : MUTED
          }}>{l}</button>
        ))}
      </div>

      {/* Controls Preview */}
      <div style={{
        background: `linear-gradient(160deg, #0a1a0a, #0a0a1a)`,
        border: `1px solid ${BORDER}`, borderRadius: 14, height: 220,
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: 10, left: 12, fontSize: 10, color: MUTED, letterSpacing: 1 }}>
          🎮 {activeLayout.toUpperCase()} — POJAV COMPATIBLE
        </div>
        {/* Crosshair */}
        <div style={{ position: "absolute", top: "45%", left: "50%", transform: "translate(-50%,-50%)" }}>
          <div style={{ width: 20, height: 2, background: "rgba(255,255,255,0.5)", margin: "9px 0" }} />
          <div style={{ width: 2, height: 20, background: "rgba(255,255,255,0.5)", position: "absolute", top: 0, left: 9 }} />
        </div>
        {/* WASD */}
        {[
          { l: "W", t: "28%", le: "13%" }, { l: "A", t: "40%", le: "6%" },
          { l: "S", t: "52%", le: "13%" }, { l: "D", t: "40%", le: "20%" }
        ].map(b => (
          <div key={b.l} style={{
            position: "absolute", top: b.t, left: b.le,
            width: 36, height: 36, background: `rgba(147,51,234,0.35)`,
            border: `1px solid ${PURPLE}88`, borderRadius: 7,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 13, fontWeight: 700
          }}>{b.l}</div>
        ))}
        {/* Action buttons */}
        {[
          { l: "J", t: "55%", r: "18%" }, { l: "⇧", t: "70%", r: "8%" }
        ].map(b => (
          <div key={b.l} style={{
            position: "absolute", top: b.t, right: b.r,
            width: 36, height: 36, background: `rgba(147,51,234,0.35)`,
            border: `1px solid ${PURPLE}88`, borderRadius: 7,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 13, fontWeight: 700
          }}>{b.l}</div>
        ))}
        <div style={{ position: "absolute", bottom: 8, right: 10, fontSize: 9, color: MUTED }}>
          Tap & drag to reposition
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Card>
          <SectionTitle icon="🖱️" label="Sensitivity" />
          <div style={{ fontSize: 20, fontWeight: 800, color: PURPLE_BRIGHT, fontFamily: "'Rajdhani', sans-serif" }}>{sensitivity}%</div>
          <input type="range" min={10} max={100} value={sensitivity}
            onChange={e => setSensitivity(+e.target.value)}
            style={{ width: "100%", accentColor: PURPLE, marginTop: 8 }} />
        </Card>
        <Card>
          <SectionTitle icon="📐" label="Button Size" />
          <div style={{ fontSize: 20, fontWeight: 800, color: CYAN, fontFamily: "'Rajdhani', sans-serif" }}>{buttonSize}px</div>
          <input type="range" min={30} max={80} value={buttonSize}
            onChange={e => setButtonSize(+e.target.value)}
            style={{ width: "100%", accentColor: CYAN, marginTop: 8 }} />
        </Card>
      </div>

      <Card>
        <SectionTitle icon="⚙️" label="Advanced" />
        {[["Gyroscope Aim", gyro, setGyro], ["Vibration", true, () => {}], ["Show HUD", true, () => {}]].map(([l, v, s]) => (
          <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 13 }}>{l}</span>
            <Toggle on={v} onChange={s} />
          </div>
        ))}
      </Card>
    </div>
  );
}

function SettingsPage() {
  const [ram, setRam] = useState(2048);
  const [fps, setFps] = useState(true);
  const [lowRam, setLowRam] = useState(false);
  const [battery, setBattery] = useState(false);
  const [landscape, setLandscape] = useState(true);
  const [java, setJava] = useState("Java 17");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2 style={{ margin: 0, fontFamily: "'Rajdhani', sans-serif", fontSize: 22, fontWeight: 800 }}>Settings</h2>

      {/* PojaV Integration */}
      <Card style={{ border: `1px solid ${PURPLE}44`, background: `linear-gradient(135deg, ${PURPLE}11, ${CARD})` }}>
        <SectionTitle icon="🔗" label="PojavLauncher Integration" />
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: `${PURPLE}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
          }}>⛏️</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>PojavLauncher</div>
            <div style={{ fontSize: 11, color: GREEN }}>✅ Detected & Ready</div>
          </div>
        </div>
        <a href={`intent://#Intent;action=android.intent.action.MAIN;package=${POJAV_PACKAGE};end`}>
          <button style={{
            width: "100%", padding: "10px", borderRadius: 8, border: "none",
            background: PURPLE, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer"
          }}>Open PojavLauncher Settings</button>
        </a>
      </Card>

      {/* Performance */}
      <Card>
        <SectionTitle icon="⚡" label="Performance" />
        {[
          ["FPS Booster", fps, setFps, "Boost FPS for smooth gameplay"],
          ["Low RAM Mode", lowRam, setLowRam, "Reduce memory usage"],
          ["Battery Saver", battery, setBattery, "Limit FPS to 30 to save battery"],
          ["Force Landscape", landscape, setLandscape, "Always rotate to landscape"],
        ].map(([label, val, setter, desc]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div>
              <div style={{ fontSize: 11, color: MUTED }}>{desc}</div>
            </div>
            <Toggle on={val} onChange={setter} />
          </div>
        ))}
      </Card>

      {/* RAM */}
      <Card>
        <SectionTitle icon="🧠" label="RAM Allocation" />
        <div style={{ fontSize: 24, fontWeight: 800, color: PURPLE_BRIGHT, fontFamily: "'Rajdhani', sans-serif" }}>{ram} MB</div>
        <input type="range" min={512} max={8192} step={256} value={ram}
          onChange={e => setRam(+e.target.value)}
          style={{ width: "100%", accentColor: PURPLE, margin: "10px 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: MUTED }}>
          <span>512 MB</span><span style={{ color: GREEN }}>Recommended: 2048</span><span>8192 MB</span>
        </div>
      </Card>

      {/* Java */}
      <Card>
        <SectionTitle icon="☕" label="Java Runtime" />
        {["Java 8", "Java 17", "Java 21"].map(j => (
          <div key={j} onClick={() => setJava(j)} style={{
            padding: "10px 14px", borderRadius: 8, cursor: "pointer", marginBottom: 6,
            background: java === j ? `${PURPLE}22` : CARD2,
            border: `1px solid ${java === j ? PURPLE + "55" : BORDER}`,
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <span style={{ fontSize: 13, fontWeight: java === j ? 700 : 400 }}>☕ {j}</span>
            {java === j && <Badge label="SELECTED" color={PURPLE} />}
          </div>
        ))}
      </Card>
    </div>
  );
}

function ServersPage() {
  const [srvs, setSrvs] = useState(servers);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0, fontFamily: "'Rajdhani', sans-serif", fontSize: 22, fontWeight: 800 }}>Servers</h2>
        <button style={{
          padding: "8px 16px", borderRadius: 8, border: "none",
          background: PURPLE, color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 13
        }}>+ Add</button>
      </div>
      {srvs.map((s, i) => (
        <Card key={i}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: `${s.color}22`, border: `2px solid ${s.color}44`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, fontWeight: 800, color: s.color
            }}>{s.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: MUTED }}>🟢 {parseInt(s.players).toLocaleString()} Online • {s.ping}ms</div>
            </div>
            <button style={{
              padding: "7px 14px", borderRadius: 8, border: "none",
              background: PURPLE, color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 12
            }}>Join</button>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ========== MAIN APP ==========

const navItems = [
  { id: "home", icon: "🏠", label: "Home" },
  { id: "mods", icon: "🔧", label: "Mods" },
  { id: "controls", icon: "🎮", label: "Controls" },
  { id: "servers", icon: "🌐", label: "Servers" },
  { id: "settings", icon: "⚙️", label: "Settings" },
];

export default function AddaLauncher() {
  const [page, setPage] = useState("home");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Force landscape hint
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock("landscape").catch(() => {});
    }
  }, []);

  useEffect(() => {
    const msgs = ["✅ PojavLauncher detected!", "🚀 FPS Booster active", "🔔 Minecraft 1.21.4 available!"];
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
    home: <HomePage />,
    mods: <ModsPage />,
    controls: <ControlsPage />,
    servers: <ServersPage />,
    settings: <SettingsPage />,
  };

  return (
    <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: "'Exo 2', sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700;800;900&family=Exo+2:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: ${PURPLE}55; border-radius: 4px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        input[type=range] { -webkit-appearance: none; height: 4px; border-radius: 4px; background: ${BORDER}; cursor: pointer; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: ${PURPLE}; cursor: pointer; }
        a { color: inherit; }
      `}</style>

      {/* Top Bar */}
      <div style={{
        height: 50, background: CARD, borderBottom: `1px solid ${BORDER}`,
        display: "flex", alignItems: "center", paddingInline: 16, gap: 10,
        position: "sticky", top: 0, zIndex: 100
      }}>
        <span style={{ fontSize: 20 }}>⛏️</span>
        <span style={{
          fontSize: 18, fontWeight: 900, fontFamily: "'Rajdhani', sans-serif",
          background: `linear-gradient(135deg, #fff, ${PURPLE_BRIGHT})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>AddaLauncher</span>
        <div style={{ flex: 1 }} />
        <Badge label="POJAV ENGINE" color={PURPLE} />
        <div style={{
          width: 8, height: 8, borderRadius: "50%", background: GREEN,
          boxShadow: `0 0 8px ${GREEN}`
        }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        {pageMap[page]}
      </div>

      {/* Bottom Nav */}
      <div style={{
        height: 60, background: CARD, borderTop: `1px solid ${BORDER}`,
        display: "flex", alignItems: "center", justifyContent: "space-around",
        position: "sticky", bottom: 0
      }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => setPage(item.id)} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            background: "none", border: "none", cursor: "pointer",
            color: page === item.id ? PURPLE_BRIGHT : MUTED,
            flex: 1, padding: "6px 0"
          }}>
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.5 }}>{item.label.toUpperCase()}</span>
            {page === item.id && (
              <div style={{ width: 20, height: 2, background: PURPLE_BRIGHT, borderRadius: 2 }} />
            )}
          </button>
        ))}
      </div>

      {/* Toast */}
      {notification && (
        <div style={{
          position: "fixed", bottom: 72, right: 16,
          background: CARD2, border: `1px solid ${PURPLE}55`,
          borderRadius: 10, padding: "10px 16px", fontSize: 12, fontWeight: 600,
          boxShadow: `0 4px 20px rgba(0,0,0,0.5)`,
          animation: "slideIn 0.3s ease", zIndex: 998
        }}>{notification}</div>
      )}
    </div>
  );
}
