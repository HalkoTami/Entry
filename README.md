# Raycast Extension Entry

This is personally developed simple extension for the launcher tool Raycast.

I hope this repository can be used as an example for someone who wants to build a custom Raycast extension. 

## What Entry can do

Entry creates, updates and saves data to an existing Notion Database by using Notion API.

I created this extension to record start/end datetime of my daily activities by only lauching Raycast.

I also made a Summary Data UI to see what I have done for the day.

|insert data to Notion Database through Raycast | Summary UI  |
| ---- | ---- |
| ![image](https://user-images.githubusercontent.com/101169544/216797092-88d84d51-fca7-4c8e-beb6-b56dc9f7d199.png) | ![Untitled 1](https://user-images.githubusercontent.com/101169544/216797045-f31b4fd7-d352-4190-b4aa-0d92a1b27841.png)  |


# About this App

## Tech stack

you need

- Raycast 1.26.0 or above
- Node.js 16.10 or above
    - nvm install recommended
- Visual Studio Code as editor

to use notion API and Raycast API run

```powershell
$ npm install @notionhq/client
$ npm install @raycast/api
```

in terminal

more detailed tutorial to make your own Raycast extension in Japanese, click [here](https://qiita.com/halkoAusD/items/fc7cd2e22ec332c4fcd2) 

## Author

Halko Tami, programming beginner, trying to get a job as Android App Developer.

[twitter](https://twitter.com/halkoAusD)

## License

```markdown
Copyright 2022 Halko Tami

Licensed under the Apache License, Version 2.0 (the “License”);
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an “AS IS” BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and
limitations under the License.
```
