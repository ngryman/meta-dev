case $1 in
  build)
    rollup --format cjs --input index.js --output index.cjs
    git add index.cjs
    ;;

  check-coverage)
    nyc check-coverage --lines 95 --functions 95 --branches 95
    ;;

  coverage)
    nyc report --reporter=text-lcov | codecov
    ;;

  dev)
    nyc ava --watch
    ;;

  docs)
    jsdoc2md *.js > docs/api.md
    git add docs/api.md
    ;;

  lint)
    eslint index.js {lib/,test/}**/*.js
    ;;

  see-coverage)
    nyc report --reporter=html && open coverage/index.html
    ;;

  test)
    nyc ava
    ;;
esac
