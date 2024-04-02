# Empowering Learning with AI: Science with Mr. Fluff

## Deployed Site: https://main--mrfluff.netlify.app/

## Overview

My application is a virtual instructor chatbot that can help with science queries that students may have, alongside given chemistry quiz questions.

### Problem

One of the challenges that students can face is the lack of assistance when difficult concepts or questions are encountered either outside of regular class hours or during remote learning, without the immediate support of classmates or instructors. This can potentially result in students feeling discouraged and unmotivated to continue learning. With the implementation of a virtual instructor chatbot, students are able to receive help whenever needed.

### User Profile

Users will be high school Science 10 students who have access to mobile phones or computers. They will use the application as a potential assignment or review tool.

### Features
- Login Page
- Selection of Topics Page
- Question Page
- Scores Page
  
The site is responsive at mobile (320px), tablet (768px) and desktop (1280px) screens.

Upon opening the application, the user is greeted by a login page. Currently, the login page takes in any username and password combination.

Signing in through the login page brings the user to the selections page of different chemistry topics.
Clicking on a topic brings the user to the question page, showing the first question of the selected topic, along with multiple choice selections.

On the question page, the user is able to click on an answer and have it display as right or wrong. At any time, an instructor chatbot is available to take in questions. Clicking on the "ask" button without any user input will pass the selected question and options to the chatbot. The user can also input any questions they'd like and the chatbot will answer them if they are science-related. 

When the user is done with a question, clicking on the next button brings the user to the next question.

Upon finishing the last question, a scores page is shown with the total number of questions correctly answered. Based on the score achieved, a different message and image appears. Clicking the "Back to Home" button or the header title brings the user back to the selections page.

## Implementation

### Tech Stack
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The technologies that are used include Sass, React, Express, OpenAI Node.js library, OpenAI Assistants API

### Usage Instructions
This is the repository for the back-end. Please also use the repository for the front-end portion: https://github.com/glorialau123/gloria-lau-capstone-client.git  

#### Running on local development environment:
1. Create a folder.
2. Download repositories for both the front-end and back-end portions of the application into the same folder.
3. Inside the front-end folder, create a ".env" file in the root directory. Inside the file, assign the environment variable to a local host url and port of your choice that will run the back-end. (Ex. REACT_APP_BACKEND_URL = http://localhost:8080). A ".env-sample" file is provided for reference.
4. Inside the back-end folder, create a ".env" file in the root directory. Inside the file, assign the PORT variable to the same port you specified in the front-end's ".env" file. For the OPENAI_API_KEY, you will need to assign your own API key here. A ".env-sample" file is provided for reference.
5. If you don't have an API key with OpenAI, you can go to https://platform.openai.com/api-keys to create one. Please check if you have credit grants available to use: https://platform.openai.com/usage .
6. Once both ".env" files have been set up, you can cd into your front-end folder and back-end folder from the terminal. Run "npm start" to start the application. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

![image](https://github.com/glorialau123/gloria-lau-capstone-client/assets/96962463/da6156e5-64fe-499d-98eb-6264aefc2b2c)

7. Currently, the assistant has already been created. If you'd like to create a new assistant, you can specify different parameters inside the chatbot.js file that is inside the Routes folder for the back-end. See the file for further details.

### APIs

The application uses OpenAI's assistants API and questions/answers taken from JSON files.
- Data: The question bank data are sets of questions and multiple choices, saved in json files.
- For the questions and answers, the front-end and back-end implements HTTP GET requests for Q/A retrieval. For the chatbot and user responses, the front-end implements HTTP POST requests to send queries and the back-end implements GET/POST requests, coupled with OpenAI's Node API Library and Assistants API. Parameters for the name, instructions and model were given when creating the AI assistant. 

### Screenshots
#### Login Page:
- Mobile:
  
  ![image](https://github.com/glorialau123/gloria-lau-capstone-client/assets/96962463/ace52214-3d6d-4f36-9b3d-2a02bfc07947)
- Tablet/Desktop:
  
  ![image](https://github.com/glorialau123/gloria-lau-capstone-client/assets/96962463/c1ab4ee2-56af-456b-96a7-b9a3f0f196d9)


#### Selections Page:
- Mobile:
  
![image](https://github.com/glorialau123/gloria-lau-capstone-client/assets/96962463/3cbe5dba-8679-41cc-9f1b-d4f3a4409af9)
- Tablet/Desktop:
  
![image](https://github.com/glorialau123/gloria-lau-capstone-client/assets/96962463/4be75a68-3ae9-4c25-9825-1ef88ac5deee)


#### Question Page:
- Mobile:
  
![image](https://github.com/glorialau123/gloria-lau-capstone-client/assets/96962463/7a9fcfab-a3b5-4c91-8755-f977fa11e2bb)
- Tablet/Desktop:
  
![image](https://github.com/glorialau123/gloria-lau-capstone-client/assets/96962463/59f11557-770a-4b49-912f-23b9d402fe63)

#### Scores Page:
- Mobile:
  
![image](https://github.com/glorialau123/gloria-lau-capstone-client/assets/96962463/90333a1f-c352-42e3-86b7-2f6fc70fabd3)
- Tablet/Desktop:

![image](https://github.com/glorialau123/gloria-lau-capstone-client/assets/96962463/69a54c78-8ebe-4313-a420-6fa7cb12f135)

## Lessons Learned and Next Steps

This project has been an enriching journey, providing me with invaluable hands-on experience and a deeper understanding of the technologies employed. As I delved into integrating OpenAI's Assistant API, I encountered a learning curve that required thorough exploration of its documentation and experimentation with various endpoints. Despite the initial challenges, this process greatly expanded my proficiency and adaptability in working with third-party APIs.

Furthermore, what initially seemed like a straightforward task—developing a quiz—unfolded into a multifaceted endeavor. I discovered numerous intricacies and perspectives that hadn't crossed my mind at the beginning of the project. From managing question data to implementing effective feedback mechanisms and handling user interactions, each aspect required careful consideration and planning.   

Moving forward, I'm excited to build upon this foundation and implement additional features to enhance the application further. Implementing user authentication will elevate the user experience, ensuring that users can resume their progress without losing data. Additionally, I would like to enable functionality for teachers such that they can personalize their classes through the integration of custom question sets. 
