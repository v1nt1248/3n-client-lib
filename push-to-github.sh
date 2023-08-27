#!/bin/bash

PROJ_NAME="3n-client-lib"
ITEMS_TO_PUSH=".browserslistrc .editorconfig .eslintignore .eslintrc.js .gitignore .stylelint.config.js .stylelintignore index.html LICENSE package.json README.md src tsconfig.json @types vite.config.js yarn.lock"

GITHUB_REPO="https://github.com/PrivacySafe/${PROJ_NAME}.git"
DIST_DIR="temp"

branch=$1
if [ -z "$branch" ]
then
	branch="main"
fi

function is_branch_same {
	check_out=$(git branch | grep '*' | grep "$branch")
	if [ -n "$check_out" ]
	then
		return 0;
	else
		return 1;
	fi
}

function rm_all_in_git_dir {
	for entity in $(ls -a)
	do
		case $entity in
			.) ;;
			..) ;;
			.git) continue ;;
			*) rm -rf $entity ;;
		esac
	done
}

function cp_items_push {
	src=$1
	for entity in $ITEMS_TO_PUSH
	do
		cp -r $src/$entity ./
	done
}

function update_content_from {
	src=$1
	rm_all_in_git_dir || return 1
	cp_items_push $src || return 1
}

function pull_from_github_and_enter_repo {
	if [ -d $PROJ_NAME ]
	then
		cd $PROJ_NAME
		echo "Pulling current state from GitHub:"
		git pull
		if [ ! is_branch_same ] && [ "$branch" != "ignore-branch" ]
		then
			git checkout $branch
		fi
	else
		echo "Cloning repository from GitHub:"
		git clone $GITHUB_REPO
		cd $PROJ_NAME
	fi
}

if [ ! is_branch_same ] && [ "$branch" != "ignore-branch" ]
then
	echo "Current git branch is not $branch"
	exit 1
fi

init_dir="$(pwd)"
if [ ! -d $DIST_DIR ]
then
	mkdir $DIST_DIR
fi
cd $DIST_DIR

echo
pull_from_github_and_enter_repo

update_content_from $init_dir

git add .
git commit
git push

cd $init_dir
rm -rf $DIST_DIR/$PROJ_NAME
