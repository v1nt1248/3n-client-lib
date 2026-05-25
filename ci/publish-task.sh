
echo "//registry.npmjs.org/:_authToken=$1" > .npmrc

echo "Publishing package"
npm publish
pub_result=$?

rm .npmrc

exit $pub_result
