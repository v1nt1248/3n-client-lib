#!/bin/bash

storybook_zip="$1"

if [ ! -e "$storybook_zip" ]
then
	echo "Story book zip file, passed as the first parameter '$storybook_zip', if not found."
	exit 1
fi

upload_storybook() {
	local zip_file="$1"
	curl --silent --show-error --cacert "$SERVER_CERT" -X POST --header "X-Access-Token: $UPLOAD_TOKEN" --header "Content-Type: application/octet-stream" --data-binary "@$zip_file" "https://$SERVER/ui-lib/storybook" || return $?
	echo
}

upload_storybook $storybook_zip || exit $?
