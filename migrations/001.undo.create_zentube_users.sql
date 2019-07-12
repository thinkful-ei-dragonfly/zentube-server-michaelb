ALTER TABLE zentube_posts
  DROP COLUMN IF EXISTS author_id;

DROP TABLE IF EXISTS zentube_users;
