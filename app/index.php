<?php
  require_once 'connect.php';

  function createRandomVal($val) {
      $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      srand((double)microtime() * 1000000);
      $i = 0;
      $pass = '';
      while ($i < $val) {
          $num = rand() % 64;
          $tmp = substr($chars, $num, 1);
          $pass = $pass . $tmp;
          $i++;
      }
      return $pass;
  }
  $date = new DateTime();
  
  echo $twig->render('site/index.twig', [ 'sid' => createRandomVal(32) ]);

  // echo $twig->render('site/index.twig');
?>