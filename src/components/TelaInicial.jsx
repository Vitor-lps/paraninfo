import { useState, useEffect, useRef } from "react";

/* ---------- estilos reutilizáveis ---------- */
const yellowBtn =
  "rounded-[10px] bg-[#f7c318] px-5 py-[15px] text-left text-[15px] font-bold leading-[1.45] text-[#16264c] " +
  "shadow-[0_12px_26px_-14px_rgba(247,195,24,0.6)] transition-all duration-200 hover:-translate-y-[2px] " +
  "hover:bg-[#ffd23f] hover:shadow-[0_18px_32px_-14px_rgba(247,195,24,0.75)] focus:outline-none " +
  "focus-visible:ring-4 focus-visible:ring-[#f7c318]/35 active:translate-y-0 active:bg-[#e7b70f]";

const label = "text-[13px] tracking-[0.04em] text-[#f0a83c]";
const body = "text-[15px] leading-[1.75] text-[#c8d6f0]";
const title = "text-[26px] font-extrabold leading-[1.2] tracking-[-0.01em] text-white";

/* ---------- botão "Não" que foge ---------- */
function DodgeNo() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [steps] = useState(10);
  const hitboxRef = useRef(null);
  const hitboxPadding = 100;

  const dodge = (event) => {
    if (!event || typeof event.clientX !== "number" || typeof event.clientY !== "number") return;

    const hitbox = hitboxRef.current;
    if (!hitbox) return;

    const parentRect = hitbox.parentElement.getBoundingClientRect();
    const rect = hitbox.getBoundingClientRect();

    const centerX = rect.left - parentRect.left + rect.width / 2;
    const centerY = rect.top - parentRect.top + rect.height / 2;
    const mouseX = event.clientX - parentRect.left;
    const mouseY = event.clientY - parentRect.top;

    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const distance = Math.hypot(dx, dy);

    if (distance > hitboxPadding) return;

    const dirX = dx / (distance || 1);
    const dirY = dy / (distance || 1);

    setPos((current) => ({
      x: current.x - dirX * steps,
      y: current.y - dirY * steps,
    }));
  };

  useEffect(() => {
    const handlePointerMove = (event) => dodge(event);
    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div
      ref={hitboxRef}
      onFocus={dodge}
      onMouseEnter={dodge}
      onTouchStart={(e) => {
        e.preventDefault();
        dodge(e.touches[0]);
      }}
      onClick={(e) => {
        e.preventDefault();
        dodge(e);
      }}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      className="absolute right-0 top-1/2 -mt-5.5 select-none bg-black/0 backdrop-blur-xl z-50 rounded-[10px] border-2 border-[#3c5488] px-6 py-2.75 transition-transform duration-200 ease-out"
    >
      <button
        type="button"
        className="select-none text-[15px] font-bold text-[#c8d6f0]  transition-transform duration-100 ease-out hover:border-[#5c7099] active:scale-95"
      >
        Não
      </button>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState("intro");
  const [msg, setMsg] = useState(null);

  // mostra a mensagem por ~1,4s e depois avança
  const go = (text, next) => {
    if (!text) return setStep(next);
    setMsg(text);
    setTimeout(() => {
      setMsg(null);
      setStep(next);
    }, 1400);
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform: translateY(18px);} to { opacity:1; transform: translateY(0);} }
        @keyframes fadeIn { from { opacity:0;} to { opacity:1;} }
        @keyframes popIn  { from { opacity:0; transform: scale(.9);} to { opacity:1; transform: scale(1);} }
      `}</style>

      <main className="flex min-h-screen w-full items-center justify-center bg-[#0f2249] px-5 py-10 font-['JetBrains_Mono',ui-monospace,monospace]">
        <section className="w-full max-w-107.5">
          {/* barra de título */}
          <div className="mb-4 flex items-center justify-between px-1" style={{ animation: "fadeIn .5s ease both" }}>
            <div className="flex items-center gap-2">
              <span className="h-2.25 w-2.25 rounded-full bg-[#5c7099]" />
              <span className="h-2.25 w-2.25 rounded-full bg-[#5c7099]" />
              <span className="h-2.25 w-2.25 rounded-full bg-[#5c7099]" />
            </div>
            {/* <span className="text-[13px] tracking-[0.02em] text-[#7288b3]">login.exe</span> */}
          </div>

          {/* cartão */}
          <div
            key={step}
            className="rounded-[18px] bg-[#1c3060] px-7 pb-9 pt-8 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.65)]"
            style={{ animation: "fadeUp .5s cubic-bezier(.22,1,.36,1) both" }}
          >
            {/* ---------- 1. ACESSO ---------- */}
            {step === "intro" && (
              <>
                <h1 className={title}>Acesso exclusivo</h1>
                <p className={`${body} mt-7`}>
                  Esta página foi feita só para uma pessoa:{" "}
                  <span className="font-bold whitespace-nowrap text-[#f0a83c]">Profa. Adilene.</span>
                </p>
                <p className={`${body} mt-6`}>Para liberar, responda 3 perguntas rápidas.</p>
                <button type="button" onClick={() => setStep("q1")} className={`${yellowBtn} mt-10 w-full py-4.5 text-center text-[16px]`}>
                  Iniciar verificação
                </button>
              </>
            )}

            {/* ---------- 2. PERGUNTA 1 ---------- */}
            {step === "q1" && (
              <>
                <p className="text-[15px] leading-[1.7] text-[#d3e0f7]">
                  Pergunta 1 de 3: o que uma turma de Técnico em Informática para Internet mais faz?
                </p>
                <div className="mt-7 flex flex-col gap-3">
                  {["Cria sites até de madrugada", "Procura o ponto e vírgula que faltou", "Pergunta “mas funciona?”"].map((o) => (
                    <button key={o} type="button" onClick={() => go("Todas as alternativas corretas!", "q2")} className={yellowBtn}>
                      {o}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* ---------- 3. PERGUNTA 2 ---------- */}
            {step === "q2" && (
              <>
                <p className="text-[15px] leading-[1.7] text-[#d3e0f7]">
                  Pergunta 2 de 3: quem é a professora mais querida da turma?
                </p>
                <div className="mt-7 flex flex-col gap-3">
                  {["Adilene", "Adilene ", "Com certeza a Adilene"].map((o, i) => (
                    <button key={i} type="button" onClick={() => go("Sempre a Adilene", "q3")} className={yellowBtn}>
                      {o.trim()}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* ---------- 4. PERGUNTA 3 ---------- */}
            {step === "q3" && (
              <>
                <p className="text-[15px] leading-[1.7] text-[#d3e0f7]">
                  Pergunta 3 de 3: pronto pra receber um comunicado importante?
                </p>
                <div className="mt-7 flex flex-col gap-3">
                  <button type="button" onClick={() => go("Vamos lá", "prank")} className={yellowBtn}>Pronto</button>
                  <button type="button" onClick={() => go("Claro que você está pronto", "prank")} className={yellowBtn}>
                    Não sei se estou pronto
                  </button>
                  <button type="button" onClick={() => go("Vamos lá", "prank")} className={yellowBtn}>Pode mandar</button>
                </div>
              </>
            )}

            {/* ---------- 5. PEGADINHA (convite falso) ---------- */}
            {step === "prank" && (
              <>
                <p className={label}>Mensagem da turma</p>
                <h1 className={`${title} mt-3`}>Professora Adilene, você aceita ser nossa paranifa?</h1>
                <p className={`${body} mt-5`}>
                  A turma de Técnico em Informática para Internet quer você ao nosso lado na formatura.
                </p>
                <div className="relative mt-9 h-23">
                  <button type="button" onClick={() => setStep("reveal")} className={`${yellowBtn} px-7 cursor-pointer py-3.25`}>
                    Sim, aceito!
                  </button>
                  <DodgeNo />
                </div>
              </>
            )}

            {/* ---------- 6. ERRO / REVELAÇÃO ---------- */}
            {step === "reveal" && (
              <>
                <p className={label}>Erro detectado no sistema...</p>
                <h1 className={`${title} mt-3`}>Pegadinha! 😄</h1>
                <p className={`${body} mt-5`}>
                  Você foi enganado. Esse convite nunca foi para a Adilene. Era só um teste da turma.
                </p>
                <button type="button" onClick={() => setStep("serious")} className={`${yellowBtn} mt-9 w-full py-4`}>
                  Continuar
                </button>
              </>
            )}

            {/* ---------- 7. AGORA É SÉRIO ---------- */}
            {step === "serious" && (
              <>
                <p className={label}>Agora é sério</p>
                <div className="mt-4 flex h-26 items-center justify-center rounded-xl border-2 border-dashed border-[#4a639a] px-5 text-center text-[13px] leading-[1.6] text-[#8fa6d1]">
                  [espaço para o vídeo ou mensagem da turma]
                </div>
                <h1 className={`${title} mt-6`}>Professor Gustavo, você aceita ser nosso paraninfo?</h1>
                <div className="relative mt-8 h-23">
                  <button type="button" onClick={() => setStep("final")} className={`${yellowBtn} px-7 py-3.25`}>
                    Sim, aceito!
                  </button>
                  <DodgeNo />
                </div>
              </>
            )}

            {/* ---------- 8. FINAL ---------- */}
            {step === "final" && (
              <>
                <h1 className={title}>Aceito! 🎉</h1>
                <p className={`${body} mt-5`}>
                  Obrigado, Gustavo. A turma já vai marcar o presente (e a foto).
                </p>
                <p className="mt-6 text-[15px] leading-[1.7] text-[#f0a83c]">Status: paraninfo confirmado.</p>
              </>
            )}
          </div>
        </section>
      </main>

      {/* ---------- OVERLAY DE MENSAGEM ---------- */}
      {msg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1a3c]/80 px-6 backdrop-blur-[3px]" style={{ animation: "fadeIn .25s ease both" }}>
          <div
            className="w-full max-w-85 rounded-2xl border border-[#2c447a] bg-[#1c3060] px-7 py-8 text-center shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)]"
            style={{ animation: "popIn .3s cubic-bezier(.22,1,.36,1) both" }}
          >
            <p className="text-[17px] font-extrabold leading-normal text-[#f0a83c]">{msg}</p>
          </div>
        </div>
      )}
    </>
  );
}