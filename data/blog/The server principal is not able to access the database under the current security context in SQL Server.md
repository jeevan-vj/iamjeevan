---
title: 'The server principal is not able to access the database under the current security context in SQL Server'
date: '2022-11-30'
tags: ['SQL', 'Code-Snippets']
draft: false
summary: 'Resolution for Error The server principal is not able to access the database under the current security context in SQL Server'
---

# Problem

I found myself in a situation where SQL logins throw errors after restoring databases. It seems the mapping of logins and Dbs is broken.

Error:

**[`The server principal is not able to access the database under the current security context in SQL Server`](https://stackoverflow.com/questions/19009488/the-server-principal-is-not-able-to-access-the-database-under-the-current-securi)**

mappings can become disconnected after a restore or similar operation. In this case, the user may still exist in the database but is not actually mapped to a login. If that happens, We can run the following to restore the login:

Resolution:

```sql
USE {database};
ALTER USER {user} WITH login = {login}
```

## Reference

- [SO](https://stackoverflow.com/questions/19009488/the-server-principal-is-not-able-to-access-the-database-under-the-current-securi)

Happy Coding :)
