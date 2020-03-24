- **专有名词**

  - Workspace	工作区
  - Index / Stage 暂存区
  - Repository     仓库区
  - Remote           远程仓库

  ```txt
  1.forking 	派生
  2.check out	签出
  3.stash		储藏
  4.pull		抓取
  5.fetch		拉取
  6.merge		合并
  7.branch	分支
  8.tracked	跟踪
  9.push		推送
  ```

- **创建仓库**

  - `git init`

    在当前目录新建一个git仓库，执行完毕后当前目录 会出现 .git 目录（默认隐藏）;

  - `git init [project-name]`

    新建一个目录，并将其初始化为Git仓库

  - `git clone [url]`

    克隆一个远程仓库到本地

  

- **配置**

  - `git config --list`

    显示当前git配置

  - `git config -e [--global]`

    编辑Git配置文件

  - `git config [--global] user.name "[name]"`

    `git config [--global] user.email "[email address]"`

    设置用户信息

  - git 修改当前的project的用户名的目录

    `git config user.name 目标用户名；`

  - git 修改当前的project提交邮箱的命令

    `git config user.email  目标邮箱名;`

  - 全局修改

    `git config --global user.name 目标用户名`

    `git config --global user.email 目标邮箱名`

- **添加/删除文件**

  - `git add [file1] [file2] ...`

    添加指定文件到暂存区

  - `git add [dir]`

    添加指定目录到暂存区，包括子目录

  - `git add .`

    添加当前目录的所有文件到暂存区

  - `git add -p`

    添加每个变化前，等会要去确认，对于同一个文件的到处变化，可以实现分次提交

  - `git rm [file1] [file2] ...`

    删除工作区文件，并将这次删除放入暂存区

  - `git rm --cached [file]`

    停止追踪指定文件，但文件会保留在工作区

  - `git mv [file-original] [file-rename]`

    改名文件，并将这个改名放入暂存区

- **代码提交**

  - `git commit -m ['message']`

    从暂存区提交到仓库区

  - `git commit [file1] [file2] ... -m ['message']`

    提交暂存区的指定文件到仓库区

  - `git commit -a`

    提交工作区自上次commit之后的变化，直接到仓库区

  - `git commit -v` 

    提交时显示所有diff信息

  - `git commit --amend -m [message]`

    使用一次新的commit，代替上一次提交，如果代码没有任何新变化，则用来改写上一次commit的提交信息

  - `git commit --amend [file1] [file2] ...`

    重做上一次commit，并包括指定文件的新变化

- **分支**

  - `git branch`

    列出所有本地分支

  - `git branch -r`

    列出所有远程分支

  - `git branch -a`

    列出所有本地和远程分支

  - `git branch [branch-name]`

    新建一个分支，但依然停留在当前分支

  - `git checkout -b [branch]`

    `git checkout -b appoint_box(别名) origin/feature/20200324_appoint_box_1(分支名)`

    新建一个分支，并切换到该分支

  - `git branch [branch] [commit]`

    新建一个分支，指向指定commit

  - `git branch --track [branch] [remote-branch]`

    新建一个分支，与指定的远程分支建立追踪关系

  - `git checkout [branch-name]`

    切换到指定分支，并更新工作区

  - `git checkout -`

    切换到上一个分支

  - `git branch --set-upstream [branch] [remote-branch]`

    建立追踪关系，在现有分支与指定的远程分支之间

  - `git merge [branch]`

    合并指定分支到当前分支

  - `git cherry-pick [commit]`

    选择一个commit ,合并进当前分支

  - `git branch -d [branch-name]`

    删除分支

  - `git push origin --delete [branch-name]`

    `git branch -dr [remote/branch]`

    删除远程分支

- 标签

  - `git tag`

    列出所有tag

  - `git tag [tag]`

    新建一个tag在之前commit

  - `git tag [tag] [commit]`

    新建一个tag在指定commit

  - `git tag -d [tag]`

    删除本地tag

  - `git push origin :refs/tags/[tagName]`

    删除远程tag

  - `git show [tag]`

    查看tag信息

  - `git push [remote] [tag]`

    提交指定tag

  - `git push [remote] --tags`

    提交所有tag

  - `git checkout -b [branch] [tag]`

    新建一个分支，指向每个tag

- 

- 

- 

- 

- 

- 

- 

摘：

[https://www.jianshu.com/p/46ffff059092]: 

