const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      nickname: 'TU1',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 2,
      user_name: 'test-user-2',
      full_name: 'Test user 2',
      nickname: 'TU2',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 3,
      user_name: 'test-user-3',
      full_name: 'Test user 3',
      nickname: 'TU3',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 4,
      user_name: 'test-user-4',
      full_name: 'Test user 4',
      nickname: 'TU4',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
  ]
}

function makepostsArray(users) {
  return [
    {
      id: 1,
      title: 'First test post!',
      category: 'How-to',
      author_id: users[0].id,
      file_name: 'sample.mp4',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 2,
      title: 'Second test post!',
      category: 'Interview',
      author_id: users[1].id,
      file_name: 'sample.mp4',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 3,
      title: 'Third test post!',
      category: 'News',
      author_id: users[2].id,
      file_name: 'sample.mp4',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 4,
      title: 'Fourth test post!',
      category: 'Listicle',
      author_id: users[3].id,
      file_name: 'sample.mp4',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
  ]
}

function makeCommentsArray(users, posts) {
  return [
    {
      id: 1,
      text: 'First test comment!',
      post_id: posts[0].id,
      comment_time: "1.000000",
      user_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 2,
      text: 'Second test comment!',
      post_id: posts[0].id,
      comment_time: "1.000000",
      user_id: users[1].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 3,
      text: 'Third test comment!',
      post_id: posts[0].id,
      comment_time: "1.000000",
      user_id: users[2].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 4,
      text: 'Fourth test comment!',
      post_id: posts[0].id,
      comment_time: "1.000000",
      user_id: users[3].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 5,
      text: 'Fifth test comment!',
      post_id: posts[posts.length - 1].id,
      comment_time: "1.000000",
      user_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 6,
      text: 'Sixth test comment!',
      post_id: posts[posts.length - 1].id,
      comment_time: "1.000000",
      user_id: users[2].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 7,
      text: 'Seventh test comment!',
      post_id: posts[3].id,
      comment_time: "1.000000",
      user_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
  ];
}

function makeExpectedpost(users, post, comments=[]) {
  const author = users
    .find(user => user.id === post.author_id)

  const number_of_comments = comments
    .filter(comment => comment.post_id === post.id)
    .length

  return {
    id: post.id,
    category: post.category,
    title: post.title,
    file_name: post.file_name,
    content: post.content,
    date_created: post.date_created.toISOString(),
    number_of_comments,
    author: {
      id: author.id,
      user_name: author.user_name,
      full_name: author.full_name,
      nickname: author.nickname,
      date_created: author.date_created.toISOString(),
      date_modified: author.date_modified || null,
    },
  }
}

function makeExpectedpostComments(users, postId, comments) {
  const expectedComments = comments
    .filter(comment => comment.post_id === postId)

  return expectedComments.map(comment => {
    const commentUser = users.find(user => user.id === comment.user_id)
    return {
      id: comment.id,
      text: comment.text,
      comment_time: comment.comment_time,
      date_created: comment.date_created.toISOString(),
      user: {
        id: commentUser.id,
        user_name: commentUser.user_name,
        full_name: commentUser.full_name,
        nickname: commentUser.nickname,
        date_created: commentUser.date_created.toISOString(),
        date_modified: commentUser.date_modified || null,
      }
    }
  })
}

function makeMaliciouspost(user) {
  const maliciouspost = {
    id: 911,
    category: 'How-to',
    date_created: new Date(),
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    author_id: user.id,
    content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  }
  const expectedpost = {
    ...makeExpectedpost([user], maliciouspost),
    title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  }
  return {
    maliciouspost,
    expectedpost,
  }
}

function makepostsFixtures() {
  const testUsers = makeUsersArray()
  const testposts = makepostsArray(testUsers)
  const testComments = makeCommentsArray(testUsers, testposts)
  return { testUsers, testposts, testComments }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        zentube_posts,
        zentube_users,
        zentube_comments
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE zentube_posts_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE zentube_users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE zentube_comments_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('zentube_posts_id_seq', 0)`),
        trx.raw(`SELECT setval('zentube_users_id_seq', 0)`),
        trx.raw(`SELECT setval('zentube_comments_id_seq', 0)`),
      ])
    )
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('zentube_users').insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('zentube_users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}

function seedpostsTables(db, users, posts, comments=[]) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('zentube_posts').insert(posts)
    // update the auto sequence to match the forced id values
    await trx.raw(
      `SELECT setval('zentube_posts_id_seq', ?)`,
      [posts[posts.length - 1].id],
    )
    // only insert comments if there are some, also update the sequence counter
    if (comments.length) {
      await trx.into('zentube_comments').insert(comments)
      await trx.raw(
        `SELECT setval('zentube_comments_id_seq', ?)`,
        [comments[comments.length - 1].id],
      )
    }
  })
}

function seedMaliciouspost(db, user, post) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('zentube_posts')
        .insert([post])
    )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makepostsArray,
  makeExpectedpost,
  makeExpectedpostComments,
  makeMaliciouspost,
  makeCommentsArray,

  makepostsFixtures,
  cleanTables,
  seedpostsTables,
  seedMaliciouspost,
  makeAuthHeader,
  seedUsers,
}
