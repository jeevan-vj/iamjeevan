---
title: 'Oracle APEX: Make Interactive Grid Rows Read-Only Based on Column Value'
date: '2025-04-10'
tags: ['Oracle', 'APEX', 'SQL', 'Interactive Grid']
draft: false
summary: 'Learn how to make specific rows in an Oracle APEX Interactive Grid read-only based on column values like status using the Allowed Row Operations Column feature. This simple technique improves data integrity by preventing edits on completed items.'
---

# Oracle APEX: Make Interactive Grid Rows Read-Only Based on Column Value

In Oracle APEX, sometimes we need to prevent users from editing certain rows in an **Interactive Grid** based on a column value—for example, making rows with `status = 'Completed'` read-only. Here's a simple and effective way to achieve this using the **Allowed Row Operations Column** feature.

## Step-by-Step Fix

### 1. Update Your SQL Query

Add a virtual column that defines which operations are allowed per row:

```sql
SELECT 
  id,
  name,
  status,
  CASE 
    WHEN status = 'Completed' THEN 'D'       -- Allow only delete
    WHEN status = 'Pending' THEN 'UD'        -- Allow update & delete
    ELSE NULL                                -- Disallow both
  END AS row_operations
FROM your_table;
```

> Operation Codes:
> - `U` = Allow update
> - `D` = Allow delete
> - `UD` = Allow both
> - `NULL` or anything else = Disallow all

### 2. Configure the Interactive Grid

- Go to **Page Designer**
- Select your **Interactive Grid**
- Under **Attributes > Edit**, set:
  - **Allowed Row Operations Column** = `ROW_OPERATIONS`

## Result

Now, any row where `status = 'Completed'` will not be editable—Oracle APEX will automatically prevent users from editing those rows.

## Reference

Oracle APEX Interactive Grid Documentation:  
[Editing Interactive Grid Attributes](https://docs.oracle.com/database/apex-5.1/HTMDB/editing-interactive-grid-attributes.htm)
