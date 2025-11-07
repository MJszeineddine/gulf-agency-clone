(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,38791,e=>{"use strict";var t=e.i(19205),r=e.i(35868),a=e.i(85761);let s=(0,e.i(96786).default)("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);function l({title:e,description:l,icon:n,slug:o,pricing:i,featured:c=!1,country:d,locale:x}){let h="ar"===x;return(0,t.jsx)(a.motion.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5},className:"h-full",children:(0,t.jsx)(r.default,{href:`/${d}/${x}/services/${o}`,children:(0,t.jsxs)("div",{className:`
          group relative h-full p-8 rounded-xl
          glass-effect hover:scale-105 
          transition-all duration-300 cursor-pointer
          border-2 border-transparent hover:border-accent-gold/30
          ${c?"bg-gradient-to-br from-accent-gold/10 to-transparent":""}
        `,children:[c&&(0,t.jsx)("div",{className:`
              absolute ${h?"left-4":"right-4"} top-4 
              px-3 py-1 rounded-full 
              bg-accent-gold text-surface-primary 
              text-xs font-bold
            `,children:h?"مميز":"Featured"}),(0,t.jsx)("div",{className:"w-20 h-20 mb-6 rounded-lg bg-accent-gold/20 flex items-center justify-center text-4xl",children:n}),(0,t.jsx)("h3",{className:"text-2xl font-bold mb-4 text-gradient-gold group-hover:scale-105 transition-transform",children:e}),(0,t.jsx)("p",{className:"text-text-secondary mb-6 line-clamp-3 leading-relaxed",children:l}),(0,t.jsx)("div",{className:"mb-6 pt-4 border-t border-border-subtle",children:(0,t.jsxs)("div",{className:`flex items-baseline gap-2 ${h?"flex-row-reverse":""}`,children:[(0,t.jsx)("span",{className:"text-sm text-text-secondary",children:h?"يبدأ من":"Starting from"}),(0,t.jsx)("span",{className:"text-3xl font-bold text-accent-gold",children:i.starting}),(0,t.jsx)("span",{className:"text-sm text-text-secondary",children:i.currency}),(0,t.jsxs)("span",{className:"text-sm text-text-secondary",children:["/ ",i.period]})]})}),(0,t.jsxs)("div",{className:`
            flex items-center gap-2 text-accent-gold 
            font-semibold group-hover:gap-4 transition-all
            ${h?"flex-row-reverse":""}
          `,children:[(0,t.jsx)("span",{children:h?"اعرف المزيد":"Learn More"}),(0,t.jsx)(s,{className:`w-5 h-5 ${h?"rotate-180":""}`})]}),(0,t.jsx)("div",{className:"absolute inset-0 rounded-xl bg-gradient-to-br from-accent-gold/0 to-accent-gold/0 group-hover:from-accent-gold/5 group-hover:to-transparent transition-all duration-300 pointer-events-none"})]})})})}e.s(["ServiceCard",()=>l],38791)}]);