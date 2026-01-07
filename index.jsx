import React, { useState, useEffect } from 'react';

// ============================================
// DONNÉES DU PROTOCOLE
// ============================================

const EXERCISES = {
  E0: {
    id: 'E0', name: 'Reset anti-bracing', shortName: 'Reset', icon: '🌬️',
    duration: null, reps: 6, sets: 2, holdTime: null, perSide: false,
    category: 'Respiration', categoryIcon: '💨',
    description: 'Respiration diaphragmatique + micro-bascule du bassin',
    position: 'Sur le dos, genoux pliés, pieds au sol. Alternative : sur le côté avec coussin entre les genoux.',
    steps: [
      { num: 1, text: 'Inspire par le nez pendant 3-4 secondes', detail: 'Laisse les côtes s\'ouvrir doucement' },
      { num: 2, text: 'Expire par la bouche pendant 6-8 secondes', detail: 'Comme si tu soufflais sur une vitre' },
      { num: 3, text: 'Micro-bascule du bassin en fin d\'expiration', detail: 'Aplatis très légèrement le bas du dos' },
      { num: 4, text: 'Reviens en position neutre', detail: 'Amplitude minuscule, pas de forçage' }
    ],
    feel: 'Relâchement progressif de la zone lombaire, respiration qui s\'approfondit',
    warnings: ['Ne rentre pas le ventre', 'Ne bloque pas ta respiration', 'Garde une amplitude minime'],
    gradient: ['#6366F1', '#8B5CF6'], accentLight: '#EEF2FF'
  },
  E1: {
    id: 'E1', name: 'Abduction assise', shortName: 'Abduction', icon: '🪑',
    duration: null, reps: 5, sets: 1, holdTime: 5, perSide: false,
    category: 'Activation', categoryIcon: '⚡',
    description: 'Activation du gluteus medius en position stable et sécurisée',
    position: 'Assis sur une chaise stable, pieds au sol (largeur bassin), élastique vert au-dessus des genoux, dos soutenu.',
    steps: [
      { num: 1, text: 'Grandis-toi sur la chaise', detail: 'Cage thoracique au-dessus du bassin' },
      { num: 2, text: 'Pousse les genoux vers l\'extérieur', detail: 'Contre l\'élastique, effort 20-40% max' },
      { num: 3, text: 'Maintiens 5 secondes', detail: 'Sans te pencher, sans serrer le ventre' },
      { num: 4, text: 'Relâche complètement', detail: 'Repos 5 secondes avant la rep suivante' }
    ],
    feel: 'Activation sur le côté de la fesse (partie arrière-latérale)',
    warnings: ['Ne te penche pas', 'Évite le serrage abdominal réflexe', 'N\'utilise pas trop de force'],
    gradient: ['#10B981', '#34D399'], accentLight: '#ECFDF5'
  },
  E2: {
    id: 'E2', name: 'Clamshell micro', shortName: 'Clamshell', icon: '🐚',
    duration: null, reps: 5, sets: 1, holdTime: null, perSide: true,
    category: 'Activation', categoryIcon: '⚡',
    description: 'Activation du glute med avec contrôle et micro-amplitude',
    position: 'Couché sur le côté, tête sur un coussin, hanches empilées, genoux fléchis à 45°, talons ensemble.',
    steps: [
      { num: 1, text: 'Stabilise ton bassin', detail: 'Imagine un verre d\'eau posé dessus' },
      { num: 2, text: 'Ouvre le genou du dessus', detail: 'Seulement 3-5 cm, pas plus !' },
      { num: 3, text: 'Redescends lentement', detail: 'Contrôle la descente' }
    ],
    feel: 'Le muscle sur le côté de la fesse qui travaille',
    warnings: ['Ne roule pas le bassin en arrière', 'N\'ouvre pas trop haut (TFL prend le relais)'],
    gradient: ['#F59E0B', '#FBBF24'], accentLight: '#FFFBEB'
  },
  E3: {
    id: 'E3', name: 'Appui unipodal', shortName: 'Unipodal', icon: '🦩',
    duration: 15, reps: null, sets: 2, holdTime: null, perSide: true,
    category: 'Stabilité', categoryIcon: '🎯',
    description: 'Travail de stabilité latérale sans solliciter le dos',
    position: 'Debout près d\'un mur, 1-2 doigts en appui léger pour l\'équilibre. Pied d\'appui en position "trépied".',
    steps: [
      { num: 1, text: 'Décolle l\'autre pied de 2-3 cm', detail: 'Pas besoin de lever haut' },
      { num: 2, text: 'Aligne ton genou d\'appui', detail: 'Au-dessus du 2e-3e orteil' },
      { num: 3, text: 'Garde le bassin à niveau', detail: 'La hanche du côté levé ne doit pas tomber' },
      { num: 4, text: 'Respire normalement', detail: 'Tiens la position 15 secondes' }
    ],
    feel: 'Le fessier de la jambe d\'appui qui travaille pour stabiliser',
    warnings: ['Ne te penche pas sur la jambe d\'appui', 'Ne griffe pas le sol (crampes)'],
    gradient: ['#EC4899', '#F472B6'], accentLight: '#FDF2F8'
  },
  E4: {
    id: 'E4', name: 'Sit-to-Stand', shortName: 'Sit-Stand', icon: '🏋️',
    duration: null, reps: 4, sets: 2, holdTime: null, perSide: false,
    category: 'Renforcement', categoryIcon: '💪',
    description: 'Renforcement fonctionnel des quadriceps et fessiers',
    position: 'Assis sur une chaise suffisamment haute, pieds sous les genoux, largeur bassin. Option : élastique au-dessus des genoux.',
    steps: [
      { num: 1, text: 'Adopte un "dos long"', detail: 'Ne cambre pas le dos' },
      { num: 2, text: 'Penche légèrement le buste', detail: 'En bloc, charnière au niveau des hanches' },
      { num: 3, text: 'Lève-toi en poussant le sol', detail: 'Utilise tes jambes, pas ton dos' },
      { num: 4, text: 'Redescends en 3 secondes', detail: 'Contrôle la descente, touche, remonte' }
    ],
    feel: 'Cuisses et fessiers qui travaillent ensemble',
    warnings: ['Pas de "coup de rein"', 'Genou qui reste aligné (pas vers l\'intérieur)', 'Ne descends pas trop bas au début'],
    gradient: ['#EF4444', '#F87171'], accentLight: '#FEF2F2'
  },
  E5: {
    id: 'E5', name: 'Vélo d\'appartement', shortName: 'Vélo', icon: '🚴',
    duration: 5, reps: null, sets: 1, holdTime: null, perSide: false,
    category: 'Cardio', categoryIcon: '❤️',
    description: 'Reconditionnement cardiovasculaire en douceur',
    position: 'Selle haute (genou légèrement fléchi en bas), soutien lombaire, résistance minimale.',
    steps: [
      { num: 1, text: 'Règle ta selle correctement', detail: 'Genou légèrement fléchi en bas de pédale' },
      { num: 2, text: 'Pédale à rythme confortable', detail: 'Tu dois pouvoir parler facilement (RPE 2-3)' },
      { num: 3, text: 'Fais des pauses si besoin', detail: 'Lève-toi quelques secondes si inconfort' }
    ],
    feel: 'Effort léger, jambes qui chauffent doucement, pas d\'essoufflement',
    warnings: ['Évite l\'intensité trop forte', 'Ne te penche pas en avant'],
    gradient: ['#0EA5E9', '#38BDF8'], accentLight: '#F0F9FF'
  },
  E6: {
    id: 'E6', name: 'Step-down contrôlé', shortName: 'Step-down', icon: '🪜',
    duration: null, reps: 5, sets: 2, holdTime: null, perSide: true,
    category: 'Renforcement', categoryIcon: '💪',
    description: 'Contrôle du genou et de la hanche (anti-valgus)',
    position: 'Debout sur une marche basse (10-15 cm) ou un gros livre stable.',
    steps: [
      { num: 1, text: 'Monte sur la marche', detail: 'Avec la jambe à travailler' },
      { num: 2, text: 'Descends l\'autre talon vers le sol', detail: 'En 3 secondes, contrôle total' },
      { num: 3, text: 'Garde le genou d\'appui aligné', detail: 'Au-dessus du 2e-3e orteil' },
      { num: 4, text: 'Remonte sans à-coups', detail: 'Pousse avec la jambe d\'appui' }
    ],
    feel: 'La cuisse de la jambe d\'appui qui contrôle le mouvement',
    warnings: ['Le genou ne doit pas s\'effondrer vers l\'intérieur', 'Le bassin reste stable', 'Ne descends pas trop profond'],
    gradient: ['#F97316', '#FB923C'], accentLight: '#FFF7ED'
  },
  E7: {
    id: 'E7', name: 'Mini-pont fessier', shortName: 'Mini-pont', icon: '🌉',
    duration: null, reps: 5, sets: 1, holdTime: 2, perSide: false,
    category: 'Optionnel', categoryIcon: '⭐',
    description: 'Activation du grand fessier (à introduire avec précaution)',
    position: 'Allongé sur le dos, genoux pliés, pieds proches des fesses.',
    steps: [
      { num: 1, text: 'Pré-contracte légèrement les fesses', detail: 'Avant tout mouvement' },
      { num: 2, text: 'Monte le bassin de 2-5 cm MAX', detail: 'Pas plus haut !' },
      { num: 3, text: 'Maintiens 2 secondes', detail: 'En gardant la contraction' },
      { num: 4, text: 'Redescends très lentement', detail: 'Contrôle total' }
    ],
    feel: 'Les fessiers qui se contractent, pas le bas du dos',
    warnings: ['Ne monte pas trop haut', 'Ne cambre pas le dos', 'Stop si douleur lombaire le lendemain'],
    gradient: ['#14B8A6', '#2DD4BF'], accentLight: '#F0FDFA',
    optional: true
  }
};

const PHASES = {
  1: {
    id: 1, name: 'Phase 1', title: 'Désensibilisation', subtitle: 'Micro-doses & confiance',
    duration: '2-4 semaines', icon: '🌱', gradient: ['#10B981', '#34D399'],
    objective: 'Zéro flambée, construire la confiance, établir une routine stable',
    exercises: ['E0', 'E1', 'E2', 'E5'],
    criteria: ['14 jours sans « rouge »', 'Vélo 15-20 min sans rebond', 'E1 toléré sans activation QL', 'Assise améliorée']
  },
  2: {
    id: 2, name: 'Phase 2', title: 'Activation prudente', subtitle: 'Hanche & quadriceps',
    duration: '4-6 semaines', icon: '🌿', gradient: ['#6366F1', '#8B5CF6'],
    objective: 'Hanche stable, renforcement quadriceps, réduction du bracing',
    exercises: ['E0', 'E1', 'E3', 'E4', 'E5'],
    criteria: ['Assise +30-50% ou moins de crispation', 'E3 : 30s / côté', 'E4 : 3×6-8 reps propres', 'Vélo 25 min faciles']
  },
  3: {
    id: 3, name: 'Phase 3', title: 'Renforcement', subtitle: 'Contrôle dynamique',
    duration: '4-6 semaines', icon: '🌳', gradient: ['#F59E0B', '#FBBF24'],
    objective: 'Contrôle dynamique anti-valgus, préparation au retour course',
    exercises: ['E1', 'E4', 'E5', 'E6', 'E7'],
    criteria: ['Marche 45-60 min sans flambée', 'E6 : 2×10 / côté propre', '2 semaines sans rouge', 'Assise > 60-90 min']
  },
  4: {
    id: 4, name: 'Phase 4', title: 'Retour course', subtitle: 'Progression impact',
    duration: '6+ semaines', icon: '🏃', gradient: ['#EC4899', '#F472B6'],
    objective: 'Reprendre la course progressivement sans réveiller les symptômes',
    exercises: ['E1', 'E4', 'E6'],
    criteria: ['Jog progressif toléré', 'Maintenance renfo 2×/sem']
  }
};

const WEEK_SCHEDULE = {
  1: { 0: ['E0', 'E1', 'E2', 'E5'], 1: ['E0', 'E1', 'E2', 'E5'], 2: ['E0', 'E1', 'E5'], 3: ['E0', 'E1', 'E2', 'E5'], 4: ['E0', 'E1', 'E5'], 5: ['E0', 'E1', 'E2', 'E5'], 6: ['E0', 'E1', 'E5'] },
  2: { 0: ['E0', 'E1'], 1: ['E0', 'E1', 'E3', 'E4', 'E5'], 2: ['E0', 'E1', 'E3', 'E5'], 3: ['E0', 'E1', 'E3', 'E4', 'E5'], 4: ['E0', 'E1', 'E3', 'E5'], 5: ['E0', 'E1', 'E3', 'E4', 'E5'], 6: ['E0', 'E1', 'E5'] },
  3: { 0: ['E1'], 1: ['E1', 'E4', 'E6', 'E5'], 2: ['E5'], 3: ['E1', 'E4', 'E5'], 4: ['E5'], 5: ['E1', 'E4', 'E6', 'E5'], 6: ['E5'] }
};

// URL du document protocole
const PROTOCOL_DOC_URL = "https://claude.ai/chat"; // L'utilisateur trouvera le doc dans le chat

// ============================================
// COMPOSANTS
// ============================================

const Timer = ({ duration, onComplete, gradient }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [initialDuration] = useState(duration);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 100]);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const progress = ((initialDuration - timeLeft) / initialDuration) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const circumference = 2 * Math.PI * 46;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="timer-widget">
      <div className="timer-circle-container">
        <svg viewBox="0 0 100 100" className="timer-svg">
          <defs>
            <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradient[0]} />
              <stop offset="100%" stopColor={gradient[1]} />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="46" className="timer-track" />
          <circle cx="50" cy="50" r="46" className="timer-progress" 
            stroke="url(#timerGrad)" strokeDasharray={circumference} strokeDashoffset={offset} />
        </svg>
        <div className="timer-center">
          <div className="timer-time">{minutes}:{seconds.toString().padStart(2, '0')}</div>
          <div className="timer-label">{isRunning ? 'En cours' : timeLeft === duration ? 'Prêt' : 'Pause'}</div>
        </div>
      </div>
      <div className="timer-buttons">
        <button className="timer-btn secondary" onClick={() => { setTimeLeft(duration); setIsRunning(false); }}>
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
        </button>
        <button className="timer-btn primary" onClick={() => setIsRunning(!isRunning)}
          style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}>
          {isRunning ? (
            <svg viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>
        <button className="timer-btn secondary" onClick={() => onComplete?.()}>
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 12l5 5L20 7"/></svg>
        </button>
      </div>
    </div>
  );
};

const RepTracker = ({ exercise, onComplete }) => {
  const [set, setSet] = useState(1);
  const [rep, setRep] = useState(0);
  const [side, setSide] = useState('left');
  const [holding, setHolding] = useState(false);
  const [holdTime, setHoldTime] = useState(exercise.holdTime || 0);

  const totalSets = exercise.sets || 1;
  const totalReps = exercise.reps || 1;
  const hasHold = exercise.holdTime > 0;

  useEffect(() => {
    if (!holding || holdTime <= 0) return;
    const interval = setInterval(() => {
      setHoldTime(prev => {
        if (prev <= 1) {
          setHolding(false);
          if (navigator.vibrate) navigator.vibrate(100);
          doCompleteRep();
          return exercise.holdTime;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [holding, holdTime]);

  const doCompleteRep = () => {
    const next = rep + 1;
    if (next >= totalReps) {
      if (exercise.perSide && side === 'left') {
        setSide('right'); setRep(0);
      } else if (set < totalSets) {
        setSet(set + 1); setRep(0);
        if (exercise.perSide) setSide('left');
      } else {
        if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 100]);
        onComplete?.();
      }
    } else {
      setRep(next);
    }
    setHoldTime(exercise.holdTime || 0);
  };

  const handleTap = () => {
    if (navigator.vibrate) navigator.vibrate(30);
    if (hasHold) setHolding(true);
    else doCompleteRep();
  };

  const progress = (rep / totalReps) * 100;

  return (
    <div className="rep-tracker">
      {exercise.perSide && (
        <div className="side-switcher">
          <div className={`side-option ${side === 'left' ? 'active' : ''}`}>
            <span className="side-arrow">←</span> Gauche
          </div>
          <div className={`side-option ${side === 'right' ? 'active' : ''}`}>
            Droit <span className="side-arrow">→</span>
          </div>
        </div>
      )}
      <div className="set-indicator">Série {set} sur {totalSets}</div>
      <div className={`rep-button ${holding ? 'holding' : ''}`} onClick={handleTap}
        style={{ '--grad-start': exercise.gradient[0], '--grad-end': exercise.gradient[1] }}>
        <svg viewBox="0 0 100 100" className="rep-ring">
          <circle cx="50" cy="50" r="46" className="rep-track" />
          <circle cx="50" cy="50" r="46" className="rep-progress" 
            strokeDasharray={`${progress * 2.89} 289`} />
        </svg>
        <div className="rep-inner">
          {holding ? (
            <><div className="rep-hold-num">{holdTime}</div><div className="rep-hold-text">Maintiens</div></>
          ) : (
            <><div className="rep-count"><span className="current">{rep}</span><span className="sep">/</span><span className="total">{totalReps}</span></div>
            <div className="rep-hint">Tap pour compter</div></>
          )}
        </div>
        {holding && <div className="hold-ring-pulse" />}
      </div>
      {hasHold && !holding && <p className="hold-info">💡 Maintiens {exercise.holdTime}s par répétition</p>}
    </div>
  );
};

const FeedbackSelector = ({ onSelect, selected }) => {
  const options = [
    { id: 'green', emoji: '🟢', title: 'Vert', desc: 'Douleur ≤ 2/10, OK', color: '#22C55E', bg: '#DCFCE7' },
    { id: 'orange', emoji: '🟠', title: 'Orange', desc: 'Douleur 3-4/10', color: '#F59E0B', bg: '#FEF3C7' },
    { id: 'red', emoji: '🔴', title: 'Rouge', desc: 'Douleur ≥ 5/10', color: '#EF4444', bg: '#FEE2E2' }
  ];
  return (
    <div className="feedback-selector">
      <h3>Comment te sens-tu ?</h3>
      <p className="feedback-sub">Évalue ta réponse à cet exercice</p>
      <div className="feedback-options">
        {options.map(opt => (
          <button key={opt.id} className={`feedback-opt ${selected === opt.id ? 'selected' : ''}`}
            onClick={() => onSelect(opt.id)} style={{ '--opt-color': opt.color, '--opt-bg': opt.bg }}>
            <div className="opt-icon">{opt.emoji}</div>
            <div className="opt-text"><strong>{opt.title}</strong><span>{opt.desc}</span></div>
            {selected === opt.id && <div className="opt-check"><svg viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div>}
          </button>
        ))}
      </div>
    </div>
  );
};

const ExerciseCard = ({ exId, completed, onStart, delay }) => {
  const ex = EXERCISES[exId];
  return (
    <div className={`ex-card ${completed ? 'done' : ''}`} onClick={() => !completed && onStart(exId)}
      style={{ '--delay': `${delay}ms`, '--grad-start': ex.gradient[0], '--grad-end': ex.gradient[1] }}>
      <div className="ex-card-accent" />
      <div className="ex-card-icon">{ex.icon}</div>
      <div className="ex-card-body">
        <div className="ex-card-top">
          <h3>{ex.shortName}</h3>
          <span className="ex-card-cat">{ex.categoryIcon} {ex.category}</span>
        </div>
        <p className="ex-card-desc">{ex.description}</p>
        <div className="ex-card-meta">
          {ex.duration && <span>⏱ {ex.duration} min</span>}
          {ex.reps && <span>🔄 {ex.sets}×{ex.reps}</span>}
          {ex.perSide && <span>↔️ Chaque côté</span>}
          {ex.holdTime && <span>⏸ {ex.holdTime}s tenue</span>}
        </div>
      </div>
      <div className="ex-card-action">
        {completed ? (
          <div className="ex-card-check"><svg viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div>
        ) : (
          <svg className="ex-card-arrow" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
        )}
      </div>
    </div>
  );
};

const ExerciseScreen = ({ exId, onComplete, onBack }) => {
  const ex = EXERCISES[exId];
  const [step, setStep] = useState('intro');
  const [feedback, setFeedback] = useState(null);

  return (
    <div className="ex-screen">
      <header className="ex-header">
        <button className="hdr-btn" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
        </button>
        <div className="hdr-title"><span className="hdr-icon">{ex.icon}</span>{ex.name}</div>
        <div className="hdr-spacer" />
      </header>

      {step === 'intro' && (
        <div className="ex-intro">
          <div className="intro-hero" style={{ background: `linear-gradient(135deg, ${ex.gradient[0]}, ${ex.gradient[1]})` }}>
            <span className="hero-emoji">{ex.icon}</span>
            <div className="hero-glow" />
          </div>
          <div className="intro-body">
            <section className="info-block">
              <div className="info-head"><span>📍</span><h4>Position de départ</h4></div>
              <p>{ex.position}</p>
            </section>
            <section className="info-block">
              <div className="info-head"><span>▶️</span><h4>Exécution</h4></div>
              <ol className="steps-list">
                {ex.steps.map(s => (
                  <li key={s.num}><div className="step-num">{s.num}</div><div className="step-content"><strong>{s.text}</strong><span>{s.detail}</span></div></li>
                ))}
              </ol>
            </section>
            <section className="info-block success">
              <div className="info-head"><span>✅</span><h4>Tu dois sentir</h4></div>
              <p>{ex.feel}</p>
            </section>
            <section className="info-block warning">
              <div className="info-head"><span>⚠️</span><h4>Évite</h4></div>
              <ul className="warn-list">{ex.warnings.map((w, i) => <li key={i}>{w}</li>)}</ul>
            </section>
            <a href={PROTOCOL_DOC_URL} target="_blank" rel="noopener noreferrer" className="doc-link-inline">
              <span>📄</span> Consulter le protocole complet (Word)
            </a>
          </div>
          <div className="intro-footer">
            <button className="btn-primary" onClick={() => setStep('active')}
              style={{ background: `linear-gradient(135deg, ${ex.gradient[0]}, ${ex.gradient[1]})` }}>
              Commencer <svg viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
        </div>
      )}

      {step === 'active' && (
        <div className="ex-active" style={{ '--grad-start': ex.gradient[0], '--grad-end': ex.gradient[1] }}>
          <div className="active-bg" />
          {ex.duration ? (
            <Timer duration={ex.duration * 60} onComplete={() => setStep('feedback')} gradient={ex.gradient} />
          ) : (
            <RepTracker exercise={ex} onComplete={() => setStep('feedback')} />
          )}
          <div className="active-tip"><span>💡</span><p>{ex.feel}</p></div>
          <button className="btn-skip" onClick={() => setStep('feedback')}>Terminer l'exercice</button>
        </div>
      )}

      {step === 'feedback' && (
        <div className="ex-feedback">
          <div className="fb-celebration"><span className="fb-emoji">🎉</span><h2>Bravo !</h2><p>Exercice terminé</p></div>
          <FeedbackSelector onSelect={setFeedback} selected={feedback} />
          <div className="fb-footer">
            <button className="btn-primary" disabled={!feedback} onClick={() => onComplete(exId, feedback)}>Continuer</button>
          </div>
        </div>
      )}
    </div>
  );
};

const ProgressScreen = ({ history, currentPhase, onBack }) => {
  const phase = PHASES[currentPhase];
  const last7 = history.slice(-7);
  const greenCount = last7.filter(d => d.status === 'green').length;

  return (
    <div className="progress-screen">
      <header className="screen-hdr">
        <button className="hdr-btn" onClick={onBack}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg></button>
        <h1>Progression</h1>
        <div className="hdr-spacer" />
      </header>
      <div className="progress-body">
        <div className="streak-card" style={{ background: `linear-gradient(135deg, ${phase.gradient[0]}, ${phase.gradient[1]})` }}>
          <div className="streak-glow" />
          <span className="streak-fire">🔥</span>
          <div className="streak-num">{greenCount}</div>
          <div className="streak-label">jours verts cette semaine</div>
          <div className="streak-msg">{greenCount >= 5 ? 'Excellent travail !' : greenCount >= 3 ? 'Continue comme ça !' : 'Chaque jour compte !'}</div>
        </div>

        <section className="prog-section">
          <h3>Cette semaine</h3>
          <div className="week-grid">
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => {
              const day = last7[i];
              return (
                <div key={i} className="week-day">
                  <div className={`day-dot ${day?.status || 'empty'}`}>{day?.status === 'green' ? '✓' : day?.status === 'orange' ? '~' : day?.status === 'red' ? '!' : ''}</div>
                  <span>{d}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="prog-section">
          <h3>{phase.name} — Critères de passage</h3>
          <div className="criteria-card">
            {phase.criteria.map((c, i) => (
              <div key={i} className="criteria-row"><div className="crit-circle" /><span>{c}</span></div>
            ))}
          </div>
        </section>

        <section className="prog-section">
          <h3>Document complet</h3>
          <a href={PROTOCOL_DOC_URL} target="_blank" rel="noopener noreferrer" className="download-card">
            <div className="dl-icon">📋</div>
            <div className="dl-text"><strong>Protocole Personnalisé</strong><span>Document Word avec tous les détails</span></div>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
          </a>
          <p className="dl-note">💡 Le document "Protocole_Personnalise_Hyper-Irritable.docx" est disponible dans notre conversation précédente.</p>
        </section>
      </div>
    </div>
  );
};

const CheckinScreen = ({ onSubmit, onBack }) => {
  const [vals, setVals] = useState({ painAM: 3, painPM: 3, sitting: 30, bike: 10 });
  const fields = [
    { key: 'painAM', icon: '🌅', label: 'Douleur matin', unit: '/10', min: 0, max: 10, step: 1 },
    { key: 'painPM', icon: '🌙', label: 'Douleur soir', unit: '/10', min: 0, max: 10, step: 1 },
    { key: 'sitting', icon: '🪑', label: 'Tolérance assise', unit: ' min', min: 5, max: 120, step: 5 },
    { key: 'bike', icon: '🚴', label: 'Durée vélo max', unit: ' min', min: 0, max: 60, step: 5 }
  ];

  return (
    <div className="checkin-screen">
      <header className="screen-hdr">
        <button className="hdr-btn" onClick={onBack}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg></button>
        <h1>Check hebdo</h1>
        <div className="hdr-spacer" />
      </header>
      <div className="checkin-body">
        <div className="checkin-intro"><span>📊</span><p>Ces 4 mesures permettent de piloter finement ta progression.</p></div>
        <div className="checkin-fields">
          {fields.map(f => (
            <div key={f.key} className="checkin-field">
              <div className="field-top"><span className="field-icon">{f.icon}</span><span className="field-label">{f.label}</span><span className="field-val">{vals[f.key]}{f.unit}</span></div>
              <div className="field-slider">
                <input type="range" min={f.min} max={f.max} step={f.step} value={vals[f.key]}
                  onChange={e => setVals({ ...vals, [f.key]: +e.target.value })} />
                <div className="slider-fill" style={{ width: `${((vals[f.key] - f.min) / (f.max - f.min)) * 100}%` }} />
              </div>
              <div className="field-range"><span>{f.min}</span><span>{f.max}</span></div>
            </div>
          ))}
        </div>
        <div className="checkin-footer"><button className="btn-primary" onClick={() => onSubmit(vals)}>Enregistrer</button></div>
      </div>
    </div>
  );
};

// ============================================
// APP PRINCIPALE
// ============================================

export default function App() {
  const [screen, setScreen] = useState('home');
  const [phase, setPhase] = useState(1);
  const [todayExs, setTodayExs] = useState([]);
  const [completed, setCompleted] = useState({});
  const [currentEx, setCurrentEx] = useState(null);
  const [history] = useState([
    { date: 'L', status: 'green' }, { date: 'M', status: 'green' }, { date: 'M', status: 'orange' },
    { date: 'J', status: 'green' }, { date: 'V', status: 'green' }, { date: 'S', status: null }, { date: 'D', status: null }
  ]);

  useEffect(() => {
    const day = new Date().getDay();
    setTodayExs(WEEK_SCHEDULE[phase]?.[day] || ['E0', 'E1', 'E5']);
  }, [phase]);

  const phaseData = PHASES[phase];
  const completedCount = Object.keys(completed).length;
  const totalCount = todayExs.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const today = new Date();
  const dayName = days[today.getDay()];
  const dateStr = today.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });

  if (screen === 'exercise' && currentEx) {
    return <ExerciseScreen exId={currentEx} onComplete={(id, fb) => { setCompleted({ ...completed, [id]: fb }); setScreen('home'); setCurrentEx(null); }} onBack={() => { setScreen('home'); setCurrentEx(null); }} />;
  }
  if (screen === 'progress') return <ProgressScreen history={history} currentPhase={phase} onBack={() => setScreen('home')} />;
  if (screen === 'checkin') return <CheckinScreen onSubmit={() => setScreen('home')} onBack={() => setScreen('home')} />;

  return (
    <div className="app">
      <div className="home-gradient" style={{ background: `linear-gradient(180deg, ${phaseData.gradient[0]}22 0%, transparent 60%)` }} />
      
      <header className="home-header">
        <div className="greeting"><span className="greet-small">{completedCount === totalCount && totalCount > 0 ? '🎉 Bravo !' : 'Bonjour'}</span><span className="greet-date">{dayName} {dateStr}</span></div>
        <button className="icon-btn" onClick={() => setScreen('checkin')}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg></button>
      </header>

      <div className="phase-pill" onClick={() => setScreen('progress')} style={{ background: `linear-gradient(135deg, ${phaseData.gradient[0]}, ${phaseData.gradient[1]})` }}>
        <span className="phase-icon">{phaseData.icon}</span>
        <div className="phase-text"><span className="phase-name">{phaseData.name}</span><span className="phase-title">{phaseData.title}</span></div>
        <svg className="phase-arrow" viewBox="0 0 24 24" fill="white"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
      </div>

      <div className="progress-hub">
        <div className="hub-ring">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" className="hub-track" />
            <circle cx="50" cy="50" r="42" className="hub-progress" strokeDasharray={`${progress * 2.64} 264`} style={{ stroke: phaseData.gradient[1] }} />
          </svg>
          <div className="hub-center"><span className="hub-done">{completedCount}</span><span className="hub-sep">/</span><span className="hub-total">{totalCount}</span></div>
        </div>
        <div className="hub-info"><h2>Programme du jour</h2><p>{completedCount === totalCount && totalCount > 0 ? 'Terminé ! 🏆' : `${totalCount - completedCount} exercice${totalCount - completedCount > 1 ? 's' : ''} restant${totalCount - completedCount > 1 ? 's' : ''}`}</p></div>
      </div>

      <div className="ex-list">
        {todayExs.map((id, i) => <ExerciseCard key={id} exId={id} completed={!!completed[id]} onStart={setCurrentEx} delay={i * 80} />)}
      </div>

      {completedCount === totalCount && totalCount > 0 && (
        <div className="congrats-banner"><span>🏆</span><div><strong>Félicitations !</strong><p>Programme du jour terminé</p></div></div>
      )}

      <div className="doc-section">
        <a href={PROTOCOL_DOC_URL} target="_blank" rel="noopener noreferrer" className="doc-card">
          <span className="doc-emoji">📋</span>
          <div className="doc-info"><strong>Protocole complet</strong><span>Toutes les fiches détaillées</span></div>
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
        </a>
        <p className="doc-hint">Le document Word "Protocole_Personnalise_Hyper-Irritable.docx" est disponible dans notre conversation.</p>
      </div>

      <nav className="nav-bar">
        <button className="nav-item active"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg><span>Accueil</span></button>
        <button className="nav-item" onClick={() => setScreen('progress')}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg><span>Progrès</span></button>
        <button className="nav-item" onClick={() => setScreen('checkin')}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg><span>Check</span></button>
      </nav>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        
        :root {
          --bg: #0C0C0E; --bg-card: #18181B; --bg-card-hover: #1F1F23;
          --text: #FAFAFA; --text-2: #A1A1AA; --text-3: #71717A;
          --border: #27272A; --green: #22C55E; --orange: #F59E0B; --red: #EF4444;
          --radius: 16px; --radius-lg: 24px;
        }
        
        body { font-family: 'Inter', -apple-system, sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; -webkit-font-smoothing: antialiased; }
        
        .app { max-width: 430px; margin: 0 auto; min-height: 100vh; position: relative; padding-bottom: 100px; }
        .home-gradient { position: absolute; top: 0; left: 0; right: 0; height: 400px; pointer-events: none; }
        
        /* HEADER */
        .home-header { display: flex; justify-content: space-between; align-items: center; padding: 56px 20px 16px; position: relative; }
        .greeting { display: flex; flex-direction: column; }
        .greet-small { font-size: 14px; color: var(--text-2); font-weight: 500; }
        .greet-date { font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
        .icon-btn { width: 44px; height: 44px; border-radius: 50%; border: none; background: var(--bg-card); color: var(--text); display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .icon-btn svg { width: 22px; height: 22px; }
        
        /* PHASE PILL */
        .phase-pill { margin: 8px 20px 24px; padding: 16px 20px; border-radius: var(--radius); display: flex; align-items: center; gap: 14px; cursor: pointer; position: relative; overflow: hidden; }
        .phase-icon { font-size: 28px; }
        .phase-text { flex: 1; display: flex; flex-direction: column; }
        .phase-name { font-size: 13px; opacity: 0.85; font-weight: 500; }
        .phase-title { font-size: 18px; font-weight: 700; }
        .phase-arrow { width: 20px; height: 20px; opacity: 0.7; }
        
        /* PROGRESS HUB */
        .progress-hub { display: flex; align-items: center; gap: 20px; padding: 0 20px; margin-bottom: 28px; }
        .hub-ring { width: 80px; height: 80px; position: relative; }
        .hub-ring svg { transform: rotate(-90deg); }
        .hub-track { fill: none; stroke: var(--bg-card); stroke-width: 8; }
        .hub-progress { fill: none; stroke-width: 8; stroke-linecap: round; transition: stroke-dasharray 0.4s ease; }
        .hub-center { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
        .hub-done { font-size: 24px; font-weight: 800; }
        .hub-sep { font-size: 16px; color: var(--text-3); margin: 0 2px; }
        .hub-total { font-size: 16px; color: var(--text-2); font-weight: 600; }
        .hub-info h2 { font-size: 18px; font-weight: 700; margin-bottom: 4px; }
        .hub-info p { font-size: 14px; color: var(--text-2); }
        
        /* EXERCISE CARDS */
        .ex-list { padding: 0 20px; display: flex; flex-direction: column; gap: 12px; }
        .ex-card { display: flex; align-items: center; padding: 16px; background: var(--bg-card); border-radius: var(--radius); cursor: pointer; position: relative; overflow: hidden; animation: cardIn 0.4s ease backwards; animation-delay: var(--delay); transition: transform 0.15s, background 0.15s; }
        .ex-card:active { transform: scale(0.98); background: var(--bg-card-hover); }
        .ex-card.done { opacity: 0.5; }
        @keyframes cardIn { from { opacity: 0; transform: translateY(12px); } }
        .ex-card-accent { position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: linear-gradient(180deg, var(--grad-start), var(--grad-end)); }
        .ex-card-icon { width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, var(--grad-start)25, var(--grad-end)25); display: flex; align-items: center; justify-content: center; font-size: 26px; margin-right: 14px; flex-shrink: 0; }
        .ex-card-body { flex: 1; min-width: 0; }
        .ex-card-top { display: flex; align-items: center; gap: 10px; margin-bottom: 4px; }
        .ex-card-top h3 { font-size: 16px; font-weight: 700; }
        .ex-card-cat { font-size: 11px; padding: 3px 8px; background: var(--bg); border-radius: 20px; color: var(--text-2); }
        .ex-card-desc { font-size: 13px; color: var(--text-2); margin-bottom: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .ex-card-meta { display: flex; flex-wrap: wrap; gap: 10px; font-size: 12px; color: var(--text-3); }
        .ex-card-action { margin-left: 12px; }
        .ex-card-check { width: 32px; height: 32px; border-radius: 50%; background: var(--green); display: flex; align-items: center; justify-content: center; }
        .ex-card-check svg { width: 18px; height: 18px; }
        .ex-card-arrow { width: 20px; height: 20px; color: var(--text-3); }
        
        /* CONGRATS */
        .congrats-banner { margin: 24px 20px; padding: 20px; background: linear-gradient(135deg, var(--green)20, var(--green)10); border: 1px solid var(--green)40; border-radius: var(--radius); display: flex; align-items: center; gap: 16px; }
        .congrats-banner span { font-size: 36px; }
        .congrats-banner strong { font-size: 16px; display: block; color: var(--green); }
        .congrats-banner p { font-size: 14px; color: var(--text-2); }
        
        /* DOC SECTION */
        .doc-section { padding: 20px; }
        .doc-card { display: flex; align-items: center; padding: 16px; background: var(--bg-card); border-radius: var(--radius); text-decoration: none; color: var(--text); transition: background 0.15s; }
        .doc-card:active { background: var(--bg-card-hover); }
        .doc-emoji { font-size: 28px; margin-right: 14px; }
        .doc-info { flex: 1; }
        .doc-info strong { font-size: 15px; display: block; }
        .doc-info span { font-size: 13px; color: var(--text-2); }
        .doc-card svg { width: 20px; height: 20px; color: var(--text-3); }
        .doc-hint { margin-top: 12px; font-size: 13px; color: var(--text-3); text-align: center; line-height: 1.5; }
        
        /* NAV BAR */
        .nav-bar { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 430px; display: flex; justify-content: space-around; padding: 12px 20px calc(20px + env(safe-area-inset-bottom)); background: var(--bg-card); border-top: 1px solid var(--border); }
        .nav-item { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px 20px; border: none; background: none; color: var(--text-3); font-size: 11px; font-weight: 500; cursor: pointer; }
        .nav-item svg { width: 24px; height: 24px; }
        .nav-item.active { color: var(--text); }
        
        /* SCREEN HEADER */
        .screen-hdr, .ex-header { display: flex; align-items: center; padding: 56px 20px 16px; background: var(--bg-card); border-bottom: 1px solid var(--border); }
        .screen-hdr h1, .hdr-title { flex: 1; text-align: center; font-size: 17px; font-weight: 700; }
        .hdr-btn { width: 40px; height: 40px; border-radius: 50%; border: none; background: var(--bg); color: var(--text); display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .hdr-btn svg { width: 22px; height: 22px; }
        .hdr-spacer { width: 40px; }
        .hdr-title { display: flex; align-items: center; justify-content: center; gap: 8px; }
        .hdr-icon { font-size: 22px; }
        
        /* EXERCISE SCREEN */
        .ex-screen { min-height: 100vh; background: var(--bg); }
        .ex-intro { padding-bottom: 100px; }
        .intro-hero { height: 180px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
        .hero-emoji { font-size: 72px; position: relative; z-index: 1; }
        .hero-glow { position: absolute; width: 200px; height: 200px; background: rgba(255,255,255,0.2); border-radius: 50%; filter: blur(60px); }
        .intro-body { padding: 20px; display: flex; flex-direction: column; gap: 16px; }
        .info-block { background: var(--bg-card); padding: 16px; border-radius: var(--radius); }
        .info-head { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .info-head span { font-size: 18px; }
        .info-head h4 { font-size: 14px; font-weight: 600; color: var(--text-2); }
        .info-block p { font-size: 15px; line-height: 1.6; }
        .steps-list { list-style: none; display: flex; flex-direction: column; gap: 14px; }
        .steps-list li { display: flex; gap: 14px; }
        .step-num { width: 28px; height: 28px; border-radius: 50%; background: var(--bg); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0; }
        .step-content { display: flex; flex-direction: column; }
        .step-content strong { font-size: 15px; font-weight: 600; }
        .step-content span { font-size: 13px; color: var(--text-2); margin-top: 2px; }
        .info-block.success { background: var(--green)15; border-left: 4px solid var(--green); }
        .info-block.warning { background: var(--orange)15; border-left: 4px solid var(--orange); }
        .warn-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .warn-list li { font-size: 15px; padding-left: 20px; position: relative; }
        .warn-list li::before { content: '✕'; position: absolute; left: 0; color: var(--orange); font-size: 12px; }
        .doc-link-inline { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; color: var(--text-2); text-decoration: none; font-size: 14px; }
        .intro-footer { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 430px; padding: 20px; background: linear-gradient(180deg, transparent, var(--bg) 30%); }
        .btn-primary { width: 100%; padding: 18px; border: none; border-radius: var(--radius); background: var(--text); color: var(--bg); font-size: 17px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: opacity 0.15s, transform 0.15s; }
        .btn-primary:active { transform: scale(0.98); opacity: 0.9; }
        .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
        .btn-primary svg { width: 20px; height: 20px; }
        
        /* EXERCISE ACTIVE */
        .ex-active { min-height: calc(100vh - 89px); display: flex; flex-direction: column; align-items: center; padding: 40px 20px; position: relative; }
        .active-bg { position: absolute; top: 0; left: 0; right: 0; height: 50%; background: linear-gradient(180deg, var(--grad-start)15, transparent); pointer-events: none; }
        .timer-widget { display: flex; flex-direction: column; align-items: center; gap: 32px; position: relative; z-index: 1; }
        .timer-circle-container { position: relative; width: 220px; height: 220px; }
        .timer-svg { width: 100%; height: 100%; transform: rotate(-90deg); }
        .timer-track { fill: none; stroke: var(--bg-card); stroke-width: 10; }
        .timer-progress { fill: none; stroke-width: 10; stroke-linecap: round; transition: stroke-dashoffset 0.3s ease; }
        .timer-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .timer-time { font-size: 52px; font-weight: 800; letter-spacing: -2px; }
        .timer-label { font-size: 14px; color: var(--text-2); font-weight: 500; }
        .timer-buttons { display: flex; gap: 16px; }
        .timer-btn { border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.15s; }
        .timer-btn:active { transform: scale(0.95); }
        .timer-btn.primary { width: 72px; height: 72px; }
        .timer-btn.primary svg { width: 28px; height: 28px; }
        .timer-btn.secondary { width: 52px; height: 52px; background: var(--bg-card); color: var(--text-2); }
        .timer-btn.secondary svg { width: 22px; height: 22px; }
        
        .rep-tracker { display: flex; flex-direction: column; align-items: center; gap: 20px; position: relative; z-index: 1; }
        .side-switcher { display: flex; gap: 8px; background: var(--bg-card); padding: 4px; border-radius: var(--radius); }
        .side-option { padding: 10px 20px; border-radius: 12px; font-size: 14px; font-weight: 600; color: var(--text-3); display: flex; align-items: center; gap: 6px; transition: all 0.2s; }
        .side-option.active { background: var(--text); color: var(--bg); }
        .side-arrow { font-size: 12px; }
        .set-indicator { font-size: 14px; color: var(--text-2); font-weight: 500; }
        .rep-button { width: 200px; height: 200px; position: relative; cursor: pointer; transition: transform 0.15s; }
        .rep-button:active { transform: scale(0.98); }
        .rep-ring { position: absolute; inset: 0; transform: rotate(-90deg); }
        .rep-track { fill: none; stroke: var(--bg-card); stroke-width: 10; }
        .rep-progress { fill: none; stroke: linear-gradient(135deg, var(--grad-start), var(--grad-end)); stroke: var(--grad-end); stroke-width: 10; stroke-linecap: round; transition: stroke-dasharray 0.3s ease; }
        .rep-inner { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .rep-count { display: flex; align-items: baseline; }
        .rep-count .current { font-size: 64px; font-weight: 800; }
        .rep-count .sep { font-size: 28px; color: var(--text-3); margin: 0 4px; }
        .rep-count .total { font-size: 28px; color: var(--text-2); font-weight: 600; }
        .rep-hint { font-size: 13px; color: var(--text-3); margin-top: 4px; }
        .rep-hold-num { font-size: 72px; font-weight: 800; color: var(--orange); }
        .rep-hold-text { font-size: 16px; color: var(--orange); font-weight: 600; }
        .rep-button.holding { animation: holdPulse 1s infinite; }
        @keyframes holdPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }
        .hold-ring-pulse { position: absolute; inset: 0; border-radius: 50%; border: 3px solid var(--orange); animation: ringPulse 1s infinite; }
        @keyframes ringPulse { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.15); opacity: 0; } }
        .hold-info { font-size: 14px; color: var(--text-2); }
        .active-tip { margin-top: 32px; padding: 16px 20px; background: var(--bg-card); border-radius: var(--radius); display: flex; align-items: center; gap: 12px; max-width: 320px; }
        .active-tip span { font-size: 20px; }
        .active-tip p { font-size: 14px; color: var(--text-2); line-height: 1.4; }
        .btn-skip { margin-top: auto; padding: 16px 32px; border: none; background: var(--bg-card); color: var(--text-2); font-size: 15px; font-weight: 600; border-radius: var(--radius); cursor: pointer; }
        
        /* FEEDBACK */
        .ex-feedback { min-height: calc(100vh - 89px); padding: 40px 20px; display: flex; flex-direction: column; }
        .fb-celebration { text-align: center; margin-bottom: 40px; }
        .fb-emoji { font-size: 72px; display: block; margin-bottom: 16px; animation: celebBounce 0.6s ease; }
        @keyframes celebBounce { 0%, 100% { transform: scale(1); } 30% { transform: scale(1.3); } 60% { transform: scale(0.9); } }
        .fb-celebration h2 { font-size: 32px; font-weight: 800; margin-bottom: 8px; }
        .fb-celebration p { color: var(--text-2); font-size: 16px; }
        .feedback-selector { flex: 1; }
        .feedback-selector h3 { font-size: 20px; font-weight: 700; text-align: center; margin-bottom: 8px; }
        .feedback-sub { text-align: center; color: var(--text-2); font-size: 14px; margin-bottom: 24px; }
        .feedback-options { display: flex; flex-direction: column; gap: 12px; }
        .feedback-opt { display: flex; align-items: center; padding: 16px; background: var(--bg-card); border: 2px solid transparent; border-radius: var(--radius); cursor: pointer; transition: all 0.2s; }
        .feedback-opt:active { transform: scale(0.98); }
        .feedback-opt.selected { border-color: var(--opt-color); background: var(--opt-bg)20; }
        .opt-icon { font-size: 28px; margin-right: 16px; }
        .opt-text { flex: 1; display: flex; flex-direction: column; }
        .opt-text strong { font-size: 16px; }
        .opt-text span { font-size: 13px; color: var(--text-2); }
        .opt-check { width: 28px; height: 28px; border-radius: 50%; background: var(--opt-color); display: flex; align-items: center; justify-content: center; }
        .opt-check svg { width: 16px; height: 16px; }
        .fb-footer { padding-top: 24px; }
        
        /* PROGRESS SCREEN */
        .progress-screen, .checkin-screen { min-height: 100vh; background: var(--bg); }
        .progress-body, .checkin-body { padding: 20px; }
        .streak-card { padding: 40px 24px; border-radius: var(--radius-lg); text-align: center; position: relative; overflow: hidden; margin-bottom: 24px; }
        .streak-glow { position: absolute; top: -50%; left: 50%; transform: translateX(-50%); width: 300px; height: 300px; background: rgba(255,255,255,0.2); border-radius: 50%; filter: blur(60px); }
        .streak-fire { font-size: 48px; display: block; margin-bottom: 8px; position: relative; z-index: 1; }
        .streak-num { font-size: 80px; font-weight: 800; line-height: 1; position: relative; z-index: 1; }
        .streak-label { font-size: 16px; opacity: 0.9; margin-bottom: 8px; position: relative; z-index: 1; }
        .streak-msg { font-size: 18px; font-weight: 600; position: relative; z-index: 1; }
        .prog-section { margin-bottom: 24px; }
        .prog-section h3 { font-size: 16px; font-weight: 700; margin-bottom: 16px; }
        .week-grid { display: flex; justify-content: space-between; background: var(--bg-card); padding: 20px; border-radius: var(--radius); }
        .week-day { display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .day-dot { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: white; }
        .day-dot.green { background: var(--green); }
        .day-dot.orange { background: var(--orange); }
        .day-dot.red { background: var(--red); }
        .day-dot.empty { background: var(--bg); color: var(--text-3); }
        .week-day span { font-size: 12px; color: var(--text-3); font-weight: 500; }
        .criteria-card { background: var(--bg-card); padding: 16px; border-radius: var(--radius); display: flex; flex-direction: column; gap: 12px; }
        .criteria-row { display: flex; align-items: center; gap: 12px; font-size: 14px; }
        .crit-circle { width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--text-3); }
        .download-card { display: flex; align-items: center; padding: 16px; background: var(--bg-card); border-radius: var(--radius); text-decoration: none; color: var(--text); }
        .dl-icon { font-size: 32px; margin-right: 14px; }
        .dl-text { flex: 1; }
        .dl-text strong { font-size: 15px; display: block; }
        .dl-text span { font-size: 13px; color: var(--text-2); }
        .download-card svg { width: 20px; height: 20px; color: var(--text-3); }
        .dl-note { margin-top: 12px; font-size: 13px; color: var(--text-3); line-height: 1.5; }
        
        /* CHECKIN */
        .checkin-intro { display: flex; align-items: center; gap: 16px; margin-bottom: 28px; padding: 16px; background: var(--bg-card); border-radius: var(--radius); }
        .checkin-intro span { font-size: 36px; }
        .checkin-intro p { font-size: 14px; color: var(--text-2); line-height: 1.5; }
        .checkin-fields { display: flex; flex-direction: column; gap: 20px; }
        .checkin-field { background: var(--bg-card); padding: 20px; border-radius: var(--radius); }
        .field-top { display: flex; align-items: center; margin-bottom: 16px; }
        .field-icon { font-size: 24px; margin-right: 12px; }
        .field-label { flex: 1; font-size: 15px; font-weight: 600; }
        .field-val { font-size: 20px; font-weight: 800; }
        .field-slider { position: relative; height: 8px; margin-bottom: 8px; }
        .field-slider input[type="range"] { position: absolute; width: 100%; height: 8px; -webkit-appearance: none; background: var(--bg); border-radius: 4px; outline: none; }
        .field-slider input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 28px; height: 28px; border-radius: 50%; background: var(--text); cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.3); position: relative; z-index: 2; }
        .slider-fill { position: absolute; top: 0; left: 0; height: 100%; background: linear-gradient(90deg, #6366F1, #8B5CF6); border-radius: 4px; pointer-events: none; }
        .field-range { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-3); }
        .checkin-footer { padding: 24px 0; }
      `}</style>
    </div>
  );
}
