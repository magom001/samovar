var e=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var N=Object.getOwnPropertyNames;var b=Object.prototype.hasOwnProperty;var d=(i,r)=>{for(var t in r)e(i,t,{get:r[t],enumerable:!0})},v=(i,r,t,m)=>{if(r&&typeof r=="object"||typeof r=="function")for(let n of N(r))!b.call(i,n)&&n!==t&&e(i,n,{get:()=>r[n],enumerable:!(m=p(r,n))||m.enumerable});return i};var I=i=>v(e({},"__esModule",{value:!0}),i),a=(i,r,t,m)=>{for(var n=m>1?void 0:m?p(r,t):r,o=i.length-1,u;o>=0;o--)(u=i[o])&&(n=(m?u(r,t,n):u(n))||n);return m&&n&&e(r,t,n),n};var S={};d(S,{UpdateUserDataDto:()=>g,User:()=>l,UserData:()=>x,UserProfile:()=>c,UserProfileType:()=>f});module.exports=I(S);var l=class{},x=class extends l{};var f=(t=>(t.Musician="musician",t.Singer="singer",t))(f||{}),c=class{};var s=require("class-validator");var g=class{};a([(0,s.IsString)(),(0,s.IsOptional)()],g.prototype,"firstName",2),a([(0,s.IsString)(),(0,s.IsOptional)()],g.prototype,"lastName",2),a([(0,s.IsString)(),(0,s.IsOptional)()],g.prototype,"avatarUrl",2);0&&(module.exports={UpdateUserDataDto,User,UserData,UserProfile,UserProfileType});
