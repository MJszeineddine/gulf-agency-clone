module.exports=[1999,a=>{"use strict";var b=a.i(18343),c=a.i(75222),d=a.i(56373);let e=(0,a.i(11774).default)("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);function f({title:a,description:f,icon:g,slug:h,pricing:i,featured:j=!1,country:k,locale:l}){let m="ar"===l;return(0,b.jsx)(d.motion.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.5},className:"h-full",children:(0,b.jsx)(c.default,{href:`/${k}/${l}/services/${h}`,children:(0,b.jsxs)("div",{className:`
          group relative h-full p-8 rounded-xl
          glass-effect hover:scale-105 
          transition-all duration-300 cursor-pointer
          border-2 border-transparent hover:border-accent-gold/30
          ${j?"bg-gradient-to-br from-accent-gold/10 to-transparent":""}
        `,children:[j&&(0,b.jsx)("div",{className:`
              absolute ${m?"left-4":"right-4"} top-4 
              px-3 py-1 rounded-full 
              bg-accent-gold text-surface-primary 
              text-xs font-bold
            `,children:m?"مميز":"Featured"}),(0,b.jsx)("div",{className:"w-20 h-20 mb-6 rounded-lg bg-accent-gold/20 flex items-center justify-center text-4xl",children:g}),(0,b.jsx)("h3",{className:"text-2xl font-bold mb-4 text-gradient-gold group-hover:scale-105 transition-transform",children:a}),(0,b.jsx)("p",{className:"text-text-secondary mb-6 line-clamp-3 leading-relaxed",children:f}),(0,b.jsx)("div",{className:"mb-6 pt-4 border-t border-border-subtle",children:(0,b.jsxs)("div",{className:`flex items-baseline gap-2 ${m?"flex-row-reverse":""}`,children:[(0,b.jsx)("span",{className:"text-sm text-text-secondary",children:m?"يبدأ من":"Starting from"}),(0,b.jsx)("span",{className:"text-3xl font-bold text-accent-gold",children:i.starting}),(0,b.jsx)("span",{className:"text-sm text-text-secondary",children:i.currency}),(0,b.jsxs)("span",{className:"text-sm text-text-secondary",children:["/ ",i.period]})]})}),(0,b.jsxs)("div",{className:`
            flex items-center gap-2 text-accent-gold 
            font-semibold group-hover:gap-4 transition-all
            ${m?"flex-row-reverse":""}
          `,children:[(0,b.jsx)("span",{children:m?"اعرف المزيد":"Learn More"}),(0,b.jsx)(e,{className:`w-5 h-5 ${m?"rotate-180":""}`})]}),(0,b.jsx)("div",{className:"absolute inset-0 rounded-xl bg-gradient-to-br from-accent-gold/0 to-accent-gold/0 group-hover:from-accent-gold/5 group-hover:to-transparent transition-all duration-300 pointer-events-none"})]})})})}a.s(["ServiceCard",()=>f],1999)}];

//# sourceMappingURL=web-clone_components_services_service-card_tsx_ebb0a9f1._.js.map