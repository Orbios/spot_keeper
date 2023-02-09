## Configure third-party providers

When using third-party providers, the `Supabase client` library redirects the user to the provider. When the third-party provider successfully authenticates the user, the provider redirects the user to the `Supabase Auth callback URL` where they are further redirected to the URL specified in the `redirectTo` parameter. This parameter defaults to the <b>SITE_URL</b>. You can modify the <b>SITE_URL</b> or add additional redirect URLs.

### Netlify preview URLs

For deployments with `Netlify`, set the <b>SITE_URL</b> to your official site `URL`. Add the following additional redirect URLs for local development and deployment previews:

```
http://localhost:3000/**

https://**--my_org.netlify.app/**
```
