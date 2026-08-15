import 'piccolore';
import { k as decodeKey } from './chunks/astro/server_C7P141-K.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CzM7yguT.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/alberto/Projects/solfamidas/","cacheDir":"file:///home/alberto/Projects/solfamidas/node_modules/.astro/","outDir":"file:///home/alberto/Projects/solfamidas/dist/","srcDir":"file:///home/alberto/Projects/solfamidas/src/","publicDir":"file:///home/alberto/Projects/solfamidas/public/","buildClientDir":"file:///home/alberto/Projects/solfamidas/dist/client/","buildServerDir":"file:///home/alberto/Projects/solfamidas/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"admin/config.yml","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/admin/config.yml","pattern":"^\\/admin\\/config\\.yml\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"config.yml","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro-decap-cms-oauth/src/config.ts","pathname":"/admin/config.yml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"admin/index.html","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","isIndex":false,"route":"/admin","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro-decap-cms-oauth/src/admin.astro","pathname":"/admin","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.KMzT7L5x.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/oauth/callback","pattern":"^\\/oauth\\/callback\\/?$","segments":[[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"callback","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro-decap-cms-oauth/src/oauth/callback.ts","pathname":"/oauth/callback","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/oauth","pattern":"^\\/oauth\\/?$","segments":[[{"content":"oauth","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro-decap-cms-oauth/src/oauth/index.ts","pathname":"/oauth","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}}],"site":"https://example.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/alberto/Projects/solfamidas/node_modules/astro-decap-cms-oauth/src/admin.astro",{"propagation":"none","containsHead":true}],["/home/alberto/Projects/solfamidas/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/home/alberto/Projects/solfamidas/src/components/AudioPlayer.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/home/alberto/Projects/solfamidas/src/components/Bio.astro",{"propagation":"in-tree","containsHead":false}],["/home/alberto/Projects/solfamidas/src/components/Events.astro",{"propagation":"in-tree","containsHead":false}],["/home/alberto/Projects/solfamidas/src/components/Gallery.astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:node_modules/astro-decap-cms-oauth/src/admin@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:node_modules/astro-decap-cms-oauth/src/config@_@ts":"pages/admin/config.yml.astro.mjs","\u0000@astro-page:node_modules/astro-decap-cms-oauth/src/oauth/callback@_@ts":"pages/oauth/callback.astro.mjs","\u0000@astro-page:node_modules/astro-decap-cms-oauth/src/oauth/index@_@ts":"pages/oauth.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BF9w1xrC.mjs","/home/alberto/Projects/solfamidas/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_D6vn2y4G.mjs","/home/alberto/Projects/solfamidas/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/home/alberto/Projects/solfamidas/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_aEj0e5Rx.mjs","/home/alberto/Projects/solfamidas/src/components/Contact.astro?astro&type=script&index=0&lang.ts":"_astro/Contact.astro_astro_type_script_index_0_lang.BA0YtvMo.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/alberto/Projects/solfamidas/src/components/Contact.astro?astro&type=script&index=0&lang.ts","const t=document.querySelector(\"[data-contact-form]\");t?.addEventListener(\"submit\",o=>{o.preventDefault();const e=new FormData(t),n=t.dataset.email??\"\",a=encodeURIComponent(\"Consulta desde la web — Dúo Harmonie\"),c=encodeURIComponent(`${e.get(\"name\")} (${e.get(\"email\")})\n\n${e.get(\"message\")}`);window.location.href=`mailto:${n}?subject=${a}&body=${c}`});"]],"assets":["/_astro/cinzel-latin-ext-400-normal.XQK_CSAr.woff2","/_astro/cinzel-latin-400-normal.DnUIPmzd.woff2","/_astro/cormorant-garamond-cyrillic-ext-400-normal.W3Dto7M0.woff2","/_astro/cormorant-garamond-cyrillic-400-normal.DD2KOZkl.woff2","/_astro/cormorant-garamond-vietnamese-400-normal.6K-YXo6g.woff2","/_astro/cormorant-garamond-latin-ext-400-normal.Drx2k2n9.woff2","/_astro/cormorant-garamond-latin-400-normal.B-1hWBU7.woff2","/_astro/cinzel-latin-ext-600-normal.BEFdM_VE.woff2","/_astro/cinzel-latin-600-normal.Dd5YO2UX.woff2","/_astro/cormorant-garamond-cyrillic-ext-500-normal.Yta7XZ9C.woff2","/_astro/cormorant-garamond-cyrillic-500-normal.CyAY5ZLS.woff2","/_astro/cormorant-garamond-vietnamese-500-normal.BZGLGj12.woff2","/_astro/cormorant-garamond-latin-ext-500-normal.CH1kM7og.woff2","/_astro/cormorant-garamond-latin-500-normal.BsRWmXhO.woff2","/_astro/cormorant-garamond-cyrillic-ext-600-normal.BMhMHfrj.woff2","/_astro/cormorant-garamond-cyrillic-600-normal.C2atO-64.woff2","/_astro/cormorant-garamond-vietnamese-600-normal.BoXdMtcr.woff2","/_astro/cormorant-garamond-latin-ext-600-normal.DaBc-lu7.woff2","/_astro/cormorant-garamond-latin-600-normal.Co1r35X9.woff2","/_astro/inter-cyrillic-ext-400-normal.BQZuk6qB.woff2","/_astro/inter-cyrillic-400-normal.obahsSVq.woff2","/_astro/inter-greek-ext-400-normal.DGGRlc-M.woff2","/_astro/inter-greek-400-normal.B4URO6DV.woff2","/_astro/inter-vietnamese-400-normal.DMkecbls.woff2","/_astro/inter-latin-ext-400-normal.C1nco2VV.woff2","/_astro/inter-latin-400-normal.C38fXH4l.woff2","/_astro/cinzel-latin-ext-400-normal.DJ0Lq8y-.woff","/_astro/cinzel-latin-400-normal.C8jUSQqm.woff","/_astro/cormorant-garamond-cyrillic-ext-400-normal.DLdKLAvx.woff","/_astro/cormorant-garamond-cyrillic-400-normal.CVFrM67f.woff","/_astro/cormorant-garamond-vietnamese-400-normal.4uxlocMh.woff","/_astro/cormorant-garamond-latin-ext-400-normal.uvC0WHQr.woff","/_astro/cormorant-garamond-latin-400-normal.B7YtguxJ.woff","/_astro/cinzel-latin-ext-600-normal.BY9Mq9iK.woff","/_astro/cinzel-latin-600-normal.CH_LB4su.woff","/_astro/cormorant-garamond-cyrillic-ext-500-normal.lsPpqi9g.woff","/_astro/cormorant-garamond-cyrillic-500-normal.DkJXBcIH.woff","/_astro/cormorant-garamond-vietnamese-500-normal.DqXqCC0q.woff","/_astro/cormorant-garamond-latin-ext-500-normal.DYeaGGzO.woff","/_astro/cormorant-garamond-latin-500-normal.zIXX3Q-H.woff","/_astro/cormorant-garamond-cyrillic-ext-600-normal.CsIYWmWK.woff","/_astro/cormorant-garamond-cyrillic-600-normal.FNmA3REe.woff","/_astro/cormorant-garamond-vietnamese-600-normal.C4HEjEaf.woff","/_astro/cormorant-garamond-latin-ext-600-normal.Dk3-quAP.woff","/_astro/cormorant-garamond-latin-600-normal.2CBVLo0M.woff","/_astro/inter-cyrillic-ext-400-normal.DQukG94-.woff","/_astro/inter-cyrillic-400-normal.HOLc17fK.woff","/_astro/inter-greek-ext-400-normal.KugGGMne.woff","/_astro/inter-greek-400-normal.q2sYcFCs.woff","/_astro/inter-vietnamese-400-normal.Bbgyi5SW.woff","/_astro/inter-latin-ext-400-normal.77YHD8bZ.woff","/_astro/inter-latin-400-normal.CyCys3Eg.woff","/_astro/index.KMzT7L5x.css","/favicon.svg","/robots.txt","/admin/config.yml","/admin/index.html","/admin/config.yml","/admin/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"DtNw/Ybm6na3aOFBOLms7GxNa6+b9cE1MKQQsXFAp7g="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
