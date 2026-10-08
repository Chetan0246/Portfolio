import s from './Preview.module.css';

export function PrivChatPreview() {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12, width:'100%' }}>
      <span className={s.privLock}>🔒</span>
      <div className={s.bubbleRow}>
        <div className={`${s.bubble} ${s.bubbleLeft}`}>AES-GCM • Encrypted</div>
        <div className={`${s.bubble} ${s.bubbleRight}`}>RSA-4096 • Key Wrap</div>
        <div className={`${s.bubble} ${s.bubbleLeft}`}>Zero-Knowledge</div>
      </div>
      <div className={s.privDots}>
        <div className={s.privDot} />
        <div className={s.privDot} />
        <div className={s.privDot} />
        <span style={{ fontSize:'0.6rem', color:'var(--green)', marginLeft:6, fontWeight:600 }}>CONNECTED</span>
      </div>
    </div>
  );
}

export function FocusSyncPreview() {
  return (
    <div style={{ display:'flex', gap:16, width:'100%', alignItems:'flex-start' }}>
      {/* Timer ring */}
      <svg className={s.timerRing} viewBox="0 0 72 72">
        <circle className={s.timerBg} cx="36" cy="36" r="30" />
        <circle className={s.timerArc} cx="36" cy="36" r="30" />
        <text className={s.timerLabel} x="36" y="40">25:00</text>
      </svg>
      {/* Right side */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', gap:10 }}>
        {/* Heatmap */}
        <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
          {[0,1,2].map(r => (
            <div key={r} className={s.heatRow}>
              {[0,1,2,3,4].map(c => <div key={c} className={s.heatDot} />)}
            </div>
          ))}
        </div>
        {/* Leaderboard */}
        <div style={{ display:'flex', flexDirection:'column', gap:4, marginTop:4 }}>
          {[['1','92%'],['2','78%'],['3','65%']].map(([rank, score]) => (
            <div key={rank} className={s.leaderRow}>
              <span className={s.leaderRank}>#{rank}</span>
              <div className={s.leaderBar}><div className={s.leaderFill} style={{ width: score }} /></div>
              <span className={s.leaderScore}>{score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LocalHarnessPreview() {
  return (
    <div className={s.harnessWrap}>
      <div className={s.harnessHeader}>
        <div className={s.harnessBadge}>
          <span className={s.harnessPulseDot} />
          <span>Root Orchestrator · 10 Agents</span>
        </div>
      </div>

      <div className={s.tiersRow}>
        <div className={`${s.tierCard} ${s.tierLight}`}>
          <span className={s.tierTag}>Tier 1</span>
          <span className={s.tierName}>Lightweight</span>
          <span className={s.tierModel}>Fast Sub-agents</span>
        </div>
        <div className={`${s.tierCard} ${s.tierGeneral}`}>
          <span className={s.tierTag}>Tier 2</span>
          <span className={s.tierName}>General</span>
          <span className={s.tierModel}>Code &amp; Docs</span>
        </div>
        <div className={`${s.tierCard} ${s.tierHeavy}`}>
          <span className={s.tierTag}>Tier 3</span>
          <span className={s.tierName}>Reasoning</span>
          <span className={s.tierModel}>Complex Routing</span>
        </div>
      </div>

      <div className={s.harnessFooter}>
        <div className={s.memPill}>
          <span className={s.memLabel}>Memory:</span>
          <span className={s.memVal}>SQLite + MiniLM</span>
        </div>
        <div className={s.vramPill}>
          <span className={s.vramDot} />
          <span>16GB Host Budget</span>
        </div>
      </div>
    </div>
  );
}

