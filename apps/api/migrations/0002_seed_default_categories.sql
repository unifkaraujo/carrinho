WITH defaults(position, name) AS (
  VALUES (0, 'Hortifrúti'), (1, 'Açougue'), (2, 'Frios e laticínios'), (3, 'Padaria'),
         (4, 'Mercearia'), (5, 'Bebidas'), (6, 'Limpeza'), (7, 'Higiene')
)
INSERT INTO categories (id, user_id, name, created_at)
SELECT lower(hex(randomblob(16))), u.id, d.name, CAST(unixepoch('subsec') * 1000 AS INTEGER) + d.position
FROM "user" u
CROSS JOIN defaults d
WHERE NOT EXISTS (SELECT 1 FROM categories c WHERE c.user_id = u.id);
