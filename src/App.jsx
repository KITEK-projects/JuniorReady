import { useState } from "react";

const TRACKS = {
  frontend: {
    label: "Frontend",
    color: "#185FA5",
    bg: "#E6F1FB",
    sections: [
      {
        title: "Основы",
        skills: [
          { id: "html", label: "HTML5 (семантика, формы, доступность)" },
          { id: "css", label: "CSS3 (Flexbox, Grid, анимации)" },
          { id: "responsive", label: "Адаптивная вёрстка" },
          { id: "git", label: "Git (commit, branch, merge, PR)" },
          { id: "cli", label: "Командная строка (базово)" },
          { id: "vscode", label: "VS Code и расширения" },
        ],
      },
      {
        title: "JavaScript",
        skills: [
          { id: "js_core", label: "JS: типы, функции, массивы, объекты" },
          { id: "js_async", label: "JS: async/await, Promise, fetch" },
          { id: "js_dom", label: "JS: DOM-манипуляции, события" },
          { id: "ts_basic", label: "TypeScript (базовые типы, интерфейсы)" },
          { id: "es6", label: "ES6+: деструктуризация, spread, модули" },
        ],
      },
      {
        title: "Фреймворки и инструменты",
        skills: [
          { id: "react", label: "React (компоненты, хуки, состояние)" },
          { id: "npm", label: "npm / yarn, управление зависимостями" },
          { id: "figma", label: "Figma (читать макеты, экспортировать)" },
          { id: "deploy", label: "Деплой (GitHub Pages, Vercel, Netlify)" },
          { id: "devtools", label: "Браузерные DevTools" },
        ],
      },
    ],
  },
  backend: {
    label: "Backend",
    color: "#0F6E56",
    bg: "#E1F5EE",
    sections: [
      {
        title: "Основы",
        skills: [
          { id: "git_b", label: "Git (commit, branch, merge, PR)" },
          { id: "cli_b", label: "Командная строка и bash-скрипты" },
          { id: "http", label: "HTTP: методы, статус-коды, заголовки" },
          { id: "rest", label: "REST API: проектирование и потребление" },
          { id: "sql", label: "SQL: SELECT, JOIN, агрегации, индексы" },
          { id: "db", label: "СУБД: PostgreSQL или MySQL (базово)" },
        ],
      },
      {
        title: "Python / Django",
        skills: [
          { id: "py_core", label: "Python: ООП, исключения, модули" },
          { id: "django_orm", label: "Django ORM (модели, миграции, запросы)" },
          { id: "django_views", label: "Django views, URL-роутинг, templates" },
          { id: "drf", label: "Django REST Framework (сериализаторы, viewsets)" },
          { id: "django_auth", label: "Аутентификация и авторизация в Django" },
        ],
      },
      {
        title: "PHP / Laravel",
        skills: [
          { id: "php_core", label: "PHP: синтаксис, ООП, Composer" },
          { id: "laravel_routing", label: "Laravel: маршрутизация, контроллеры" },
          { id: "eloquent", label: "Eloquent ORM, миграции, фабрики" },
          { id: "blade", label: "Blade-шаблоны, компоненты" },
          { id: "laravel_api", label: "API Resources, middleware, валидация" },
        ],
      },
      {
        title: "Node.js / Express",
        skills: [
          { id: "node_core", label: "Node.js: модули, fs, path, events" },
          { id: "express_routing", label: "Express: роутинг, middleware, error-handling" },
          { id: "express_api", label: "Построение REST API на Express" },
          { id: "mongoose", label: "MongoDB / Mongoose (базово)" },
          { id: "env", label: "Переменные окружения (.env), безопасность" },
        ],
      },
    ],
  },
};

const SOFT_CHECKLIST = [
  {
    category: "Самопрезентация",
    items: [
      { id: "s1", label: 'Могу рассказать о себе за 2 минуты по схеме "кто я → что умею → почему сюда"' },
      { id: "s2", label: "Знаю, какие проекты из портфолио покажу на собеседовании и могу объяснить каждый" },
      { id: "s3", label: "Готов ответить: «Почему хотите работать именно у нас?»" },
      { id: "s4", label: "Знаю свои сильные стороны и могу привести пример каждой" },
    ],
  },
  {
    category: "Коммуникация",
    items: [
      { id: "s5", label: "Умею задавать уточняющие вопросы, если задача непонятна" },
      { id: "s6", label: "Могу объяснить техническое решение простыми словами" },
      { id: "s7", label: "Знаю структуру STAR-ответа (ситуация → задача → действие → результат)" },
      { id: "s8", label: "Не говорю «не знаю» и молчу — умею сказать «не сталкивался, но разберусь так...»" },
    ],
  },
  {
    category: "Поведение на интервью",
    items: [
      { id: "s9", label: "Пришёл вовремя (или подключился к онлайн-звонку заранее)" },
      { id: "s10", label: "Не перебиваю интервьюера, даю ему закончить вопрос" },
      { id: "s11", label: "Готов к провальным ответам — не паникую, думаю вслух" },
      { id: "s12", label: "Подготовил 2–3 вопроса интервьюеру о команде и задачах" },
    ],
  },
  {
    category: "Психологическая готовность",
    items: [
      { id: "s13", label: "Понимаю, что отказ — это не провал, а опыт и информация" },
      { id: "s14", label: "Умею справляться с тревогой: дыхание, пауза перед ответом" },
      { id: "s15", label: "Готов к каверзным вопросам: «что вы умеете хуже всего?»" },
      { id: "s16", label: "Знаю ожидаемый уровень зарплаты и готов его назвать" },
    ],
  },
];

const INTERVIEW_QUESTIONS = [
  {
    type: "HR",
    questions: [
      {
        q: "Расскажите о себе.",
        options: [
          { text: "Перечислить всё из резюме по порядку", feedback: "❌ Интервьюер уже прочитал резюме. Это теряет время и не добавляет ценности.", ok: false },
          { text: "Кратко: кто я, что умею, почему эта компания", feedback: "✅ Отличная структура. 2 минуты, конкретно, без воды — именно то, что ждут.", ok: true },
          { text: "Рассказать историю из детства, почему выбрал IT", feedback: "⚠️ Может быть уместно как вступление, но без структуры «что умею и почему сюда» — неполный ответ.", ok: false },
        ],
      },
      {
        q: "Почему хотите работать именно у нас?",
        options: [
          { text: "Потому что мне нужна работа и вы позвонили", feedback: "❌ Честно, но показывает нулевую мотивацию. Компания ищет тех, кому важна именно она.", ok: false },
          { text: "Слышал, что у вас хороший коллектив", feedback: "⚠️ Слишком расплывчато и неверифицируемо. Откуда известно? Лучше опираться на конкретику.", ok: false },
          { text: "Изучил ваш продукт/стек, вижу точки роста именно здесь", feedback: "✅ Показывает инициативу и осознанность. Конкретика о продукте — сильный сигнал для работодателя.", ok: true },
        ],
      },
      {
        q: "Назовите ваш главный недостаток.",
        options: [
          { text: "Я слишком много работаю и не могу остановиться", feedback: "❌ Классический шаблон, который все знают. Воспринимается как неискренность.", ok: false },
          { text: "Иногда трудно с публичными выступлениями, но активно работаю над этим", feedback: "✅ Реальный недостаток + конкретный шаг к улучшению. Честность ценится.", ok: true },
          { text: "У меня нет недостатков, которые важны для этой работы", feedback: "❌ Звучит как избегание. Интервьюер отметит отсутствие самокритики.", ok: false },
        ],
      },
      {
        q: "Где вы видите себя через 3 года?",
        options: [
          { text: "На вашем месте!", feedback: "❌ Шутка устарела. Может вызвать раздражение.", ok: false },
          { text: "Хочу вырасти до middle-разработчика, углубиться в конкретную область", feedback: "✅ Показывает амбиции и реалистичность. Работодатель видит, что вы думаете о развитии.", ok: true },
          { text: "Не знаю, всё так быстро меняется", feedback: "⚠️ Честно, но воспринимается как отсутствие целей. Лучше назвать хотя бы направление.", ok: false },
        ],
      },
    ],
  },
  {
    type: "Техническое",
    questions: [
      {
        q: "В чём разница между == и === в JavaScript?",
        options: [
          { text: "Это одно и то же, просто разные стили написания", feedback: "❌ Принципиально разные операторы. == приводит типы (1 == '1' → true), === сравнивает строго (1 === '1' → false).", ok: false },
          { text: "=== строгое сравнение (тип + значение), == с приведением типов", feedback: "✅ Точный ответ. Можно добавить пример: 0 == false → true, но 0 === false → false.", ok: true },
          { text: "=== быстрее работает, поэтому лучше", feedback: "⚠️ Частично верно (нет приведения типов), но объяснение неполное. Разница в семантике, а не только в скорости.", ok: false },
        ],
      },
      {
        q: "Что такое event loop в Node.js?",
        options: [
          { text: "Это цикл for, который обрабатывает события в браузере", feedback: "❌ Event loop — это механизм асинхронности, не цикл for. Работает не только в браузере, но и в Node.js.", ok: false },
          { text: "Механизм, который позволяет Node.js выполнять неблокирующие I/O-операции, несмотря на однопоточность", feedback: "✅ Хороший ответ. Плюс, если упомянуть очереди: call stack → microtasks → macrotasks.", ok: true },
          { text: "Не знаю, мы это не проходили", feedback: "❌ Базовая тема для backend-разработчика. Даже «слышал, что связано с асинхронностью» — лучше, чем молчание.", ok: false },
        ],
      },
      {
        q: "Как бы вы оптимизировали медленный SQL-запрос?",
        options: [
          { text: "Переписал бы на другом языке", feedback: "❌ Проблема не в языке, а в запросе или структуре данных. Это не решение.", ok: false },
          { text: "Добавил бы индекс на поле в WHERE, проверил EXPLAIN, убрал N+1", feedback: "✅ Отличный структурированный ответ: индексы → план выполнения → типичные антипаттерны.", ok: true },
          { text: "Кэшировал бы результат запроса", feedback: "⚠️ Кэширование — рабочий подход, но он маскирует проблему, а не решает её. Лучше сначала оптимизировать сам запрос.", ok: false },
        ],
      },
      {
        q: "Объясните разницу между GET и POST запросами.",
        options: [
          { text: "GET — для получения данных (параметры в URL), POST — для отправки данных (в теле запроса)", feedback: "✅ Чёткий базовый ответ. Бонус: упомянуть идемпотентность GET и отсутствие её у POST.", ok: true },
          { text: "POST безопаснее, поэтому его надо использовать всегда", feedback: "⚠️ POST скрывает данные от URL, но не шифрует их. Безопасность — задача HTTPS, а не метода.", ok: false },
          { text: "GET быстрее, потому что короче", feedback: "❌ Скорость не зависит от метода. Разница в семантике и способе передачи данных.", ok: false },
        ],
      },
    ],
  },
];

export default function JuniorReady() {
  const [activeModule, setActiveModule] = useState("home");
  const [track, setTrack] = useState("frontend");
  const [checked, setChecked] = useState({});
  const [softChecked, setSoftChecked] = useState({});
  const [interviewTab, setInterviewTab] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [answered, setAnswered] = useState({});
  const [selected, setSelected] = useState({});

  const toggleSkill = (id) => setChecked((p) => ({ ...p, [id]: !p[id] }));
  const toggleSoft = (id) => setSoftChecked((p) => ({ ...p, [id]: !p[id] }));

  const allSkills = TRACKS[track].sections.flatMap((s) => s.skills);
  const hardPercent = allSkills.length
    ? Math.round((allSkills.filter((s) => checked[s.id]).length / allSkills.length) * 100)
    : 0;

  const allSoft = SOFT_CHECKLIST.flatMap((c) => c.items);
  const softPercent = allSoft.length
    ? Math.round((allSoft.filter((s) => softChecked[s.id]).length / allSoft.length) * 100)
    : 0;

  const currentBlock = INTERVIEW_QUESTIONS[interviewTab];
  const currentQ = currentBlock.questions[qIndex];
  const qKey = `${interviewTab}-${qIndex}`;

  const handleAnswer = (optIdx) => {
    if (answered[qKey] !== undefined) return;
    setSelected((p) => ({ ...p, [qKey]: optIdx }));
    setAnswered((p) => ({ ...p, [qKey]: optIdx }));
  };

  const nextQ = () => {
    if (qIndex < currentBlock.questions.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      setQIndex(0);
    }
  };

  const scoreColor = (pct) => {
    if (pct >= 75) return "#0F6E56";
    if (pct >= 40) return "#BA7517";
    return "#A32D2D";
  };

  const ScoreBar = ({ pct, color }) => (
    <div style={{ background: "#e5e7eb", borderRadius: 99, height: 8, margin: "8px 0 4px" }}>
      <div
        style={{
          width: `${pct}%`,
          height: 8,
          borderRadius: 99,
          background: color || scoreColor(pct),
          transition: "width 0.6s ease",
        }}
      />
    </div>
  );

  const navItems = [
    { id: "home", label: "Главная" },
    { id: "roadmap", label: "Roadmap навыков" },
    { id: "soft", label: "Чеклист soft skills" },
    { id: "interview", label: "Тренажёр интервью" },
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: "100vh", background: "var(--color-background-tertiary, #f5f5f3)" }}>
      {/* Header */}
      <div style={{ background: "#0C2340", padding: "0 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: "#378ADD", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z" stroke="white" strokeWidth="1.5" fill="none" />
                <circle cx="8" cy="8" r="2" fill="white" />
              </svg>
            </div>
            <span style={{ color: "white", fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em" }}>Junior Ready</span>
          </div>
          <nav style={{ display: "flex", gap: 4 }}>
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => setActiveModule(n.id)}
                style={{
                  background: activeModule === n.id ? "rgba(55,138,221,0.25)" : "transparent",
                  border: "none",
                  color: activeModule === n.id ? "#85B7EB" : "rgba(255,255,255,0.6)",
                  padding: "6px 12px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: activeModule === n.id ? 600 : 400,
                  transition: "all 0.15s",
                }}
              >
                {n.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
        {/* HOME */}
        {activeModule === "home" && (
          <div>
            <div style={{ textAlign: "center", padding: "2.5rem 0 2rem" }}>
              <div style={{ display: "inline-block", background: "#E6F1FB", color: "#185FA5", fontSize: 12, fontWeight: 600, padding: "4px 14px", borderRadius: 99, marginBottom: 16, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Для выпускников по специальности «Веб-разработчик»
              </div>
              <h1 style={{ fontSize: 36, fontWeight: 700, color: "#0C2340", margin: "0 0 12px", lineHeight: 1.2 }}>
                Готов к первому<br />собеседованию?
              </h1>
              <p style={{ color: "#5F5E5A", fontSize: 16, maxWidth: 480, margin: "0 auto 2.5rem", lineHeight: 1.6 }}>
                Три инструмента, которые помогут оценить уровень готовности, выявить пробелы и уверенно пройти техническое и HR-интервью.
              </p>
            </div>

            {/* Summary cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
              {[
                { label: "Hard skills", pct: hardPercent, desc: "Технические навыки", module: "roadmap", color: "#185FA5" },
                { label: "Soft skills", pct: softPercent, desc: "Поведение на интервью", module: "soft", color: "#0F6E56" },
                { label: "Тренажёр", pct: Math.round((Object.keys(answered).length / (INTERVIEW_QUESTIONS.reduce((a, b) => a + b.questions.length, 0))) * 100), desc: "Вопросов отвечено", module: "interview", color: "#853F0B" },
              ].map((c) => (
                <div
                  key={c.module}
                  onClick={() => setActiveModule(c.module)}
                  style={{
                    background: "white",
                    border: "0.5px solid #e5e7eb",
                    borderRadius: 12,
                    padding: "1.25rem",
                    cursor: "pointer",
                    transition: "box-shadow 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                >
                  <div style={{ fontSize: 13, color: "#888780", marginBottom: 4 }}>{c.desc}</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: c.color }}>{c.pct}%</div>
                  <ScoreBar pct={c.pct} color={c.color} />
                  <div style={{ fontSize: 13, color: "#5F5E5A", marginTop: 6 }}>{c.label} →</div>
                </div>
              ))}
            </div>

            {/* Module cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {[
                {
                  id: "roadmap",
                  title: "Roadmap навыков",
                  desc: "Отметь технологии, которые знаешь. Получи карту пробелов по Frontend и Backend.",
                  color: "#185FA5",
                  bg: "#E6F1FB",
                },
                {
                  id: "soft",
                  title: "Чеклист soft skills",
                  desc: "Самопрезентация, коммуникация, поведение на интервью — всё в одном списке.",
                  color: "#0F6E56",
                  bg: "#E1F5EE",
                },
                {
                  id: "interview",
                  title: "Тренажёр интервью",
                  desc: "HR и технические вопросы с разбором ответов. Практикуй до автоматизма.",
                  color: "#854F0B",
                  bg: "#FAEEDA",
                },
              ].map((m) => (
                <div
                  key={m.id}
                  onClick={() => setActiveModule(m.id)}
                  style={{
                    background: m.bg,
                    border: `1px solid ${m.color}22`,
                    borderRadius: 12,
                    padding: "1.25rem",
                    cursor: "pointer",
                    transition: "transform 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
                >
                  <div style={{ fontWeight: 600, fontSize: 15, color: m.color, marginBottom: 8 }}>{m.title}</div>
                  <div style={{ fontSize: 13, color: "#5F5E5A", lineHeight: 1.5 }}>{m.desc}</div>
                  <div style={{ marginTop: 14, fontSize: 13, color: m.color, fontWeight: 500 }}>Открыть →</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ROADMAP */}
        {activeModule === "roadmap" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0C2340", margin: "0 0 6px" }}>Roadmap навыков</h2>
              <p style={{ color: "#888780", fontSize: 14, margin: 0 }}>Отметь то, что знаешь — увидишь реальную картину готовности</p>
            </div>

            {/* Track selector */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {Object.entries(TRACKS).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => setTrack(key)}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 8,
                    border: track === key ? `2px solid ${t.color}` : "1px solid #e5e7eb",
                    background: track === key ? t.bg : "white",
                    color: track === key ? t.color : "#5F5E5A",
                    fontWeight: track === key ? 600 : 400,
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Score */}
            <div style={{ background: "white", border: "0.5px solid #e5e7eb", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "#888780", marginBottom: 4 }}>Готовность по треку {TRACKS[track].label}</div>
                <ScoreBar pct={hardPercent} color={TRACKS[track].color} />
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, color: scoreColor(hardPercent) }}>{hardPercent}%</div>
            </div>

            {/* Sections */}
            {TRACKS[track].sections.map((section) => {
              const doneCount = section.skills.filter((s) => checked[s.id]).length;
              return (
                <div key={section.title} style={{ background: "white", border: "0.5px solid #e5e7eb", borderRadius: 12, marginBottom: 12, overflow: "hidden" }}>
                  <div style={{ padding: "12px 16px", borderBottom: "0.5px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 600, fontSize: 14, color: "#0C2340" }}>{section.title}</span>
                    <span style={{ fontSize: 13, color: TRACKS[track].color, fontWeight: 500 }}>
                      {doneCount}/{section.skills.length}
                    </span>
                  </div>
                  <div style={{ padding: "8px 0" }}>
                    {section.skills.map((skill) => (
                      <label
                        key={skill.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "8px 16px",
                          cursor: "pointer",
                          transition: "background 0.1s",
                          background: checked[skill.id] ? `${TRACKS[track].bg}88` : "transparent",
                        }}
                        onMouseEnter={(e) => { if (!checked[skill.id]) e.currentTarget.style.background = "#f9f9f8"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = checked[skill.id] ? `${TRACKS[track].bg}88` : "transparent"; }}
                      >
                        <div
                          onClick={() => toggleSkill(skill.id)}
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 5,
                            border: checked[skill.id] ? "none" : "1.5px solid #D3D1C7",
                            background: checked[skill.id] ? TRACKS[track].color : "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            transition: "all 0.15s",
                          }}
                        >
                          {checked[skill.id] && (
                            <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                              <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <span
                          style={{
                            fontSize: 14,
                            color: checked[skill.id] ? "#5F5E5A" : "#2C2C2A",
                            textDecoration: checked[skill.id] ? "line-through" : "none",
                            textDecorationColor: "#B4B2A9",
                          }}
                        >
                          {skill.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* SOFT SKILLS */}
        {activeModule === "soft" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0C2340", margin: "0 0 6px" }}>Чеклист soft skills</h2>
              <p style={{ color: "#888780", fontSize: 14, margin: 0 }}>Отметь то, что уже отработано</p>
            </div>

            <div style={{ background: "white", border: "0.5px solid #e5e7eb", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "#888780", marginBottom: 4 }}>Готовность к поведенческому интервью</div>
                <ScoreBar pct={softPercent} color="#0F6E56" />
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, color: scoreColor(softPercent) }}>{softPercent}%</div>
            </div>

            {SOFT_CHECKLIST.map((cat) => {
              const doneCount = cat.items.filter((i) => softChecked[i.id]).length;
              return (
                <div key={cat.category} style={{ background: "white", border: "0.5px solid #e5e7eb", borderRadius: 12, marginBottom: 12, overflow: "hidden" }}>
                  <div style={{ padding: "12px 16px", borderBottom: "0.5px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 600, fontSize: 14, color: "#0C2340" }}>{cat.category}</span>
                    <span style={{ fontSize: 13, color: "#0F6E56", fontWeight: 500 }}>
                      {doneCount}/{cat.items.length}
                    </span>
                  </div>
                  <div style={{ padding: "8px 0" }}>
                    {cat.items.map((item) => (
                      <label
                        key={item.id}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 12,
                          padding: "10px 16px",
                          cursor: "pointer",
                          background: softChecked[item.id] ? "#E1F5EE88" : "transparent",
                          transition: "background 0.1s",
                        }}
                      >
                        <div
                          onClick={() => toggleSoft(item.id)}
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 5,
                            border: softChecked[item.id] ? "none" : "1.5px solid #D3D1C7",
                            background: softChecked[item.id] ? "#0F6E56" : "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            marginTop: 1,
                            transition: "all 0.15s",
                          }}
                        >
                          {softChecked[item.id] && (
                            <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                              <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <span
                          style={{
                            fontSize: 14,
                            color: softChecked[item.id] ? "#888780" : "#2C2C2A",
                            lineHeight: 1.5,
                            textDecoration: softChecked[item.id] ? "line-through" : "none",
                            textDecorationColor: "#B4B2A9",
                          }}
                        >
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* INTERVIEW TRAINER */}
        {activeModule === "interview" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0C2340", margin: "0 0 6px" }}>Тренажёр интервью</h2>
              <p style={{ color: "#888780", fontSize: 14, margin: 0 }}>Выбери тип и тренируй ответы — с разбором каждого варианта</p>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {INTERVIEW_QUESTIONS.map((block, i) => (
                <button
                  key={i}
                  onClick={() => { setInterviewTab(i); setQIndex(0); }}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 8,
                    border: interviewTab === i ? "2px solid #854F0B" : "1px solid #e5e7eb",
                    background: interviewTab === i ? "#FAEEDA" : "white",
                    color: interviewTab === i ? "#854F0B" : "#5F5E5A",
                    fontWeight: interviewTab === i ? 600 : 400,
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  {block.type}
                </button>
              ))}
            </div>

            {/* Progress */}
            <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
              {currentBlock.questions.map((_, i) => {
                const k = `${interviewTab}-${i}`;
                const isAnswered = answered[k] !== undefined;
                const isCorrect = isAnswered && currentBlock.questions[i].options[answered[k]].ok;
                return (
                  <div
                    key={i}
                    onClick={() => setQIndex(i)}
                    style={{
                      flex: 1,
                      height: 6,
                      borderRadius: 99,
                      cursor: "pointer",
                      background: !isAnswered ? "#e5e7eb" : isCorrect ? "#1D9E75" : "#D85A30",
                      transition: "background 0.2s",
                    }}
                  />
                );
              })}
            </div>

            {/* Question card */}
            <div style={{ background: "white", border: "0.5px solid #e5e7eb", borderRadius: 12, padding: "1.5rem", marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#888780", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
                Вопрос {qIndex + 1} из {currentBlock.questions.length}
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, color: "#0C2340", lineHeight: 1.4, marginBottom: 20 }}>
                {currentQ.q}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {currentQ.options.map((opt, i) => {
                  const isSelected = selected[qKey] === i;
                  const isRevealed = answered[qKey] !== undefined;
                  let bg = "white";
                  let border = "1px solid #e5e7eb";
                  let color = "#2C2C2A";
                  if (isRevealed && isSelected) {
                    bg = opt.ok ? "#E1F5EE" : "#FAECE7";
                    border = `1px solid ${opt.ok ? "#5DCAA5" : "#F0997B"}`;
                  } else if (isRevealed && opt.ok) {
                    bg = "#E1F5EE";
                    border = "1px solid #5DCAA5";
                  }

                  return (
                    <div
                      key={i}
                      onClick={() => handleAnswer(i)}
                      style={{
                        background: bg,
                        border,
                        borderRadius: 8,
                        padding: "12px 14px",
                        cursor: isRevealed ? "default" : "pointer",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => { if (!isRevealed) e.currentTarget.style.borderColor = "#B4B2A9"; }}
                      onMouseLeave={(e) => { if (!isRevealed) e.currentTarget.style.borderColor = "#e5e7eb"; }}
                    >
                      <div style={{ fontSize: 14, color, lineHeight: 1.5 }}>{opt.text}</div>
                      {isRevealed && (isSelected || opt.ok) && (
                        <div style={{ fontSize: 13, color: "#5F5E5A", marginTop: 8, lineHeight: 1.5, borderTop: "0.5px solid #e5e7eb", paddingTop: 8 }}>
                          {opt.feedback}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {answered[qKey] !== undefined && (
              <button
                onClick={nextQ}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#0C2340",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {qIndex < currentBlock.questions.length - 1 ? "Следующий вопрос →" : "Начать сначала ↺"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
