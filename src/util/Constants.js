export default class Constants {
  static QUESTIONS = [
    'Your grandfather typed the following string. Unfortunately he typed a lot of words in duplicate because he wasn\'t paying attention. Write php code that will convert the following line:\nThethe rain in spainspain falls mainly in the plainplain. The old manman is not here rightright now. When will he be backback? Saturday is the bestbest dayday of the week! I likelike it because I get to sleep inin.\nTo:\nThe rain in spain falls mainly in the plain. The old man is not here right now. When will he be back? Saturday is the best day of the week! I like it because I get to sleep in.',

    'The Appendix A section has a series of create table statements.... using these as a guide generate 2 queries.\n1) Write a query where the result is users: user id, username, email, all previous passwords for the user. The query output must list users uniquely.\n2) Write a query that lists polls a user voted in. The results should be username, poll question, total number of votes for the poll.',

    'A school has to give all its students an end-of-year examination. The test consists of 40 questions for each student. The question pool is 70 questions. The 40 question test must contain questions 1 - 5 from the question pool for each test. To minimize cheating, the school wants the 40 questions to be randomly ordered. You may not have the same question twice on a test. Code the above in php.',

    'TODO: Do Question 4',

    'TODO: Do Question 5',

    'You have an array of 200 numbers, there are duplicates, write javascript code that would find them and return the number of duplicates in order.',
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

    `TODO: Solve question 4`,

    `TODO: Solve question 5`,

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
     * because the client or other consumer of this class can use the length of the
     * to get the number of duplicates.
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
    `
  ];
}