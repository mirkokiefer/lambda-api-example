set -e

echo "Running tests"

(cd index && npm install && npm test)
(cd brands && npm install && npm test)

echo "All tests passed"

exit 0