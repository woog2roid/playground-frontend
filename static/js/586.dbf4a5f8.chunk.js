"use strict";(self.webpackChunkplayground_front=self.webpackChunkplayground_front||[]).push([[586],{2586:function(e,n,t){t.r(n),t.d(n,{default:function(){return w}});var r=t(2791),a=t(6871),i=t(2419),s=t(9766),c=t(5861),o=t(885),u=t(7757),l=t.n(u),d=t(2033),f=t(1345),x=t(4554),h=t(1889),p=t(6186),Z=t(6151),b=t(4778),k=t(9958),j={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,p:4},g=(0,k.Z)("div")((function(e){return{fontSize:"12px",marginLeft:"5%",color:e.isOk?"black":"red"}})),m=t(184);function v(){var e=(0,a.s0)(),n=r.useState(""),t=(0,o.Z)(n,2),i=t[0],s=t[1],u=r.useState(""),k=(0,o.Z)(u,2),v=k[0],C=k[1],w=r.useState(""),S=(0,o.Z)(w,2),y=S[0],P=S[1],$=r.useCallback((function(e){s(e.target.value)}),[]),W=r.useCallback((function(e){C(e.target.value)}),[]),q=r.useCallback((function(e){P(e.target.value)}),[]),z=r.useState(!0),D=(0,o.Z)(z,2),E=D[0],O=D[1],A=r.useState(!1),_=(0,o.Z)(A,2),F=_[0],L=_[1];r.useEffect((function(){d.Z.get("".concat("https://server.woog2roid.dev/playground","/user?id=").concat(i)).then((function(){O(!1)})).catch((function(){O(!0)}))}),[i]),r.useEffect((function(){/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{5,}$/.test(v)?L(!0):L(!1)}),[v]);var V=r.useCallback(function(){var n=(0,c.Z)(l().mark((function n(t){return l().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t.preventDefault(),E){n.next=5;break}alert("\uc544\uc774\ub514 \uc911\ubcf5\uc744 \ud655\uc778\ud574\uc8fc\uc2ed\uc2dc\uc624."),n.next=15;break;case 5:if(F){n.next=9;break}alert("\ube44\ubc00\ubc88\ud638\ub97c \ud655\uc778\ud574\uc8fc\uc2ed\uc2dc\uc624."),n.next=15;break;case 9:if(""!==i&&""!==y){n.next=13;break}alert("\uc544\uc774\ub514\uc640 \ubcc4\uba85\uc744 \uc785\ub825\ud558\uc138\uc694."),n.next=15;break;case 13:return n.next=15,d.Z.post("/user/join",{id:i,password:v,nickname:y}).then((function(n){e("/login")})).catch((function(){alert("\ud68c\uc6d0\uac00\uc785\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.\n\uc7a0\uc2dc \ud6c4\uc5d0 \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694.")}));case 15:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),[E,F,i,y,v]);return(0,m.jsx)(f.Z,{open:!0,children:(0,m.jsxs)(x.Z,{component:"form",noValidate:!0,onSubmit:V,sx:j,children:[(0,m.jsxs)(h.ZP,{container:!0,spacing:2,children:[(0,m.jsx)(h.ZP,{item:!0,xs:12,children:(0,m.jsx)(p.Z,{required:!0,fullWidth:!0,label:"\uc544\uc774\ub514\ub97c \uc785\ub825\ud558\uc138\uc694",onChange:$})}),(0,m.jsx)(g,{isOk:E,children:E?"\uc0ac\uc6a9 \uac00\ub2a5\ud55c \uc544\uc774\ub514\uc785\ub2c8\ub2e4 :D":"\uc774\ubbf8 \uc788\ub294 \uc544\uc774\ub514\uc785\ub2c8\ub2e4 :("}),(0,m.jsx)(h.ZP,{item:!0,xs:12,children:(0,m.jsx)(p.Z,{required:!0,fullWidth:!0,label:"\ube44\ubc00\ubc88\ud638\ub97c \uc785\ub825\ud558\uc138\uc694",type:"password",onChange:W})}),(0,m.jsx)(g,{isOk:F,children:F?"\uc548\uc804\ud55c \ube44\ubc00\ubc88\ud638\ub124\uc694 :D":"5\uae00\uc790 \uc774\uc0c1, \ud2b9\uc218\ubb38\uc790\uc640 \uc22b\uc790 \uc601\ubb38\uc790\ub97c \ubaa8\ub450 \uc0ac\uc6a9\ud558\uba74 \ub354 \uc548\uc804\ud55c \ube44\ubc00\ubc88\ud638\uac00 \ub3fc\uc694 :("}),(0,m.jsx)(h.ZP,{item:!0,xs:12,children:(0,m.jsx)(p.Z,{required:!0,fullWidth:!0,label:"\ubcc4\uba85\uc744 \uc785\ub825\ud558\uc138\uc694",onChange:q})})]}),(0,m.jsx)(Z.Z,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},children:"\ud68c\uc6d0\uac00\uc785"}),(0,m.jsx)(h.ZP,{container:!0,children:(0,m.jsx)(h.ZP,{item:!0,children:(0,m.jsx)(b.Z,{onClick:function(){e("/login")},variant:"body2",children:"\uc774\ubbf8 \uacc4\uc815\uc774 \uc788\uc73c\uc2e0\uac00\uc694?"})})})]})})}var C=t(6713);function w(){var e=(0,a.s0)(),n=(0,i.ZP)("/user/me",s.Z).data;return r.useEffect((function(){n&&e("/notice")}),[n]),(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(C.Z,{}),(0,m.jsx)(v,{})]})}}}]);
//# sourceMappingURL=586.dbf4a5f8.chunk.js.map