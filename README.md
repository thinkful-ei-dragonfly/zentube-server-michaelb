# zentube API Server!

## Live Site

https://zentube.herokuapp.com/

## Description

Currently works as a youTube clone.  Features to be added:

-comments associated with a timestamp on timeline.

-comments appear only at specific timesstamps when video is playing.

## STACK

Postgres, Express, React, Node

## SCREENSHOTS

Landing Page:
![screenshot](/screenshots/landing.png?raw=true)

View All Posts:
![screenshot](/screenshots/posts.png?raw=true)

Register:
![screenshot](/screenshots/register.png?raw=true)

View a single post:
![screenshot](/screenshots/view-post.png?raw=true)

Leave a comment:
![screenshot](/screenshots/leave-comment.png?raw=true)



## Install

npm i

createdb -U dunder-mifflin zentube

npm run migrate -- 1

psql -U dunder-mifflin -d zentube -f ./seeds/seed.zentube_tables.sql

npm start
