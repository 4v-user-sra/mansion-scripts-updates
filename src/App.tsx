import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const noiseUrl = "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E";

const FunnelStep = ({ num, name, criteria }: { num: number, name: string, criteria: { entrada: string, avanco: string, descarte: string, info?: string, callout?: { value: string, text: string } } }) => {
  const [isOpen, setIsOpen] = useState(num === 1);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-warm-white border border-border-theme rounded-2xl overflow-hidden mt-0.5"
    >
      <div 
        className="flex items-center gap-4 p-5 md:px-6 cursor-pointer transition-colors hover:bg-gold/5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-8 rounded-full bg-espresso text-gold flex items-center justify-center text-xs font-serif shrink-0">
          {num}
        </div>
        <span className="text-[15px] font-medium flex-1 text-espresso">{name}</span>
        <span className={`text-gold text-lg transition-transform duration-300 select-none ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </div>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 md:px-6 pb-6 border-t border-border-theme/50 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-cream rounded-xl p-4 border border-border-theme">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-sage mb-2 font-medium">Critério de Entrada</p>
                  <p className="text-[13px] leading-[1.6] text-text-main mb-0">{criteria.entrada}</p>
                </div>
                <div className="bg-cream rounded-xl p-4 border border-border-theme">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[#7B6B2A] mb-2 font-medium">Critério de Avanço</p>
                  <p className="text-[13px] leading-[1.6] text-text-main mb-0">{criteria.avanco}</p>
                </div>
                <div className="bg-cream rounded-xl p-4 border border-border-theme">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[#9B3A2A] mb-2 font-medium">Critério de Descarte</p>
                  <p className="text-[13px] leading-[1.6] text-text-main mb-0">{criteria.descarte}</p>
                </div>
              </div>
              {criteria.info && (
                <div className="mt-4 bg-gold/5 border border-gold/20 rounded-xl p-5 text-[13px] leading-[1.7] text-text-muted">
                  <span dangerouslySetInnerHTML={{ __html: criteria.info }} />
                </div>
              )}
              {criteria.callout && (
                <div className="mt-4 inline-block bg-gold/10 border border-gold/30 rounded-lg py-4 px-6 text-[13px] leading-[1.7] text-text-muted">
                  <strong className="font-serif text-4xl text-gold block font-light leading-none mb-1">{criteria.callout.value}</strong>
                  {criteria.callout.text}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MsgTemplate = ({ label, tag, body, note }: { label: string, tag: string, body: string, note: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className="bg-warm-white border border-border-theme rounded-2xl overflow-hidden mb-5"
  >
    <div className="bg-espresso px-5 py-3.5 flex justify-between items-center">
      <span className="text-[11px] tracking-[0.15em] uppercase text-gold font-medium">{label}</span>
      <span className="text-[10px] px-2.5 py-[3px] rounded-full border border-gold/30 text-gold/70">{tag}</span>
    </div>
    <div className="p-6 text-[14px] leading-[1.8] text-text-main whitespace-pre-wrap italic border-l-4 border-gold-light mx-5 mb-5 mt-5 bg-cream rounded-r-lg">
      {body}
    </div>
    <div className="px-5 pb-4 text-[12px] text-text-muted">
      {note}
    </div>
  </motion.div>
);

const ObjectionCard = ({ q, script, why }: { q: string, script: string, why: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className="bg-warm-white border border-border-theme rounded-2xl overflow-hidden"
  >
    <div className="bg-gold/10 px-6 py-4 text-[18px] text-espresso italic font-serif border-l-4 border-gold">
      {q}
    </div>
    <div className="p-6">
      <p className="text-[10px] tracking-[0.15em] uppercase text-sage mb-2.5 font-medium">Script de Resposta</p>
      <div className="text-[14px] leading-[1.7] text-text-main bg-cream p-4 rounded-xl mb-3 border-l-2 border-gold-light italic whitespace-pre-wrap">
        {script}
      </div>
      <p className="text-[12px] text-text-muted leading-[1.6]" dangerouslySetInnerHTML={{ __html: why }} />
    </div>
  </motion.div>
);

export default function App() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-cream text-text-main font-sans font-light relative pb-20">
      <div 
        className="fixed inset-0 pointer-events-none z-[999] opacity-40 mix-blend-overlay"
        style={{ backgroundImage: `url("${noiseUrl}")` }}
      />
      
      {/* COVER */}
      <div className="min-h-screen bg-espresso flex flex-col justify-center items-center text-center py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 -translate-y-1/2 left-[30%] -translate-x-1/2 w-[120vw] h-[120vw] max-w-[800px] max-h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.12)_0%,transparent_60%)]"></div>
          <div className="absolute top-1/2 -translate-y-1/2 right-1/4 translate-x-1/4 w-[100vw] h-[100vw] max-w-[700px] max-h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(61,31,20,0.6)_0%,transparent_70%)]"></div>
        </div>
        
        <div className="relative z-10 max-w-[700px]">
          <span className="inline-block border border-gold/40 text-gold text-[10px] tracking-[0.25em] uppercase px-4 md:px-5 py-1.5 rounded-full mb-12">
            Documento Confidencial — Uso Interno
          </span>
          <h1 className="font-serif font-light text-[clamp(52px,8vw,96px)] leading-none text-cream tracking-[-0.02em] mb-2">
            Playbook<br/><em className="text-gold italic">Comercial</em>
          </h1>
          <p className="font-serif text-[22px] text-warm-white/50 font-light tracking-[0.04em] mb-16">
            Mansão Marion · Jornada Completa do Cliente
          </p>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-center">
            <div className="text-center">
              <span className="text-[10px] tracking-[0.2em] uppercase text-gold/60 block mb-1">Versão</span>
              <span className="text-[14px] text-warm-white/70 font-light">1.0 — 2025</span>
            </div>
            <div className="hidden md:block w-px h-10 bg-gold/30"></div>
            <div className="text-center">
              <span className="text-[10px] tracking-[0.2em] uppercase text-gold/60 block mb-1">Público</span>
              <span className="text-[14px] text-warm-white/70 font-light">Agência · Time de IA · Stakeholder</span>
            </div>
            <div className="hidden md:block w-px h-10 bg-gold/30"></div>
            <div className="text-center">
              <span className="text-[10px] tracking-[0.2em] uppercase text-gold/60 block mb-1">Escopo</span>
              <span className="text-[14px] text-warm-white/70 font-light">Instagram → Contrato Assinado</span>
            </div>
          </div>
        </div>
      </div>

      {/* TOC */}
      <div className="bg-espresso py-16 md:py-20 px-6 md:px-10 border-t border-gold/15">
        <div className="max-w-[800px] mx-auto">
          <p className="font-serif text-[13px] tracking-[0.2em] uppercase text-gold mb-10">Índice do Documento</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
            {[
              "Etapas do Funil Comercial",
              "Script da IA SDR",
              "Cadência de Follow-up",
              "Scripts de Mensagem",
              "Tratamento de Objeções",
              "Diagnóstico do Gargalo Atual",
              "Visão de Futuro: Nova Jornada"
            ].map((title, i) => (
              <div 
                key={i} 
                onClick={() => scrollTo(`sec${i+1}`)}
                className="flex items-baseline gap-4 py-3.5 border-t border-gold/10 cursor-pointer group transition-all"
              >
                <span className="font-serif text-[12px] text-gold/40 min-w-[24px]">0{i+1}</span>
                <span className="text-[13px] text-warm-white/60 group-hover:text-gold transition-colors">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 md:px-10">
        
        {/* SECTION 1 */}
        <motion.div 
          id="sec1" 
          className="py-20 md:py-[100px] border-b border-border-theme"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row md:items-baseline gap-0 md:gap-5 mb-12">
            <span className="font-serif text-5xl md:text-[72px] text-gold/15 leading-none font-light shrink-0 md:-mt-3">01</span>
            <div className="flex-1">
              <span className="text-[10px] tracking-[0.25em] uppercase text-gold block mb-2 font-normal mt-2 md:mt-0">Funil Comercial</span>
              <h2 className="font-serif text-[clamp(30px,4vw,44px)] font-light leading-[1.15] text-espresso tracking-[-0.01em]">
                Etapas do<br/>Funil Comercial
              </h2>
            </div>
          </div>
          
          <p className="text-[16px] text-text-muted leading-[1.8] mb-12 pl-5 md:pl-[92px] border-l-2 border-gold-light italic">
            O funil comercial é o contrato operacional de todo o time. Sem critérios claros de entrada, avanço e descarte por etapa, o CRM vira um repositório de leads esquecidos.
          </p>

          <div className="flex flex-col gap-[2px]">
            <FunnelStep 
              num={1} name="Lead Gerado" 
              criteria={{
                entrada: "Lead enviou mensagem no WhatsApp a partir de um anúncio.",
                avanco: "IA SDR iniciou conversa de qualificação e o lead respondeu.",
                descarte: "Não responde à mensagem inicial da IA em até 48h."
              }} 
            />
            <FunnelStep 
              num={2} name="Qualificação IA SDR" 
              criteria={{
                entrada: "Lead respondeu à IA.",
                avanco: "Lead forneceu todos os dados base NOME, TIPO, DATA, CONVIDADOS e LOCAL.",
                descarte: "Objeção intransponível de localização ou evento com menos de 50 pessoas.",
                info: "<strong>Taxa atual:</strong> 43% dos leads passam pela qualificação da IA."
              }} 
            />
            <FunnelStep 
              num={3} name="Atribuído ao Time Humano" 
              criteria={{
                entrada: "Lead passou pelos critérios da IA. Dados completos transferidos.",
                avanco: "Consultor humano faz 1º contato, gera valor e envia o orçamento em até 2h úteis.",
                descarte: "Lead não responde em 3 tentativas de contato em 48h.",
                info: "<strong>Contato e Orçamento:</strong> O consultor humano agora é o ÚNICO responsável por apresentar o orçamento (a IA não envia mais orçamentos). O consultor deve revisar as infos coletadas antes de contatar e introduzir a proposta de forma consultiva."
              }} 
            />
            <FunnelStep 
              num={4} name="Orçamento Enviado" 
              criteria={{
                entrada: "Consultor humano (vendedor) envia o orçamento após se apresentar e puxar assunto via WhatsApp.",
                avanco: "Lead confirma recebimento ou demonstra interesse explícito.",
                descarte: "Não retorno após a estrutura completa do follow up programado.",
                callout: { value: "134/220", text: "leads travados aqui. O maior foco agora será o vendedor garantir que o envio do orçamento venha em conjunto com proatividade no Follow-up, não usando mais os envios maciços e sem contato da IA." }
              }} 
            />
            <FunnelStep 
              num={5} name="Follow-up Ativo" 
              criteria={{
                entrada: "Orçamento enviado há mais de 8h sem confirmação.",
                avanco: "Lead responde e demonstra interesse em visitar o salão.",
                descarte: "Cadência de 5 contatos concluída sem nenhuma resposta."
              }} 
            />
            <FunnelStep 
              num={6} name="Visita Agendada" 
              criteria={{
                entrada: "Lead confirmou data e horário para visita presencial.",
                avanco: "Lead comparece à visita.",
                descarte: "Lead não comparece (No-show) e não reagenda em 48h."
              }} 
            />
            <FunnelStep 
              num={7} name="Visita Realizada" 
              criteria={{
                entrada: "Lead visitou o salão com o consultor.",
                avanco: "Lead saiu com interesse declarado e pede proposta/contrato.",
                descarte: "Lead expressou descarte claro durante/após visita.",
                info: "<strong>Regra pós-visita:</strong> Mensagem de agradecimento enviada em até 2h após a visita aumenta conversão significativamente."
              }} 
            />
             <FunnelStep 
              num={8} name="Proposta Final" 
              criteria={{
                entrada: "Lead visitou e pediu proposta revisada, desconto, etc.",
                avanco: "Lead aprova a proposta final e solicita o contrato.",
                descarte: "Lead rejeita proposta final mesmo com concessões."
              }} 
            />
             <FunnelStep 
              num={9} name="Fechamento" 
              criteria={{
                entrada: "Lead aprovou proposta. Contrato enviado.",
                avanco: "Contrato assinado + sinal pago.",
                descarte: "Contrato enviado há 5 dias sem assinatura."
              }} 
            />
          </div>
        </motion.div>

        {/* SECTION 2 */}
        <motion.div 
          id="sec2" 
          className="py-20 md:py-[100px] border-b border-border-theme"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row md:items-baseline gap-0 md:gap-5 mb-12">
            <span className="font-serif text-5xl md:text-[72px] text-gold/15 leading-none font-light shrink-0 md:-mt-3">02</span>
            <div className="flex-1">
              <span className="text-[10px] tracking-[0.25em] uppercase text-gold block mb-2 font-normal mt-2 md:mt-0">IA SDR</span>
              <h2 className="font-serif text-[clamp(30px,4vw,44px)] font-light leading-[1.15] text-espresso tracking-[-0.01em]">
                Script da<br/>IA SDR
              </h2>
            </div>
          </div>
          
          <p className="text-[16px] text-text-muted leading-[1.8] mb-12 pl-5 md:pl-[92px] border-l-2 border-gold-light italic">
            A IA SDR é a primeira impressão da Mansão Marion. Ela precisa ser acolhedora sem ser excessiva, coletar dados sem parecer interrogatório, e filtrar sem ser rude.
          </p>

          <div className="bg-gold/10 border border-gold/30 rounded-2xl p-6 md:p-8 mb-10">
            <h4 className="font-serif text-[22px] text-espresso font-normal mb-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-gold" />
              Mudanças de Configuração da IA
            </h4>
            <ul className="text-[13px] text-text-main leading-[1.8] space-y-3">
              <li className="flex gap-2"><span className="text-gold mt-1">•</span> <span><strong>Fim do envio de orçamento pela IA:</strong> A IA <strong>NÃO</strong> enviará mais nenhum orçamento, nem mesmo pacotes ou PDFs. O envio do orçamento agora é <strong>responsabilidade total e exclusiva do consultor humano (vendedor)</strong>, garantindo um contato consultivo e persuasivo logo no início.</span></li>
              <li className="flex gap-2"><span className="text-gold mt-1">•</span> <span><strong>Redução do volume de texto:</strong> As mensagens serão encurtadas para o essencial (cerca de 1/3 do tamanho original) para não sobrecarregar o cliente, principalmente no celular.</span></li>
              <li className="flex gap-2"><span className="text-gold mt-1">•</span> <span><strong>Tags de rastreio automático no Kommo:</strong> A IA irá aplicar tagueamento (Ex: Meta, Google) automaticamente com base na frase inicial padrão configurada nas campanhas de tráfego.</span></li>
            </ul>
          </div>

          <table className="w-full mt-8 border-collapse text-[13px] rounded-2xl overflow-hidden border-hidden shadow-[0_0_0_1px_rgba(201,169,110,0.2)]">
            <thead>
              <tr className="bg-espresso text-gold uppercase tracking-[0.15em] text-[10px] font-medium text-left">
                <th className="p-4">Variável</th>
                <th className="p-4">Aprovado ✓</th>
                <th className="p-4">Reprovado ✗</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-theme bg-warm-white">
                <td className="p-4 font-medium text-espresso">Localização</td>
                <td className="p-4 text-text-main">Zona Norte, Centro, Leste e outras (se disposto a deslocar)</td>
                <td className="p-4 text-text-main">Zona Sul/Interior com objeção não superada</td>
              </tr>
              <tr className="border-b border-border-theme bg-warm-white">
                <td className="p-4 font-medium text-espresso">Convidados</td>
                <td className="p-4 text-text-main">50 a 300 pessoas</td>
                <td className="p-4 text-text-main">Abaixo de 50</td>
              </tr>
              <tr className="bg-warm-white">
                <td className="p-4 font-medium text-espresso">Engajamento</td>
                <td className="p-4 text-text-main">Responde ao menos 2 perguntas</td>
                <td className="p-4 text-text-main">Responde apenas com "oi" e some</td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        {/* SECTION 3 / Cadence */}
        <motion.div 
          id="sec3" 
          className="py-20 md:py-[100px] border-b border-border-theme"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row md:items-baseline gap-0 md:gap-5 mb-12">
            <span className="font-serif text-5xl md:text-[72px] text-gold/15 leading-none font-light shrink-0 md:-mt-3">03</span>
            <div className="flex-1">
              <span className="text-[10px] tracking-[0.25em] uppercase text-gold block mb-2 font-normal mt-2 md:mt-0">Protocolo Comercial</span>
              <h2 className="font-serif text-[clamp(30px,4vw,44px)] font-light leading-[1.15] text-espresso tracking-[-0.01em]">
                Cadência de<br/>Follow-up
              </h2>
            </div>
          </div>
          
          <p className="text-[16px] text-text-muted leading-[1.8] mb-12 pl-5 md:pl-[92px] border-l-2 border-gold-light italic">
            O problema não é a falta de interesse do lead — é o silêncio do time. Cada dia sem contato estruturado é um dia em que o concorrente pode fechar.
          </p>

          <div className="flex flex-col gap-0">
            {[
              { time: "T0", label: "Envio do orçamento", title: "Envio do Orçamento + Confirmação", desc: "Momento do envio: mensagem de abertura personalizada com link do orçamento. WhatsApp / Tom Caloroso" },
              { time: "8h", label: "8 horas depois", title: "Primeiro Follow-up — Checagem Leve", desc: "Verificação leve se o orçamento chegou bem. Tom prestativo, sem pressão. 'Conseguiu ver?'" },
              { time: "24h", label: "24 horas depois", title: "Segundo Follow-up — Valor + Visita", desc: "Apresentar um elemento de valor (foto, detalhe) e sugerir a visita presencial." },
              { time: "48h", label: "48 horas depois", title: "Terceiro Follow-up — Ligação/Áudio", desc: "Ligar pelo WhatsApp. Se não atender, deixar áudio curto perguntando se fez sentido." },
              { time: "+3d", label: "3 dias depois", title: "Quarto Follow-up — Escassez Real", desc: "Mensagem com elemento de escassez legítima (datas se limitando)." },
              { time: "+5d", label: "5 dias depois", title: "Quinto Follow-up — Encerramento Elegante", desc: "Tom de encerramento maduro. Muitos respondem justamente por isso. Deixar porta aberta." }
            ].map((c, i, arr) => (
              <motion.div 
                key={i} 
                className="grid grid-cols-[80px_1fr] md:grid-cols-[100px_1fr] gap-4 md:gap-6 relative pb-10 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              >
                {i !== arr.length - 1 && <div className="absolute left-[40px] md:left-[50px] top-[40px] md:bottom-0 w-px bg-gradient-to-b from-gold-light to-transparent"></div>}
                
                <div className="text-center pt-2 relative z-10 bg-cream">
                  <div className="w-10 h-10 rounded-full bg-warm-white border-2 border-gold flex items-center justify-center mx-auto mb-2 font-serif text-[14px] text-gold font-medium">
                    {c.time}
                  </div>
                  <span className="text-[11px] text-text-muted text-center leading-[1.3] block">
                    {c.label}
                  </span>
                </div>

                <div className="bg-warm-white border border-border-theme rounded-2xl p-5 md:p-6 shadow-sm">
                  <h4 className="font-serif text-[20px] font-normal text-espresso mb-2">{c.title}</h4>
                  <p className="text-[13px] text-text-muted mb-0 leading-[1.7]">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 bg-gold/5 border border-gold/20 rounded-xl p-6 text-[13px] text-text-muted leading-[1.7]">
            <strong>Regra de ouro do follow-up:</strong> Cada mensagem deve parecer a primeira e única mensagem daquele consultor. Nunca mencionar "já tentei te contatar X vezes".
          </div>
        </motion.div>

        {/* SECTION 4 */}
        <motion.div 
          id="sec4" 
          className="py-20 md:py-[100px] border-b border-border-theme"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row md:items-baseline gap-0 md:gap-5 mb-12">
            <span className="font-serif text-5xl md:text-[72px] text-gold/15 leading-none font-light shrink-0 md:-mt-3">04</span>
            <div className="flex-1">
              <span className="text-[10px] tracking-[0.25em] uppercase text-gold block mb-2 font-normal mt-2 md:mt-0">Mensagens Prontas</span>
              <h2 className="font-serif text-[clamp(30px,4vw,44px)] font-light leading-[1.15] text-espresso tracking-[-0.01em]">
                Scripts de<br/>Mensagem
              </h2>
            </div>
          </div>
          
          <h4 className="font-serif text-[22px] text-espresso font-normal mt-10 mb-6 pb-2 border-b border-border-theme">T0 — Envio do Orçamento</h4>
          <MsgTemplate 
            label="T0 · Casamento" tag="Envio do Orçamento"
            body={`Boa tarde, [Nome]! 💐 Sou [Seu Nome], consultor da Mansão Marion.

Que alegria poder acompanhar vocês nessa etapa tão especial! Aqui está o orçamento personalizado para o casamento de vocês em [mês/ano]:

🔗 [link]

Qualquer dúvida, me fala por aqui!`}
            note="Personalizar: nome do consultor, mês/ano, número de convidados."
          />
           <MsgTemplate 
            label="T0 · Debutante" tag="Envio do Orçamento"
            body={`Boa tarde, [Nome]! ✨ Sou [Seu Nome], da Mansão Marion.

Que momento lindo! Os 15 anos merecem uma festa à altura. Segue o orçamento:

🔗 [link]`}
            note="Usar o nome da debutante se fornecido."
          />

          <h4 className="font-serif text-[22px] text-espresso font-normal mt-10 mb-6 pb-2 border-b border-border-theme">8h — Checagem de Recebimento</h4>
           <MsgTemplate 
            label="8h · Todos os Eventos" tag="Primeiro Follow-up"
            body={`Oi, [Nome]! 👋 Tudo bem?

Queria só confirmar que o orçamento chegou direitinho para você. Às vezes o link demora um pouco para carregar. Qualquer dúvida, estou aqui! 😊`}
            note="Simples e não pressionado."
          />

          <h4 className="font-serif text-[22px] text-espresso font-normal mt-10 mb-6 pb-2 border-b border-border-theme">24h — Valor + Convite para Visita</h4>
          <MsgTemplate 
            label="24h · Casamento" tag="Segundo Follow-up"
            body={`Oi, [Nome]!

Pensando aqui no casamento em [mês] — o detalhe que muitas noivas comentam pós-visita é a iluminação incrivel do salão à noite.
Que tal a gente marcar uma visita sem compromisso? Você conhece o espaço pessoalmente.`}
            note="Criar antecipação pela visita."
          />

           <h4 className="font-serif text-[22px] text-espresso font-normal mt-10 mb-6 pb-2 border-b border-border-theme">Encerramento Elegante da Cadência</h4>
          <MsgTemplate 
            label="+5d · Todos os Eventos" tag="Último Follow-up"
            body={`Oi, [Nome]. Tudo bem?

Imagino que você está num momento de muitas decisões — planejar um [evento] envolve muita coisa. Vou deixar nossa conversa em aberto.
Se quiser conversar sobre as opções ou tiver dúvidas sobre o orçamento, me chama! Boa sorte com os planos!`}
            note="Muitos respondem justamente aqui por não querer encerrar de forma abrupta."
          />
           <MsgTemplate 
            label="Pós-Visita" tag="Agradecimento"
            body={`Oi, [Nome]! Foi uma alegria conhecer vocês hoje! 💛

Espero que tenham saído com boa impressão. Qualquer ajuste no orçamento que queiram, me falem!`}
            note="Enviar em até 2h após a visita."
          />
        </motion.div>

        {/* SECTION 5 */}
        <motion.div 
          id="sec5" 
          className="py-20 md:py-[100px] border-b border-border-theme"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row md:items-baseline gap-0 md:gap-5 mb-12">
            <span className="font-serif text-5xl md:text-[72px] text-gold/15 leading-none font-light shrink-0 md:-mt-3">05</span>
            <div className="flex-1">
              <span className="text-[10px] tracking-[0.25em] uppercase text-gold block mb-2 font-normal mt-2 md:mt-0">Gestão de Objeções</span>
              <h2 className="font-serif text-[clamp(30px,4vw,44px)] font-light leading-[1.15] text-espresso tracking-[-0.01em]">
                Tratamento<br/>de Objeções
              </h2>
            </div>
          </div>
          
          <p className="text-[16px] text-text-muted leading-[1.8] mb-12 pl-5 md:pl-[92px] border-l-2 border-gold-light italic">
            Objeção não é rejeição — é pedido de informação disfarçado de resistência. O script foi construído em três camadas: validar, reposicionar e propor um próximo passo leve.
          </p>

          <div className="flex flex-col gap-6">
            <ObjectionCard 
              q='"Fica longe para mim / meus convidados…"'
              script={`Faz todo o sentido você pensar nisso — é um detalhe importante! O que muitos dos nossos clientes comentam depois é que o fator deslocamento pesou menos do que esperavam, porque o resultado compensou muito.

Que tal a gente marcar uma visita rápida pra você conhecer e decidir com mais informação?`}
              why="<strong>Por que funciona:</strong> Não nega a objeção, recontextualiza com prova social e propõe passo de baixo risco."
            />
            <ObjectionCard 
              q='"Vou analisar e te dou um retorno…"'
              script={`Com certeza, pode analisar à vontade! Só queria saber: tem alguma parte do orçamento que ficou dúvida ou que posso explicar melhor?
E se quiser, posso te mandar fotos do [salão] para visualizar melhor. 📸`}
              why="<strong>Por que funciona:</strong> Não pressiona, mantém conversa viva entregando valor."
            />
            <ObjectionCard 
              q='"Estou comparando orçamentos com outros espaços…"'
              script="Faz todo o sentido comparar. Para facilitar, posso te mandar um resumo rápido do pacote e o que normalmente fica 'oculto' em orçamentos concorrentes (iluminação, equipe, etc)? Fica mais fácil comparar maçã com maçã."
              why="<strong>Por que funciona:</strong> Educa o cliente e posiciona a Mansão Marion como transparente."
            />
          </div>
        </motion.div>

        {/* SECTION 6 */}
        <motion.div 
          id="sec6" 
          className="py-20 md:py-[100px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row md:items-baseline gap-0 md:gap-5 mb-12">
            <span className="font-serif text-5xl md:text-[72px] text-gold/15 leading-none font-light shrink-0 md:-mt-3">06</span>
            <div className="flex-1">
              <span className="text-[10px] tracking-[0.25em] uppercase text-gold block mb-2 font-normal mt-2 md:mt-0">Análise Estratégica</span>
              <h2 className="font-serif text-[clamp(30px,4vw,44px)] font-light leading-[1.15] text-espresso tracking-[-0.01em]">
                Diagnóstico do<br/>Gargalo Atual
              </h2>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="bg-gold/10 border border-gold/20 rounded-xl p-5 md:p-6 flex-1 text-center">
              <strong className="font-serif text-[44px] text-gold font-light block leading-none mb-2">220</strong>
              <span className="text-[13px] text-text-muted">Leads totais no período</span>
            </div>
            <div className="bg-gold/10 border border-gold/20 rounded-xl p-5 md:p-6 flex-1 text-center">
              <strong className="font-serif text-[44px] text-gold font-light block leading-none mb-2">43%</strong>
              <span className="text-[13px] text-text-muted">Aprovados pela qualificação IA</span>
            </div>
             <div className="bg-gold/10 border border-gold/20 rounded-xl p-5 md:p-6 flex-1 text-center">
              <strong className="font-serif text-[44px] text-gold font-light block leading-none mb-2">60%</strong>
              <span className="text-[13px] text-text-muted">Travados no Orçamento</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-warm-white border border-border-theme rounded-2xl p-6 md:p-8 border-l-4 border-l-[#C0504D]">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#C0504D] mb-3 block font-medium">Problema: Silêncio</span>
              <h4 className="font-serif text-[20px] text-espresso mb-3">Ausência de Cadência</h4>
              <p className="text-[13px] text-text-muted leading-[1.7] mb-0">Mensagens genéricas e falta de follow-up deixam leads esfriarem nos primeiros dias críticos.</p>
            </div>
            
            <div className="bg-warm-white border border-border-theme rounded-2xl p-6 md:p-8 border-l-4 border-l-gold">
              <span className="text-[10px] tracking-[0.2em] uppercase text-gold mb-3 block font-medium">Solução: Mudança do Fluxo</span>
              <h4 className="font-serif text-[20px] text-espresso mb-3">Protocolos Firmes da Call de Maio</h4>
              <p className="text-[13px] text-text-muted leading-[1.7] mb-0">Retirada da IA como transmissora do orçamento; Scripts da equipe formatados; Follow-ups de 8h, 24h e 48h validados.</p>
            </div>
          </div>
          
        </motion.div>

        {/* SECTION 7 */}
        <motion.div 
          id="sec7" 
          className="py-20 md:py-[100px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row md:items-baseline gap-0 md:gap-5 mb-12">
            <span className="font-serif text-5xl md:text-[72px] text-gold/15 leading-none font-light shrink-0 md:-mt-3">07</span>
            <div className="flex-1">
              <span className="text-[10px] tracking-[0.25em] uppercase text-gold block mb-2 font-normal mt-2 md:mt-0">Sugestão de Estratégia Reunião Maio</span>
              <h2 className="font-serif text-[clamp(30px,4vw,44px)] font-light leading-[1.15] text-espresso tracking-[-0.01em]">
                Visão de Futuro:<br/>Nova Jornada com Agendamento via IA
              </h2>
            </div>
          </div>
          
          <p className="text-[16px] text-text-muted leading-[1.8] mb-8 pl-5 md:pl-[92px] border-l-2 border-gold-light italic">
            Conforme discutido na call, a estratégia atual visa consertar o gargalo humano ao colocar o vendedor para apresentar ativamente o orçamento e executar follow-ups. No entanto, sugerimos que com a operação mais madura a jornada sofra uma inversão de funil, automatizando primeiro o convite presencial.
          </p>

          <div className="bg-warm-white border border-border-theme rounded-2xl p-6 md:p-8">
            <h4 className="font-serif text-[22px] text-espresso mb-4">Meta Média de Prazo: Agendamento Presencial ANTES do Orçamento</h4>
            <p className="text-[13px] text-text-muted leading-[1.7] mb-6">
              Neste cenário futuro, a IA, logo após colher a qualificação inicial (data, região e número de convidados), oferte proativamente o agendamento de uma visita presencial — tendo até integração viável de calendário do time. Se o cliente agendar, ele é passado para o vendedor que aguardará o encontro, e o orçamento só é discutido em visita, o que possui alta taxa de conversão em eventos deste tipo. Se ele insistir no orçamento virtual, passa para o vendedor normalmente.
            </p>
            
            <div className="bg-cream border border-border-theme rounded-xl p-5">
              <span className="text-[10px] tracking-[0.15em] uppercase text-gold mb-3 block font-medium">Cronograma de Implementação Sugerido</span>
              <ul className="text-[13px] text-text-main leading-[1.6]">
                <li className="border-b border-border-theme py-3 last:border-0"><strong className="text-espresso">Fase Atual Imediata:</strong> Estabilizar o novo tagueamento de CRM via "frases padrão", reduzir volume e tamanho das mensagens da IA, e cobrar que os vendedores encabecem os orçamentos seguidos da cadência de 8h, 24h e 48h.</li>
                <li className="py-3"><strong className="text-espresso">Fase Agendamento por IA (Mínimo de +30 dias após Testes):</strong> Avaliar a conversão do modelo humano. Se ele alcançar a métrica aceita e a equipe comercial estiver engajada, apresentamos a proposta da marcação de calendário direto na IA para ser o próximo nível do funil.</li>
              </ul>
            </div>
          </div>
        </motion.div>

      </div>

      {/* FOOTER */}
      <div className="bg-espresso text-center py-16 mt-10">
        <div className="font-serif text-[32px] text-cream font-light tracking-[0.05em] mb-2">
          Mansão <em className="text-gold italic">Marion</em>
        </div>
        <p className="text-[11px] text-gold/50 tracking-[0.2em] uppercase">Playbook Comercial · Versão 1.0 · Confidencial</p>
      </div>

    </div>
  );
}
