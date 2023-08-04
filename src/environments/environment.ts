// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,

  backend: "http://127.0.0.1:8000/api",
  base_url_backend: "http://127.0.0.1:8000",

  // backend: "https://reshaoc.africanschoolofeconomics.com/api",
  // base_url_backend: "https://reshaoc.africanschoolofeconomics.com",

  ssoUrlCallback: "https://tourisme-app.star-labs.bj/admin/sso_callback",
  // ssoUrl: "https://pprodofficial.service-public.bj/official/login?client_id=mtcalicence&redirect_uri=http://tourisme-app.star-labs.bj/admin/sso_callback&response_type=code&scope=openid&authError=true",
  expirationTime: 0
};
