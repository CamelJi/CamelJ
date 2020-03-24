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

- 

- 

- 

- 

摘：

[https://www.jianshu.com/p/46ffff059092]: 

