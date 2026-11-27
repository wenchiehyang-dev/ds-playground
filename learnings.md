Git learnings // Nov 22 2026

BASIC CONCEPTS
Stage (add) = choose which changes go into the next commit
Commit = save the staged changes as a version (local only)
Push = send my commits to the remote repository (only commits, never uncommitted changes)
Pull = get the latest commits from the remote into my local branch
Branches are usually created for new features. After review (PR), they get merged into main.


FREQUENT OPERATIONS

Stage and commit
    git status = check what's changed / staged / untracked
    git add <file> = stage a file
    git add . = stage all changes in this folder, incl. new files
    git commit -m "message" = commit staged changes with a message
    git commit -am "message" = stage + commit in one step (only files git already tracks)

Branching
    git branch = list branches (* = current one)
    git branch <name> = create a branch, stay on the current one
    git switch <name> = switch to an existing branch
    git switch -c <name> = create a branch and switch to it
    git branch -d <name> = delete a local branch (must not be on it; -D to force)
    git push -u origin <name> = first push of a new branch; after that just git push
    git push origin --delete <name> = delete the branch on GitHub

Undo
    git restore --staged <file> = unstage, keep the edits
    git restore <file> = discard uncommitted edits (can't be undone)
    git revert HEAD = undo the latest commit with a new commit
    git revert <commit ID> = undo a specific commit with a new commit
    git reset --soft HEAD~1 = remove the last commit, keep changes staged (only if not pushed)

Others
    git log --oneline = list commits with their IDs
    touch <file> = create an empty file; if it exists, update its modified time
    code <file> = open in VS Code
    git stash / git stash pop = park uncommitted changes and bring them back

Others
    touch "file" = creates a file, if already exists, update the latest changed timestamp
    code "file" = opens in VS code

 
OPEN QUESTIONS
    What is CI in PR
        Continuous Integration: checks that run automatically on GitHub every time you push to a PR

    If only staged changes will be pushed, what happens to non-staged changes. It stays forever locally?
        Changes that aren't committed, staged or not, stay in your local folder until you commit them

    If online repository has file ABC and I have ABCD, if I pull, D will be wiped out entirely? (if D is never commited)
        No. Git never touches files it doesn't track, so an uncommitted D survives a pull

    Push only adds commited changes and not staged changes?
        Yes. Staging only prepares a commit on your computer. Until you git commit, nothing is ready to push.



Git learnings // Nov 22 2026
Phase 2
Universal rule for token json file: DTCG

in DTCG, color needs to define color format (e.g., srgb, alpha, oklch)
Figma directly exports space and radius as numbers without unit (px), when importing to CSS there will be problem. So needs clean up before doing that.
Figma 匯出時把 semantic 的 alias detach 成實際顏色，原本的連結只記在 $extensions 裡，Style Dictionary 讀不到


## 25 Nov 2026 – Phase 2, Session 2 (pre-build script, part 1)

**Token pipeline**
- Figma's native export breaks aliases: `$value` becomes the raw number, and the link only survives in `$extensions["com.figma.aliasData"].targetVariableName` (`space/16`). Style Dictionary ignores `$extensions`, so it can't fix this. A pre-build script has to.
- Pipeline: Figma export → `tokens/figma/` (raw, never edit) → script → `tokens/normalized/` (generated) → Style Dictionary → CSS.
- `tokens/normalized/` is in `.gitignore`: it can be rebuilt from raw files + script, like `node_modules`. Committing it invites hand edits that get overwritten.
- Which numbers become dimensions: decided by **path** (`space/*`, `radius/*`), not by Figma scopes, because Primitives have scope NONE and export no scopes. Caveat: this only works with naming discipline.
- For alias tokens, change only `$type` (→ `dimension`) and keep `$value: "{space.16}"`. The value comes from the referenced token; the type still has to be honest because other tools read it.
- A unitless `padding: 16` is invalid CSS and is dropped silently. No error, just no padding.

**First JavaScript**
- `const` = give a value a name (like a Figma variable). Can't be reassigned, but fields inside an object can change.
- `JSON.parse` is a tool, not the result: `tokens.space...`, not `JSON.parse.space...`.
- Keys with dots need brackets: `obj['com.figma.aliasData']`.
- Quotes = literal text; no quotes = look up the variable. `'reference'` ≠ `reference`.
- Code runs top to bottom: create a name before using it.
- Read errors from the line number and the `^` marker. "Cannot read properties of undefined" = the thing left of the dot doesn't exist.


## 26 Nov 2026 – Loops and object lookup

- An object `{ }` is a lookup table (key → value), like the Figma Variables panel. `obj['md']` and `obj.md` both look up the key named `md`.
- No quotes = open the box first: `obj[size]` looks up whatever name is inside `size`. After a dot, it's always a fixed name, so `obj.size` looks for a key called `size`.
- `for (const key in obj)` puts each key into `key`, one per round. JavaScript knows by position, not by name; `key` is just a readable convention.
- Change a value in a loop with `obj[key] = obj[key] + 'px'`: right side first, then stored back into that slot.
- One loop only walks one level. Nested token groups need a loop inside a loop (next session).


## 27 Nov 2026 – Nested loops, functions, recursion

- A loop inside a loop walks two levels: `space[group][name]` is two lookups in a row.
- Real tokens have different depths (`space/16` = 2, `color/blue/600` = 3), so a fixed number of loops can't work.
- `'$value' in item` tells a token from a group. I use `$value` (DTCG rule), not `com.figma.variableId`, because hand-written Brand B won't have Figma extensions.
- A function's parameter is an empty box, filled each time the function is called (like a component instance's props).
- `walk(group)` calls itself on every group, so it reaches tokens at any depth. Tracing it step by step in a table helped.