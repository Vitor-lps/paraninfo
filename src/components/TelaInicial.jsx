import { useState } from "react";

function DodgeNo() {
  const [position, setPosition] = useState(0);

  const positions = [
    "right-0 top-1/2",
    "left-0 top-0",
    "right-0 bottom-0",
    "left-1/2 bottom-0",
  ];

  function fugir() {
    setPosition((atual) => (atual + 1) % positions.length);
  }

  return (
    <button
      type="button"
      onMouseEnter={fugir}
      onFocus={fugir}
      onClick={fugir}
      className={`absolute ${positions[position]} rounded-lg border-2 border-[#3c5488] px-6 py-3 font-bold text-[#c8d6f0] transition-all duration-200`}
    >
      Não
    </button>
  );
}

export default function App() {
  const [step, setStep] = useState("intro");
  const [message, setMessage] = useState("");
  const [transitioning, setTransitioning] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  const buttonClass =
    "w-full rounded-lg bg-[#f7c318] px-5 py-4 text-left font-bold text-[#16264c] transition hover:bg-[#ffd23f] active:scale-95";

  const titleClass = "text-2xl font-extrabold text-white";
  const textClass = "mt-5 text-sm leading-7 text-[#c8d6f0]";

  function go(nextStep, text = "") {
    if (!text) {
      setStep(nextStep);
      return;
    }

    setMessage(text);

    setTimeout(() => {
      setMessage("");
      setStep(nextStep);
    }, 1400);
  }

  function revealSerious() {
    setTransitioning(true);

    setTimeout(() => {
      setStep("serious");
      setTransitioning(false);
    }, 1800);
  }

  function acceptInvite() {
    setCelebrating(true);

    setTimeout(() => {
      setCelebrating(false);
      setStep("final");
    }, 2500);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0f2249] px-5 py-10">
      <section className="w-full max-w-md">
        <div className="mb-4 flex gap-2 px-1">
          <span className="h-2 w-2 rounded-full bg-[#5c7099]" />
          <span className="h-2 w-2 rounded-full bg-[#5c7099]" />
          <span className="h-2 w-2 rounded-full bg-[#5c7099]" />
        </div>

        <div
          key={step}
          className="rounded-2xl bg-[#1c3060] px-7 py-8 shadow-xl"
        >
          {step === "intro" && (
            <>
              <h1 className={titleClass}>Acesso exclusivo</h1>

              <p className={textClass}>
                Esta página foi feita só para uma pessoa:{" "}
                <strong className="text-[#f0a83c]">Profa. Adilene.</strong>
              </p>

              <p className={textClass}>
                Para liberar, responda 3 perguntas rápidas.
              </p>

              <button
                onClick={() => setStep("q1")}
                className={`${buttonClass} mt-8 text-center`}
              >
                Iniciar verificação
              </button>
            </>
          )}

          {step === "q1" && (
            <>
              <p className="text-sm leading-7 text-[#d3e0f7]">
                Pergunta 1 de 3: o que uma turma de Técnico em Informática para
                Internet mais faz?
              </p>

              <div className="mt-7 flex flex-col gap-3">
                {[
                  "Cria sites até de madrugada",
                  "Procura o ponto e vírgula que faltou",
                  "Pergunta “mas funciona?”",
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => go("q2", "Todas as alternativas corretas!")}
                    className={buttonClass}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === "q2" && (
            <>
              <p className="text-sm leading-7 text-[#d3e0f7]">
                Pergunta 2 de 3: quem é a professora mais querida da turma?
              </p>

              <div className="mt-7 flex flex-col gap-3">
                {["Adilene", "Adilene", "Com certeza a Adilene"].map(
                  (option, index) => (
                    <button
                      key={index}
                      onClick={() => go("q3", "Sempre a Adilene")}
                      className={buttonClass}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
            </>
          )}

          {step === "q3" && (
            <>
              <p className="text-sm leading-7 text-[#d3e0f7]">
                Pergunta 3 de 3: pronto para receber um comunicado importante?
              </p>

              <div className="mt-7 flex flex-col gap-3">
                {["Pronto", "Não sei se estou pronto", "Pode mandar"].map(
                  (option) => (
                    <button
                      key={option}
                      onClick={() => go("prank", "Vamos lá!")}
                      className={buttonClass}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
            </>
          )}

          {step === "prank" && (
            <>
              <p className="text-xs tracking-widest text-[#f0a83c]">
                MENSAGEM DA TURMA
              </p>

              <h1 className={`${titleClass} mt-3`}>
                Professora Adilene, você aceita ser nossa paraninfa?
              </h1>

              <p className={textClass}>
                A turma de Técnico em Informática para Internet quer você ao
                nosso lado na formatura.
              </p>

              <div className="relative mt-9 h-24">
                <button
                  onClick={() => setStep("reveal")}
                  className="rounded-lg bg-[#f7c318] px-7 py-3 font-bold text-[#16264c] hover:bg-[#ffd23f]"
                >
                  Sim, aceito!
                </button>

                <DodgeNo />
              </div>
            </>
          )}

          {step === "reveal" && (
            <>
              <p className="text-xs text-[#f0a83c]">
                <span className="animate-pulse">●</span> Erro detectado no
                sistema...
              </p>

              <h1 className={`${titleClass} mt-3`}>Pegadinha! 😄</h1>

              <p className={textClass}>
                Você foi enganada. Esse convite nunca foi para a Adilene. Era
                só um teste da turma.
              </p>

              <button
                onClick={revealSerious}
                disabled={transitioning}
                className={`${buttonClass} mt-8`}
              >
                Continuar
              </button>
            </>
          )}

          {step === "serious" && (
            <>
              <p className="text-center text-xs font-bold tracking-widest text-[#f0a83c]">
                ✦ AGORA É SÉRIO ✦
              </p>

              <img
                src="/foto-gustavo.jpeg"
                alt="Professor Gustavo"
                className="mx-auto mt-6 h-80 w-full max-w-[260px] rounded-xl border-2 border-[#4a639a] object-contain"
              />

              <p className={`${textClass} text-center`}>
                Depois de tantas aulas, códigos, desafios e aprendizados,
                chegou a hora de fazer um convite especial...
              </p>

              <h1 className={`${titleClass} mt-6 text-center`}>
                Professor Gustavo, você aceita ser nosso paraninfo?
              </h1>

              <div className="relative mt-8 h-24">
                <button
                  onClick={acceptInvite}
                  disabled={celebrating}
                  className="rounded-lg bg-[#f7c318] px-7 py-3 font-bold text-[#16264c] hover:bg-[#ffd23f]"
                >
                  Sim, aceito!
                </button>

                <DodgeNo />
              </div>
            </>
          )}

          {step === "final" && (
            <div className="text-center">
              <div className="animate-bounce text-6xl">👑</div>

              <h1 className={`${titleClass} mt-5`}>Aceito! 🎉</h1>

              <p className={textClass}>
                Obrigado, Gustavo. A turma já vai marcar o presente (e a foto).
              </p>

              <div className="mt-8 rounded-xl border border-[#f7c318]/40 bg-[#0f2249] p-5">
                <p className="text-lg font-bold text-[#f7c318]">
                  Nosso paraninfo!
                </p>

                <p className="mt-2 text-sm text-[#c8d6f0]">
                  Uma conquista que ficará marcada na nossa história.
                </p>

                <p className="mt-4 text-3xl">🎊 🎓 🎉</p>
              </div>

              <p className="mt-6 text-sm text-[#f0a83c]">
                Status: paraninfo confirmado.
              </p>
            </div>
          )}
        </div>
      </section>

      {message && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1a3c]/80 px-6 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-[#2c447a] bg-[#1c3060] px-7 py-8 text-center shadow-xl">
            <p className="text-lg font-extrabold text-[#f0a83c]">
              {message}
            </p>
          </div>
        </div>
      )}

      {transitioning && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050b1c] px-6 text-center">
          <p className="text-sm font-bold tracking-widest text-[#f7c318]">
            SISTEMA
          </p>

          <h1 className="mt-5 animate-pulse text-3xl font-extrabold text-white">
            REINICIANDO...
          </h1>

          <p className="mt-4 text-sm text-[#8fa6d1]">
            Preparando uma surpresa especial.
          </p>

          <div className="mx-auto mt-8 h-1 w-48 overflow-hidden rounded-full bg-[#263d70]">
            <div className="h-full w-full origin-left animate-pulse rounded-full bg-[#f7c318]" />
          </div>

          <p className="mt-4 text-xs text-[#7288b3]">AGUARDE...</p>
        </div>
      )}

      {celebrating && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#07132e]/95 px-5 text-center backdrop-blur-md">
          <div className="animate-bounce text-8xl">👑</div>

          <h1 className="mt-8 text-4xl font-extrabold text-[#f7c318]">
            ELE ACEITOU!
          </h1>

          <p className="mt-5 text-lg font-bold text-white">
            Temos nosso paraninfo! 🎉
          </p>

          <p className="mt-4 text-sm leading-7 text-[#c8d6f0]">
            Professor Gustavo, essa conquista também é sua!
          </p>

          <div className="mt-8 animate-bounce text-5xl">🎊 🎉 🥳</div>

          <p className="mt-8 text-xs tracking-widest text-[#f0a83c]">
            PARANINFO CONFIRMADO
          </p>
        </div>
      )}
    </main>
  );
}
