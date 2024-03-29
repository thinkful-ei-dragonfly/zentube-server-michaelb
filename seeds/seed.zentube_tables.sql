BEGIN;

TRUNCATE
  zentube_comments,
  zentube_posts,
  zentube_users
  RESTART IDENTITY CASCADE;

INSERT INTO zentube_users (user_name, full_name, nickname, password)
VALUES
  ('dunder', 'Dunder Mifflin', null, '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne'),
  ('b.deboop', 'Bodeep Deboop', 'Bo', '$2a$12$VQ5HgWm34QQK2rJyLc0lmu59cy2jcZiV6U1.bE8rBBnC9VxDf/YQO'),
  ('c.bloggs', 'Charlie Bloggs', 'Charlie', '$2a$12$2fv9OPgM07xGnhDbyL6xsuAeQjAYpZx/3V2dnu0XNIR27gTeiK2gK'),
  ('s.smith', 'Sam Smith', 'Sam', '$2a$12$/4P5/ylaB7qur/McgrEKwuCy.3JZ6W.cRtqxiJsYCdhr89V4Z3rp.'),
  ('lexlor', 'Alex Taylor', 'Lex', '$2a$12$Hq9pfcWWvnzZ8x8HqJotveRHLD13ceS7DDbrs18LpK6rfj4iftNw.'),
  ('wippy', 'Ping Won In', 'Ping', '$2a$12$ntGOlTLG5nEXYgDVqk4bPejBoJP65HfH2JEMc1JBpXaVjXo5RsTUu');

INSERT INTO zentube_posts (title, category, author_id, file_name, content)
VALUES
  ('First post!', 'Interview', 1, 'ForBiggerMeltdowns.mp4',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque?'),
  ('Second post!', 'How-to', 2, 'ForBiggerJoyrides.mp4',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum.'),
  ('Third post!', 'News', 3, 'ForBiggerBlazes.mp4',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate? Necessitatibus, reiciendis? Cupiditate totam laborum esse animi ratione ipsa dignissimos laboriosam eos similique cumque. Est nostrum esse porro id quaerat.'),
  ('Fourth post', 'How-to', 4, 'ForBiggerEscapes.mp4',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, consequuntur. Cum quo ea vero, fugiat dolor labore harum aut reprehenderit totam dolores hic quaerat, est, quia similique! Aspernatur, quis nihil?'),
  ('Fifth post', 'News', 5, 'ForBiggerFun.mp4',
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet soluta fugiat itaque recusandae rerum sed nobis. Excepturi voluptas nisi, labore officia, nobis repellat rem ab tempora, laboriosam odio reiciendis placeat?');
INSERT INTO zentube_comments (
  text,
  post_id,
  comment_time,
  user_id
) VALUES
  (
    'This video is amazing',
    1,
    1.0,
    2
  );
  -- (
  --   'Yeh I agree it''s amazing',
  --   1,
  --   2.0,
  --   3
  -- ),
  -- (
  --   'I would go so far as to say it''s double amazing',
  --   1,
  --   3.0,
  --   4
  -- ),
  -- (
  --   'A-mazing!',
  --   1,
  --   1.0,
  --   5
  -- ),
  -- (
  --   'That''s some interesting lorems you raise',
  --   2,
  --   2.0,
  --   6
  -- ),
  -- (
  --   'Yeh totally I''d never thought about lorems like that before',
  --   2,
  --   3.0,
  --   1
  -- ),
  -- (
  --   'So you''re saying consectetur adipisicing elit?',
  --   2,
  --   1.0,
  --   3
  -- ),
  -- (
  --   'Sixth? You mean sith?!!',
  --   4,
  --   2.0,
  --   6
  -- ),
  -- (
  --   'What do you call an evil procrastinator? Darth Later! Hahahahaha!',
  --   4,
  --   3.0,
  --   4
  -- ),
  -- (
  --   'Ten ten ten ten ten ten ten!',
  --   10,
  --   1.0,
  --   3
  -- ),
  -- (
  --   'Iste, architecto obcaecati tenetur quidem voluptatum ipsa quam!!!',
  --   10,
  --   2.0,
  --   5
  -- ),
  -- (
  --   '5, 6, 7, 8! My boot-scootin'' baby is drivin'' me crazy...!',
  --   7,
  --   3.0,
  --   1
  -- ),
  -- (
  --   'My obsession from a western! My dance floor date',
  --   7,
  --   1.0,
  --   2
  -- ),
  -- (
  --   'My rodeo Romeo. A cowboy god from head to toe',
  --   7,
  --   2.0,
  --   3
  -- ),
  -- (
  --   'Wanna make you mine. Better get in line. 5, 6, 7, 8!',
  --   7,
  --   3.0,
  --   4
  -- ),
  -- (
  --   'Just a lonely comment',
  --   9,
  --   1.0,
  --   6
  -- ),
  -- (
  --   'Really? Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris??!',
  --   6,
  --   2.0,
  --   5
  -- ),
  -- (
  --   'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris for sure!!',
  --   6,
  --   3.0,
  --   1
  -- ),
  -- (
  --   'WOAH!!!!!',
  --   8,
  --   1.0,
  --   2
  -- ),
  -- (
  --   '°º¤ø,¸¸,ø¤º°`°º¤ø,¸,ø¤°º¤ø,¸¸,ø¤º°`°º¤ø,¸',
  --   8,
  --   2.0,
  --   4
  -- );

COMMIT;
