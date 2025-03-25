---
title: 'Resolving OpenSSL Error in Node.js 20 for Next.js Projects'
date: '2025-03-25'
tags: ['node.js', 'next.js', 'openssl']
draft: false
summary: 'A guide to resolving OpenSSL errors in Node.js 20 for Next.js projects'
---

# Resolving OpenSSL Error in Node.js 20 for Next.js Projects

When upgrading your Node.js version to 20.x.x, you might encounter an OpenSSL error during the build process. This error can be resolved by using the legacy OpenSSL provider. Here’s a quick guide to fix this issue.

## Steps to Resolve the Error

### Update package.json Scripts:

Modify the build script in your `package.json` to include the `--openssl-legacy-provider` option:

```json
{
  "scripts": {
    "build": "node --openssl-legacy-provider ./node_modules/.bin/next build"
  }
}
```

### Rebuild the Project:

After updating the `package.json`, rebuild your project:

```bash
npm run build
```

## Explanation

The `--openssl-legacy-provider` option ensures compatibility with the OpenSSL changes in Node.js 20.x.x, preventing the `ERR_OSSL_EVP_UNSUPPORTED` error.

By following these steps, you can successfully build your Next.js project with the latest Node.js version.
