export default class Constants {
  static QUESTIONS = [
    'Your grandfather typed the following string. Unfortunately he typed a lot of words in duplicate because he wasn\'t paying attention. Write php code that will convert the following line:\nThethe rain in spainspain falls mainly in the plainplain. The old manman is not here rightright now. When will he be backback? Saturday is the bestbest dayday of the week! I likelike it because I get to sleep inin.\nTo:\nThe rain in spain falls mainly in the plain. The old man is not here right now. When will he be back? Saturday is the best day of the week! I like it because I get to sleep in.',
    'The Appendix A section has a series of create table statements.... using these as a guide generate 2 queries.\n1) Write a query where the result is users: user id, username, email, all previous passwords for the user. The query output must list users uniquely.\n2) Write a query that lists polls a user voted in. The results should be username, poll question, total number of votes for the poll.',
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
    `
  ];
}