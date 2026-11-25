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


Token learning // Nov 25 2026
- Need to name space or radius properly because px needs to be added from transfereing from json to CSS
- some tokens with numbers wont need px (e.g., opacity or font weight)
