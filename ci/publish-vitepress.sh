#!/bin/bash

vitepress_zip="$1"

if [ ! -e "$vitepress_zip" ]
then
	echo "Vitepress docs zip file, passed as the first parameter '$vitepress_zip', if not found."
	exit 1
fi

upload_vitepress() {
	local zip_file="$1"
	curl --silent --show-error --cacert "$SERVER_CERT" -X POST --header "X-Access-Token: $UPLOAD_TOKEN" --header "Content-Type: application/octet-stream" --data-binary "@$zip_file" "https://$SERVER/ui-lib/vitepress" || return $?
	echo
}

upload_vitepress $vitepress_zip || exit $?
