
import { useState, useEffect, useRef } from "react";

/* =====================================================
   ESTILOS REUTILIZÁVEIS
===================================================== */

const yellowBtn =
  "rounded-[10px] bg-[#f7c318] px-5 py-[15px] text-left text-[15px] font-bold leading-[1.45] text-[#16264c] " +
  "shadow-[0_12px_26px_-14px_rgba(247,195,24,0.6)] transition-all duration-200 hover:-translate-y-[2px] " +
  "hover:bg-[#ffd23f] hover:shadow-[0_18px_32px_-14px_rgba(247,195,24,0.75)] focus:outline-none " +
  "focus-visible:ring-4 focus-visible:ring-[#f7c318]/35 active:translate-y-0 active:bg-[#e7b70f]";

const label = "text-[13px] tracking-[0.04em] text-[#f0a83c]";
const body = "text-[15px] leading-[1.75] text-[#c8d6f0]";
const title =
  "text-[26px] font-extrabold leading-[1.2] tracking-[-0.01em] text-white";

/* =====================================================
   BOTÃO NÃO QUE FOGE
===================================================== */

function DodgeNo() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const hitboxRef = useRef(null);

  const dodge = (event) => {
    if (
      !event ||
      typeof event.clientX !== "number" ||
      typeof event.clientY !== "number"
    ) return;

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

    if (distance > 100) return;

    const dirX = dx / (distance || 1);
    const dirY = dy / (distance || 1);

    setPos((current) => ({
      x: current.x - dirX * 10,
      y: current.y - dirY * 10,
    }));
  };

  useEffect(() => {
    const handlePointerMove = (event) => dodge(event);

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
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
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      }}
      className="absolute right-0 top-1/2 -mt-5.5 select-none bg-black/0 backdrop-blur-xl z-50 rounded-[10px] border-2 border-[#3c5488] px-6 py-2.75 transition-transform duration-200 ease-out"
    >
      <button
        type="button"
        className="select-none text-[15px] font-bold text-[#c8d6f0] transition-transform duration-100 ease-out"
      >
        Não
      </button>
    </div>
  );
}

/* =====================================================
   APLICAÇÃO PRINCIPAL
===================================================== */

export default function App() {
  const [step, setStep] = useState("intro");
  const [msg, setMsg] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  /* MENSAGENS DAS PERGUNTAS */

  const go = (text, next) => {
    if (!text) {
      setStep(next);
      return;
    }

    setMsg(text);

    setTimeout(() => {
      setMsg(null);
      setStep(next);
    }, 1400);
  };

  /* TRANSIÇÃO PARA O CONVITE REAL */

  const revealSerious = () => {
    if (transitioning) return;

    setTransitioning(true);

    setTimeout(() => {
      setStep("serious");
      setTransitioning(false);
    }, 1800);
  };

  /* ANIMAÇÃO DE ACEITAÇÃO */

  const acceptInvite = () => {
    if (celebrating) return;

    setCelebrating(true);

    setTimeout(() => {
      setCelebrating(false);
      setStep("final");
    }, 3500);
  };

  /* CORES DOS CONFETES */

  const confettiColors = [
    "#f7c318",
    "#ffffff",
    "#3b82f6",
    "#f97316",
    "#22c55e",
  ];

  return (
    <>
      {/* =================================================
          FONTES
      ================================================= */}

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin=""
      />

      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap"
        rel="stylesheet"
      />

      {/* =================================================
          ANIMAÇÕES CSS
      ================================================= */}

      <style>{`

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }

        @keyframes dramaticReveal {
          0% {
            opacity: 0;
            transform: scale(1.08);
            filter: blur(12px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }

        @keyframes glowTitle {
          0%, 100% {
            text-shadow: 0 0 8px rgba(247,195,24,.1);
          }
          50% {
            text-shadow: 0 0 25px rgba(247,195,24,.65);
          }
        }

        @keyframes curtain {
          0% { opacity: 0; }
          30% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }

        @keyframes textFlicker {
          0%, 100% { opacity: 1; }
          50% { opacity: .4; }
        }

        @keyframes photoReveal {
          0% {
            opacity: 0;
            transform: scale(.9) translateY(25px);
            filter: blur(12px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }

        @keyframes photoGlow {
          0%, 100% {
            box-shadow: 0 0 15px rgba(247,195,24,.15);
          }
          50% {
            box-shadow: 0 0 35px rgba(247,195,24,.4);
          }
        }

        @keyframes glitchOut {
          0% {
            transform: translate(0);
            opacity: 1;
          }
          25% {
            transform: translate(-5px, 2px);
            filter: brightness(2);
          }
          50% {
            transform: translate(5px, -2px);
            filter: hue-rotate(90deg);
          }
          100% {
            transform: scale(.92);
            opacity: 0;
            filter: blur(8px);
          }
        }

        /* CONFETES */

        @keyframes confettiFall {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(900deg);
            opacity: 0;
          }
        }

        /* ANIMAÇÃO DA COMEMORAÇÃO */

        @keyframes celebrationZoom {
          0% {
            opacity: 0;
            transform: scale(.3);
          }
          60% {
            opacity: 1;
            transform: scale(1.15);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes celebrationGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(247,195,24,.2);
          }
          50% {
            box-shadow: 0 0 70px rgba(247,195,24,.8);
          }
        }

        @keyframes finalReveal {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

      `}</style>

      {/* =================================================
          FUNDO PRINCIPAL
      ================================================= */}

      <main className="flex min-h-screen w-full items-center justify-center bg-[#0f2249] px-5 py-10 font-['JetBrains_Mono',ui-monospace,monospace]">

        <section className="w-full max-w-107.5">

          {/* BARRA SUPERIOR */}

          <div
            className="mb-4 flex items-center justify-between px-1"
            style={{ animation: "fadeIn .5s ease both" }}
          >
            <div className="flex items-center gap-2">
              <span className="h-2.25 w-2.25 rounded-full bg-[#5c7099]" />
              <span className="h-2.25 w-2.25 rounded-full bg-[#5c7099]" />
              <span className="h-2.25 w-2.25 rounded-full bg-[#5c7099]" />
            </div>
          </div>

          {/* =================================================
              CARTÃO PRINCIPAL
          ================================================= */}

          <div
            key={step}
            className="rounded-[18px] bg-[#1c3060] px-7 pb-9 pt-8 shadow-[0_28px_70px_-24px_rgba(0,0,0,0.65)]"
            style={{
              animation: "fadeUp .5s cubic-bezier(.22,1,.36,1) both",
            }}
          >

            {/* =============================================
                1. ACESSO
            ============================================= */}

            {step === "intro" && (
              <>
                <h1 className={title}>Acesso exclusivo</h1>

                <p className={`${body} mt-7`}>
                  Esta página foi feita só para uma pessoa:{" "}
                  <span className="font-bold whitespace-nowrap text-[#f0a83c]">
                    Profa. Adilene.
                  </span>
                </p>

                <p className={`${body} mt-6`}>
                  Para liberar, responda 3 perguntas rápidas.
                </p>

                <button
                  type="button"
                  onClick={() => setStep("q1")}
                  className={`${yellowBtn} mt-10 w-full py-4.5 text-center text-[16px]`}
                >
                  Iniciar verificação
                </button>
              </>
            )}

            {/* =============================================
                2. PERGUNTA 1
            ============================================= */}

            {step === "q1" && (
              <>
                <p className="text-[15px] leading-[1.7] text-[#d3e0f7]">
                  Pergunta 1 de 3: o que uma turma de Técnico em Informática para Internet mais faz?
                </p>

                <div className="mt-7 flex flex-col gap-3">
                  {[
                    "Cria sites até de madrugada",
                    "Procura o ponto e vírgula que faltou",
                    "Pergunta “mas funciona?”",
                  ].map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() =>
                        go("Todas as alternativas corretas!", "q2")
                      }
                      className={yellowBtn}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* =============================================
                3. PERGUNTA 2
            ============================================= */}

            {step === "q2" && (
              <>
                <p className="text-[15px] leading-[1.7] text-[#d3e0f7]">
                  Pergunta 2 de 3: quem é a professora mais querida da turma?
                </p>

                <div className="mt-7 flex flex-col gap-3">
                  {[
                    "Adilene",
                    "Adilene ",
                    "Com certeza a Adilene",
                  ].map((o, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => go("Sempre a Adilene", "q3")}
                      className={yellowBtn}
                    >
                      {o.trim()}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* =============================================
                4. PERGUNTA 3
            ============================================= */}

            {step === "q3" && (
              <>
                <p className="text-[15px] leading-[1.7] text-[#d3e0f7]">
                  Pergunta 3 de 3: pronto pra receber um comunicado importante?
                </p>

                <div className="mt-7 flex flex-col gap-3">

                  <button
                    type="button"
                    onClick={() => go("Vamos lá", "prank")}
                    className={yellowBtn}
                  >
                    Pronto
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      go("Claro que você está pronto", "prank")
                    }
                    className={yellowBtn}
                  >
                    Não sei se estou pronto
                  </button>

                  <button
                    type="button"
                    onClick={() => go("Vamos lá", "prank")}
                    className={yellowBtn}
                  >
                    Pode mandar
                  </button>

                </div>
              </>
            )}

            {/* =============================================
                5. PEGADINHA
            ============================================= */}

            {step === "prank" && (
              <>
                <p className={label}>Mensagem da turma</p>

                <h1 className={`${title} mt-3`}>
                  Professora Adilene, você aceita ser nossa paraninfa?
                </h1>

                <p className={`${body} mt-5`}>
                  A turma de Técnico em Informática para Internet quer você ao nosso lado na formatura.
                </p>

                <div className="relative mt-9 h-23">

                  <button
                    type="button"
                    onClick={() => setStep("reveal")}
                    className={`${yellowBtn} cursor-pointer px-7 py-3.25`}
                  >
                    Sim, aceito!
                  </button>

                  <DodgeNo />

                </div>
              </>
            )}

            {/* =============================================
                6. ERRO / REVELAÇÃO
            ============================================= */}

            {step === "reveal" && (
              <>
                <p className={label}>
                  <span className="inline-block animate-pulse">●</span>{" "}
                  Erro detectado no sistema...
                </p>

                <h1 className={`${title} mt-3`}>
                  Pegadinha! 😄
                </h1>

                <p className={`${body} mt-5`}>
                  Você foi enganado. Esse convite nunca foi para a Adilene. Era só um teste da turma.
                </p>

                <button
                  type="button"
                  onClick={revealSerious}
                  disabled={transitioning}
                  className={`${yellowBtn} mt-9 w-full py-4`}
                >
                  Continuar
                </button>
              </>
            )}

            {/* =============================================
                7. AGORA É SÉRIO
            ============================================= */}

            {step === "serious" && (
              <>

                {/* TÍTULO */}

                <p
                  className="text-center text-[13px] font-bold tracking-[0.35em] text-[#f0a83c]"
                  style={{
                    animation: "dramaticReveal 1s ease both",
                  }}
                >
                  ✦ AGORA É SÉRIO ✦
                </p>

                {/* FOTO DO PROFESSOR */}

                {/* FOTO DO PROFESSOR */}

                <div
                  className="mx-auto mt-6 w-full max-w-[260px] overflow-hidden rounded-xl border-2 border-[#4a639a] bg-[#0f2249] shadow-[0_0_25px_rgba(247,195,24,0.2)]"
                  style={{
                    height: "320px",
                    animation:
                      "photoReveal 1.2s cubic-bezier(.22,1,.36,1) both, photoGlow 3s ease-in-out 1.5s infinite",
                  }}
                >
                  <img
                    src="/foto-gustavo.jpeg"
                    alt="Professor Gustavo, nosso futuro paraninfo"
                    className="h-full w-full object-contain object-center"
                  />
                </div>

                {/* MENSAGEM */}

                <p
                  className={`${body} mt-5 text-center`}
                  style={{
                    animation: "dramaticReveal 1s ease both",
                    animationDelay: ".5s",
                    animationFillMode: "both",
                  }}
                >
                  Depois de tantas aulas, códigos, desafios e aprendizados, chegou a hora de fazer um convite especial...
                </p>

                {/* CONVITE */}

                <h1
                  className={`${title} mt-6 text-center`}
                  style={{
                    animation:
                      "dramaticReveal 1.2s ease both, glowTitle 3s ease-in-out 1.5s infinite",
                    animationDelay: ".7s",
                    animationFillMode: "both",
                  }}
                >
                  Professor Gustavo, você aceita ser nosso paraninfo?
                </h1>

                {/* BOTÕES */}

                <div
                  className="relative mt-8 h-23"
                  style={{
                    animation: "fadeUp .8s ease both",
                    animationDelay: "1s",
                    animationFillMode: "both",
                  }}
                >

                  <button
                    type="button"
                    onClick={acceptInvite}
                    disabled={celebrating}
                    className={`${yellowBtn} px-7 py-3.25`}
                  >
                    Sim, aceito!
                  </button>

                  <DodgeNo />

                </div>

              </>
            )}

            {/* =============================================
                8. FINAL
            ============================================= */}

            {step === "final" && (
              <div
                className="text-center"
                style={{
                  animation: "finalReveal 1s ease both",
                }}
              >
                <div className="text-6xl">
                  👑
                </div>

                <h1 className={`${title} mt-5`}>
                  Aceito! 🎉
                </h1>

                <p className={`${body} mt-5`}>
                  Obrigado, Gustavo. A turma já vai marcar o presente (e a foto).
                </p>

                <div className="mt-8 rounded-xl border border-[#f7c318]/40 bg-[#0f2249] p-5">
                  <p className="text-lg font-bold text-[#f7c318]">
                    Nosso paraninfo!
                  </p>

                  <p className="mt-2 text-sm text-[#c8d6f0]">
                    Uma conquista que ficará marcada na nossa história.
                  </p>

                  <p className="mt-4 text-3xl">
                    🎊 🎓 🎉
                  </p>
                </div>

                <p className="mt-6 text-[15px] leading-[1.7] text-[#f0a83c]">
                  Status: paraninfo confirmado.
                </p>
              </div>
            )}

          </div>
        </section>
      </main>

      {/* =================================================
          OVERLAY DE MENSAGENS
      ================================================= */}

      {msg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1a3c]/80 px-6 backdrop-blur-[3px]"
          style={{
            animation: "fadeIn .25s ease both",
          }}
        >
          <div
            className="w-full max-w-85 rounded-2xl border border-[#2c447a] bg-[#1c3060] px-7 py-8 text-center shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)]"
            style={{
              animation: "popIn .3s cubic-bezier(.22,1,.36,1) both",
            }}
          >
            <p className="text-[17px] font-extrabold leading-normal text-[#f0a83c]">
              {msg}
            </p>
          </div>
        </div>
      )}

      {/* =================================================
          TRANSIÇÃO: PEGADINHA → AGORA É SÉRIO
      ================================================= */}

      {transitioning && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#050b1c]">

          {/* INTERFERÊNCIA */}

          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, #6385c9 4px)",
            }}
          />

          {/* LINHA DE LEITURA */}

          <div
            className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-[#f7c318]/20 to-transparent"
            style={{
              animation: "scanline 1.2s linear infinite",
            }}
          />

          {/* GLITCH */}

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 48%, rgba(247,195,24,.08) 50%, transparent 52%)",
              animation: "glitchOut 1.8s ease both",
            }}
          />

          {/* CONTEÚDO */}

          <div
            className="relative z-10 px-6 text-center"
            style={{
              animation: "dramaticReveal .5s ease both",
            }}
          >
            <p className="text-sm font-bold tracking-[.35em] text-[#f7c318]">
              SISTEMA
            </p>

            <h1
              className="mt-5 text-3xl font-extrabold text-white"
              style={{
                animation: "textFlicker .3s ease-in-out 3",
              }}
            >
              REINICIANDO...
            </h1>

            <p className="mt-4 text-sm text-[#8fa6d1]">
              Preparando uma surpresa especial.
            </p>

            {/* BARRA DE PROGRESSO */}

            <div className="mx-auto mt-8 h-1 w-48 overflow-hidden rounded-full bg-[#263d70]">
              <div
                className="h-full rounded-full bg-[#f7c318]"
                style={{
                  animation: "progressBar 1.5s ease-in-out forwards",
                }}
              />
            </div>

            <p className="mt-4 text-[10px] tracking-[.2em] text-[#7288b3]">
              AGUARDE...
            </p>
          </div>

          {/* CLARÃO FINAL */}

          <div
            className="pointer-events-none absolute inset-0 bg-white"
            style={{
              animation: "curtain 1.8s ease-in-out forwards",
            }}
          />

        </div>
      )}

      {/* =================================================
          COMEMORAÇÃO: ELE ACEITOU!
      ================================================= */}

      {celebrating && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#07132e]/95 px-5 backdrop-blur-md">

          {/* CHUVA DE CONFETES */}

          {Array.from({ length: 70 }).map((_, i) => (
            <div
              key={i}
              className="pointer-events-none absolute top-0 h-3 w-2 rounded-sm"
              style={{
                left: `${(i * 37) % 100}%`,
                backgroundColor: confettiColors[i % 5],
                animation: `confettiFall ${2 + (i % 4) * 0.4
                  }s linear ${(i % 10) * 0.15}s infinite`,
              }}
            />
          ))}

          {/* CONTEÚDO CENTRAL */}

          <div
            className="relative z-10 text-center"
            style={{
              animation:
                "celebrationZoom .8s cubic-bezier(.22,1,.36,1) both",
            }}
          >

            {/* COROA */}

            <div
              className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#f7c318] bg-[#1c3060] text-6xl"
              style={{
                animation: "celebrationGlow 1.5s ease-in-out infinite",
              }}
            >
              👑
            </div>

            {/* TÍTULO */}

            <h1 className="mt-8 text-4xl font-extrabold text-[#f7c318]">
              ELE ACEITOU!
            </h1>

            {/* MENSAGEM */}

            <p className="mt-5 text-lg font-bold text-white">
              Temos nosso paraninfo! 🎉
            </p>

            <p className="mt-4 text-sm leading-7 text-[#c8d6f0]">
              Professor Gustavo, essa conquista
              <br />
              também é sua!
            </p>

            {/* EMOJIS */}

            <div className="mt-8 text-5xl">
              🎊 🎉 🥳
            </div>

            {/* STATUS */}

            <p className="mt-8 text-xs tracking-[.3em] text-[#f0a83c]">
              PARANINFO CONFIRMADO
            </p>

          </div>
        </div>
      )}

    </>
  );
}
