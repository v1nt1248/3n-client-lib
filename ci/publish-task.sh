
echo "//registry.npmjs.org/:_authToken=$1" > .npmrc

echo "Publishing package"
pnpm publish --access public --no-git-checks
pub_result=$?

rm .npmrc

exit $pub_result
