const xss = require('xss')

const postsService = {
  getAllPosts(db) {
    return db
      .from('zentube_posts AS pst')
      .select(
        'pst.id',
        'pst.title',
        'pst.date_created',
        'pst.category',
        'pst.file_name',
        'pst.content',
        db.raw(
          `count(DISTINCT comm) AS number_of_comments`
        ),
        db.raw(
          `json_strip_nulls(
            json_build_object(
              'id', usr.id,
              'user_name', usr.user_name,
              'full_name', usr.full_name,
              'nickname', usr.nickname,
              'date_created', usr.date_created,
              'date_modified', usr.date_modified
            )
          ) AS "author"`
        ),
      )
      .leftJoin(
        'zentube_comments AS comm',
        'pst.id',
        'comm.post_id',
      )
      .leftJoin(
        'zentube_users AS usr',
        'pst.author_id',
        'usr.id',
      )
      .groupBy('pst.id', 'usr.id')
  },

  getById(db, id) {
    return postsService.getAllPosts(db)
      .where('pst.id', id)
      .first()
  },

  getCommentsForPost(db, post_id) {
    return db
      .from('zentube_comments AS comm')
      .select(
        'comm.id',
        'comm.text',
        'comm.comment_time',
        'comm.date_created',
        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                SELECT
                  usr.id,
                  usr.user_name,
                  usr.full_name,
                  usr.nickname,
                  usr.date_created,
                  usr.date_modified
              ) tmp)
            )
          ) AS "user"`
        )
      )
      .where('comm.post_id', post_id)
      .leftJoin(
        'zentube_users AS usr',
        'comm.user_id',
        'usr.id',
      )
      .groupBy('comm.id', 'usr.id')
  },

  serializePost(post) {
    const { author } = post
    return {
      id: post.id,
      category: post.category,
      title: xss(post.title),
      file_name: post.file_name,
      content: xss(post.content),
      date_created: new Date(post.date_created),
      number_of_comments: Number(post.number_of_comments) || 0,
      author: {
        id: author.id,
        user_name: author.user_name,
        full_name: author.full_name,
        nickname: author.nickname,
        date_created: new Date(author.date_created),
        date_modified: new Date(author.date_modified) || null
      },
    }
  },

  serializePostComment(comment) {
    const { user } = comment
    return {
      id: comment.id,
      post_id: comment.post_id,
      text: xss(comment.text),
      comment_time: comment.comment_time,
      date_created: new Date(comment.date_created),
      user: {
        id: user.id,
        user_name: user.user_name,
        full_name: user.full_name,
        nickname: user.nickname,
        date_created: new Date(user.date_created),
        date_modified: new Date(user.date_modified) || null
      },
    }
  },
}

module.exports = postsService
