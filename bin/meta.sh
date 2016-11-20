case $1 in
  build)
    NODE_ENV=production ./node_modules/meta-dev/scripts/build.js $@
    ;;

  check-coverage)
    nyc check-coverage --lines 95 --functions 95 --branches 95
    ;;

  coverage)
    nyc report --reporter=text-lcov | codecov
    ;;

  dev)
    ava --watch
    ;;

  docs)
    # todo: https://github.com/jsdoc2md/jsdoc-to-markdown/issues/94
    cat index.js | jsdoc2md > docs/api.md
    git add docs/api.md
    ;;

  lint)
    eslint {lib/,test/}**/*.js
    ;;

  see-coverage)
    nyc report --reporter=html && open coverage/index.html
    ;;

  test)
    nyc ava
    ;;
esac
