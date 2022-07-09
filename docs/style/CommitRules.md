# Commit Rules

## Overview
This documentation is about the rules of git committing messages.

## Rules

TNTjs follows [Conventional Commit](https://www.conventionalcommits.org/) (or CC for short) commit message standard.

The basic form of a commit message following CC standard is as follows:

```
<type>[scope (optional)]: description

[commit body(optional)]

[commit footer(optional)]
```

And first off, `type` is a noun that describes the change. It can be one of the following:

- `feat`: Introduces a new feature
- `fix`: Fixes a bug
- `docs`: Updates documentation
- `style`: Updates code style
- `refactor`: Performs a code refactoring (but not modifying any core features)
- `test`: Adds or modifies tests
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit
- etc.

For a full list of commit types, please refer to <https://github.com/pvdlg/conventional-changelog-metahub#commit-types> .

The scope of the change is optional, specifying the scope of current changes. E.g:

```
build(npm): commit description
```

Commit description is a short overview of the change, written directly after the commit type (or commit scope, if any).

The commit body below is optional as well. It is intended to be a detailed description of the change and describes some longer contexts, separated the commit description by a blank line.

And the commit footer is also optional, which might include some additional tokens. Such as `Co-authored-by: user1, user2` means that the current commit was made by the submitter, user1 and user2.

An important footer is `BREAKING CHANGE`, meaning that some breaking changes happened in the commit. For example:

```
BREAKING CHANGE: environment variables now take precedence over config files
```

Using CC with Husky and pre-commit hooks is highly recommended.