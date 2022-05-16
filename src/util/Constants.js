export default class Constants {
  static QUESTIONS = [
    'Your grandfather typed the following string. Unfortunately he typed a lot of words in duplicate because he wasn\'t paying attention. Write php code that will convert the following line:\nThethe rain in spainspain falls mainly in the plainplain. The old manman is not here rightright now. When will he be backback? Saturday is the bestbest dayday of the week! I likelike it because I get to sleep inin.\nTo:\nThe rain in spain falls mainly in the plain. The old man is not here right now. When will he be back? Saturday is the best day of the week! I like it because I get to sleep in.',

    'The Appendix A section has a series of create table statements.... using these as a guide generate 2 queries.\n1) Write a query where the result is users: user id, username, email, all previous passwords for the user. The query output must list users uniquely.\n2) Write a query that lists polls a user voted in. The results should be username, poll question, total number of votes for the poll.',

    'A school has to give all its students an end-of-year examination. The test consists of 40 questions for each student. The question pool is 70 questions. The 40 question test must contain questions 1 - 5 from the question pool for each test. To minimize cheating, the school wants the 40 questions to be randomly ordered. You may not have the same question twice on a test. Code the above in php.',

    `You have a delivery route in the Tampa bay area which has 10 stops, write code that will determine the order of locations you visit for most efficient delivery.\n\nSTARTING POINT:\nTampa City Hall\n\nLOCATIONS:\nTampa Museum of Art\nUniversity of South Florida\nSt. Joseph’s Children Hospital\nRaymond James Stadium\nMacdill Air Force Base\nTampa International Airport\nLowry Park Zoo\nWestshore Shopping Mall\nBusch Gardens\nPlant High School\n\n`,

    'You need to debug your site, you copy the code to your laptop to run locally, when you try to login to the admin area on your laptop, the database won’t connect ...what could be wrong ?',

    'You have an array of 200 numbers, there are duplicates, write javascript code that would find them and return the number of duplicates in order.',

    'You are working on a site, after editing some code, the page comes up with a blank screen instead of the site, your php config has display_errors set to 0, describe your process for fixing this issue ...state any assumptions about web server, etc.',

    'You are tasked with creating a url shortening service (like bit.ly or goo.gl) describe how you would store the url data and how you would generate your redirect id(the part after the url for your service) use any code you think is necessary to illustrate your point.',

    'Attach a code sample of anything else you\'d like(either existing or new work is fine) or a github account etc.',
  ];

  static SOLUTIONS = [
    `<?php

      include_once 'IQuestion.php';

      const PROBLEM_DATA = '
      Thethe rain in spainspain falls mainly in the plainplain. The old manman is not here
      rightright now. When will he be backback? Saturday is the bestbest dayday of the week! 
      I likelike it because I get to sleep inin.';

      class Question_1 implements IQuestion
      {
        public static function solve()
        {
          // Split the sentences into words.
          $sentences = explode(' ', PROBLEM_DATA);

          $solution = '';

          foreach ($sentences as $key => $word) {
            // Replace a period with an empty char.
            $replacedWord = str_replace('.', '', $word, $periodCount);

            $punctuation = '';

            // These nested if statements are ugly and I would refactor with more time and research.
            // Get the removed punctuation so it can be added back for the solution.
            if ($periodCount > 0) {
              $punctuation = '.';
            } else {
              $replacedWord = str_replace('?', '', $word, $questionCount);

              if ($questionCount > 0) {
                $punctuation = '?';
              } else {
                $replacedWord = str_replace('!', '', $word, $exclamationCount);
                if ($exclamationCount > 0) {
                  $punctuation = '!';
                }
              }
            }

            // Not all words with even chars are repeats, but all repeats will have an even number of chars.
            $isEvenChars = strlen($replacedWord) % 2 === 0;
            if ($isEvenChars) {
              // Split the word in half and destructure each substring.
              $halvedChars = str_split($replacedWord, strlen($replacedWord) / 2);
              list($first, $second) = $halvedChars;

              // If both substrings are the same then it's a repeated word.
              // NOTE: This will fail for words like 'meme', 'toto', and other made of duplicate words.
              if (strtolower($first) === strtolower($second)) {
                $replacedWord = $first;
              }
            }

            // Concatenate the formatted word with the running solution.
            $solution = $solution . ' ' . $replacedWord . $punctuation;
          }

          echo $solution;
        }
      }
    `,
    `
    <?php

      include_once 'IQuestion.php';

      class Question_2 implements IQuestion
      {
        public static function solve()
        {
          // DB Options.
          $host = 'localhost';
          $username = 'root';
          $password = '';
          $database = 'gale_healthcare_db';

          // Connect to the server and database.
          $connection = mysqli_connect($host, $username, $password, $database);

          // The first query from the challenge.
          $query1 = "SELECT u.userid, u.username, u.email, group_concat(ph.password SEPARATOR ',') passwords FROM  user u JOIN passwordhistory ph ON ph.userid = u.userid GROUP BY ph.userid;";

          // The second query from the challenge with dynamic userid.
          $query2 = "SELECT u.username, p.question, (SELECT COUNT(*) FROM pollvote WHERE pollid = p.pollid) AS voteCount FROM poll p JOIN pollvote pv ON pv.pollid = p.pollid JOIN user u ON u.userid = pv.userid WHERE u.userid = [userid];";

          $result1 = mysqli_query($connection, $query1);
          if ($result1) {
            $users = mysqli_fetch_all($result1, MYSQLI_ASSOC);
            $finalUsers = array();

            // Loop through each user and call the second query to get their polls.
            foreach ($users as $user) {
              // Replace the placeholder in query2 with this user's userid.
              $userid = $user['userid'];
              $updatedQuery = str_replace('[userid]', $userid, $query2);

              $result2 = mysqli_query($connection, $updatedQuery);
              if ($result2) {
                // Add polls to this user and push to array of all users.
                $polls = mysqli_fetch_all($result2, MYSQLI_ASSOC);
                $user['polls'] = $polls;
                array_push($finalUsers, $user);
              }
            }

            echo json_encode($finalUsers);
          } else {
            echo 'Error querying the database';
          }
        }
      }
    `,
    `
    <?php

    include_once 'IQuestion.php';

    class Question_3 implements IQuestion
    {
      public function solve()
      {
        $firstQuestions =  $this->getQuestionNumbers();

        // Splice out all but the first questions.
        $restQuestions = array_splice($firstQuestions, 5);

        // Get 35 random questions from the remaining question pool.
        $randomQuestions = $this->getRandomQuestions($restQuestions);

        // Merge and shuffle questions for final result.
        $finalQuestions = array_merge($firstQuestions, $randomQuestions);
        shuffle($finalQuestions);

        echo json_encode($finalQuestions);
      }

      private function getQuestionNumbers()
      {
        // Returns an array of numbers 1 through 70 to represent the test questions.
        $questions = array();

        $number = 1;
        while ($number <= 70) {
          array_push($questions, $number++);
        }

        return $questions;
      }

      private function getRandomQuestions($questions)
      {
        // Get 35 random questions from the remaining questions.
        $randomKeys = array_rand($questions, 35);
        return array_map(fn ($key) => $questions[$key], $randomKeys);
      }
    }
    `,

    `My solution for this is to create a unique route without visiting anything twice except the starting location as the final stop. Each new route total\ntime would then need to be compared to the previous route\'s time. If the new route is quicker then it becomes the new quickest route. In order\nto get the travel times between all locations in a timely fashion I would need to write a script that consumes Google Maps data and I feel this is\nout of scope of the challenge and even too much for a coding challenge considering the number of other questions. I know there is a better solution\nthan the brute force method I mentioned above, but I don\'t know it without specifically looking up this code challenge which would be cheating.\nIn the real world if I was tasked with this I would ensure my team and superiors understood the additional requirements and time I would need to\nresearch routing algorithms.'
    `,

    `If I get an error while trying to run code locally and the database won\'t connect I first ensure the database server and related servers and services\nare running. After I confirm the service is running I will double check my database credentials and configuration. Connection errors are almost\nalways solved with these checks, but if this still doesn\'t work I will dig deeper into the error and leverage Google.`,

    `
    /**
     * Running \`node Question_6.js\` will output the results.
     * Make an array of 200 numbers with duplicates.
     * Remove the duplicates.
     * ??? Return the number of duplicates in order.
     * 
     * The wording is ambiguous by asking to return the number of duplicates and the duplicates in order.
     * I would have better understanding if these instructions were attached to a project, and then
     * ask somebody if it were still too ambiguous to accurately solve.
     * 
     * I considered returning both in a JSON like object but thought this to be inefficient
     * because the client or other consumer of this class can use the length of the duplicates
     * array to get the number of duplicates.
     */

    class Question_6 {
      solve() {
        const numbers = this.getNumbers();
        const duplicateNumbers = this.getDuplicates(numbers);

        // Sort the duplicates in ascending order.
        duplicateNumbers.sort((a, b) => a - b);

        return duplicateNumbers;
      }

      getNumbers() {
        // Make the array of 200 numbers with duplicates.

        let count = 0;
        let number = Math.floor(Math.random() * 999999);
        const numbers = [];

        do {
          numbers.push(number);

          // Get a number 0 or 1. If 1 then reuse the number, else make new number.
          const isDuplicate = Math.floor(Math.random() * 2) > 0;
          if (!isDuplicate) {
            number = Math.floor(Math.random() * 999999);
          }

          // Increment count for array length.
          count++;
        } while (count < 200);

        return numbers;
      }

      getDuplicates(numbers = []) {
        const duplicateNumbers = [];

        for (let i = 0; i < numbers.length; i++) {
          const firstNumber = numbers[i];

          // Skip this number if its duplicates have already been added.
          if (duplicateNumbers.includes(firstNumber)) continue;

          for (let j = 0; j < numbers.length; j++) {
            const secondNumber = numbers[j];

            // Add to the duplicate if it's different indices and the same number.
            const isDifferentIndex = i !== j;
            const isSameNumber = firstNumber === secondNumber;

            if (isDifferentIndex && isSameNumber) {
              duplicateNumbers.push(firstNumber);
            }
          }

        }

        return duplicateNumbers;
      }
    }

    // Output the results.
    const question6 = new Question_6();
    const duplicates = question6.solve();

    console.log('Duplicates in order: ', JSON.stringify(duplicates, null, 2));
    console.log('Number of duplicates: ', duplicates.length);
    `,

    `This project is my first time using PHP, but I would handle it the same way as I would an error in any other language.\nMy research shows that I can call the following methods to display different types of errors:

    ini_set(display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    \nI would begin by displaying these errors and then using the information provided to debug the issue. If the error gave a file and line number\nI would start there and imagine what the code is doing. If I can't use the error to solve it myself I would use Google to find answers. that have\nhad similar errors. After I found a solution online that solves the same error I would first understand the solution and then implement it. If it works\nthen I would move on with my life, else I would repeat the Google process. If I feel I have spent too much time on the error I would try to find a\nteammate with a few minutes of free time in case they could quickly spot something I missed or provide more information from their experiences\nwith the project and PHP.
    `,

    `I have never made a url shortener so I wouldn't be able to write the function without first following a tutorial. I am all about tutorials and followed\nseveral for the PHP portions of these challenges. However, I feel this would be too specific and I would use too much of the code from the tutorial.
    \nConsidering this, I still did some research and feel that I understand enough to describe a large portion of the steps required to achieve this.    
    \nI would create 1 table in a database for this project to store the url, short url, and a unique id. After the short url is generated and stored, the original\nurl can be used to retrieve the shortened url. Generating the url doesn't seem too difficult and is a matter of converting the long url into a readable\nstring by mapping the url chars to letters and numbers, but I must admit I didn't fully understand the code examples that I looked at. In the real\nworld I would spend enough time to implement some of the code examples I saw and come up with a unique solution that solves the\ncompany's/client's needs.`,

    `This project... For this code challenge I built a full stack website that uses React for the client hosted on Github Pages, PHP on the backend hosted\non Heroku, and a MYSQL database hosted on AWS RDS. I created a basic API with PHP which I have never used and shown the ability to use AWS\nas my last interviewers requested. Because this is a "full" project I am using it as my submission for this question.`,
  ];
}